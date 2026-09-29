import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Send,
  ShoppingBag,
  Sprout,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const logoPath = '/luminous-nexus-mark-transparent.png';

const businessAreas = [
  {
    number: '01',
    icon: Code2,
    title: 'Technology Solutions',
    description: 'Business technology solutions designed to simplify operations, improve efficiency and support digital growth.',
    items: ['ERP Solutions', 'Web Applications', 'Mobile Applications', 'E-commerce', 'Customer Applications', 'Custom Software Development'],
    href: '#technology',
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'International Trade & Export',
    description: 'Connecting quality Sri Lankan products, producers and business opportunities with international markets.',
    items: ['Ceylon Tea', 'Spices & Natural Products', 'Coconut & Coconut-Based Products', 'Fruits & Agricultural Products', 'Natural Gemstones & Jewellery', 'Other Sri Lankan Products & Goods'],
    href: '#trade',
  },
  {
    number: '03',
    icon: Globe2,
    title: 'Inbound Tourism',
    description: 'Exploring opportunities to connect international visitors with authentic Sri Lankan experiences, destinations, culture, nature and hospitality.',
    items: ['Sri Lanka Experiences', 'Nature & Adventure', 'Cultural Tourism', 'Plantation Experiences', 'Private & Corporate Travel', 'Hospitality Partnerships'],
    href: '#ventures',
    developing: true,
  },
  {
    number: '04',
    icon: Sprout,
    title: 'Agriculture & Agri Ventures',
    description: "Exploring agricultural opportunities, plantation development and sustainable, market-oriented ventures connected to Sri Lanka's agricultural potential.",
    items: ['Agricultural Development', 'Plantation Opportunities', 'Sustainable Agriculture', 'Agricultural Products', 'Export-Oriented Agriculture', 'Agri-Tourism Opportunities'],
    href: '#ventures',
    developing: true,
  },
];

const techServices = [
  ['01', 'ERP Solutions', 'Inventory, sales, HRM, accounting, finance, production and customized business processes.'],
  ['02', 'Web Applications', 'Custom business platforms, management systems and web-based applications.'],
  ['03', 'Mobile Applications', 'Android and iOS-ready business and customer applications.'],
  ['04', 'E-commerce', 'Online stores, product management, orders, payments and customer experiences.'],
  ['05', 'Customer Applications', 'Digital platforms designed around specific customer and business requirements.'],
  ['06', 'Custom Software', 'Purpose-built software solutions for unique operational requirements.'],
];

const tradeCategories = ['Ceylon Tea', 'Spices', 'Coconut Products', 'Agricultural Products', 'Natural Products', 'Natural Gemstones & Jewellery', 'Other Sri Lankan Goods'];

const portfolioItems = [
  ['ERP & Business Systems', 'Operations, connected', 'Capability across inventory, finance, HRM and custom business processes.'],
  ['Web Applications', 'A digital front door', 'Business platforms that make complex work clear, accessible and easier to manage.'],
  ['Mobile Applications', 'Useful in motion', 'Customer and business applications designed around real-world requirements.'],
  ['E-commerce', 'Commerce, considered', 'Digital storefronts and product journeys for growing market opportunities.'],
  ['International Trade', 'From source to market', 'A broad platform for Sri Lankan products, producer relationships and export opportunities.'],
  ['Emerging Ventures', 'The next horizon', 'Developing opportunities around tourism, agriculture and sustainable growth.'],
];

const navLinks = [
  ['About', '#about'],
  ['Businesses', '#businesses'],
  ['Technology', '#technology'],
  ['Trade & Export', '#trade'],
  ['Ventures', '#ventures'],
  ['Portfolio', '#portfolio'],
  ['Locations', '#locations'],
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className="brand" href="#home" data-testid={footer ? 'link-footer-brand' : 'link-brand'}>
      <img className="brand-mark" src={logoPath} alt="Luminous Nexus mark" />
      <span className="brand-name">
        Luminous Nexus
        <small>(Pvt) Ltd · Sri Lankan–Czech Group</small>
      </span>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} data-testid="site-header">
      <div className="container nav-wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="#contact" data-testid="link-nav-contact">Start a Conversation <ArrowUpRight size={14} /></a>
        <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        {[...navLinks, ['Contact', '#contact']].map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>
        ))}
        <a className="mobile-cta" href="#contact" onClick={closeMenu} data-testid="link-mobile-conversation">Start a Conversation <ArrowUpRight size={14} /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" data-testid="section-hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">Sri Lanka · Czech Republic · Global Outlook</span>
          <h1>Building Businesses.<br />Enabling <em>Technology.</em><br />Creating Opportunities.</h1>
          <p className="hero-intro">Luminous Nexus (Pvt) Ltd is a Sri Lankan–Czech business group connecting technology, international trade and emerging ventures across global markets.</p>
          <div className="hero-actions">
            <button className="button-primary" onClick={() => scrollToId('#businesses')} data-testid="button-explore-businesses">Explore Our Businesses <ArrowUpRight size={15} /></button>
            <button className="button-ghost" onClick={() => scrollToId('#contact')} data-testid="button-hero-contact">Contact Us <ChevronRight size={15} /></button>
          </div>
        </div>
        <div className="hero-art reveal reveal-delay-2" aria-label="Abstract network connecting Sri Lanka and Europe">
          <div className="orbital">
            <span className="node node-a" /><span className="node node-b" /><span className="node node-c" /><span className="node node-d" />
            <span className="orbit-label one">Europe</span><span className="orbit-label two">Opportunity</span><span className="orbit-label three">Sri Lanka</span>
            <div className="orbit-center"><img src={logoPath} alt="" /></div>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><span /><span>Scroll to explore</span><ArrowDown size={13} /></div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="section section-light" id="about" data-testid="section-about">
      <div className="container intro-grid">
        <div className="reveal">
          <span className="eyebrow">Who we are</span>
          <p className="intro-statement">One Group.<br />Multiple Opportunities.</p>
        </div>
        <div className="intro-copy reveal reveal-delay-1">
          <p className="section-copy">Luminous Nexus brings together technology, international trade and emerging business opportunities under one corporate vision. With a presence connecting Sri Lanka and the Czech Republic, we work to build practical solutions, develop international relationships and explore new markets.</p>
          <a className="text-link" href="#vision" data-testid="link-learn-more">Learn more <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

function BusinessAreas() {
  return (
    <section className="section businesses" id="businesses" data-testid="section-businesses">
      <div className="container">
        <div className="section-heading-row reveal">
          <div><span className="eyebrow">The platform</span><h2 className="section-title">Our Business<br />Areas</h2></div>
          <p className="section-copy">From technology solutions to international trade and emerging ventures, Luminous Nexus is building a diversified business platform.</p>
        </div>
        <div className="business-grid">
          {businessAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <article className={`business-card reveal reveal-delay-${(index % 3) + 1}`} key={area.title} data-testid={`card-business-${index}`}>
                <span className="card-number">{area.number}</span>
                <div className="card-icon"><Icon size={22} strokeWidth={1.5} /></div>
                {area.developing && <span className="developing">Developing Venture</span>}
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <ul className="business-list">{area.items.map(item => <li key={item}>{item}</li>)}</ul>
                <a className="card-link" href={area.href} data-testid={`link-business-${index}`}>Explore {area.title.split(' ')[0]} <ArrowUpRight size={13} /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section className="section technology" id="technology" data-testid="section-technology">
      <div className="container tech-layout">
        <div className="tech-lead reveal"><span className="eyebrow">Technology</span><h2 className="section-title">Technology That Works for Business.</h2><p className="section-copy">We design and develop practical digital solutions that help organizations manage operations, connect with customers and grow efficiently.</p><button className="button-primary" onClick={() => scrollToId('#contact')} data-testid="button-technology-contact">Discuss Your Technology Requirement <ArrowUpRight size={14} /></button></div>
        <div className="tech-grid">
          {techServices.map(([number, title, copy], index) => (
            <article className={`tech-item reveal reveal-delay-${(index % 3) + 1}`} key={title} data-testid={`card-technology-${index}`}>
              <span className="tech-index">{number}</span><h3>{title}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trade() {
  return (
    <section className="section trade" id="trade" data-testid="section-trade">
      <div className="container trade-layout">
        <div className="trade-copy reveal">
          <span className="eyebrow">International trade & export</span>
          <h2 className="section-title">Sri Lankan Products.<br />Global Opportunities.</h2>
          <p className="section-copy">Our international trade and export activities focus on connecting quality Sri Lankan products and producers with buyers and business opportunities in international markets.</p>
          <div className="trade-categories">{tradeCategories.map(category => <span key={category}>{category}</span>)}</div>
          <button className="button-primary" onClick={() => scrollToId('#contact')} data-testid="button-export-contact">Discuss an Export Opportunity <ArrowUpRight size={14} /></button>
        </div>
        <div className="trade-visual reveal reveal-delay-2" aria-label="Abstract map of global connections">
          <div className="trade-map" /><span className="trade-line l1" /><span className="trade-line l2" /><span className="trade-line l3" />
          <span className="map-label sri">Sri Lanka</span><span className="map-label eu">Europe</span><span className="map-label me">Middle East</span><span className="map-label asia">Asia · Australia</span>
        </div>
      </div>
    </section>
  );
}

function Ventures() {
  return (
    <section className="section ventures" id="ventures" data-testid="section-ventures">
      <div className="container">
        <div className="reveal"><span className="eyebrow">Future opportunities</span><h2 className="section-title">Exploring What's Next.</h2><p className="section-copy">Our journey extends beyond today's businesses. We are actively exploring opportunities where Sri Lanka's resources, people and potential can connect with global demand.</p></div>
        <div className="venture-grid">
          <article className="venture-panel reveal"><span className="developing">Developing Venture</span><h3>Inbound Tourism</h3><p>Developing new opportunities around authentic Sri Lankan travel, culture, nature, agriculture and hospitality experiences.</p></article>
          <article className="venture-panel agri reveal reveal-delay-1"><span className="developing">Developing Venture</span><h3>Agriculture</h3><p>Exploring sustainable agricultural, plantation and export-oriented opportunities.</p></article>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    ['01', 'Multi-sector experience', 'Combining technology, trade and emerging business opportunities.'],
    ['02', 'Sri Lanka + Europe', 'Connecting Sri Lankan capabilities with international opportunities through our Sri Lanka and Czech Republic presence.'],
    ['03', 'Practical approach', 'Focused on real business requirements, practical solutions and sustainable relationships.'],
    ['04', 'International outlook', 'Designed with global markets, customers and partnerships in mind.'],
    ['05', 'Continuously evolving', 'Exploring new industries and opportunities as markets develop.'],
  ];
  return (
    <section className="section why" data-testid="section-why">
      <div className="container why-layout">
        <div className="reveal"><span className="eyebrow">Our point of view</span><h2 className="section-title">Built Around Opportunity.</h2></div>
        <div className="why-list">{items.map(([number, title, copy], index) => <article className={`why-item reveal reveal-delay-${(index % 3) + 1}`} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [active, setActive] = useState('All');
  const filters = ['All', 'Technology', 'Trade', 'Ventures'];
  const filteredItems = useMemo(() => portfolioItems.filter(item => active === 'All' || (active === 'Technology' && !['International Trade', 'Emerging Ventures'].includes(item[0])) || (active === 'Trade' && item[0] === 'International Trade') || (active === 'Ventures' && item[0] === 'Emerging Ventures')), [active]);
  return (
    <section className="section portfolio" id="portfolio" data-testid="section-portfolio">
      <div className="container">
        <div className="section-heading-row reveal"><div><span className="eyebrow">Selected work & capabilities</span><h2 className="section-title">A Capability<br />in Motion.</h2></div><p className="section-copy">Selected capability examples across the group. Each reflects the kind of practical work and opportunity we are equipped to explore.</p></div>
        <div className="portfolio-filter" role="tablist" aria-label="Portfolio filters">{filters.map(filter => <button className={`filter-button ${active === filter ? 'active' : ''}`} type="button" key={filter} onClick={() => setActive(filter)} role="tab" aria-selected={active === filter} data-testid={`button-filter-${filter.toLowerCase()}`}>{filter}</button>)}</div>
        <div className="portfolio-grid">{filteredItems.map(([category, title, copy], index) => <article className={`portfolio-card reveal reveal-delay-${(index % 3) + 1}`} key={category} data-testid={`card-portfolio-${category.toLowerCase().replaceAll(' ', '-')}`}><span className="portfolio-category">{category}</span><h3>{title}</h3><p>{copy}</p><a className="card-link" href="#contact" data-testid={`link-portfolio-${index}`}>View details <ArrowUpRight size={13} /></a></article>)}</div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [['01', 'Understand', 'We begin by understanding the business, market or opportunity.'], ['02', 'Plan', 'We define the right approach, resources and execution model.'], ['03', 'Build & Connect', 'We develop solutions, establish partnerships or coordinate opportunities.'], ['04', 'Grow', 'We focus on sustainable relationships and long-term development.']];
  return (
    <section className="section process" data-testid="section-process">
      <div className="container"><div className="reveal"><span className="eyebrow">How we work</span><h2 className="section-title">From Opportunity<br />to Execution.</h2></div><div className="process-line">{steps.map(([number, title, copy], index) => <article className={`process-step reveal reveal-delay-${(index % 3) + 1}`} key={number}><span className="process-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
    </section>
  );
}

function Locations() {
  return (
    <section className="section locations" id="locations" data-testid="section-locations">
      <div className="container"><div className="reveal"><span className="eyebrow">Our presence</span><h2 className="section-title">Connecting Sri Lanka<br />& Europe.</h2></div><div className="location-grid">
        <article className="location-card reveal"><span className="location-graphic" /><span className="eyebrow">South Asia</span><h3>Sri Lanka</h3><p>Luminous Nexus's Sri Lankan base, supporting technology solutions, international trade and emerging ventures.</p><span className="location-tag"><MapPin size={12} /> Sri Lanka</span></article>
        <article className="location-card cz reveal reveal-delay-1"><span className="location-graphic" /><span className="eyebrow">Central Europe</span><h3>Czech Republic</h3><p>Our European presence supporting international connections, partnerships and market opportunities.</p><span className="location-tag"><MapPin size={12} /> Czech Republic</span></article>
      </div></div>
    </section>
  );
}

function AboutVision() {
  return (
    <section className="section about" id="vision" data-testid="section-vision">
      <div className="container about-grid"><div className="reveal"><span className="eyebrow">The long view</span><h2 className="section-title">Building for Today.<br />Preparing for Tomorrow.</h2></div><div className="about-copy reveal reveal-delay-1"><p>Luminous Nexus was established with a vision of bringing together technology, business opportunities and international connections. Our approach is to build practical businesses today while continuously exploring new opportunities for tomorrow.</p><div className="vision-mission"><div className="vm-card"><span className="eyebrow">Vision</span><p>To build a diversified international business group connecting Sri Lankan capabilities with global opportunities.</p></div><div className="vm-card"><span className="eyebrow">Mission</span><p>To create practical technology solutions, develop international trade opportunities and build sustainable ventures across emerging sectors.</p></div></div></div></div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    formRef.current?.reset();
  };
  return (
    <section className="section contact" id="contact" data-testid="section-contact">
      <div className="container contact-grid"><div className="reveal"><span className="eyebrow">Start a conversation</span><h2 className="section-title">Let's Build Something Valuable.</h2><p className="section-copy">Whether you are looking for a technology partner, a Sri Lankan sourcing opportunity, an international business connection or a new venture partnership, we'd like to hear from you.</p><div className="hero-actions"><button className="button-ghost" onClick={() => scrollToId('#businesses')} data-testid="button-contact-businesses">Explore Our Businesses <ArrowUpRight size={14} /></button></div></div>
        <form className="contact-form reveal reveal-delay-1" ref={formRef} onSubmit={submit} data-testid="form-contact">
          {sent ? <div className="form-success" role="status" data-testid="status-contact-success"><strong>Thank you — your note is on its way.</strong>We will review your message and be in touch with the right next step.</div> : <>
            <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" data-testid="input-name" /></div>
            <div className="field"><label htmlFor="company">Company</label><input id="company" name="company" placeholder="Company name" data-testid="input-company" /></div>
            <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@company.com" data-testid="input-email" /></div>
            <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="Optional" data-testid="input-phone" /></div>
            <div className="field"><label htmlFor="country">Country</label><input id="country" name="country" placeholder="Where are you based?" data-testid="input-country" /></div>
            <div className="field"><label htmlFor="interest">Area of interest</label><select id="interest" name="interest" defaultValue="" data-testid="select-interest"><option value="" disabled>Select an area</option><option>Technology Solutions</option><option>International Trade & Export</option><option>Inbound Tourism</option><option>Agriculture & Agri Ventures</option><option>Partnership</option><option>General Inquiry</option></select></div>
            <div className="field full"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="Tell us a little about the opportunity." data-testid="textarea-message" /></div>
            <button className="button-primary form-submit" type="submit" data-testid="button-submit-contact">Send message <Send size={14} /></button>
          </>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
        <footer data-testid="site-footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Brand footer /><p className="footer-tagline">Building Businesses. Enabling Technology. Creating Opportunities.</p></div><div className="footer-col"><h4>Company</h4><a href="#about">About</a><a href="#businesses">Businesses</a><a href="#portfolio">Portfolio</a><a href="#locations">Locations</a><a href="#contact">Contact</a></div><div className="footer-col"><h4>Business</h4><a href="#technology">Technology</a><a href="#trade">Trade & Export</a><a href="#ventures">Inbound Tourism</a><a href="#ventures">Agriculture</a></div><div className="footer-col"><h4>Locations</h4><span>Sri Lanka</span><span>Czech Republic</span><h4 style={{ marginTop: 13 }}>Social</h4><div style={{ display: 'flex', gap: 12 }}><a href="#contact" aria-label="LinkedIn" data-testid="link-social-linkedin"><Linkedin size={15} /></a><a href="#contact" aria-label="Facebook" data-testid="link-social-facebook"><Facebook size={15} /></a><a href="#contact" aria-label="Instagram" data-testid="link-social-instagram"><Instagram size={15} /></a></div></div></div><div className="footer-bottom"><span>© 2026 Luminous Nexus (Pvt) Ltd. All Rights Reserved.</span><span>Sri Lanka · Czech Republic</span></div></div></footer>
  );
}

function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell"><Header /><main><Hero /><Introduction /><BusinessAreas /><Technology /><Trade /><Ventures /><WhyUs /><Portfolio /><Process /><Locations /><AboutVision /><Contact /></main><Footer /></div>;
}

function Router() {
  return <ErrorRouted><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorRouted>;
}

function ErrorRouted({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;