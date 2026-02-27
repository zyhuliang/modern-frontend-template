import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Slider, Button, Card, Typography, Space, Tag, Switch, Select, Badge } from 'antd';
import {
  GlobalOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';

const { Title, Text, Paragraph } = Typography;

// 修复 Leaflet 默认图标问题
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
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
  '现代卫星图': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    year: 2024,
    description: '高精度卫星影像',
    category: '现代',
  },
  '地形图': {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors, SRTM',
    year: 2024,
    description: '地形地貌图',
    category: '现代',
  },
  '大航海时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1600,
    description: '地理大发现时期',
    category: '大航海',
  },
  '维多利亚时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1870,
    description: '大英帝国鼎盛期',
    category: '19世纪',
  },
  '中世纪风格': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1200,
    description: '十字军东征时代',
    category: '中世纪',
  },
};

// 历史事件标记
const historicalMarkers = [
  { lat: 39.9042, lng: 116.4074, year: 1420, event: '明朝迁都北京', description: '明成祖朱棣迁都北京，建造紫禁城', region: '中国' },
  { lat: 34.3416, lng: 108.9398, year: -202, event: '汉朝建立', description: '刘邦建立汉朝，定都长安', region: '中国' },
  { lat: 30.0444, lng: 31.2357, year: -2560, event: '金字塔建造', description: '吉萨金字塔建造完成', region: '埃及' },
  { lat: 41.9029, lng: 12.4534, year: 753, event: '罗马建城', description: '传说中罗慕路斯建立罗马城', region: '欧洲' },
  { lat: 37.9838, lng: 23.7275, year: -508, event: '雅典民主', description: '雅典建立民主制度', region: '希腊' },
  { lat: 48.8566, lng: 2.3522, year: 1789, event: '法国大革命', description: '攻占巴士底狱，法国大革命爆发', region: '欧洲' },
  { lat: 40.7128, lng: -74.0060, year: 1492, event: '发现美洲', description: '哥伦布到达美洲', region: '美洲' },
  { lat: 35.6892, lng: 51.3890, year: -550, event: '波斯帝国', description: '居鲁士大帝建立波斯帝国', region: '波斯' },
  { lat: 27.1751, lng: 78.0421, year: 1653, event: '泰姬陵建成', description: '莫卧儿帝国建造泰姬陵', region: '印度' },
  { lat: 19.4326, lng: -99.1332, year: 1521, event: '阿兹特克灭亡', description: '西班牙征服阿兹特克帝国', region: '美洲' },
];

// 获取时代信息
function getEra(year: number) {
  if (year >= 1945) return { name: '当代', color: 'blue', description: '二战后世界秩序建立' };
  if (year >= 1800) return { name: '工业革命', color: 'orange', description: '蒸汽机、铁路、工业化' };
  if (year >= 1600) return { name: '启蒙时代', color: 'purple', description: '科学革命、启蒙运动' };
  if (year >= 1453) return { name: '文艺复兴', color: 'green', description: '文艺复兴、大航海' };
  if (year >= 500) return { name: '中世纪', color: 'default', description: '封建制度、十字军' };
  if (year >= 0) return { name: '古典时代', color: 'gold', description: '罗马帝国、汉朝' };
  if (year >= -500) return { name: '古典希腊', color: 'cyan', description: '雅典民主、波斯战争' };
  return { name: '青铜时代', color: 'magenta', description: '古代文明兴起' };
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
  const [showMarkers, setShowMarkers] = useState(true);

  const layer = historicalLayers[currentLayer];
  const era = getEra(year);
  const visibleMarkers = showMarkers
    ? historicalMarkers.filter((m) => Math.abs(m.year - year) < 300)
    : [];

  const handleSelectMarker = (marker: typeof historicalMarkers[0]) => {
    setMapCenter([marker.lat, marker.lng]);
    setMapZoom(6);
  };

  return (
    <div className="relative h-[calc(100vh-56px)]">
      {/* 地图 */}
      <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full" zoomControl={false}>
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer attribution={layer.attribution} url={layer.url} key={currentLayer} />
        {visibleMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="p-2 min-w-[200px]">
                <Title level={5} className="!mb-2">{marker.event}</Title>
                <Tag color="blue">{marker.year < 0 ? `前${Math.abs(marker.year)}年` : `${marker.year}年`}</Tag>
                <Tag>{marker.region}</Tag>
                <Paragraph className="!mt-2 !mb-0 !text-gray-600">{marker.description}</Paragraph>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 顶部提示 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
        <Card size="small" className="!bg-slate-900/90 !border-slate-700">
          <Space>
            <GlobalOutlined className="text-blue-400" />
            <Text className="!text-slate-300">拖动底部滑块浏览历史 · 点击标记查看详情</Text>
          </Space>
        </Card>
      </div>

      {/* 图层选择 */}
      <div className="absolute top-16 right-4 z-[1000]">
        <Card size="small" title={<Text className="!text-white">地图样式</Text>} className="!bg-slate-900/90 !border-slate-700 min-w-[200px]">
          <Select
            value={currentLayer}
            onChange={setCurrentLayer}
            className="w-full"
            options={Object.entries(historicalLayers).map(([name, config]) => ({
              value: name,
              label: (
                <div>
                  <div>{name}</div>
                  <Text type="secondary" className="!text-xs">{config.description}</Text>
                </div>
              ),
            }))}
          />
        </Card>
      </div>

      {/* 左侧信息面板 */}
      <div className="absolute top-16 left-4 z-[1000]">
        <Card size="small" className="!bg-slate-900/90 !border-slate-700 min-w-[220px]">
          <Space direction="vertical" className="w-full">
            <div className="flex items-center gap-2">
              <HistoryOutlined className="text-blue-400" />
              <Text strong className="!text-white">当前时代</Text>
            </div>
            <Tag color={era.color} className="!text-base !px-3 !py-1">{era.name}</Tag>
            <Text type="secondary">{era.description}</Text>
            <div className="flex items-center justify-between">
              <Text className="!text-slate-300">历史标记</Text>
              <Switch checked={showMarkers} onChange={setShowMarkers} />
            </div>
          </Space>
        </Card>
      </div>

      {/* 附近事件 */}
      {visibleMarkers.length > 0 && (
        <div className="absolute top-64 left-4 z-[1000]">
          <Card size="small" title={<Text className="!text-white">📍 附近事件</Text>} className="!bg-slate-900/90 !border-slate-700 max-h-[250px] overflow-y-auto min-w-[200px]">
            <Space direction="vertical" className="w-full">
              {visibleMarkers.map((marker, index) => (
                <Button
                  key={index}
                  type="text"
                  block
                  onClick={() => handleSelectMarker(marker)}
                  className="!text-left !justify-start !h-auto !py-2"
                >
                  <div>
                    <div className="font-medium">{marker.event}</div>
                    <Text type="secondary" className="!text-xs">
                      {marker.year < 0 ? `前${Math.abs(marker.year)}年` : `${marker.year}年`} · {marker.region}
                    </Text>
                  </div>
                </Button>
              ))}
            </Space>
          </Card>
        </div>
      )}

      {/* 时间滑块 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-2xl">
        <Card className="!bg-slate-900/95 !border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <Space>
              <Badge color="blue" />
              <Title level={4} className="!mb-0">
                {year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`}
              </Title>
              <Tag color={era.color}>{era.name}</Tag>
            </Space>
            <Space>
              {[-500, 0, 1000, 1500, 1800, 2024].map((y) => (
                <Button
                  key={y}
                  size="small"
                  type={Math.abs(year - y) < 50 ? 'primary' : 'default'}
                  onClick={() => setYear(y)}
                >
                  {y < 0 ? `前${Math.abs(y)}` : y}
                </Button>
              ))}
            </Space>
          </div>

          <Slider
            min={-3000}
            max={2024}
            value={year}
            onChange={setYear}
            tooltip={{ formatter: (v) => (v! < 0 ? `前${Math.abs(v!)}年` : `${v}年`) }}
          />

          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>前3000年</span>
            <span>前1000年</span>
            <span>公元元年</span>
            <span>1000年</span>
            <span>2024年</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
