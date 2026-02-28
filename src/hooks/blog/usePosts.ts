import { useState, useEffect } from 'react';
import type { Post, PostMeta } from '../../types/blog';

// 硬编码文章列表（构建时确定）
const postModules = import.meta.glob('../../posts/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

// 简单的 frontmatter 解析器（不依赖 gray-matter）
function parseFrontMatter(content: string): { data: Record<string, unknown>; content: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontMatterStr, body] = match;
  const data: Record<string, unknown> = {};
  
  // 解析 YAML 格式的 frontmatter
  const lines = frontMatterStr.split('\n');
  let currentKey = '';
  let isArray = false;
  let arrayValues: unknown[] = [];
  
  for (const line of lines) {
    // 数组项（以 - 开头）
    const arrayMatch = line.match(/^(\s*)-\s+(.+)$/);
    if (arrayMatch && currentKey) {
      isArray = true;
      arrayValues.push(arrayMatch[2].trim());
      continue;
    }
    
    // 键值对
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      // 保存之前的数组
      if (isArray && arrayValues.length > 0) {
        data[currentKey] = arrayValues;
        arrayValues = [];
        isArray = false;
      }
      
      const [, key, value] = kvMatch;
      currentKey = key;
      
      if (value === '' || value === undefined) {
        // 可能是多行数组，暂时跳过
        continue;
      }
      
      data[key] = value.trim();
    }
  }
  
  // 保存最后一个数组
  if (isArray && arrayValues.length > 0) {
    data[currentKey] = arrayValues;
  }
  
  return { data, content: body };
}

export function usePosts() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedPosts: PostMeta[] = [];

    for (const [path, content] of Object.entries(postModules)) {
      if (typeof content === 'string') {
        const { data } = parseFrontMatter(content);
        const slug = path.replace('../../posts/', '').replace('.md', '');
        
        loadedPosts.push({
          slug,
          title: (data.title as string) || 'Untitled',
          date: (data.date as string) || new Date().toISOString(),
          excerpt: (data.excerpt as string) || '',
          tags: (data.tags as string[]) || [],
          category: (data.category as string) || 'Uncategorized',
          cover: data.cover as string,
        });
      }
    }

    // 按日期排序
    loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(loadedPosts);
    setLoading(false);
  }, []);

  return { posts, loading };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 找到对应的文章
    const path = `../../posts/${slug}.md`;
    const content = postModules[path];
    
    if (typeof content !== 'string') {
      setError('Post not found');
      setLoading(false);
      return;
    }

    const { data, content: body } = parseFrontMatter(content);
    
    setPost({
      slug,
      frontMatter: {
        title: (data.title as string) || 'Untitled',
        date: (data.date as string) || new Date().toISOString(),
        excerpt: (data.excerpt as string) || '',
        tags: (data.tags as string[]) || [],
        category: (data.category as string) || 'Uncategorized',
        cover: data.cover as string,
        author: data.author as string,
      },
      content: body,
    });
    setLoading(false);
  }, [slug]);

  return { post, loading, error };
}

export function useCategories(posts: PostMeta[]) {
  const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
  return categories;
}

export function useTags(posts: PostMeta[]) {
  const tagsSet = new Set<string>();
  posts.forEach(p => p.tags?.forEach(t => tagsSet.add(t)));
  return [...tagsSet];
}
