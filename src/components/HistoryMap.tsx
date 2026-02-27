import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Slider, Button, Card, Typography, Space, Tag, Select, Divider } from 'antd';
import {
  HistoryOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CompassOutlined,
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
  '大航海时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1600,
    description: '复古航海风格',
  },
  '维多利亚时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1870,
    description: '19世纪地形图',
  },
  '中世纪风格': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1200,
    description: '简约黑白风格',
  },
};

// 历史事件标记 - 中国历史典故
const historicalMarkers = [
  // 中国历史
  { lat: 34.2667, lng: 108.9500, year: -1046, event: '武王伐纣', description: '周武王灭商建周，牧野之战', region: '中国', icon: '⚔️' },
  { lat: 34.2667, lng: 108.9500, year: -841, event: '国人暴动', description: '国人驱逐周厉王，共和行政', region: '中国', icon: '🔥' },
  { lat: 35.0684, lng: 118.3498, year: -770, event: '平王东迁', description: '周平王迁都洛邑，东周开始', region: '中国', icon: '🏯' },
  { lat: 34.7581, lng: 113.6310, year: -651, event: '葵丘会盟', description: '齐桓公葵丘会盟，称霸中原', region: '中国', icon: '👑' },
  { lat: 35.4158, lng: 116.5819, year: -551, event: '孔子诞生', description: '孔子诞生于鲁国陬邑', region: '中国', icon: '📚' },
  { lat: 35.0833, lng: 118.3667, year: -497, event: '勾践卧薪尝胆', description: '越王勾践卧薪尝胆，复国灭吴', region: '中国', icon: '💪' },
  { lat: 34.3416, lng: 108.9398, year: -221, event: '秦始皇统一', description: '秦灭六国，统一天下', region: '中国', icon: '🐉' },
  { lat: 40.2157, lng: 111.7244, year: -210, event: '孟姜女哭长城', description: '孟姜女千里寻夫，哭倒长城', region: '中国', icon: '😢' },
  { lat: 34.2583, lng: 108.9286, year: -206, event: '鸿门宴', description: '项羽刘邦鸿门赴宴，暗藏杀机', region: '中国', icon: '🗡️' },
  { lat: 34.2833, lng: 108.9500, year: -202, event: '楚汉争霸', description: '刘邦项羽争夺天下，垓下之战', region: '中国', icon: '⚔️' },
  { lat: 35.5667, lng: 113.8500, year: -200, event: '白登之围', description: '汉高祖刘邦被匈奴围困白登', region: '中国', icon: '🏹' },
  { lat: 34.7500, lng: 113.6500, year: -119, event: '张骞通西域', description: '张骞出使西域，开辟丝绸之路', region: '中国', icon: '🐪' },
  { lat: 35.0833, lng: 111.0667, year: -104, event: '司马迁写史记', description: '司马迁忍辱负重，撰写《史记》', region: '中国', icon: '📖' },
  { lat: 34.2667, lng: 108.9500, year: 8, event: '王莽篡汉', description: '王莽篡位建立新朝', region: '中国', icon: '👑' },
  { lat: 34.7500, lng: 113.6500, year: 200, event: '官渡之战', description: '曹操以少胜多，击败袁绍', region: '中国', icon: '⚔️' },
  { lat: 30.5500, lng: 111.9500, year: 208, event: '赤壁之战', description: '孙刘联军火烧赤壁，大败曹操', region: '中国', icon: '🔥' },
  { lat: 34.7500, lng: 113.6500, year: 220, event: '三国鼎立', description: '魏蜀吴三国分立', region: '中国', icon: '🎭' },
  { lat: 34.2667, lng: 108.9500, year: 265, event: '三家归晋', description: '司马炎篡魏建立晋朝', region: '中国', icon: '🏛️' },
  { lat: 34.2667, lng: 108.9500, year: 316, event: '五胡乱华', description: '匈奴攻破洛阳，西晋灭亡', region: '中国', icon: '💥' },
  { lat: 32.0603, lng: 118.7969, year: 420, event: '南北朝开始', description: '刘裕篡晋，南朝宋建立', region: '中国', icon: '🏛️' },
  { lat: 34.2667, lng: 108.9500, year: 581, event: '隋朝统一', description: '杨坚建立隋朝，结束分裂', region: '中国', icon: '👑' },
  { lat: 34.2667, lng: 113.6500, year: 605, event: '开凿大运河', description: '隋炀帝开凿京杭大运河', region: '中国', icon: '🚢' },
  { lat: 34.2667, lng: 108.9500, year: 618, event: '唐朝建立', description: '李渊称帝，建立唐朝', region: '中国', icon: '🐉' },
  { lat: 34.2667, lng: 108.9500, year: 626, event: '玄武门之变', description: '李世民玄武门诛杀兄弟', region: '中国', icon: '⚔️' },
  { lat: 34.2667, lng: 108.9500, year: 690, event: '武则天称帝', description: '武则天称帝，改国号为周', region: '中国', icon: '👸' },
  { lat: 34.2667, lng: 108.9500, year: 755, event: '安史之乱', description: '安禄山起兵反唐，天下大乱', region: '中国', icon: '💥' },
  { lat: 34.7500, lng: 113.6500, year: 960, event: '陈桥兵变', description: '赵匡胤黄袍加身，建立宋朝', region: '中国', icon: '👑' },
  { lat: 34.7500, lng: 113.6500, year: 1005, event: '澶渊之盟', description: '宋辽议和，结为兄弟之国', region: '中国', icon: '📜' },
  { lat: 35.5500, lng: 116.4667, year: 1127, event: '靖康之耻', description: '金兵攻破汴京，掳走二帝', region: '中国', icon: '😢' },
  { lat: 30.2741, lng: 120.1551, year: 1140, event: '岳飞抗金', description: '岳飞抗金北伐，十二道金牌召回', region: '中国', icon: '🛡️' },
  { lat: 39.9042, lng: 116.4074, year: 1279, event: '崖山之战', description: '元军灭宋，陆秀夫背帝投海', region: '中国', icon: '🌊' },
  { lat: 39.9042, lng: 116.4074, year: 1368, event: '明朝建立', description: '朱元璋建立明朝，驱逐蒙元', region: '中国', icon: '🐉' },
  { lat: 39.9042, lng: 116.4074, year: 1405, event: '郑和下西洋', description: '郑和率船队七下西洋', region: '中国', icon: '⛵' },
  { lat: 39.9042, lng: 116.4074, year: 1420, event: '迁都北京', description: '明成祖迁都北京，建造紫禁城', region: '中国', icon: '🏯' },
  { lat: 39.9042, lng: 116.4074, year: 1644, event: '清军入关', description: '吴三桂引清兵入关，明朝灭亡', region: '中国', icon: '🐴' },
  { lat: 39.9042, lng: 116.4074, year: 1689, event: '尼布楚条约', description: '中俄签订《尼布楚条约》', region: '中国', icon: '📜' },
  { lat: 39.9042, lng: 116.4074, year: 1839, event: '虎门销烟', description: '林则徐虎门销烟', region: '中国', icon: '🔥' },
  { lat: 39.9042, lng: 116.4074, year: 1840, event: '鸦片战争', description: '鸦片战争爆发，中国近代史开始', region: '中国', icon: '💥' },
  { lat: 39.9042, lng: 116.4074, year: 1851, event: '太平天国', description: '洪秀全金田起义', region: '中国', icon: '⚔️' },
  { lat: 39.9042, lng: 116.4074, year: 1894, event: '甲午战争', description: '中日甲午战争，北洋水师覆灭', region: '中国', icon: '🚢' },
  { lat: 39.9042, lng: 116.4074, year: 1898, event: '戊戌变法', description: '康有为梁启超变法维新', region: '中国', icon: '📜' },
  { lat: 39.9042, lng: 116.4074, year: 1900, event: '义和团运动', description: '义和团运动，八国联军侵华', region: '中国', icon: '🔥' },
  { lat: 39.9042, lng: 116.4074, year: 1911, event: '辛亥革命', description: '武昌起义，推翻帝制', region: '中国', icon: '🎉' },
  { lat: 32.0603, lng: 118.7969, year: 1912, event: '中华民国成立', description: '孙中山就任临时大总统', region: '中国', icon: '🏛️' },
  { lat: 39.9042, lng: 116.4074, year: 1919, event: '五四运动', description: '五四爱国运动爆发', region: '中国', icon: '📢' },
  { lat: 39.9042, lng: 116.4074, year: 1937, event: '卢沟桥事变', description: '日军进攻卢沟桥，全面抗战开始', region: '中国', icon: '💥' },
  { lat: 39.9042, lng: 116.4074, year: 1949, event: '新中国成立', description: '毛泽东宣告中华人民共和国成立', region: '中国', icon: '🇨🇳' },
  
  // 世界历史
  { lat: 30.0444, lng: 31.2357, year: -2560, event: '金字塔建造', description: '吉萨金字塔建造完成', region: '埃及', icon: '🏛️' },
  { lat: 37.9838, lng: 23.7275, year: -508, event: '雅典民主', description: '雅典建立民主制度', region: '希腊', icon: '⚖️' },
  { lat: 41.9029, lng: 12.4534, year: 753, event: '罗马建城', description: '传说中罗慕路斯建立罗马城', region: '欧洲', icon: '🏛️' },
  { lat: 48.8566, lng: 2.3522, year: 1789, event: '法国大革命', description: '攻占巴士底狱', region: '欧洲', icon: '🗽' },
  { lat: 40.7128, lng: -74.0060, year: 1492, event: '发现美洲', description: '哥伦布到达美洲', region: '美洲', icon: '🚢' },
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

function getEra(year: number) {
  for (const era of eras) {
    if (year >= era.range[0] && year < era.range[1]) return era;
  }
  return eras[0];
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

  const layer = historicalLayers[currentLayer];
  const era = getEra(year);
  const visibleMarkers = historicalMarkers.filter((m) => Math.abs(m.year - year) < 300);

  const quickYears = [
    { label: '古埃及', year: -2500 },
    { label: '古希腊', year: -400 },
    { label: '罗马帝国', year: 100 },
    { label: '大航海', year: 1500 },
    { label: '工业革命', year: 1850 },
    { label: '现代', year: 2000 },
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
          min={-3000}
          max={2024}
          value={year}
          onChange={setYear}
          tooltip={{ formatter: (v) => v! < 0 ? `前${Math.abs(v!)}年` : `${v}年` }}
        />

        <div className="flex justify-between text-xs text-slate-500 mt-1 mb-4">
          <span>前3000年</span>
          <span>前1000年</span>
          <span>公元元年</span>
          <span>1000年</span>
          <span>2024年</span>
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
    </div>
  );
};
