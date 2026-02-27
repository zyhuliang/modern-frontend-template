import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Slider, Button, Card, Typography, Space, Tag, Select, Tooltip, Drawer, List, Divider, Alert } from 'antd';
import {
  HistoryOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';

const { Title, Text, Paragraph } = Typography;

// 修复 Leaflet 默认图标问题
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// 历史地图图层配置
const historicalLayers: Record<string, {
  url: string;
  attribution: string;
  year: number;
  description: string;
  category: string;
}> = {
  '现代地图': {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    year: 2024,
    description: '现代标准地图',
    category: '现代',
  },
  '卫星图': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    year: 2024,
    description: '卫星影像',
    category: '现代',
  },
  '大航海时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1600,
    description: '复古航海风格',
    category: '历史',
  },
  '维多利亚时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1870,
    description: '19世纪地形图',
    category: '历史',
  },
  '中世纪风格': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1200,
    description: '简约黑白风格',
    category: '历史',
  },
};

// 历史事件标记
const historicalMarkers = [
  { lat: 39.9042, lng: 116.4074, year: 1420, event: '明朝迁都北京', description: '明成祖朱棣迁都北京，建造紫禁城', region: '中国', icon: '🏯' },
  { lat: 34.3416, lng: 108.9398, year: -202, event: '汉朝建立', description: '刘邦建立汉朝，定都长安', region: '中国', icon: '👑' },
  { lat: 30.0444, lng: 31.2357, year: -2560, event: '金字塔建造', description: '吉萨金字塔建造完成', region: '埃及', icon: '🏛️' },
  { lat: 41.9029, lng: 12.4534, year: 753, event: '罗马建城', description: '传说中罗慕路斯建立罗马城', region: '欧洲', icon: '🏛️' },
  { lat: 37.9838, lng: 23.7275, year: -508, event: '雅典民主', description: '雅典建立民主制度', region: '希腊', icon: '⚖️' },
  { lat: 48.8566, lng: 2.3522, year: 1789, event: '法国大革命', description: '攻占巴士底狱', region: '欧洲', icon: '🗽' },
  { lat: 40.7128, lng: -74.0060, year: 1492, event: '发现美洲', description: '哥伦布到达美洲', region: '美洲', icon: '🚢' },
  { lat: 35.6892, lng: 51.3890, year: -550, event: '波斯帝国', description: '居鲁士大帝建立波斯帝国', region: '波斯', icon: '🏰' },
  { lat: 27.1751, lng: 78.0421, year: 1653, event: '泰姬陵建成', description: '莫卧儿帝国建造泰姬陵', region: '印度', icon: '🕌' },
  { lat: 19.4326, lng: -99.1332, year: 1521, event: '阿兹特克灭亡', description: '西班牙征服阿兹特克帝国', region: '美洲', icon: '⚔️' },
];

// 时代配置
const eras = [
  { name: '青铜时代', range: [-3000, -1000], color: '#06b6d4' },
  { name: '古典时代', range: [-1000, 500], color: '#f59e0b' },
  { name: '中世纪', range: [500, 1450], color: '#6b7280' },
  { name: '文艺复兴', range: [1450, 1600], color: '#10b981' },
  { name: '大航海时代', range: [1600, 1800], color: '#8b5cf6' },
  { name: '工业革命', range: [1800, 1900], color: '#f97316' },
  { name: '现代', range: [1900, 2024], color: '#3b82f6' },
];

// 获取时代信息
function getEra(year: number) {
  for (const era of eras) {
    if (year >= era.range[0] && year < era.range[1]) {
      return era;
    }
  }
  return eras[0];
}

// 地图控制器
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1 });
  }, [center, zoom, map]);
  return null;
}

export const HistoryMap = () => {
  const [year, setYear] = useState(1800);
  const [currentLayer, setCurrentLayer] = useState('现代地图');
  const [mapCenter, setMapCenter] = useState<[number, number]>([35, 105]);
  const [mapZoom, setMapZoom] = useState(4);
  const [showHelp, setShowHelp] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const layer = historicalLayers[currentLayer];
  const era = getEra(year);
  const visibleMarkers = historicalMarkers.filter((m) => Math.abs(m.year - year) < 300);

  const handleSelectMarker = (marker: typeof historicalMarkers[0]) => {
    setMapCenter([marker.lat, marker.lng]);
    setMapZoom(6);
    setDrawerOpen(false);
  };

  // 快捷年份
  const quickYears = [
    { label: '古埃及', year: -2500 },
    { label: '古希腊', year: -400 },
    { label: '罗马帝国', year: 100 },
    { label: '唐朝', year: 700 },
    { label: '蒙古帝国', year: 1250 },
    { label: '大航海', year: 1500 },
    { label: '工业革命', year: 1850 },
    { label: '现代', year: 2000 },
  ];

  return (
    <div className="relative h-[calc(100vh-56px)] bg-slate-900">
      {/* 帮助提示 */}
      {showHelp && (
        <Alert
          message={
            <div className="flex items-center gap-2">
              <QuestionCircleOutlined />
              <span>拖动下方滑块穿越时空 · 点击地图上的标记查看历史事件 · 右下角切换地图样式</span>
            </div>
          }
          type="info"
          showIcon={false}
          closable
          onClose={() => setShowHelp(false)}
          className="!absolute top-4 left-1/2 -translate-x-1/2 z-[1000] !rounded-xl !bg-blue-600/90 !border-blue-500 !text-white max-w-xl"
        />
      )}

      {/* 地图 */}
      <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full" zoomControl={false}>
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer attribution={layer.attribution} url={layer.url} key={currentLayer} />
        {visibleMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="p-2 min-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{marker.icon}</span>
                  <Title level={5} className="!mb-0">{marker.event}</Title>
                </div>
                <Space className="mb-2">
                  <Tag color="blue">{marker.year < 0 ? `前${Math.abs(marker.year)}年` : `${marker.year}年`}</Tag>
                  <Tag>{marker.region}</Tag>
                </Space>
                <Paragraph className="!mb-0 !text-gray-600">{marker.description}</Paragraph>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 左侧：当前时代信息 */}
      <Card 
        size="small" 
        className="!absolute !top-4 !left-4 !z-[1000] !bg-slate-900/95 !border-slate-700 !backdrop-blur min-w-[200px]"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${era.color}20` }}>
            <HistoryOutlined style={{ color: era.color, fontSize: 20 }} />
          </div>
          <div>
            <div className="font-bold text-white">{era.name}</div>
            <div className="text-xs text-slate-400">{era.range[0]} - {era.range[1]}</div>
          </div>
        </div>
        <Button 
          type="primary" 
          block 
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          className="!rounded-lg"
        >
          历史事件列表
        </Button>
      </Card>

      {/* 右侧：地图控制 */}
      <Card 
        size="small" 
        className="!absolute !top-4 !right-4 !z-[1000] !bg-slate-900/95 !border-slate-700 !backdrop-blur min-w-[180px]"
      >
        <Space direction="vertical" className="w-full">
          <div className="flex items-center gap-2">
            <CompassOutlined className="text-blue-400" />
            <Text strong className="!text-white">地图样式</Text>
          </div>
          <Select
            value={currentLayer}
            onChange={setCurrentLayer}
            className="w-full"
            optionLabelProp="label"
            options={Object.entries(historicalLayers).map(([name]) => ({
              value: name,
              label: name,
            }))}
          />
          <Divider className="!my-2" />
          <Text type="secondary" className="!text-xs">
            当前样式：{layer.description}
          </Text>
        </Space>
      </Card>

      {/* 底部：时间控制面板 */}
      <Card 
        className="!absolute !bottom-6 !left-1/2 !-translate-x-1/2 !z-[1000] !bg-slate-900/95 !border-slate-700 !backdrop-blur w-[90%] max-w-3xl"
      >
        <div className="mb-6">
          {/* 年份显示 */}
          <div className="flex items-center justify-between mb-4">
            <Space align="center" size="middle">
              <ClockCircleOutlined className="text-2xl text-blue-400" />
              <Title level={2} className="!mb-0 !text-white">
                {year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`}
              </Title>
              <Tag color={era.color} className="!text-base !px-3 !py-1">{era.name}</Tag>
            </Space>
          </div>

          {/* 快捷年份按钮 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickYears.map((item) => (
              <Tooltip key={item.year} title={item.label}>
                <Button
                  size="small"
                  type={Math.abs(year - item.year) < 100 ? 'primary' : 'default'}
                  onClick={() => setYear(item.year)}
                  className="!rounded-lg"
                >
                  {item.label}
                </Button>
              </Tooltip>
            ))}
          </div>

          {/* 时间滑块 */}
          <Slider
            min={-3000}
            max={2024}
            value={year}
            onChange={setYear}
            tooltip={{ 
              formatter: (v) => v! < 0 ? `前${Math.abs(v!)}年` : `${v}年`,
              placement: 'top'
            }}
            className="!mb-2"
          />

          {/* 时间刻度 */}
          <div className="flex justify-between text-xs text-slate-500">
            <span>前3000年</span>
            <span>前1000年</span>
            <span>公元元年</span>
            <span>1000年</span>
            <span>2024年</span>
          </div>
        </div>

        {/* 附近事件 */}
        {visibleMarkers.length > 0 && (
          <div className="pt-4 border-t border-slate-700">
            <Text type="secondary" className="!text-xs !mb-2 block">
              <EnvironmentOutlined className="mr-1" />附近历史事件（点击定位）
            </Text>
            <div className="flex flex-wrap gap-2">
              {visibleMarkers.map((marker, index) => (
                <Button
                  key={index}
                  size="small"
                  icon={<span>{marker.icon}</span>}
                  onClick={() => handleSelectMarker(marker)}
                  className="!rounded-lg"
                >
                  {marker.event}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* 历史事件抽屉 */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <HistoryOutlined className="text-blue-400" />
            <span>历史事件列表</span>
          </div>
        }
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="!bg-slate-900"
      >
        <List
          dataSource={historicalMarkers}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelectMarker(item)}
              className="!cursor-pointer hover:!bg-slate-800 !rounded-lg !px-3"
            >
              <List.Item.Meta
                avatar={<span className="text-2xl">{item.icon}</span>}
                title={<Text className="!text-white">{item.event}</Text>}
                description={
                  <Space>
                    <Tag color="blue">{item.year < 0 ? `前${Math.abs(item.year)}年` : `${item.year}年`}</Tag>
                    <Tag>{item.region}</Tag>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};
