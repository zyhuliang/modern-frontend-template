import { Button, Card, Col, Row, Typography, Space, Statistic } from 'antd';
import { GithubOutlined, RocketOutlined, BookOutlined, ThunderboltOutlined, SafetyOutlined, BgColorsOutlined, CodeOutlined, CloudOutlined } from '@ant-design/icons';
import { useWindowSize } from '../hooks/useWindowSize';

const { Title, Paragraph, Text } = Typography;

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-10 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-sm text-blue-200 font-medium tracking-wide">开源 · 现代 · 高效</span>
            </div>

            {/* Title */}
            <Title level={1} className="!text-white !text-5xl sm:!text-6xl lg:!text-7xl !mb-8 !leading-tight !font-bold">
              Modern Frontend
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Template
              </span>
            </Title>

            {/* Subtitle */}
            <Paragraph className="!text-xl sm:!text-2xl !text-slate-300 !mb-12 max-w-3xl mx-auto !leading-relaxed">
              开箱即用的现代化前端开发模板
              <br />
              <span className="text-blue-300">React 18 · TypeScript 5 · Vite 6 · Tailwind CSS · Ant Design</span>
            </Paragraph>

            {/* CTA Buttons */}
            <Space size="large" wrap>
              <Button type="primary" size="large" icon={<RocketOutlined />} className="!h-14 !px-10 !text-lg !rounded-xl !shadow-lg !shadow-blue-500/30 hover:!shadow-blue-500/50 hover:!-translate-y-0.5 transition-all">
                快速开始
              </Button>
              <Button size="large" icon={<BookOutlined />} className="!h-14 !px-10 !text-lg !rounded-xl !border-2 !border-slate-500 !text-slate-300 hover:!border-blue-400 hover:!text-blue-400 transition-all">
                查看文档
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6 py-16">
          <Row gutter={[48, 32]} justify="center">
            <Col xs={12} md={6}>
              <Statistic 
                title={<span className="text-slate-400 text-base">React</span>}
                value="18+"
                valueStyle={{ color: '#3b82f6', fontSize: '3rem', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                title={<span className="text-slate-400 text-base">TypeScript</span>}
                value="5+"
                valueStyle={{ color: '#06b6d4', fontSize: '3rem', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                title={<span className="text-slate-400 text-base">Vite</span>}
                value="6+"
                valueStyle={{ color: '#8b5cf6', fontSize: '3rem', fontWeight: 'bold' }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                title={<span className="text-slate-400 text-base">构建速度</span>}
                value="100x"
                valueStyle={{ color: '#10b981', fontSize: '3rem', fontWeight: 'bold' }}
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="!text-white !text-4xl !mb-4">
              为什么选择我们
            </Title>
            <Paragraph className="!text-lg !text-slate-400 max-w-2xl mx-auto">
              专为现代前端开发打造，让你专注于业务逻辑而非配置
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {[
              { icon: <ThunderboltOutlined />, title: '极速构建', desc: 'Vite 6 提供毫秒级热更新，开发体验丝般顺滑', color: 'blue' },
              { icon: <SafetyOutlined />, title: '类型安全', desc: 'TypeScript 5 全栈类型支持，告别运行时错误', color: 'cyan' },
              { icon: <BgColorsOutlined />, title: '原子化 CSS', desc: 'Tailwind CSS 快速构建现代化 UI，代码更简洁', color: 'purple' },
              { icon: <CodeOutlined />, title: '组件丰富', desc: 'Ant Design 企业级组件库，开箱即用', color: 'green' },
              { icon: <CloudOutlined />, title: '自动部署', desc: 'GitHub Actions CI/CD，自动测试与部署', color: 'orange' },
              { icon: <GithubOutlined />, title: '开源免费', desc: 'MIT 许可证，自由使用和修改', color: 'pink' },
            ].map((feature, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card 
                  className="!bg-slate-800/50 !border-slate-700 hover:!border-blue-500/50 hover:!bg-slate-800 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-5`}>
                    <span className={`text-3xl text-${feature.color}-400`}>{feature.icon}</span>
                  </div>
                  <Title level={4} className="!text-white !mb-3">{feature.title}</Title>
                  <Paragraph className="!text-slate-400 !mb-0">{feature.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Window Size Demo */}
      <div className="bg-slate-950 py-20">
        <div className="container mx-auto px-6">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Card className="!bg-gradient-to-br !from-slate-800 !to-slate-900 !border-slate-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="relative">
                  <Title level={4} className="!text-white !mb-6 flex items-center gap-3">
                    <span className="text-2xl">📐</span> 窗口大小监测
                  </Title>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="bg-slate-700/50 rounded-2xl p-6 text-center backdrop-blur-sm">
                        <div className="text-slate-400 text-sm mb-2">宽度</div>
                        <div className="text-4xl font-bold text-blue-400">{width}</div>
                        <div className="text-slate-500 text-sm mt-1">pixels</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="bg-slate-700/50 rounded-2xl p-6 text-center backdrop-blur-sm">
                        <div className="text-slate-400 text-sm mb-2">高度</div>
                        <div className="text-4xl font-bold text-purple-400">{height}</div>
                        <div className="text-slate-500 text-sm mt-1">pixels</div>
                      </div>
                    </Col>
                  </Row>
                  <Text type="secondary" className="!text-xs !mt-4 block">
                    使用 useWindowSize Hook 实时监测
                  </Text>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Title level={3} className="!text-white !mb-4">响应式设计</Title>
              <Paragraph className="!text-slate-400 !text-lg !mb-6">
                自动适配各种屏幕尺寸，从手机到大屏显示器，提供一致的用户体验。
              </Paragraph>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  移动端优先设计理念
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  自适应布局系统
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  触屏友好的交互
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Title level={2} className="!text-white !text-4xl !mb-6">
              准备好了吗？
            </Title>
            <Paragraph className="!text-xl !text-blue-100 !mb-10">
              立即开始使用，节省 80% 的项目配置时间
            </Paragraph>
            <Space size="large" wrap>
              <Button
                size="large"
                icon={<GithubOutlined />}
                className="!h-14 !px-10 !text-lg !rounded-xl !bg-white !text-blue-600 hover:!bg-slate-100 !border-0"
              >
                GitHub Star
              </Button>
              <Button
                size="large"
                icon={<RocketOutlined />}
                className="!h-14 !px-10 !text-lg !rounded-xl !border-2 !border-white/50 !text-white hover:!bg-white/10"
              >
                立即使用
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <Paragraph className="!mb-4">
              Made with ❤️ by{' '}
              <a href="https://github.com/zyhuliang" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                @zyhuliang
              </a>
            </Paragraph>
            <Text className="!text-slate-500">
              MIT License · React · TypeScript · Vite · Tailwind CSS · Ant Design
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
};
