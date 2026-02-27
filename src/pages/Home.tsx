import { Button, Card, Col, Row, Typography, Space, Divider } from 'antd';
import { GithubOutlined, RocketOutlined, BookOutlined, ThunderboltOutlined, SafetyOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useWindowSize } from '../hooks/useWindowSize';

const { Title, Paragraph, Text } = Typography;

export const Home = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm text-blue-300 font-medium">现代化前端开发模板</span>
            </div>

            <Title level={1} className="!text-white !text-5xl sm:!text-6xl lg:!text-7xl !mb-6 !leading-tight">
              Modern Frontend
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Template
              </span>
            </Title>

            <Paragraph className="!text-xl sm:!text-2xl !text-slate-300 !mb-12 max-w-2xl mx-auto">
              React 18 · TypeScript 5 · Vite 6 · Tailwind CSS · Ant Design
            </Paragraph>

            <Space size="large">
              <Button type="primary" size="large" icon={<RocketOutlined />} className="!h-12 !px-8">
                快速开始
              </Button>
              <Button size="large" icon={<BookOutlined />} className="!h-12 !px-8 !border-slate-600 !text-slate-300 hover:!border-blue-500 hover:!text-blue-400">
                查看文档
              </Button>
            </Space>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Row gutter={[24, 24]} justify="center">
            {[
              { label: 'React', value: '18+', color: '#3b82f6' },
              { label: 'TypeScript', value: '5+', color: '#06b6d4' },
              { label: 'Vite', value: '6+', color: '#8b5cf6' },
              { label: '构建速度', value: '100x', color: '#10b981' },
            ].map((stat, index) => (
              <Col key={index} xs={12} sm={6}>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-950 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="!text-white !text-3xl sm:!text-4xl !mb-4">
              核心特性
            </Title>
            <Paragraph className="!text-lg !text-slate-400">
              专为现代前端开发打造的完整解决方案
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={8}>
              <Card
                className="!bg-gradient-to-br !from-blue-500/10 !to-blue-500/5 !border-blue-500/20 hover:!border-blue-500/40 transition-all duration-300"
              >
                <ThunderboltOutlined className="text-4xl text-blue-400 mb-4" />
                <Title level={4} className="!text-white !mb-3">极速构建</Title>
                <Paragraph className="!text-slate-400 !mb-0">
                  Vite 6 提供毫秒级热更新，开发体验丝般顺滑
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                className="!bg-gradient-to-br !from-cyan-500/10 !to-cyan-500/5 !border-cyan-500/20 hover:!border-cyan-500/40 transition-all duration-300"
              >
                <SafetyOutlined className="text-4xl text-cyan-400 mb-4" />
                <Title level={4} className="!text-white !mb-3">类型安全</Title>
                <Paragraph className="!text-slate-400 !mb-0">
                  TypeScript 5 全栈类型支持，告别运行时错误
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                className="!bg-gradient-to-br !from-indigo-500/10 !to-indigo-500/5 !border-indigo-500/20 hover:!border-indigo-500/40 transition-all duration-300"
              >
                <BgColorsOutlined className="text-4xl text-indigo-400 mb-4" />
                <Title level={4} className="!text-white !mb-3">原子化 CSS</Title>
                <Paragraph className="!text-slate-400 !mb-0">
                  Tailwind CSS 快速构建现代化 UI，代码更简洁
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-slate-950 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title level={2} className="!text-white !text-3xl sm:!text-4xl !mb-4">
              组件演示
            </Title>
            <Paragraph className="!text-lg !text-slate-400">
              实时展示模板中的核心组件
            </Paragraph>
          </div>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="text-xl">📐</span>
                    </div>
                    <div>
                      <div className="font-bold">窗口大小</div>
                      <div className="text-sm text-slate-400">使用 useWindowSize Hook</div>
                    </div>
                  </div>
                }
                className="!bg-slate-900 !border-slate-800"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="bg-slate-800 rounded-xl p-4 text-center">
                      <div className="text-sm text-slate-400 mb-1">宽度</div>
                      <div className="text-2xl font-bold text-white">{width}</div>
                      <div className="text-xs text-slate-500 mt-1">px</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="bg-slate-800 rounded-xl p-4 text-center">
                      <div className="text-sm text-slate-400 mb-1">高度</div>
                      <div className="text-2xl font-bold text-white">{height}</div>
                      <div className="text-xs text-slate-500 mt-1">px</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <span className="text-xl">🎯</span>
                    </div>
                    <div>
                      <div className="font-bold">按钮组件</div>
                      <div className="text-sm text-slate-400">多种样式与尺寸</div>
                    </div>
                  </div>
                }
                className="!bg-slate-900 !border-slate-800"
              >
                <div className="space-y-4">
                  <div>
                    <Text type="secondary" className="!text-xs">Primary</Text>
                    <div className="mt-2">
                      <Space>
                        <Button type="primary" size="small">Small</Button>
                        <Button type="primary" size="middle">Medium</Button>
                        <Button type="primary" size="large">Large</Button>
                      </Space>
                    </div>
                  </div>
                  <Divider className="!my-3 !border-slate-700" />
                  <div>
                    <Text type="secondary" className="!text-xs">Default</Text>
                    <div className="mt-2">
                      <Space>
                        <Button size="small">Small</Button>
                        <Button size="middle">Medium</Button>
                        <Button size="large">Large</Button>
                      </Space>
                    </div>
                  </div>
                  <Divider className="!my-3 !border-slate-700" />
                  <div>
                    <Text type="secondary" className="!text-xs">Dashed</Text>
                    <div className="mt-2">
                      <Space>
                        <Button type="dashed" size="small">Small</Button>
                        <Button type="dashed" size="middle">Medium</Button>
                        <Button type="dashed" size="large">Large</Button>
                      </Space>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Title level={2} className="!text-white !text-3xl sm:!text-4xl !mb-4">
              开始构建你的项目
            </Title>
            <Paragraph className="!text-lg !text-blue-100 !mb-8">
              立即使用这个模板，节省 80% 的配置时间
            </Paragraph>
            <Button
              size="large"
              icon={<GithubOutlined />}
              className="!h-12 !px-8 !bg-white !text-blue-600 hover:!bg-slate-100 !border-0"
            >
              在 GitHub 上 Star
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400">
            <Paragraph className="!mb-2">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/zyhuliang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                @zyhuliang
              </a>
            </Paragraph>
            <Text className="!text-sm !text-slate-500">
              MIT License · Built with React + TypeScript + Vite + Tailwind CSS + Ant Design
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
};
