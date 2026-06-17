import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/2ac4cd66-edef-4015-8146-ff1ce72dbf74.jpg';
const IMG_KAU =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/35bf8bea-fdee-4ec5-9931-57a6edf3418a.jpg';
const IMG_UVD =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/2b7822f1-0827-477e-8752-5e26bb973b15.jpg';
const IMG_USO =
  'https://cdn.poehali.dev/projects/5e565af5-11b7-48d8-8116-c280b5700e17/files/d15fe0cd-cf6b-489f-98aa-a9662d1995de.jpg';

const NAV = [
  { label: 'Оборудование', href: '#equipment' },
  { label: 'Характеристики', href: '#specs' },
  { label: 'О компании', href: '#about' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Услуги', href: '#services' },
  { label: 'Калькулятор', href: '#calc' },
  { label: 'Контакты', href: '#contacts' },
];

const ADVANTAGES = [
  { icon: 'Factory', title: 'От производителя', text: 'Без посредников и наценок' },
  { icon: 'CalendarClock', title: '30–45 дней', text: 'Срок изготовления под ключ' },
  { icon: 'Wrench', title: 'Шеф-монтаж', text: 'Монтаж и обучение включены' },
  { icon: 'ShieldCheck', title: 'Гарантия 12–24 мес', text: 'Работаем по всей России' },
];

const EQUIPMENT = [
  {
    code: 'КАУ-1',
    name: 'Установка атмосферного крекинга',
    perf: 'от 1 до 3 м³/сутки (до 500 л/ч)',
    purpose: 'Переработка тяжёлой нефти, мазута, прямогонного бензина',
    products: 'Бензиновая, керосиновая, дизельная фракции + мазут',
    temp: 'Крекинг до 440 °C',
    price: 'от 1,5 млн ₽',
    tag: 'Хит продаж',
  },
  {
    code: 'УВД-500',
    name: 'Установка вакуумной дистилляции',
    perf: 'до 500 л/ч',
    purpose: 'Глубокая перегонка мазута, вакуумный газойль и гудрон',
    products: 'Вакуумный газойль, гудрон',
    temp: 'Вакуум 10–20 кПа',
    price: 'от 4,95 млн ₽',
    tag: 'Под заказ',
  },
  {
    code: 'УСО',
    name: 'Установка сорбентной очистки',
    perf: 'до 450 л/ч',
    purpose: 'Доочистка масел, удаление смол, серы, мех. примесей',
    products: '16 ячеек (8+8), ТЭН 7.5 кВт, вакуум',
    temp: 'Сорбентная очистка',
    price: 'от 2,3 млн ₽',
    tag: 'Под заказ',
  },
];

const SPECS = [
  { icon: 'Flame', title: 'Печь спиральная', text: 'Сталь 09Г2С, змеевик 12Х1МФ, шаг 6 мм' },
  { icon: 'Columns3', title: 'Колонны', text: 'Крекинговая и ректификационная, колпачковые тарелки' },
  { icon: 'Snowflake', title: 'Холодильник', text: '4 контура, нержавеющая сталь' },
  { icon: 'Cog', title: 'Насосы НШ', text: 'Подача, орошение, откачка куба' },
  { icon: 'MonitorCog', title: 'Пульт управления', text: 'ПЛК-160 ОВЕН, сенсорная панель 7"' },
  { icon: 'Gauge', title: 'Комплект КИП', text: 'Датчики T, P, уровнемеры, расходомеры' },
  { icon: 'Layers', title: 'Теплоизоляция', text: 'Трубопроводы и арматура в комплекте' },
  { icon: 'FileText', title: 'Документация', text: 'Паспорта, чертежи, регламент производства' },
];

const SERVICES = [
  { icon: 'PencilRuler', title: 'Проектирование', text: 'Под ваше сырьё и производственные задачи' },
  { icon: 'Hammer', title: 'Изготовление', text: 'Полный цикл производства на собственной базе' },
  { icon: 'Truck', title: 'Доставка', text: 'Логистика по всей территории России' },
  { icon: 'Wrench', title: 'Шеф-монтаж', text: 'Пусконаладка и запуск на вашей площадке' },
  { icon: 'GraduationCap', title: 'Обучение', text: 'Подготовка персонала к работе на установке' },
  { icon: 'Headset', title: 'Поддержка', text: 'Сервисное сопровождение и поставка запчастей' },
];

const PORTFOLIO = [
  { region: 'Республика Татарстан', city: 'Казань', unit: 'КАУ-1 ПРО', result: '3 м³/сутки, окупаемость 9 мес.', img: IMG_KAU },
  { region: 'Краснодарский край', city: 'Краснодар', unit: 'УСО', result: 'Доочистка отработанных масел 450 л/ч', img: IMG_USO },
  { region: 'Свердловская область', city: 'Екатеринбург', unit: 'УВД-500', result: 'Перегонка мазута в газойль и гудрон', img: IMG_UVD },
];

// Реальные города — координаты подобраны под SVG viewBox="0 0 1000 600"
// Карта Russia: левый угол ~26° в.д., правый ~190° в.д., верх ~77° с.ш., низ ~41° с.ш.
const MAP_POINTS = [
  { city: 'Москва',        region: 'Московская обл.',   unit: 'КАУ-1 БАЗИС', img: IMG_KAU, x: 26.5, y: 42 },
  { city: 'Казань',        region: 'Татарстан',          unit: 'КАУ-1 ПРО',   img: IMG_KAU, x: 33,   y: 41 },
  { city: 'Краснодар',     region: 'Краснодарский край', unit: 'УСО',          img: IMG_USO, x: 24.5, y: 58 },
  { city: 'Екатеринбург',  region: 'Свердловская обл.',  unit: 'УВД-500',      img: IMG_UVD, x: 41,   y: 37 },
  { city: 'Самара',        region: 'Самарская обл.',      unit: 'КАУ-1 ЛАЙТ',  img: IMG_KAU, x: 35,   y: 48 },
  { city: 'Уфа',           region: 'Башкортостан',        unit: 'УСО',          img: IMG_USO, x: 38,   y: 44 },
  { city: 'Новосибирск',   region: 'Новосибирская обл.',  unit: 'КАУ-1 ПРО',   img: IMG_KAU, x: 56,   y: 47 },
  { city: 'Тюмень',        region: 'Тюменская обл.',      unit: 'УВД-500',      img: IMG_UVD, x: 46,   y: 38 },
  { city: 'Волгоград',     region: 'Волгоградская обл.',  unit: 'КАУ-1 БАЗИС', img: IMG_KAU, x: 30,   y: 53 },
  { city: 'Оренбург',      region: 'Оренбургская обл.',   unit: 'УСО',          img: IMG_USO, x: 39,   y: 51 },
];

const CONFIGS = {
  'КАУ-1': [
    { id: 'light', name: 'ЛАЙТ', base: 1500000, note: 'Базовый крекинг до 1,5 м³/сутки' },
    { id: 'basis', name: 'БАЗИС', base: 2200000, note: 'Расширенная фракционная разгонка' },
    { id: 'pro', name: 'ПРО', base: 4800000, note: 'Максимальная производительность 3 м³/сутки' },
  ],
  'УВД-500': [
    { id: 'order', name: 'ПОД ЗАКАЗ', base: 4950000, note: 'Вакуумная дистилляция до 500 л/ч' },
  ],
  'УСО': [
    { id: 'order', name: 'ПОД ЗАКАЗ', base: 2300000, note: 'Сорбентная очистка до 450 л/ч' },
  ],
};

const OPTIONS = [
  { id: 'montage', name: 'Шеф-монтаж и пусконаладка', price: 350000 },
  { id: 'training', name: 'Обучение персонала', price: 180000 },
  { id: 'warranty', name: 'Расширенная гарантия 24 мес.', price: 290000 },
  { id: 'kip', name: 'Дополнительный комплект КИП', price: 220000 },
  { id: 'delivery', name: 'Доставка по России', price: 240000 },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n) + ' ₽';

export default function Index() {
  const [unit, setUnit] = useState<keyof typeof CONFIGS>('КАУ-1');
  const [configId, setConfigId] = useState('light');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['montage', 'training']);

  const configs = CONFIGS[unit];
  const activeConfig = configs.find((c) => c.id === configId) ?? configs[0];
  const optionsTotal = OPTIONS.filter((o) => selectedOptions.includes(o.id)).reduce(
    (s, o) => s + o.price,
    0,
  );
  const total = activeConfig.base + optionsTotal;

  const selectUnit = (u: keyof typeof CONFIGS) => {
    setUnit(u);
    setConfigId(CONFIGS[u][0].id);
  };

  const toggleOption = (id: string) =>
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16 px-4 md:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded bg-primary text-primary-foreground">
              <Icon name="Flame" size={20} />
            </span>
            <span className="font-display text-xl font-bold tracking-wide">
              НЕФТЕ<span className="text-primary">ТЕХ</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Button asChild className="hidden sm:inline-flex font-display tracking-wide">
            <a href="#contacts">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Установка нефтепереработки" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        <div className="container relative px-4 md:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase animate-fade-up">
              <Icon name="BadgeCheck" size={14} />
              Установки «под ключ» для малого и среднего бизнеса
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-balance animate-fade-up" style={{ animationDelay: '0.05s' }}>
              ОБОРУДОВАНИЕ ДЛЯ <span className="text-primary">ПЕРЕРАБОТКИ НЕФТИ</span> И ОТРАБОТАННЫХ МАСЕЛ
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Производим и поставляем установки крекинга, вакуумной дистилляции и
              сорбентной очистки. От производителя — без посредников и наценок.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <Button asChild size="lg" className="font-display tracking-wide text-base h-12 px-7 glow-orange">
                <a href="#calc">
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать стоимость
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-display tracking-wide text-base h-12 px-7 border-border">
                <a href="#equipment">
                  Смотреть оборудование
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* advantages strip */}
        <div className="container relative px-4 md:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-lg overflow-hidden border border-border/60">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="bg-card p-6 flex flex-col gap-2">
                <Icon name={a.icon} size={24} className="text-primary" />
                <div className="font-display text-lg font-semibold tracking-wide">{a.title}</div>
                <div className="text-sm text-muted-foreground">{a.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="container px-4 md:px-8 py-24">
        <SectionHead eyebrow="Каталог" title="Линейка оборудования" subtitle="Три установки для полного цикла переработки и очистки" />
        <Carousel opts={{ align: 'start' }} className="mt-12">
          <CarouselContent className="-ml-4">
            {EQUIPMENT.map((e) => (
              <CarouselItem key={e.code} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group h-full flex flex-col rounded-lg border border-border bg-card p-6 hover:border-primary/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-primary tracking-wide">{e.code}</span>
                    <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{e.tag}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{e.name}</h3>
                  <div className="mt-5 space-y-3 text-sm flex-1">
                    <Spec icon="Activity" label="Производительность" value={e.perf} />
                    <Spec icon="Target" label="Назначение" value={e.purpose} />
                    <Spec icon="FlaskConical" label="Продукты" value={e.products} />
                    <Spec icon="Thermometer" label="Режим" value={e.temp} />
                  </div>
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Стоимость</div>
                      <div className="font-display text-xl font-bold">{e.price}</div>
                    </div>
                    <Button asChild size="sm" variant="outline" className="border-border">
                      <a href="#calc">Рассчитать</a>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static translate-y-0 bg-card border-border" />
            <CarouselNext className="static translate-y-0 bg-card border-border" />
          </div>
        </Carousel>
      </section>

      {/* SPECS / COMPLECTATION */}
      <section id="specs" className="border-y border-border bg-card/40">
        <div className="container px-4 md:px-8 py-24">
          <SectionHead eyebrow="Комплектация" title="Что входит в установку" subtitle="Полный комплект для запуска производства под ключ" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPECS.map((s) => (
              <div key={s.title} className="rounded-lg border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                <Icon name={s.icon} size={22} className="text-primary" />
                <div className="mt-3 font-display text-base font-semibold tracking-wide">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="container px-4 md:px-8 py-24">
        <SectionHead eyebrow="Калькулятор" title="Расчёт стоимости установки" subtitle="Выберите модель, комплектацию и опции — стоимость рассчитается автоматически" />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {/* config */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">1. Модель установки</div>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(CONFIGS) as (keyof typeof CONFIGS)[]).map((u) => (
                <button
                  key={u}
                  onClick={() => selectUnit(u)}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    unit === u ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="font-display text-lg font-bold tracking-wide">{u}</div>
                </button>
              ))}
            </div>

            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-3">2. Комплектация</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {configs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConfigId(c.id)}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    configId === c.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="font-display text-base font-semibold tracking-wide">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.note}</div>
                  <div className="mt-2 font-display text-sm text-primary">{formatPrice(c.base)}</div>
                </button>
              ))}
            </div>

            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-3">3. Дополнительные опции</div>
            <div className="space-y-2">
              {OPTIONS.map((o) => {
                const active = selectedOptions.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggleOption(o.id)}
                    className={`w-full flex items-center justify-between rounded-md border p-3.5 transition-colors ${
                      active ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <span className={`grid place-items-center w-5 h-5 rounded border ${active ? 'bg-primary border-primary' : 'border-border'}`}>
                        {active && <Icon name="Check" size={14} className="text-primary-foreground" />}
                      </span>
                      {o.name}
                    </span>
                    <span className="font-display text-sm text-muted-foreground">+{formatPrice(o.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* result */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-lg border border-primary/40 bg-card p-6 md:p-8 glow-orange">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Ваша конфигурация</div>
              <div className="mt-2 font-display text-3xl font-bold tracking-wide">
                {unit} <span className="text-primary">{activeConfig.name}</span>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Базовая установка</span>
                  <span className="font-display">{formatPrice(activeConfig.base)}</span>
                </div>
                {OPTIONS.filter((o) => selectedOptions.includes(o.id)).map((o) => (
                  <div key={o.id} className="flex justify-between text-muted-foreground">
                    <span>{o.name}</span>
                    <span className="font-display">+{formatPrice(o.price)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Итого</div>
                <div className="font-display text-4xl font-bold text-primary mt-1">{formatPrice(total)}</div>
                <p className="mt-2 text-xs text-muted-foreground">Предварительный расчёт. Точная цена — после уточнения сырья и задач.</p>
              </div>
              <Button asChild size="lg" className="w-full mt-6 font-display tracking-wide h-12">
                <a href="#contacts">
                  <Icon name="Send" size={18} className="mr-2" />
                  Получить КП
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-y border-border bg-card/40">
        <div className="container px-4 md:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead eyebrow="О компании" title="Производитель оборудования полного цикла" align="left" />
            <p className="mt-6 text-muted-foreground">
              Мы проектируем и производим установки для переработки нефти и
              отработанных масел. Работаем напрямую с юридическими лицами и ИП по
              всей России — без посредников и наценок.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { v: '30–45', l: 'дней изготовление' },
                { v: '12–24', l: 'мес. гарантия' },
                { v: '100%', l: 'под ключ' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl font-bold text-primary">{s.v}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img src={HERO_IMG} alt="Производство" className="w-full h-full object-cover aspect-[4/3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="container px-4 md:px-8 py-24">
        <SectionHead eyebrow="Портфолио" title="Наши проекты" subtitle="Установки работают на производствах по всей стране" />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PORTFOLIO.map((p) => (
            <div key={p.region} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.unit} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-primary text-xs font-display tracking-wide">
                  <Icon name="MapPin" size={13} />
                  {p.city}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground">{p.region}</div>
                <div className="mt-1 font-display text-2xl font-bold">{p.unit}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAP */}
        <RussiaMap />
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-border bg-card/40">
        <div className="container px-4 md:px-8 py-24">
          <SectionHead eyebrow="Услуги" title="Полный цикл сопровождения" subtitle="От проектирования до запуска и сервиса" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex gap-4 rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <span className="grid place-items-center w-11 h-11 shrink-0 rounded bg-primary/10 text-primary">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <div className="font-display text-lg font-semibold tracking-wide">{s.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="container px-4 md:px-8 py-24">
        <div className="rounded-2xl border border-primary/40 bg-card p-8 md:p-14 glow-orange relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHead eyebrow="Контакты" title="Изготовим под ваше сырьё и задачи" align="left" />
              <p className="mt-6 text-muted-foreground">
                Напишите в WhatsApp или Telegram — отправим фото, видео и детальное
                коммерческое предложение. Работаем с юр. лицами и ИП.
              </p>
              <div className="mt-8 space-y-3">
                <a href="mailto:islamteresev352@gmail.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <Icon name="Mail" size={18} className="text-primary" />
                  islamteresev352@gmail.com
                </a>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Globe" size={18} className="text-primary" />
                  Работаем по всей России
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="font-display tracking-wide h-12 bg-[#25D366] hover:bg-[#25D366]/90 text-black">
                <a href="#">
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Написать в WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" className="font-display tracking-wide h-12 bg-[#229ED9] hover:bg-[#229ED9]/90 text-white">
                <a href="#">
                  <Icon name="Send" size={18} className="mr-2" />
                  Написать в Telegram
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-display tracking-wide h-12 border-border">
                <a href="mailto:islamteresev352@gmail.com">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Отправить запрос на почту
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded bg-primary text-primary-foreground">
              <Icon name="Flame" size={18} />
            </span>
            <span className="font-display text-lg font-bold tracking-wide">НЕФТЕТЕХ</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 НефтеТех. Оборудование для нефтепереработки.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase">
        <span className="w-6 h-px bg-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function RussiaMap() {
  const [active, setActive] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const point = active !== null ? MAP_POINTS[active] : null;

  return (
    <div className="mt-16 rounded-2xl border border-border bg-card/40 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-6 h-px bg-primary" />
          География поставок — {MAP_POINTS.length} городов России
        </div>
        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">
          {/* SVG MAP */}
          <div className="relative w-full" ref={popupRef}>
            <svg
              viewBox="0 0 1000 520"
              className="w-full"
              style={{ filter: 'drop-shadow(0 0 24px hsl(24 95% 53% / 0.08))' }}
            >
              {/* Силуэт России */}
              <path
                d="M 60 260 L 70 240 L 80 220 L 100 200 L 120 190 L 130 175 L 150 165 L 155 150 L 170 140 L 185 130 L 200 125 L 210 115 L 230 110 L 245 105 L 260 100 L 270 95 L 285 90 L 300 88 L 315 85 L 330 83 L 345 82 L 360 80 L 375 78 L 390 76 L 405 75 L 420 74 L 435 73 L 450 72 L 465 72 L 480 73 L 495 74 L 510 75 L 525 77 L 540 79 L 555 81 L 570 83 L 585 86 L 600 89 L 615 92 L 630 96 L 645 100 L 660 104 L 675 108 L 690 113 L 705 118 L 720 123 L 735 129 L 750 135 L 760 142 L 770 150 L 780 158 L 790 165 L 800 170 L 815 175 L 825 180 L 835 187 L 845 195 L 855 203 L 865 212 L 875 222 L 882 233 L 888 245 L 892 257 L 895 270 L 896 283 L 895 296 L 892 308 L 887 319 L 880 329 L 872 337 L 863 344 L 853 350 L 842 355 L 830 358 L 818 360 L 806 361 L 795 360 L 784 358 L 774 354 L 765 349 L 758 343 L 752 336 L 748 328 L 746 320 L 745 312 L 746 303 L 748 295 L 751 288 L 755 282 L 758 276 L 759 271 L 758 266 L 754 262 L 748 259 L 740 257 L 731 256 L 721 256 L 711 258 L 701 261 L 692 265 L 683 270 L 675 276 L 668 283 L 662 290 L 658 298 L 655 306 L 654 315 L 655 323 L 658 331 L 662 338 L 668 344 L 674 349 L 681 353 L 688 355 L 695 356 L 701 355 L 706 353 L 709 350 L 710 346 L 709 342 L 706 339 L 702 337 L 697 336 L 692 336 L 688 337 L 685 340 L 683 344 L 683 348 L 685 352 L 688 355 L 692 357 L 697 358 L 701 358 L 706 357 L 710 354 L 713 351 L 715 347 L 714 342 L 712 338 L 707 334 L 701 332 L 694 330 L 688 330 L 682 332 L 677 335 L 674 339 L 673 344 L 675 349 L 679 354 L 685 358 L 692 361 L 699 362 L 706 362 L 713 360 L 719 357 L 723 353 L 726 347 L 726 341 L 723 335 L 718 329 L 711 324 L 703 320 L 695 318 L 687 317 L 679 318 L 672 321 L 666 325 L 661 331 L 658 338 L 657 345 L 658 352 L 661 358 L 666 364 L 672 368 L 679 371 L 687 372 L 695 372 L 703 370 L 710 366 L 716 361 L 720 354 L 723 347 L 723 339 L 721 332 L 717 325 L 710 319 L 702 315 L 693 312 L 685 312 L 677 314 L 670 318 L 665 323 L 662 330 L 661 337 L 662 344 L 665 350 L 670 356 L 676 361 L 683 365 L 691 367 L 698 367 L 705 365 L 711 361 L 715 356 L 717 350 L 717 344 L 715 338 L 711 332 L 704 328 L 697 325 L 689 324 L 681 325 L 675 328 L 670 333 L 667 339 L 667 346 L 669 352 L 674 358 L 680 363 L 688 367 L 695 368 L 702 368 L 708 366 L 713 362 L 717 357 L 718 351 L 717 344 L 714 338 L 708 332 L 701 328 L 693 326 L 685 326 L 678 329 L 672 333 L 668 339 L 667 346 L 668 353 L 672 360 L 678 366 L 685 370 L 693 372 L 701 372 L 708 369 L 715 365 L 719 359 L 721 352 L 720 345 L 717 338 L 711 332 L 703 328 L 694 325 L 686 325 L 678 328 L 672 333 L 668 340 L 667 347 L 669 354 L 674 361 L 681 366 L 689 370 L 697 371 L 704 370 L 710 367 L 715 362 L 717 355 L 716 348 L 712 342 L 706 336 L 699 332 L 691 330 L 683 330 L 676 333 L 671 338 L 668 344 L 668 351 L 671 358 L 677 364 L 684 368 L 692 371 L 700 371 L 707 369 L 713 365 L 718 360 L 720 353 L 719 346 L 716 339 L 710 333 L 703 329 L 694 327 L 686 327 L 678 330 L 673 335 L 669 342 L 668 349 L 670 357 L 675 363 L 682 368 L 690 371 L 698 372 L 706 371 L 712 368 L 717 363 L 720 356 L 720 349 L 717 342 L 712 336 L 704 331 L 696 329 L 688 329 L 680 332 L 674 337 L 670 344 L 669 351 L 671 359 L 677 365 L 684 369 L 692 372 L 700 372 L 707 370 L 713 366 L 717 361 L 719 354 L 718 347 L 715 341 L 709 335 L 702 331 L 694 329 L 686 329 L 679 332 L 673 337 L 669 344 L 669 351 L 671 358 L 677 364 L 684 369 L 692 371 L 700 372 L 707 370 L 713 366 L 700 390 L 690 400 L 680 410 L 665 415 L 650 418 L 630 420 L 615 418 L 600 414 L 585 410 L 570 408 L 555 408 L 540 410 L 525 413 L 510 415 L 495 416 L 480 416 L 465 414 L 450 412 L 435 410 L 420 410 L 405 411 L 395 415 L 385 420 L 375 426 L 365 430 L 350 432 L 335 430 L 325 425 L 315 418 L 305 410 L 295 402 L 285 396 L 275 392 L 265 390 L 255 390 L 245 392 L 235 396 L 225 400 L 215 403 L 205 404 L 195 402 L 185 398 L 175 392 L 165 385 L 155 378 L 145 372 L 135 368 L 125 366 L 115 366 L 105 368 L 95 372 L 85 378 L 75 385 L 65 390 L 55 393 L 50 392 L 48 387 L 50 380 L 55 372 L 62 363 L 68 353 L 72 343 L 73 333 L 71 323 L 66 313 L 60 304 L 55 295 L 52 286 L 51 278 L 52 270 L 55 263 L 60 260 Z"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
              />
              {/* Точки городов */}
              {MAP_POINTS.map((m, i) => {
                const cx = (m.x / 100) * 1000;
                const cy = (m.y / 100) * 520;
                const isActive = active === i;
                return (
                  <g key={m.city} style={{ cursor: 'pointer' }} onClick={() => setActive(active === i ? null : i)}>
                    <circle cx={cx} cy={cy} r={18} fill="hsl(24 95% 53% / 0.15)" />
                    <circle
                      cx={cx} cy={cy} r={8}
                      fill={isActive ? 'hsl(24 95% 53%)' : 'hsl(24 95% 53%)'}
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                    />
                    {isActive && (
                      <circle cx={cx} cy={cy} r={14} fill="none" stroke="hsl(24 95% 53%)" strokeWidth="2" opacity="0.6" />
                    )}
                    <text
                      x={cx}
                      y={cy + 26}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize="11"
                      fontFamily="Oswald, sans-serif"
                      fontWeight="500"
                      opacity="0.85"
                    >
                      {m.city}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Попап с фото при клике */}
            {point && (
              <div
                className="absolute z-20 rounded-xl border border-primary/50 bg-card shadow-2xl overflow-hidden w-64"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: 'translate(-50%, -110%)',
                }}
              >
                <div className="relative aspect-[16/9]">
                  <img src={point.img} alt={point.unit} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-2 right-2 grid place-items-center w-6 h-6 rounded-full bg-background/70 hover:bg-background text-foreground transition-colors"
                  >
                    <Icon name="X" size={13} />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 text-primary text-xs">
                    <Icon name="MapPin" size={12} />
                    <span>{point.city} — {point.region}</span>
                  </div>
                  <div className="mt-1 font-display text-base font-bold">{point.unit}</div>
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
                  <Icon name="MapPin" size={14} className={active === i ? 'text-primary' : 'text-muted-foreground'} />
                  <span className="font-display tracking-wide">{m.city}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{m.unit}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon name={icon} size={16} className="text-primary shrink-0 mt-0.5" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
}