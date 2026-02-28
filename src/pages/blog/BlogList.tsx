import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/blog/usePosts';

export function BlogList() {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">暂无文章</h2>
            <p className="text-slate-400">快去写第一篇文章吧！</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">博客文章</h1>
        
        <div className="space-y-6">
          {posts.map((post) => (
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
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
                      {post.category && (
                        <span className="px-2 py-1 bg-slate-800 rounded-md">
                          {post.category}
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <span>{post.tags.slice(0, 3).join(' · ')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
