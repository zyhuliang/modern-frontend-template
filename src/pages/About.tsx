import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <span>← 返回首页</span>
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">关于我</h1>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl">
                👨‍💻
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-4">开发者</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                一个热爱编程的开发者，专注于 Web 前端技术，喜欢探索新技术、分享经验。
              </p>
              <p className="text-slate-400 mb-4 leading-relaxed">
                这个博客是我的个人空间，记录学习笔记、项目经验、技术分享以及一些生活感悟。
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
            <div className="space-y-2 text-slate-400">
              <p>📧 Email: your-email@example.com</p>
              <p>🔗 GitHub: github.com/your-username</p>
              <p>🐦 Twitter: @your-username</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
