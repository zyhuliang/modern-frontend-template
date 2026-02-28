import { useState, useEffect } from 'react';
import type { Post, PostMeta } from '../../types/blog';

// 硬编码文章列表（构建时确定）
const postModules = import.meta.glob('../../posts/*.md', { eager: true, query: '?raw', import: 'default' });

export function usePosts() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { default: matter } = await import('gray-matter');
        const loadedPosts: PostMeta[] = [];

        for (const [path, content] of Object.entries(postModules)) {
          if (typeof content === 'string') {
            const { data } = matter(content);
            const slug = path.replace('../../posts/', '').replace('.md', '');
            
            loadedPosts.push({
              slug,
              title: data.title || 'Untitled',
              date: data.date || new Date().toISOString(),
              excerpt: data.excerpt || '',
              tags: data.tags || [],
              category: data.category || 'Uncategorized',
              cover: data.cover,
            });
          }
        }

        // 按日期排序
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading };
}

export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { default: matter } = await import('gray-matter');
        
        // 找到对应的文章
        const path = `../../posts/${slug}.md`;
        const content = postModules[path];
        
        if (typeof content !== 'string') {
          setError('Post not found');
          setLoading(false);
          return;
        }

        const { data, content: body } = matter(content);
        
        setPost({
          slug,
          frontMatter: {
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            category: data.category || 'Uncategorized',
            cover: data.cover,
            author: data.author,
          },
          content: body,
        });
      } catch (err) {
        console.error('Failed to load post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
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
