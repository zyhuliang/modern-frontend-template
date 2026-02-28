import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/blog/usePosts';

export function Home() {
  const { posts } = usePosts();
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            你好，我是 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">开发者</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            一个热爱编程的开发者，在这里分享技术见解、项目经验和生活感悟。
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/blog"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
            >
              阅读博客
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span>📝</span> 最新文章
          </h2>
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors mb-1">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                      <time className="text-sm text-slate-500 flex-shrink-0">
                        {new Date(post.date).toLocaleDateString('zh-CN')}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              暂无文章，敬请期待...
            </div>
          )}
          {posts.length > 5 && (
            <Link
              to="/blog"
              className="inline-block mt-6 text-blue-400 hover:text-blue-300 transition-colors"
            >
              查看全部文章 →
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">{posts.length}</div>
              <div className="text-slate-400">篇文章</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {[...new Set(posts.map(p => p.category).filter(Boolean))].length}
              </div>
              <div className="text-slate-400">个分类</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">
                {[...new Set(posts.flatMap(p => p.tags || []))].length}
              </div>
              <div className="text-slate-400">个标签</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
