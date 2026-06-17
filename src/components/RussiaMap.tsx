import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const IMG_KAU =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/35bf8bea-fdee-4ec5-9931-57a6edf3418a.jpg';
const IMG_UVD =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/2b7822f1-0827-477e-8752-5e26bb973b15.jpg';
const IMG_USO =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/d15fe0cd-cf6b-489f-98aa-a9662d1995de.jpg';

export const MAP_POINTS = [
  { city: 'Москва',       region: 'Московская обл.',    unit: 'КАУ-1 БАЗИС', img: IMG_KAU, x: 26.5, y: 42 },
  { city: 'Казань',       region: 'Татарстан',           unit: 'КАУ-1 ПРО',   img: IMG_KAU, x: 33,   y: 41 },
  { city: 'Краснодар',    region: 'Краснодарский край',  unit: 'УСО',          img: IMG_USO, x: 24.5, y: 58 },
  { city: 'Екатеринбург', region: 'Свердловская обл.',   unit: 'УВД-500',      img: IMG_UVD, x: 41,   y: 37 },
  { city: 'Самара',       region: 'Самарская обл.',       unit: 'КАУ-1 ЛАЙТ',  img: IMG_KAU, x: 35,   y: 48 },
  { city: 'Уфа',          region: 'Башкортостан',         unit: 'УСО',          img: IMG_USO, x: 38,   y: 44 },
  { city: 'Новосибирск',  region: 'Новосибирская обл.',   unit: 'КАУ-1 ПРО',   img: IMG_KAU, x: 56,   y: 47 },
  { city: 'Тюмень',       region: 'Тюменская обл.',       unit: 'УВД-500',      img: IMG_UVD, x: 46,   y: 38 },
  { city: 'Волгоград',    region: 'Волгоградская обл.',   unit: 'КАУ-1 БАЗИС', img: IMG_KAU, x: 30,   y: 53 },
  { city: 'Оренбург',     region: 'Оренбургская обл.',    unit: 'УСО',          img: IMG_USO, x: 39,   y: 51 },
];

// Контур России вынесен в константу вне JSX чтобы Vite не спотыкался на длинной строке
const D =
  'M180,60 L200,55 L230,50 L260,46 L290,43 L320,41 L350,39 L380,38 L410,37 L440,37 ' +
  'L470,37 L500,38 L530,39 L560,41 L590,44 L620,47 L650,51 L675,56 L695,62 L710,70 ' +
  'L722,79 L730,89 L735,100 L736,112 L732,123 L724,132 L712,139 L698,144 L683,146 ' +
  'L668,145 L655,141 L643,135 L634,127 L628,119 L625,111 L624,103 L626,95 L631,88 ' +
  'L638,82 L645,78 L650,74 L652,70 L648,66 L640,64 L628,63 L614,63 L600,65 L586,69 ' +
  'L572,74 L558,80 L544,86 L530,92 L515,97 L500,100 L485,102 L470,103 L455,103 ' +
  'L440,102 L425,100 L410,98 L395,97 L380,97 L365,98 L350,100 L335,103 L320,106 ' +
  'L305,109 L290,111 L275,113 L260,114 L245,114 L230,113 L215,111 L200,109 L185,107 ' +
  'L170,106 L156,106 L143,107 L131,110 L120,114 L110,119 L101,125 L93,132 L86,140 ' +
  'L80,149 L75,159 L71,170 L68,181 L66,193 L65,205 L65,217 L66,229 L68,240 L71,250 ' +
  'L75,260 L80,269 L86,277 L93,283 L101,288 L110,291 L119,292 L128,291 L136,287 ' +
  'L143,281 L149,274 L153,266 L155,258 L155,250 L153,242 L149,235 L143,229 L136,225 ' +
  'L128,222 L120,221 L112,222 L105,225 L99,230 L95,236 L93,243 L93,250 L95,257 ' +
  'L99,263 L105,268 L112,271 L120,273 L128,272 L136,270 L143,265 L149,259 L152,252 ' +
  'L153,245 L152,238 L149,232 L143,227 L136,223 L128,221 L120,221 L150,270 L155,280 ' +
  'L158,292 L158,305 L155,317 L149,328 L140,337 L129,344 L116,349 L102,351 L88,350 ' +
  'L75,346 L63,339 L53,329 L45,317 L39,304 L35,290 L33,276 L33,262 L35,248 L39,235 ' +
  'L45,223 L53,212 L63,202 L75,194 L88,188 L102,184 L116,182 L129,182 L140,184 ' +
  'L149,188 L156,194 L161,201 L164,209 L165,217 L164,225 L161,232 L156,238 L150,242 ' +
  'L143,245 L180,60 Z';

export default function RussiaMap() {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const pt = active !== null ? MAP_POINTS[active] : null;
  const cardBg = '#14181f';
  const fill = '#1c2230';
  const stroke = '#2a3348';
  const orange = '#f97316';
  const orangeLight = 'rgba(249,115,22,0.18)';
  const text = '#f0ede6';
  const muted = '#6b7280';

  return (
    <div className="mt-16 rounded-2xl border border-border bg-card/40 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-6 h-px bg-primary" />
          География поставок — {MAP_POINTS.length} городов России
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          {/* SVG карта */}
          <div className="relative w-full" ref={wrapRef}>
            <svg
              viewBox="0 0 800 420"
              className="w-full rounded-lg"
              style={{ background: cardBg }}
            >
              {/* Сетка */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0 L0 0 0 40" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="800" height="420" fill="url(#grid)" />

              {/* Контур России — масштабирован под viewBox 800x420 */}
              <g transform="scale(2.5, 2.0) translate(30, 20)">
                <path d={D} fill={fill} stroke={stroke} strokeWidth="0.8" />
              </g>

              {/* Точки городов */}
              {MAP_POINTS.map((m, i) => {
                const cx = (m.x / 100) * 800;
                const cy = (m.y / 100) * 420;
                const isActive = active === i;
                return (
                  <g key={m.city} onClick={() => setActive(active === i ? null : i)} style={{ cursor: 'pointer' }}>
                    <circle cx={cx} cy={cy} r={20} fill={orangeLight} opacity={isActive ? 1 : 0.6} />
                    <circle cx={cx} cy={cy} r={7} fill={orange} stroke={cardBg} strokeWidth="2" />
                    {isActive && (
                      <circle cx={cx} cy={cy} r={13} fill="none" stroke={orange} strokeWidth="1.5" opacity="0.7" />
                    )}
                    <text
                      x={cx}
                      y={cy + 24}
                      textAnchor="middle"
                      fill={text}
                      fontSize="10"
                      fontFamily="Oswald, sans-serif"
                      fontWeight="500"
                    >
                      {m.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Попап с фото при клике */}
            {pt && (
              <div
                className="absolute z-20 rounded-xl border overflow-hidden w-60 shadow-2xl"
                style={{
                  left: `${pt.x}%`,
                  top: `${pt.y}%`,
                  transform: 'translate(-50%, -115%)',
                  borderColor: orange,
                  background: cardBg,
                }}
              >
                <div className="relative aspect-video">
                  <img src={pt.img} alt={pt.unit} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,24,31,0.85), transparent)' }} />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: orange }}>
                    <Icon name="MapPin" size={12} />
                    <span>{pt.city} · {pt.region}</span>
                  </div>
                  <div className="mt-1 font-display text-sm font-bold" style={{ color: text }}>{pt.unit}</div>
                </div>
              </div>
            )}
          </div>

          {/* Список городов */}
          <div className="lg:border-l border-border lg:pl-8">
            <div className="font-display text-5xl font-bold text-primary">{MAP_POINTS.length}</div>
            <div className="text-sm text-muted-foreground mt-1 mb-5">городов с нашими установками</div>
            <div className="space-y-1">
              {MAP_POINTS.map((m, i) => (
                <button
                  key={m.city}
                  onClick={() => setActive(active === i ? null : i)}
                  className={`w-full flex items-center gap-2 text-sm rounded-md px-3 py-2 text-left transition-colors ${
                    active === i ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <Icon
                    name="MapPin"
                    size={14}
                    className={active === i ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className="font-display tracking-wide">{m.city}</span>
                  <span className="text-xs ml-auto" style={{ color: muted }}>{m.unit}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
