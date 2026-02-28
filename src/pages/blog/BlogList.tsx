import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePosts } from '../../hooks/blog/usePosts';

export function BlogList() {
  const { posts, loading } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const selectedCategory = searchParams.get('category');
  const selectedTag = searchParams.get('tag');

  // 获取所有分类和标签
  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    posts.forEach(p => {
      if (p.category) {
        cats.set(p.category, (cats.get(p.category) || 0) + 1);
      }
    });
    return Array.from(cats.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const tags = useMemo(() => {
    const tagMap = new Map<string, number>();
    posts.forEach(p => {
      p.tags?.forEach(t => tagMap.set(t, (tagMap.get(t) || 0) + 1));
    });
    return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  // 筛选文章
  const filteredPosts = useMemo(() => {
    let result = posts;
    
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (selectedTag) {
      result = result.filter(p => p.tags?.includes(selectedTag));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags?.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 侧边栏 */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* 搜索框 */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  🔍
                </button>
              </div>
            </form>

            {/* 分类 */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                分类
              </h3>
              <div className="space-y-1">
                <Link
                  to="/blog"
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  全部 ({posts.length})
                </Link>
                {categories.map(([cat, count]) => (
                  <Link
                    key={cat}
                    to={`/blog?category=${encodeURIComponent(cat)}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {cat} ({count})
                  </Link>
                ))}
              </div>
            </div>

            {/* 标签云 */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    #{tag} ({count})
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* 文章列表 */}
          <main className="flex-1 min-w-0">
            {/* 当前筛选状态 */}
            {(selectedCategory || selectedTag || searchQuery) && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-slate-400 text-sm">当前筛选:</span>
                {selectedCategory && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
                    分类: {selectedCategory}
                    <Link to="/blog" className="hover:text-white">✕</Link>
                  </span>
                )}
                {selectedTag && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2">
                    标签: #{selectedTag}
                    <Link to="/blog" className="hover:text-white">✕</Link>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-2">
                    搜索: {searchQuery}
                    <button onClick={clearFilters} className="hover:text-white">✕</button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-slate-500 hover:text-white text-sm underline"
                >
                  清除全部
                </button>
              </div>
            )}

            <h1 className="text-3xl font-bold text-white mb-8">
              {selectedCategory || selectedTag || searchQuery ? '筛选结果' : '博客文章'}
            </h1>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-xl font-semibold text-white mb-2">没有找到文章</h2>
                <p className="text-slate-400 mb-4">试试其他关键词或筛选条件</p>
                <button
                  onClick={clearFilters}
                  className="text-blue-400 hover:underline"
                >
                  查看全部文章
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <article className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50">
                      <div className="flex gap-4">
                        {post.cover && (
                          <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <img 
                              src={post.cover} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 truncate">
                            {post.title}
                          </h2>
                          <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                            <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
                            {post.category && (
                              <span className="px-2 py-0.5 bg-slate-800 rounded">
                                {post.category}
                              </span>
                            )}
                            {post.tags && post.tags.length > 0 && (
                              <span className="text-slate-600">
                                {post.tags.slice(0, 3).map(t => `#${t}`).join(' ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
