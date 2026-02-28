import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePost } from '../../hooks/blog/usePosts';
import { useTOC } from '../../hooks/blog/useTOC';

// 估算阅读时间
function estimateReadTime(content: string): string {
  const wordsPerMinute = 300;
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  const totalWords = chineseChars + englishWords;
  const minutes = Math.ceil(totalWords / wordsPerMinute);
  return `${minutes} 分钟阅读`;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = usePost(slug || '');
  const { toc, activeId } = useTOC();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">404</div>
            <h2 className="text-2xl font-bold text-white mb-4">文章未找到</h2>
            <Link to="/blog" className="text-blue-400 hover:underline">
              返回文章列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 文章主体 */}
          <article className="flex-1 min-w-0">
            {/* 返回按钮 */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <span>← 返回列表</span>
            </Link>

            {/* 文章头部 */}
            <header className="mb-10">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {post.frontMatter.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap">
                <time>{new Date(post.frontMatter.date).toLocaleDateString('zh-CN')}</time>
                <span>·</span>
                <span>{readTime}</span>
                {post.frontMatter.category && (
                  <>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-slate-800 rounded">
                      {post.frontMatter.category}
                    </span>
                  </>
                )}
                {post.frontMatter.author && (
                  <>
                    <span>·</span>
                    <span>作者: {post.frontMatter.author}</span>
                  </>
                )}
              </div>
              {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {post.frontMatter.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full hover:bg-blue-500/20 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* 封面图 */}
            {post.frontMatter.cover && (
              <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800">
                <img
                  src={post.frontMatter.cover}
                  alt={post.frontMatter.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* 文章内容 */}
            <div className="prose prose-invert prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 文章底部导航 */}
            <div className="mt-16 pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <Link
                  to="/blog"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ← 返回文章列表
                </Link>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  返回首页 →
                </Link>
              </div>
            </div>
          </article>

          {/* 右侧目录（桌面端） */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  目录
                </h4>
                <nav className="space-y-2">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 pl-3 border-l-2 transition-colors ${
                        activeId === item.id
                          ? 'border-blue-500 text-blue-400'
                          : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500'
                      }`}
                      style={{ paddingLeft: `${item.level * 12 + 12}px` }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Giscus 评论 */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <h3 className="text-xl font-semibold text-white mb-6">💬 评论</h3>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="text-slate-400 text-sm text-center py-8">
              评论功能需要配置 Giscus，请查看{' '}
              <a 
                href="https://giscus.app/zh-CN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                giscus.app
              </a>
              {' '}获取配置
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
