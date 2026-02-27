import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

// 历史地图图层配置 - 按年代分类
const historicalLayers: Record<string, {
  url: string;
  attribution: string;
  year: number;
  description: string;
  category: string;
}> = {
  // ========== 现代地图 ==========
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
    attribution: '&copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
    year: 2024,
    description: '地形地貌图',
    category: '现代',
  },

  // ========== 20世纪地图 ==========
  '1920年代风格': {
    url: 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 1920,
    description: '战后重建时期',
    category: '20世纪',
  },

  // ========== 19世纪地图 ==========
  '工业革命地图': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 1850,
    description: '工业革命时期',
    category: '19世纪',
  },
  '维多利亚时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1870,
    description: '大英帝国鼎盛期',
    category: '19世纪',
  },

  // ========== 大航海时代 ==========
  '大航海时代': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1600,
    description: '地理大发现时期',
    category: '大航海',
  },
  '航海图': {
    url: 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 1550,
    description: '探险家航海图',
    category: '大航海',
  },

  // ========== 中世纪 ==========
  '中世纪风格': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by Stamen Design',
    year: 1200,
    description: '十字军东征时代',
    category: '中世纪',
  },

  // ========== 古代文明 ==========
  '古罗马风格': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 0,
    description: '罗马帝国时期',
    category: '古代',
  },
};

// 历史事件标记数据
const historicalMarkers = [
  // 中国历史
  { lat: 39.9042, lng: 116.4074, year: 1420, event: '明朝迁都北京', description: '明成祖朱棣迁都北京，建造紫禁城', region: '中国' },
  { lat: 34.3416, lng: 108.9398, year: -202, event: '汉朝建立', description: '刘邦建立汉朝，定都长安', region: '中国' },
  { lat: 30.0444, lng: 31.2357, year: -2560, event: '金字塔建造', description: '吉萨金字塔建造完成', region: '埃及' },
  { lat: 41.9029, lng: 12.4534, year: 753, event: '罗马建城', description: '传说中罗慕路斯建立罗马城', region: '欧洲' },
  { lat: 37.9838, lng: 23.7275, year: -508, event: '雅典民主', description: '雅典建立民主制度', region: '希腊' },
  { lat: 48.8566, lng: 2.3522, year: 1789, event: '法国大革命', description: '攻占巴士底狱，法国大革命爆发', region: '欧洲' },
  { lat: 40.7128, lng: -74.0060, year: 1492, event: '发现美洲', description: '哥伦布到达美洲', region: '美洲' },
  { lat: 35.6892, lng: 51.3890, year: -550, event: '波斯帝国', description: '居鲁士大帝建立波斯帝国', region: '波斯' },
  { lat: 27.1751, lng: 78.0421, year: 1653, event: '泰姬陵建成', description: '莫卧儿帝国建造泰姬陵', region: '印度' },
  { lat: 29.9792, lng: 31.1342, year: -2560, event: '大金字塔', description: '胡夫金字塔建造', region: '埃及' },
  { lat: 25.0380, lng: 121.5645, year: 1949, event: '台湾', description: '中华民国政府迁台', region: '中国' },
  { lat: 19.4326, lng: -99.1332, year: 1521, event: '阿兹特克灭亡', description: '西班牙征服阿兹特克帝国', region: '美洲' },
];

// 历史事件时间线
const timelineEvents = [
  { year: -3000, event: '古代文明兴起', era: '青铜时代' },
  { year: -2560, event: '金字塔建造', era: '古埃及' },
  { year: -776, event: '首届奥运会', era: '古希腊' },
  { year: -508, event: '雅典民主', era: '古希腊' },
  { year: -221, event: '秦始皇统一中国', era: '秦朝' },
  { year: -27, event: '罗马帝国建立', era: '古罗马' },
  { year: 476, event: '西罗马灭亡', era: '中世纪' },
  { year: 622, event: '伊斯兰教创立', era: '阿拉伯' },
  { year: 800, event: '查理曼加冕', era: '中世纪' },
  { year: 1066, event: '诺曼征服', era: '中世纪' },
  { year: 1206, event: '蒙古帝国建立', era: '蒙古' },
  { year: 1271, event: '元朝建立', era: '中国' },
  { year: 1453, event: '君士坦丁堡陷落', era: '中世纪' },
  { year: 1492, event: '发现美洲', era: '大航海' },
  { year: 1517, event: '宗教改革', era: '欧洲' },
  { year: 1776, event: '美国独立', era: '现代' },
  { year: 1789, event: '法国大革命', era: '现代' },
  { year: 1804, event: '拿破仑加冕', era: '现代' },
  { year: 1840, event: '鸦片战争', era: '中国' },
  { year: 1914, event: '一战爆发', era: '现代' },
  { year: 1945, event: '二战结束', era: '现代' },
  { year: 1949, event: '新中国成立', era: '现代' },
];

// 获取时代信息
function getEra(year: number) {
  if (year >= 1945) return { name: '当代', color: 'from-blue-500 to-cyan-500', description: '二战后世界秩序建立，冷战与全球化' };
  if (year >= 1914) return { name: '世界大战时期', color: 'from-red-500 to-orange-500', description: '两次世界大战，世界格局剧变' };
  if (year >= 1800) return { name: '工业革命时代', color: 'from-amber-500 to-yellow-500', description: '蒸汽机、铁路、工业化快速发展' };
  if (year >= 1600) return { name: '启蒙时代', color: 'from-purple-500 to-pink-500', description: '科学革命、启蒙运动、理性主义' };
  if (year >= 1453) return { name: '文艺复兴', color: 'from-emerald-500 to-teal-500', description: '文艺复兴、大航海时代开启' };
  if (year >= 1000) return { name: '中世纪', color: 'from-slate-500 to-gray-500', description: '封建制度、十字军东征、蒙古帝国' };
  if (year >= 500) return { name: '中世纪早期', color: 'from-indigo-500 to-purple-500', description: '西罗马帝国灭亡、民族大迁徙' };
  if (year >= 0) return { name: '古典时代', color: 'from-yellow-500 to-amber-500', description: '罗马帝国、汉朝、丝绸之路' };
  if (year >= -500) return { name: '古典希腊时期', color: 'from-blue-500 to-indigo-500', description: '雅典民主、波斯战争、亚历山大征服' };
  if (year >= -1000) return { name: '铁器时代', color: 'from-orange-500 to-red-500', description: '铁器普及、城市国家兴起' };
  return { name: '青铜时代', color: 'from-teal-500 to-cyan-500', description: '古代文明：美索不达米亚、古埃及、商朝' };
}

// 时间滑块组件
function TimeSlider({
  year,
  onChange,
}: {
  year: number;
  onChange: (year: number) => void;
}) {
  const era = getEra(year);
  const nearbyEvent = timelineEvents.reduce((closest, event) => {
    const distance = Math.abs(event.year - year);
    const closestDistance = Math.abs(closest.year - year);
    return distance < closestDistance && distance < 100 ? event : closest;
  }, timelineEvents[0]);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-slate-700 w-[90%] max-w-2xl">
      {/* 年份显示 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${era.color} text-white font-bold text-lg`}>
            {year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`}
          </div>
          <div>
            <div className="text-sm font-bold text-white">{era.name}</div>
            <div className="text-xs text-slate-400">{era.description}</div>
          </div>
        </div>
        {/* 快捷跳转 */}
        <div className="hidden md:flex items-center gap-2">
          {[-500, 0, 1000, 1500, 1800, 2024].map((y) => (
            <button
              key={y}
              onClick={() => onChange(y)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                Math.abs(year - y) < 50
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {y < 0 ? `前${Math.abs(y)}` : y}
            </button>
          ))}
        </div>
      </div>

      {/* 滑块 */}
      <input
        type="range"
        min="-3000"
        max="2024"
        value={year}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
      />

      {/* 时间刻度 */}
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>前3000年</span>
        <span>前1000年</span>
        <span>公元元年</span>
        <span>1000年</span>
        <span>2024年</span>
      </div>

      {/* 附近历史事件 */}
      {Math.abs(nearbyEvent.year - year) < 100 && (
        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="text-sm font-bold text-blue-400">
            {nearbyEvent.year < 0 ? `公元前 ${Math.abs(nearbyEvent.year)} 年` : `公元 ${nearbyEvent.year} 年`} - {nearbyEvent.event}
          </div>
          <div className="text-xs text-slate-400 mt-1">{nearbyEvent.era}</div>
        </div>
      )}
    </div>
  );
}

// 图层选择器
function LayerSelector({
  currentLayer,
  onChange,
}: {
  currentLayer: string;
  onChange: (layer: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const groupedLayers = Object.entries(historicalLayers).reduce((acc, [name, config]) => {
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push({ name, ...config });
    return acc;
  }, {} as Record<string, Array<{ name: string; year: number; description: string }>>);

  return (
    <div className="absolute top-20 right-4 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900/95 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-slate-700 text-white hover:bg-slate-800 transition-colors"
      >
        <span className="text-lg">🗺️</span>
        <span className="ml-2 text-sm font-medium">{currentLayer}</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700 min-w-[250px] max-h-[400px] overflow-y-auto">
          <div className="text-sm font-bold text-white mb-3">选择地图样式</div>
          {Object.entries(groupedLayers).map(([cat, layers]) => (
            <div key={cat} className="mb-4">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{cat}</div>
              <div className="space-y-1">
                {layers.map((layer) => (
                  <button
                    key={layer.name}
                    onClick={() => {
                      onChange(layer.name);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentLayer === layer.name
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-medium">{layer.name}</div>
                    <div className="text-xs opacity-60">{layer.description}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 历史标记面板
function MarkerPanel({
  year,
  onSelectMarker,
}: {
  year: number;
  onSelectMarker: (marker: typeof historicalMarkers[0]) => void;
}) {
  const relevantMarkers = historicalMarkers.filter(
    (m) => Math.abs(m.year - year) < 200
  );

  if (relevantMarkers.length === 0) return null;

  return (
    <div className="absolute top-20 left-4 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700 max-w-xs">
      <div className="text-sm font-bold text-white mb-3">📍 附近历史事件</div>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {relevantMarkers.map((marker, index) => (
          <button
            key={index}
            onClick={() => onSelectMarker(marker)}
            className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <div className="text-sm font-medium text-white">{marker.event}</div>
            <div className="text-xs text-slate-400">
              {marker.year < 0 ? `前${Math.abs(marker.year)}年` : `${marker.year}年`} · {marker.region}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
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

  // 根据年份自动切换图层
  useEffect(() => {
    if (year >= 1900) setCurrentLayer('现代地图');
    else if (year >= 1700) setCurrentLayer('维多利亚时代');
    else if (year >= 1500) setCurrentLayer('大航海时代');
    else if (year >= 1000) setCurrentLayer('中世纪风格');
    else setCurrentLayer('古罗马风格');
  }, [year]);

  const layer = historicalLayers[currentLayer];

  // 处理标记选择
  const handleSelectMarker = (marker: typeof historicalMarkers[0]) => {
    setMapCenter([marker.lat, marker.lng]);
    setMapZoom(6);
  };

  // 过滤当前年份附近的标记
  const visibleMarkers = showMarkers
    ? historicalMarkers.filter((m) => Math.abs(m.year - year) < 200)
    : [];

  return (
    <div className="relative h-[calc(100vh-56px)]">
      {/* 地图容器 */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        zoomControl={false}
      >
        <MapController center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution={layer.attribution}
          url={layer.url}
          key={currentLayer}
        />

        {/* 历史事件标记 */}
        {visibleMarkers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="p-2">
                <div className="font-bold text-lg">{marker.event}</div>
                <div className="text-sm text-gray-600">
                  {marker.year < 0 ? `公元前 ${Math.abs(marker.year)} 年` : `公元 ${marker.year} 年`}
                </div>
                <div className="text-sm mt-2">{marker.description}</div>
                <div className="text-xs text-gray-500 mt-1">{marker.region}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 控制面板 */}
      <TimeSlider year={year} onChange={setYear} />
      <LayerSelector currentLayer={currentLayer} onChange={setCurrentLayer} />
      <MarkerPanel year={year} onSelectMarker={handleSelectMarker} />

      {/* 图例 */}
      <div className="absolute bottom-28 left-4 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-slate-700">
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              className="rounded"
            />
            显示历史标记
          </label>
        </div>
      </div>

      {/* 帮助提示 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl border border-slate-700">
        <div className="text-sm text-slate-300">
          🗺️ 拖动底部滑块浏览历史 · 点击地图标记查看详情 · 右上角切换地图样式
        </div>
      </div>
    </div>
  );
};
