import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, ChevronDown, ExternalLink, Handshake, Mail, MapPin, Menu, Phone, Play, Plus, Search, Send, Target, Users, X } from 'lucide-react';
import { type ReactNode, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const proofStats = [
  { value: '24,894', label: 'views', note: 'on one organic post', color: 'lime' },
  { value: '18,250', label: 'reach', note: 'new eyes in the room', color: 'coral' },
  { value: '92', label: 'interactions', note: 'signals worth following', color: 'lilac' },
  { value: '43', label: 'follows', note: 'attention that stayed', color: 'lime' },
];

const playbook = [
  { number: '01', title: 'Research', body: 'Audience, market, offer and the signal worth acting on.', icon: Search },
  { number: '02', title: 'Strategy', body: 'A clear content and outreach plan built around the goal.', icon: Target },
  { number: '03', title: 'Outreach', body: 'Personalized conversations that move the right people closer.', icon: Send },
  { number: '04', title: 'Close & Grow', body: 'Partnerships, follow-ups and measurement that keep momentum.', icon: Handshake },
];

const analyticsImages = [
  { image: '0_1789641279664.jpg', label: 'Instagram views', alt: 'Instagram views analytics graph' },
  { image: '1_1789641279665.jpg', label: 'Post overview', alt: 'Instagram post overview with views, reach and interactions' },
  { image: '2_1789641279666.jpg', label: 'Facebook growth', alt: 'Facebook performance showing increased views' },
  { image: '3_1789641279667.jpg', label: 'Instagram growth', alt: 'Instagram performance showing increased views' },
  { image: '4_1789641279668.jpg', label: 'Campaign performance', alt: 'Social media campaign performance detail' },
];

const contentVisuals = [
  { image: '1.png', title: 'Short-form that stops the scroll', tag: 'Content system', href: '#contact' },
  { image: '53_1789641515447.png', title: 'A point of view people remember', tag: 'Brand storytelling', href: '#contact' },
  { image: '2.png', title: 'From idea to interaction', tag: 'Social campaign', href: '#contact' },
  { image: '3.png', title: 'Make the message travel', tag: 'Content direction', href: '#contact' },
  { image: '4.png', title: 'Make the room worth entering', tag: 'Campaign planning', href: 'https://www.youtube.com/results?search_query=campaign+planning+marketing' },
  { image: '5.png', title: 'Clear thinking, better output', tag: 'Creative direction', href: 'https://www.youtube.com/results?search_query=creative+direction+content+strategy' },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  return <div className={`reveal ${delay} ${className}`}>{children}</div>;
}

function ViewPiece({
  image,
  title,
  tag,
  description,
  index,
  referenceHref,
}: {
  image: string;
  title: string;
  tag: string;
  description?: string;
  index: number;
  referenceHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full overflow-hidden border border-[#d4d0c5] bg-[#eee9db] text-left shadow-[0_8px_24px_rgba(28,33,29,.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(28,33,29,.12)]" aria-label={`View ${title} piece`}>
        <div className="relative overflow-hidden bg-[#dedacd]"><img src={asset(image)} alt={title} data-testid={`img-piece-${index}`} className="block aspect-[.92] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /><span className="absolute left-3 top-3 flex items-center gap-2 border border-white/10 bg-[var(--ink)]/95 px-3 py-2 font-mono text-[9px] uppercase tracking-[.14em] text-[var(--lime)]"><ArrowUpRight size={12} /> View piece</span></div>
        <div className="border-t border-[#d4d0c5] px-5 py-5"><div className="flex items-center justify-between gap-4"><p className="font-mono text-[9px] uppercase tracking-[.14em] text-[#646b65]">{tag}</p><span className="font-mono text-[9px] text-[var(--coral)]">0{index + 1}</span></div><h3 className="mt-3 text-xl font-medium tracking-[-.04em] text-[var(--ink)]">{title}</h3>{description && <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>}</div>
      </button>

      <dialog ref={dialogRef} onClose={() => setOpen(false)} onClick={(event) => event.target === event.currentTarget && setOpen(false)} className="m-auto max-h-[calc(100vh-32px)] w-[min(1100px,calc(100%-32px))] max-w-none border border-[var(--line)] bg-[var(--ink-soft)] p-0 text-[var(--paper)] shadow-2xl backdrop:bg-black/80">
        <div className="grid max-h-[calc(100vh-32px)] overflow-auto lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-h-[360px] items-center justify-center bg-[#0b0e0e] p-4 sm:p-8"><img src={asset(image)} alt={title} className="max-h-[72vh] max-w-full object-contain" /></div>
          <div className="flex flex-col border-t border-[var(--line)] p-6 lg:border-l lg:border-t-0"><div className="flex items-start justify-between gap-5"><div><p className="eyebrow">View piece / 0{index + 1}</p><p className="mt-5 font-mono text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">{tag}</p></div><button type="button" onClick={() => setOpen(false)} className="border border-[var(--line)] p-2 text-[var(--paper)] transition-colors hover:border-[var(--lime)] hover:text-[var(--lime)]" aria-label="Close image preview"><X size={18} /></button></div><h2 className="mt-8 text-3xl font-medium leading-[.95] tracking-[-.06em]">{title}</h2>{description && <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">{description}</p>}<div className="mt-auto border-t border-[var(--line)] pt-6"><p className="font-mono text-[9px] uppercase leading-[1.6] tracking-[.14em] text-[var(--muted)]">Full-resolution preview</p>{referenceHref && <a href={referenceHref} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-between border border-[var(--lime)] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[var(--lime)] transition-colors hover:bg-[var(--lime)] hover:text-[var(--ink)]">Open reference <ExternalLink size={14} /></a>}</div></div>
        </div>
      </dialog>
    </>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <nav className="fixed left-0 right-0 top-0 z-30 border-b hairline bg-[#101414]/90 backdrop-blur-md">
        <div className="container-wide flex h-[72px] items-center justify-between">
          <a href="#top" data-testid="link-logo" className="group flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-[var(--lime)] text-sm font-bold tracking-[-.08em] text-[var(--ink)]">FA</span>
            <span className="font-mono text-[11px] uppercase tracking-[.18em] text-[var(--paper)]">Fahad Abbas</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#analytics" data-testid="link-analytics" className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)] transition-colors hover:text-[var(--lime)]">Analytics</a>
            <a href="#design-work" data-testid="link-design-work" className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)] transition-colors hover:text-[var(--lime)]">Design work</a>
            <a href="#process" data-testid="link-process" className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--muted)] transition-colors hover:text-[var(--lime)]">Process</a>
            <a href="#contact" data-testid="link-contact" className="flex items-center gap-2 border border-[var(--lime)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--lime)] transition-colors hover:bg-[var(--lime)] hover:text-[var(--ink)]">Start a conversation <ArrowUpRight size={13} /></a>
          </div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu" className="p-2 text-[var(--paper)] md:hidden">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t hairline bg-[var(--ink)] px-4 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              {[
                ['Client analytics', '#analytics'],
                ['Design work', '#design-work'],
                ['Content', '#content'],
                ['Process', '#process'],
                ['Business development', '#business'],
                ['Start a conversation', '#contact'],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} data-testid={`mobile-link-${label.toLowerCase().replaceAll(' ', '-')}`} className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[.16em] text-[var(--paper)]">
                  {label}<ArrowUpRight size={14} className="text-[var(--lime)]" />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="top" className="relative border-b hairline pt-[72px]">
        <div className="container-wide grid min-h-[calc(100vh-72px)] items-center gap-12 py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-24 lg:py-24">
          <div>
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--lime)]" />
                <span className="eyebrow">Marketing / business development</span>
              </div>
            </Reveal>
            <Reveal delay="reveal-delay-1">
              <h1 className="max-w-[760px] text-[clamp(3.7rem,9vw,8.6rem)] font-semibold leading-[.84] tracking-[-.08em] text-balance">
                 Fahad
                <br />
                 <span className="text-[var(--lime)]">Abbas</span>
              </h1>
            </Reveal>
            <Reveal delay="reveal-delay-2">
              <p className="mt-9 max-w-[440px] text-lg leading-relaxed text-[var(--muted)]">
                 Marketing &amp; business development lead. I build pipelines, close deals and grow brands.
              </p>
            </Reveal>
            <Reveal delay="reveal-delay-3">
              <div className="mt-10 flex flex-wrap items-center gap-5 text-black">
                 <a href="#analytics" data-testid="link-hero-work" className="group flex items-center gap-3 bg-[var(--lime)] px-5 py-3.5 text-sm font-semibold text-black transition-transform hover:-translate-y-1 ">
                   View client analytics <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </a>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[var(--muted)]"><MapPin size={13} className="text-[var(--coral)]" /> Islamabad, Pakistan</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative mx-auto w-full max-w-[520px]" delay="reveal-delay-2">
            <div className="absolute -right-4 -top-6 z-10 hidden w-36 bg-[var(--lime)] p-4 text-[var(--ink)] sm:block">
              <p className="font-mono text-[9px] uppercase leading-[1.4] tracking-[.12em]">One post<br />outperformed<br />the baseline.</p>
              <ArrowDownRight size={20} className="mt-5" />
            </div>
            <div className="relative border border-[var(--line)] bg-[var(--ink-soft)] p-3 shadow-2xl shadow-black/25">
              <div className="mb-3 flex items-center justify-between border-b hairline px-2 pb-3">
                <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--muted)]">Live proof / 01</span>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.13em] text-[var(--lime)]"><i className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]" /> organic</span>
              </div>
               <img src={asset('fahad-portrait.jpeg')} alt="Fahad Abbas in a grey suit" data-testid="img-hero-portrait" className="block aspect-[.78] w-full object-cover object-top opacity-95 transition-all duration-700 hover:scale-[1.015]" />
              <div className="absolute -bottom-8 -left-8 hidden w-44 border border-[var(--line)] bg-[var(--ink)] p-4 sm:block">
                <p className="font-mono text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">Reach from one idea</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-.07em] text-[var(--paper)]">18,250</p>
                <div className="mt-3 h-1 w-full bg-[var(--ink-soft)]"><div className="h-full w-[78%] bg-[var(--coral)]" /></div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="border-t hairline">
          <div className="container-wide flex items-center justify-between gap-5 py-4">
            <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--muted)]">Scroll to inspect the evidence</span>
            <ChevronDown size={15} className="animate-bounce text-[var(--lime)]" />
          </div>
        </div>
      </section>

      <section id="analytics" className="section-pad border-b hairline bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow !text-[var(--coral)]">02 / Client analytics</p>
                <h2 className="mt-5 max-w-[640px] text-[clamp(2.6rem,6vw,5.9rem)] font-semibold leading-[.88] tracking-[-.07em]">The numbers<br /><span className="text-[var(--coral)]">behind the work.</span></h2>
              </div>
              <p className="max-w-[240px] pb-1 font-mono text-[10px] uppercase leading-[1.6] tracking-[.13em] text-[#646b65]">A complete view of the reach, response and follow-through created across social campaigns.</p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {proofStats.map((stat, index) => (
              <Reveal key={stat.label} delay={`reveal-delay-${(index % 3) + 1}`}>
                <div data-testid={`stat-${stat.label}`} className={`relative min-h-[220px] overflow-hidden border border-[#c8c8be] p-5 transition-transform duration-500 hover:-translate-y-2 ${stat.color === 'lime' ? 'bg-[var(--lime)]' : stat.color === 'coral' ? 'bg-[var(--coral)]' : 'bg-[var(--lilac)]'}`}>
                  <span className="font-mono text-[10px] uppercase tracking-[.15em] opacity-70">0{index + 1} / signal</span>
                  <p className="mt-12 text-[clamp(3.4rem,5vw,5.3rem)] font-semibold leading-none tracking-[-.1em] ">{stat.value}</p>
                  <p className="mt-3 max-w-[75%] pr-2 pb-10 text-sm font-medium uppercase leading-tight tracking-[.07em]">{stat.label}</p>
                  <p className="absolute bottom-5 left-5 max-w-[70%] text-xs leading-tight opacity-70">{stat.note}</p>
                  <ArrowUpRight size={18} className="absolute bottom-5 right-5" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {analyticsImages.map((item, index) => (
              <Reveal key={item.image} className="group" delay={`reveal-delay-${(index % 3) + 1}`}>
                <figure className="overflow-hidden border border-[#c8c8be] bg-[#e9e7df]">
                  <img src={asset(item.image)} alt={item.alt} data-testid={`img-analytics-${index}`} className="block aspect-[.9] w-full object-cover object-top mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.025]" />
                  <figcaption className="flex items-center justify-between border-t border-[#c8c8be] px-4 py-3 font-mono text-[9px] uppercase tracking-[.15em] text-[#646b65]"><span>{item.label}</span><span>0{index + 1}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b hairline bg-[var(--lime)] py-3 text-[var(--ink)]">
        <div className="flex min-w-max items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[.15em]">
          <span>Attention → pipeline</span><Plus size={13} />
          <span>Content → conversation</span><Plus size={13} />
          <span>Outreach → opportunity</span><Plus size={13} />
          <span>Attention → pipeline</span><Plus size={13} />
          <span>Content → conversation</span>
        </div>
      </div>

      <section id="design-work" className="section-pad border-b hairline">
        <div className="container-wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><p className="eyebrow">03 / Design work</p><h2 className="mt-5 max-w-[680px] text-[clamp(2.7rem,6vw,5.7rem)] font-semibold leading-[.88] tracking-[-.075em]">Design that<br /><span className="outline-type">earns attention.</span></h2></div>
              <p className="max-w-[245px] pb-1 font-mono text-[10px] uppercase leading-[1.6] tracking-[.13em] text-[var(--muted)]">Campaign ideas, visual systems and brand moments built to be noticed.</p>
            </div>
          </Reveal>
          <div className="mt-16 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['34_1789641515442.png', 'Pop-up market campaign', 'A vibrant event concept designed to turn online attention into real-world footfall.'],
              ['36_1789641515443.png', 'Leafy Brew brand identity', 'A warm, repeatable visual system created to make every cup feel memorable.'],
              ['76_1789641515450.png', 'Interactive social campaign', 'A playful true-or-false format designed to turn passive scrolling into participation.'],
              ['11_1789641515441.png', 'Visual campaign system', 'A flexible set of assets that keeps the message clear across every channel.'],
              ['74.png', 'Brand-led storytelling', 'Content with a distinct point of view, built to give audiences something to remember.'],
              ['37_1789641515444.png', 'Social-first creative', 'Strong hooks and clear visual direction for content that earns attention in the feed.'],
            ].map(([image, title, note], index) => (
              <Reveal key={image} className="group" delay={`reveal-delay-${(index % 3) + 1}`}>
                <ViewPiece image={image} title={title} tag="Design work" description={note} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="content" className="section-pad border-b hairline bg-[var(--ink-soft)]">
        <div className="container-wide">
          <Reveal><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="eyebrow">04 / Content</p><h2 className="mt-5 max-w-[650px] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.075em]">Content that<br /><span className="outline-type">keeps moving.</span></h2></div><p className="max-w-[280px] border-l border-[var(--coral)] pl-4 font-mono text-[10px] uppercase leading-[1.7] tracking-[.13em] text-[var(--muted)]">Short-form, campaign visuals and stories built to move from screen to conversation.</p></div></Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contentVisuals.map((item, index) => (
              <Reveal key={item.title} delay={`reveal-delay-${(index % 3) + 1}`}>
                <ViewPiece image={item.image} title={item.title} tag={item.tag} index={index} referenceHref={item.href.startsWith('http') ? item.href : undefined} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-pad border-b hairline">
        <div className="container-wide">
          <Reveal><p className="eyebrow">05 / Design process and content idealization</p><div className="mt-5 grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><h2 className="text-[clamp(2.7rem,6vw,5.8rem)] font-semibold leading-[.88] tracking-[-.08em]">Ideas with a<br /><span className="text-[var(--coral)]">job to do.</span></h2><p className="max-w-[420px] self-end pb-1 text-lg leading-relaxed text-[var(--muted)]">Every concept starts with a signal, then gets shaped into content and conversations people can act on.</p></div></Reveal>
          <div className="mt-20 divide-y divide-[var(--line)] border-y hairline">
            {playbook.map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.number} delay={`reveal-delay-${(index % 3) + 1}`}><div className="group grid gap-5 py-8 transition-colors hover:bg-[var(--ink-soft)] sm:grid-cols-[80px_1fr_1.2fr_40px] sm:items-center sm:px-5">
                <span className="font-mono text-xs text-[var(--coral)]">{item.number}</span><h3 className="text-2xl font-medium tracking-[-.045em]">{item.title}</h3><p className="max-w-[370px] text-sm leading-relaxed text-[var(--muted)]">{item.body}</p><Icon size={23} strokeWidth={1.4} className="text-[var(--lime)] transition-transform group-hover:rotate-12" />
              </div></Reveal>;
            })}
          </div>
        </div>
      </section>

      <section id="business" className="section-pad border-b hairline bg-[var(--paper)] text-[var(--ink)]">
        <div className="container-wide">
          <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow !text-[var(--coral)]">06 / Business development</p><h2 className="mt-5 max-w-[720px] text-[clamp(2.5rem,5.5vw,5.3rem)] font-semibold leading-[.88] tracking-[-.075em]">From first touch<br /><span className="text-[var(--coral)]">to closed deal.</span></h2></div><p className="max-w-[245px] font-mono text-[10px] uppercase leading-[1.6] tracking-[.13em] text-[#646b65]">B2B and B2C acquisition systems that turn focused outreach into real opportunity.</p></div></Reveal>
          <div className="mt-16 grid gap-3 sm:grid-cols-2">
            {[
              ['01', 'B2B / B2C', 'Corporate partnerships and direct client acquisition built around a clear offer.', Users],
              ['02', 'LinkedIn Sales Navigator & Upwork', 'Targeted prospecting and proposal-based client wins.', BriefcaseBusiness],
              ['03', 'Apollo data scraping & outreach', 'Targeted prospect lists paired with personalized outreach.', Search],
              ['04', 'Mass emailing', 'Cold email campaigns that turn attention into booked meetings.', Mail],
            ].map(([number, title, body, Icon], index) => {
              const BusinessIcon = Icon as typeof Users;
              return <Reveal key={title as string} delay={`reveal-delay-${(index % 3) + 1}`}><div className="group min-h-[230px] border border-[#c8c8be] p-5 transition-transform duration-500 hover:-translate-y-1 hover:bg-[var(--lime)]"><div className="flex items-start justify-between"><span className="font-mono text-[10px] text-[#646b65]">{number as string}</span><BusinessIcon size={22} strokeWidth={1.4} /></div><h3 className="mt-16 max-w-[260px] text-2xl font-medium leading-[.95] tracking-[-.05em]">{title as string}</h3><p className="mt-3 max-w-[330px] text-sm leading-relaxed text-[#646b65]">{body as string}</p></div></Reveal>;
            })}
          </div>
          <Reveal className="mt-5" delay="reveal-delay-2"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-[#c8c8be] p-5"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-[#646b65]">Social proof</p><p className="mt-4 text-4xl font-semibold tracking-[-.07em]">316,131%</p><p className="mt-1 text-sm text-[#646b65]">Facebook views increase</p></div><div className="border border-[#c8c8be] p-5"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-[#646b65]">Instagram</p><p className="mt-4 text-4xl font-semibold tracking-[-.07em]">124.4K</p><p className="mt-1 text-sm text-[#646b65]">views generated</p></div><div className="border border-[#c8c8be] p-5"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-[#646b65]">Organic</p><p className="mt-4 text-4xl font-semibold tracking-[-.07em]">43</p><p className="mt-1 text-sm text-[#646b65]">follows from one post</p></div></div></Reveal>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[var(--lime)] py-24 text-[var(--ink)] md:py-36">
        <div className="container-wide relative z-10">
          <Reveal><p className="font-mono text-[10px] uppercase tracking-[.16em] opacity-70">07 / Contact details</p><h2 className="mt-8 max-w-[920px] text-[clamp(3.7rem,10vw,9.4rem)] font-semibold leading-[.8] tracking-[-.1em]">Let&apos;s<br /><span className="text-[var(--coral)]">talk.</span></h2><p className="mt-9 max-w-[460px] text-lg leading-relaxed">Have a campaign, partnership or growth target in mind? Start with a direct conversation.</p><div className="mt-12 grid max-w-[720px] gap-3 sm:grid-cols-2"><a href="mailto:abbas.fahad1506@gmail.com" data-testid="link-email-contact" className="group flex items-center gap-3 border border-[var(--ink)] px-5 py-4 text-sm font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--lime)]"><Mail size={18} /> abbas.fahad1506@gmail.com <ArrowUpRight size={16} className="ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><a href="tel:+923325261657" data-testid="link-phone-contact" className="group flex items-center gap-3 border border-[var(--ink)] px-5 py-4 text-sm font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--lime)]"><Phone size={18} /> +92 332 5261657 <ArrowUpRight size={16} className="ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div><p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] opacity-70"><MapPin size={13} /> Islamabad, Pakistan</p></Reveal>
        </div>
        <div className="pointer-events-none absolute -right-10 bottom-[-30px] font-semibold leading-none tracking-[-.12em] text-[18rem] text-[var(--ink)] opacity-[.06]">FA</div>
      </section>

      <footer className="border-t hairline bg-[var(--ink)]">
        <div className="container-wide flex flex-col justify-between gap-7 py-8 text-[var(--muted)] sm:flex-row sm:items-center">
          <div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--paper)]">Fahad Abbas</p><p className="mt-2 text-xs">Marketing &amp; business development · Islamabad, Pakistan</p></div>
          <a href="#top" data-testid="link-back-top" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] transition-colors hover:text-[var(--lime)]">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;