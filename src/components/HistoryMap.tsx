import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 历史地图图层配置
const historicalLayers = {
  '现代地图': {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    year: 2024,
  },
  '19世纪地图': {
    url: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 1850,
  },
  '古地图风格': {
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    year: 1700,
  },
  '航海图': {
    url: 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    year: 1600,
  },
  '卫星图': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    year: 2000,
  },
};

// 历史事件标记
const historicalEvents = [
  { year: 1800, event: '工业革命时期', description: '欧洲和北美工业化快速发展' },
  { year: 1500, event: '大航海时代', description: '欧洲探险家发现新大陆' },
  { year: 1200, event: '蒙古帝国', description: '成吉思汗统一蒙古各部' },
  { year: 800, event: '查理曼帝国', description: '查理曼统一西欧' },
  { year: 500, event: '古典时代晚期', description: '西罗马帝国灭亡' },
  { year: 0, event: '公元元年', description: '罗马帝国鼎盛时期' },
  { year: -500, event: '古希腊时代', description: '雅典民主制度建立' },
  { year: -1000, event: '青铜时代', description: '古代文明兴起' },
];

// 时间滑块组件
function TimeSlider({ year, onChange }: { year: number; onChange: (year: number) => void }) {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700 min-w-[400px]">
      <div className="flex items-center gap-4 mb-3">
        <div className="text-lg font-bold text-white">
          年份: <span className="text-blue-400">{year < 0 ? `公元前 ${Math.abs(year)} 年` : `公元 ${year} 年`}</span>
        </div>
      </div>

      <input
        type="range"
        min="-1000"
        max="2024"
        value={year}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
      />

      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>公元前1000年</span>
        <span>公元元年</span>
        <span>公元1000年</span>
        <span>2024年</span>
      </div>

      {/* 历史事件提示 */}
      {historicalEvents.find(e => Math.abs(e.year - year) < 100) && (
        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="text-sm font-bold text-blue-400">
            {historicalEvents.find(e => Math.abs(e.year - year) < 100)?.event}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {historicalEvents.find(e => Math.abs(e.year - year) < 100)?.description}
          </div>
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
  return (
    <div className="absolute top-20 right-4 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700">
      <div className="text-sm font-bold text-white mb-3">地图样式</div>
      <div className="space-y-2">
        {Object.entries(historicalLayers).map(([name, config]) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              currentLayer === name
                ? 'bg-blue-500 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {name}
            <span className="text-xs ml-2 opacity-60">
              ({config.year < 0 ? `前${Math.abs(config.year)}` : config.year}年)
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 信息面板
function InfoPanel({ year }: { year: number }) {
  const era = getEra(year);

  return (
    <div className="absolute top-20 left-4 z-[1000] bg-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700 max-w-xs">
      <div className="text-sm font-bold text-white mb-2">🌍 {era.name}</div>
      <div className="text-xs text-slate-400">{era.description}</div>
      <div className="mt-3 pt-3 border-t border-slate-700">
        <div className="text-xs text-slate-500">
          提示：拖动底部滑块浏览不同时代
        </div>
      </div>
    </div>
  );
}

// 获取时代信息
function getEra(year: number) {
  if (year >= 1900) return { name: '现代', description: '两次世界大战、冷战、全球化时代' };
  if (year >= 1800) return { name: '工业革命时代', description: '蒸汽机、铁路、工业化快速发展' };
  if (year >= 1500) return { name: '大航海时代', description: '地理大发现、殖民扩张、文艺复兴' };
  if (year >= 1000) return { name: '中世纪', description: '封建制度、十字军东征、蒙古帝国' };
  if (year >= 500) return { name: '中世纪早期', description: '西罗马帝国灭亡、民族大迁徙' };
  if (year >= 0) return { name: '古典时代', description: '罗马帝国、汉朝、丝绸之路' };
  if (year >= -500) return { name: '古典希腊时期', description: '雅典民主、波斯战争、亚历山大征服' };
  return { name: '古代文明', description: '美索不达米亚、古埃及、商朝' };
}

export const HistoryMap = () => {
  const [year, setYear] = useState(1800);
  const [currentLayer, setCurrentLayer] = useState('现代地图');

  // 根据年份自动切换图层
  useEffect(() => {
    if (year >= 1900) setCurrentLayer('现代地图');
    else if (year >= 1700) setCurrentLayer('古地图风格');
    else if (year >= 1500) setCurrentLayer('航海图');
    else setCurrentLayer('古地图风格');
  }, [year]);

  const layer = historicalLayers[currentLayer as keyof typeof historicalLayers];

  return (
    <div className="relative h-[calc(100vh-56px)]">
      <MapContainer
        center={[35, 105]}
        zoom={4}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution={layer.attribution}
          url={layer.url}
          key={currentLayer}
        />
      </MapContainer>

      {/* 控制组件 */}
      <TimeSlider year={year} onChange={setYear} />
      <LayerSelector currentLayer={currentLayer} onChange={setCurrentLayer} />
      <InfoPanel year={year} />
    </div>
  );
};
