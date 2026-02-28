import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePost } from '../../hooks/blog/usePosts';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = usePost(slug || '');

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
            <h2 className="text-2xl font-bold text-white mb-4">文章未找到</h2>
            <Link to="/blog" className="text-blue-400 hover:underline">
              返回文章列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-4xl">
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
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <time>{new Date(post.frontMatter.date).toLocaleDateString('zh-CN')}</time>
            {post.frontMatter.category && (
              <span className="px-2 py-1 bg-slate-800 rounded-md">
                {post.frontMatter.category}
              </span>
            )}
            {post.frontMatter.author && (
              <span>作者: {post.frontMatter.author}</span>
            )}
          </div>
          {post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* 封面图 */}
        {post.frontMatter.cover && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={post.frontMatter.cover}
              alt={post.frontMatter.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* 文章内容 */}
        <article className="prose prose-invert prose-slate max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Giscus 评论 */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <h3 className="text-xl font-semibold text-white mb-6">评论</h3>
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
