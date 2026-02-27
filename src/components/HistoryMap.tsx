import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Slider, Button, Card, Typography, Space, Tag, Select, Divider, Modal } from 'antd';
import {
  HistoryOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';

const { Title, Text } = Typography;

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
}> = {
  '现代地图': {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    year: 2024,
    description: '现代标准地图',
  },
  '卫星图': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    year: 2024,
    description: '卫星影像',
  },
  '复古古地图': {
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap &copy; Wikimedia',
    year: 1900,
    description: '复古风格地图',
  },
  '大航海时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1600,
    description: '航海图风格',
  },
  '维多利亚时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1870,
    description: '19世纪地形图',
  },
  '简约古典': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1200,
    description: '古典黑白风格',
  },
};

// 中国历史朝代疆域图（使用维基百科公共图片）
const dynastyMaps: { name: string; range: [number, number]; image: string; description: string }[] = [
  {
    name: '夏商周',
    range: [-2070, -256],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Zhou_Dynasty_1000_BC.png/800px-Zhou_Dynasty_1000_BC.png',
    description: '周朝疆域图（约公元前1000年）'
  },
  {
    name: '秦朝',
    range: [-221, -206],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Qin_Dynasty_210_BC.png/800px-Qin_Dynasty_210_BC.png',
    description: '秦朝疆域图（公元前210年）'
  },
  {
    name: '西汉',
    range: [-206, 8],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Han_Dynasty_100_AD.png/800px-Han_Dynasty_100_AD.png',
    description: '汉朝疆域图（公元100年）'
  },
  {
    name: '东汉三国',
    range: [8, 280],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Three_Kingdoms_260_AD.png/800px-Three_Kingdoms_260_AD.png',
    description: '三国疆域图（公元260年）'
  },
  {
    name: '西晋',
    range: [265, 420],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Jin_Dynasty_280_AD.png/800px-Jin_Dynasty_280_AD.png',
    description: '西晋疆域图（公元280年）'
  },
  {
    name: '隋朝',
    range: [581, 618],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sui_Dynasty_600_AD.png/800px-Sui_Dynasty_600_AD.png',
    description: '隋朝疆域图（公元600年）'
  },
  {
    name: '唐朝',
    range: [618, 907],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Tang_Dynasty_669_AD.png/800px-Tang_Dynasty_669_AD.png',
    description: '唐朝疆域图（公元669年）'
  },
  {
    name: '北宋',
    range: [960, 1127],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Song_Dynasty_1000_AD.png/800px-Song_Dynasty_1000_AD.png',
    description: '北宋疆域图（公元1000年）'
  },
  {
    name: '南宋',
    range: [1127, 1279],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Song_Dynasty_1142_AD.png/800px-Song_Dynasty_1142_AD.png',
    description: '南宋疆域图（公元1142年）'
  },
  {
    name: '元朝',
    range: [1271, 1368],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Yuan_Dynasty_1294.png/800px-Yuan_Dynasty_1294.png',
    description: '元朝疆域图（公元1294年）'
  },
  {
    name: '明朝',
    range: [1368, 1644],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Ming_Dynasty_1580.png/800px-Ming_Dynasty_1580.png',
    description: '明朝疆域图（公元1580年）'
  },
  {
    name: '清朝',
    range: [1644, 1912],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Qing_Dynasty_1820.png/800px-Qing_Dynasty_1820.png',
    description: '清朝疆域图（公元1820年）'
  },
];

// 历史事件标记
const historicalMarkers = [
  // 中国历史
  { lat: 34.2667, lng: 108.9500, year: -1046, event: '武王伐纣', description: '周武王灭商建周', region: '中国', icon: '⚔️' },
  { lat: 34.3416, lng: 108.9398, year: -221, event: '秦始皇统一', description: '秦灭六国，统一天下', region: '中国', icon: '🐉' },
  { lat: 34.2833, lng: 108.9500, year: -202, event: '楚汉争霸', description: '刘邦项羽争夺天下', region: '中国', icon: '⚔️' },
  { lat: 34.7500, lng: 113.6500, year: 200, event: '官渡之战', description: '曹操击败袁绍', region: '中国', icon: '⚔️' },
  { lat: 30.5500, lng: 111.9500, year: 208, event: '赤壁之战', description: '孙刘联军大败曹操', region: '中国', icon: '🔥' },
  { lat: 34.2667, lng: 108.9500, year: 618, event: '唐朝建立', description: '李渊称帝', region: '中国', icon: '🐉' },
  { lat: 34.2667, lng: 108.9500, year: 755, event: '安史之乱', description: '安禄山起兵反唐', region: '中国', icon: '💥' },
  { lat: 39.9042, lng: 116.4074, year: 1420, event: '迁都北京', description: '明成祖建造紫禁城', region: '中国', icon: '🏯' },
  { lat: 39.9042, lng: 116.4074, year: 1644, event: '清军入关', description: '明朝灭亡', region: '中国', icon: '🐴' },
  { lat: 39.9042, lng: 116.4074, year: 1911, event: '辛亥革命', description: '推翻帝制', region: '中国', icon: '🎉' },
  { lat: 39.9042, lng: 116.4074, year: 1949, event: '新中国成立', description: '中华人民共和国成立', region: '中国', icon: '🇨🇳' },
];

// 时代配置
const eras = [
  { name: '夏商周', range: [-2070, -256], color: '#8b5cf6' },
  { name: '秦汉', range: [-256, 220], color: '#f59e0b' },
  { name: '魏晋南北朝', range: [220, 581], color: '#6b7280' },
  { name: '隋唐', range: [581, 907], color: '#ef4444' },
  { name: '宋元', range: [907, 1368], color: '#10b981' },
  { name: '明清', range: [1368, 1912], color: '#3b82f6' },
  { name: '近现代', range: [1912, 2024], color: '#ec4899' },
];

function getEra(year: number) {
  for (const era of eras) {
    if (year >= era.range[0] && year < era.range[1]) return era;
  }
  return eras[0];
}

function getDynastyMap(year: number) {
  for (const dynasty of dynastyMaps) {
    if (year >= dynasty.range[0] && year <= dynasty.range[1]) {
      return dynasty;
    }
  }
  return null;
}

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
  const [showDynastyMap] = useState(true);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const layer = historicalLayers[currentLayer];
  const era = getEra(year);
  const dynastyMap = getDynastyMap(year);
  const visibleMarkers = historicalMarkers.filter((m) => Math.abs(m.year - year) < 100);

  const quickYears = [
    { label: '商周', year: -1000 },
    { label: '秦汉', year: -100 },
    { label: '隋唐', year: 650 },
    { label: '宋元', year: 1100 },
    { label: '明清', year: 1600 },
    { label: '近代', year: 1900 },
  ];

  return (
    <div className="relative h-[calc(100vh-64px)] bg-slate-900">
      {/* 地图 */}
      <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full" zoomControl={false}>
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer attribution={layer.attribution} url={layer.url} key={currentLayer} />
        {visibleMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="p-2 min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{marker.icon}</span>
                  <Title level={5} className="!mb-0">{marker.event}</Title>
                </div>
                <Space size={4}>
                  <Tag color="blue">{marker.year < 0 ? `前${Math.abs(marker.year)}年` : `${marker.year}年`}</Tag>
                  <Tag>{marker.region}</Tag>
                </Space>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 顶部信息栏 */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-start pointer-events-none">
        {/* 左侧：时代信息 */}
        <Card size="small" className="!bg-slate-900/95 !border-slate-700 backdrop-blur pointer-events-auto">
          <div className="flex items-center gap-3">
            <HistoryOutlined style={{ color: era.color, fontSize: 24 }} />
            <div>
              <div className="font-bold text-white text-lg">{era.name}</div>
              <div className="text-xs text-slate-400">{era.range[0]} - {era.range[1]}</div>
            </div>
          </div>
        </Card>

        {/* 右侧：地图样式 */}
        <Card size="small" className="!bg-slate-900/95 !border-slate-700 backdrop-blur pointer-events-auto min-w-[160px]">
          <div className="flex items-center gap-2 mb-2">
            <CompassOutlined className="text-blue-400" />
            <Text className="!text-white !font-medium">地图样式</Text>
          </div>
          <Select
            value={currentLayer}
            onChange={setCurrentLayer}
            className="w-full"
            size="small"
            options={Object.keys(historicalLayers).map((name) => ({
              value: name,
              label: name,
            }))}
          />
        </Card>
      </div>

      {/* 历史疆域图浮动窗口 */}
      {dynastyMap && showDynastyMap && (
        <Card 
          size="small"
          className="absolute top-20 left-4 z-[1000] !bg-slate-900/95 !border-slate-700 backdrop-blur pointer-events-auto w-[280px]"
          title={
            <div className="flex items-center gap-2">
              <PictureOutlined className="text-blue-400" />
              <span className="text-white">{dynastyMap.name}疆域图</span>
            </div>
          }
          extra={
            <Button size="small" type="link" onClick={() => setMapModalOpen(true)}>
              放大
            </Button>
          }
        >
          <img 
            src={dynastyMap.image} 
            alt={dynastyMap.description}
            className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setMapModalOpen(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <Text className="!text-slate-400 !text-xs block mt-2">{dynastyMap.description}</Text>
        </Card>
      )}

      {/* 底部：时间控制面板 */}
      <Card 
        className="absolute bottom-4 left-4 right-4 z-[1000] !bg-slate-900/95 !border-slate-700 backdrop-blur"
      >
        {/* 年份和快捷按钮 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <ClockCircleOutlined className="text-2xl text-blue-400" />
            <Title level={3} className="!mb-0 !text-white">
              {year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`}
            </Title>
            <Tag color={era.color} className="!text-base !px-3">{era.name}</Tag>
            {dynastyMap && (
              <Tag color="blue" className="!text-base !px-3">{dynastyMap.name}</Tag>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {quickYears.map((item) => (
              <Button
                key={item.year}
                size="small"
                type={Math.abs(year - item.year) < 100 ? 'primary' : 'default'}
                onClick={() => setYear(item.year)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 时间滑块 */}
        <Slider
          min={-2070}
          max={2024}
          value={year}
          onChange={setYear}
          tooltip={{ formatter: (v) => v! < 0 ? `前${Math.abs(v!)}年` : `${v}年` }}
        />

        <div className="flex justify-between text-xs text-slate-500 mt-1 mb-4">
          <span>夏朝</span>
          <span>秦汉</span>
          <span>隋唐</span>
          <span>宋元</span>
          <span>明清</span>
          <span>现代</span>
        </div>

        {/* 附近事件 */}
        {visibleMarkers.length > 0 && (
          <>
            <Divider className="!my-3 !border-slate-700" />
            <div className="flex items-center gap-2 mb-2">
              <EnvironmentOutlined className="text-blue-400" />
              <Text className="!text-slate-400">附近历史事件（点击定位）</Text>
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleMarkers.map((marker, index) => (
                <Button
                  key={index}
                  size="small"
                  onClick={() => {
                    setMapCenter([marker.lat, marker.lng]);
                    setMapZoom(6);
                  }}
                >
                  {marker.icon} {marker.event}
                </Button>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* 疆域图放大弹窗 */}
      <Modal
        open={mapModalOpen}
        onCancel={() => setMapModalOpen(false)}
        footer={null}
        title={dynastyMap?.name + ' 疆域图'}
        width={900}
        centered
      >
        {dynastyMap && (
          <div className="text-center">
            <img 
              src={dynastyMap.image} 
              alt={dynastyMap.description}
              className="max-w-full rounded-lg"
            />
            <Text className="!text-slate-400 block mt-4">{dynastyMap.description}</Text>
            <Text className="!text-slate-500 !text-xs block mt-2">
              图片来源：Wikipedia Commons
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
};
