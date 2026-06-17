import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import RussiaMap from '@/components/RussiaMap';

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

const WA_NUMBER = '79283011045';
const waLink = (text: string) =>
  'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);

const formatPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU').format(n) + ' ₽';

export default function Index() {
  const [unit, setUnit] = useState<keyof typeof CONFIGS>('КАУ-1');
  const [configId, setConfigId] = useState('light');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['montage', 'training']);
  const [clientName, setClientName] = useState('');

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

  const buildWaText = () => {
    const nameLine = clientName.trim() ? 'Меня зовут ' + clientName.trim() + '.\n' : '';
    const optionsLine = OPTIONS.filter((o) => selectedOptions.includes(o.id))
      .map((o) => o.name)
      .join(', ');
    return (
      'Здравствуйте! ' + nameLine +
      'Хочу получить КП на установку:\n\n' +
      'Модель: ' + unit + ' ' + activeConfig.name + '\n' +
      'Базовая цена: ' + formatPrice(activeConfig.base) + '\n' +
      (optionsLine ? 'Опции: ' + optionsLine + '\n' : '') +
      'Итого: ' + formatPrice(total)
    );
  };

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
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
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

      {/* SPECS */}
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
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-6 md:p-8">

            {/* ШАГ 0 — Имя */}
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">0. Ваше имя</div>
            <div className="relative">
              <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Как вас зовут?"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-md border border-border bg-background pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* ШАГ 1 — Модель */}
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-3">1. Модель установки</div>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(CONFIGS) as (keyof typeof CONFIGS)[]).map((u) => (
                <button
                  key={u}
                  onClick={() => selectUnit(u)}
                  className={`rounded-md border p-4 text-left transition-colors ${unit === u ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}
                >
                  <div className="font-display text-lg font-bold tracking-wide">{u}</div>
                </button>
              ))}
            </div>

            {/* ШАГ 2 — Комплектация */}
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-3">2. Комплектация</div>
            <div className="grid sm:grid-cols-3 gap-3">
              {configs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConfigId(c.id)}
                  className={`rounded-md border p-4 text-left transition-colors ${configId === c.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}
                >
                  <div className="font-display text-base font-semibold tracking-wide">{c.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.note}</div>
                  <div className="mt-2 font-display text-sm text-primary">{formatPrice(c.base)}</div>
                </button>
              ))}
            </div>

            {/* ШАГ 3 — Опции */}
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-3">3. Дополнительные опции</div>
            <div className="space-y-2">
              {OPTIONS.map((o) => {
                const active = selectedOptions.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggleOption(o.id)}
                    className={`w-full flex items-center justify-between rounded-md border p-3.5 transition-colors ${active ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'}`}
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

          {/* Итог */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-lg border border-primary/40 bg-card p-6 md:p-8 glow-orange">
              {clientName.trim() && (
                <div className="mb-4 px-3 py-2 rounded-md bg-primary/10 text-sm">
                  <span className="text-muted-foreground">Заявка от: </span>
                  <span className="font-semibold text-primary">{clientName.trim()}</span>
                </div>
              )}
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
              <a
                href={waLink(buildWaText())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full h-12 rounded-md inline-flex items-center justify-center gap-2 font-display tracking-wide text-sm font-semibold bg-[#25D366] hover:bg-[#1ebe5d] text-black transition-colors"
              >
                <Icon name="MessageCircle" size={18} />
                Отправить заявку в WhatsApp
              </a>
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
              <a
                href={waLink('Здравствуйте! Хочу узнать подробнее об оборудовании для нефтепереработки.')}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-md inline-flex items-center justify-center gap-2 font-display tracking-wide text-sm font-semibold bg-[#25D366] hover:bg-[#1ebe5d] text-black transition-colors px-6"
              >
                <Icon name="MessageCircle" size={18} />
                Написать в WhatsApp
              </a>
              <a
                href="https://t.me/+79283011045"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-md inline-flex items-center justify-center gap-2 font-display tracking-wide text-sm font-semibold bg-[#229ED9] hover:bg-[#1a8ec5] text-white transition-colors px-6"
              >
                <Icon name="Send" size={18} />
                Написать в Telegram
              </a>
              <a
                href="mailto:islamteresev352@gmail.com"
                className="h-12 rounded-md inline-flex items-center justify-center gap-2 font-display tracking-wide text-sm font-semibold border border-border hover:border-primary/50 text-foreground transition-colors px-6"
              >
                <Icon name="Mail" size={18} />
                Отправить запрос на почту
              </a>
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
