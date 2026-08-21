import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, CalendarDays, Check, ChevronRight, CircleDollarSign,
  Clock3, CreditCard, Gauge, Headphones, LayoutDashboard, MapPin, Menu,
  MessageSquareText, QrCode, ShieldCheck, Sparkles, Tag, X, Zap, Route, Building2,
} from 'lucide-react'

const capabilities = [
  { icon: CalendarDays, title: 'Price around demand', copy: 'Set weekday, weekend, event, and time-window pricing—then schedule it once.' },
  { icon: Gauge, title: 'See every space live', copy: 'Know what is available, active, expiring, or needs attention across every property.' },
  { icon: Tag, title: 'Validate the right guests', copy: 'Offer customer, employee, vendor, VIP, and merchant validations without paper passes.' },
  { icon: BarChart3, title: 'Turn space into insight', copy: 'Track revenue, occupancy, dwell time, repeat use, and performance by zone or event.' },
  { icon: ShieldCheck, title: 'Set your own rules', copy: 'Configure grace periods, session checks, evidence, and escalation based on your policies.' },
  { icon: LayoutDashboard, title: 'Manage one lot—or many', copy: 'Give each team the right access while leadership sees the full portfolio in one view.' },
  { icon: MessageSquareText, title: 'Keep guests informed', copy: 'Send receipts, expiration reminders, extensions, and support updates by text.' },
  { icon: CircleDollarSign, title: 'Clear payouts and reporting', copy: 'Reconcile every session and receive transparent property-level revenue reporting.' },
]

const nav = [['How it works', 'how'], ['For operators', 'operators'], ['Turnkey launch', 'launch']]

function Logo() {
  return <a className="logo" href="#top" aria-label="CedarPass home"><span className="logo-mark"><i /><i /></span><span>Cedar<span>Pass</span></span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [guestStep, setGuestStep] = useState(0)
  const [dashboardMode, setDashboardMode] = useState<'today' | 'event'>('today')
  const [pilotOpen, setPilotOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openPilot = () => {
    returnFocusRef.current = document.activeElement as HTMLElement
    setPilotOpen(true)
  }
  const closePilot = () => {
    setPilotOpen(false)
    window.setTimeout(() => returnFocusRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!pilotOpen) return
    dialogRef.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePilot()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      if (!items.length) return
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pilotOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return <div id="top">
    <header className="site-header">
      <Logo />
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        {nav.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
        <button className="nav-cta" onClick={openPilot}>Request a pilot <ArrowRight size={15} /></button>
      </nav>
      <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero">
        <img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="Guest scanning a premium parking sign at a Pacific Northwest destination" />
        <div className="hero-wash" />
        <div className="hero-content">
          <p className="eyebrow light"><span /> Premium spaces. Frictionless arrival.</p>
          <h1>Turn proximity into a <em>premium.</em></h1>
          <p className="hero-copy">CedarPass transforms your most convenient parking spaces into a new guest upgrade—without gates, kiosks, downloads, or construction.</p>
          <div className="hero-actions">
            <button className="button copper" onClick={openPilot}>Unlock your best spaces <ArrowRight /></button>
            <button className="button ghost" onClick={() => scrollTo('guest-demo')}><QrCode /> Try the guest experience</button>
          </div>
          <div className="hero-proof">
            <div><strong>01</strong><span>Scan the sign</span></div>
            <div><strong>02</strong><span>Pay in seconds</span></div>
            <div><strong>03</strong><span>Walk right in</span></div>
          </div>
        </div>
        <div className="space-badge"><span>SPACE</span><strong>A·012</strong><small>$8 · 4 hours</small></div>
        <div className="distance-badge"><Route /><span><strong>3 minutes closer</strong>to the Cedar entrance</span></div>
      </section>

      <section className="arrival-strip">
        <p>One platform. Every kind of destination.</p>
        <div><span>Entertainment districts</span><i /> <span>Casinos & resorts</span><i /> <span>Event venues</span><i /> <span>Retail destinations</span><i /> <span>Tribal enterprises</span></div>
      </section>

      <section className="story section" id="how">
        <div className="story-lead">
          <p className="eyebrow"><span /> A better first impression</p>
          <h2>The shortest walk can be your highest-performing amenity.</h2>
        </div>
        <div className="story-copy">
          <p>Guests already pay for better seats, faster entry, and upgraded rooms. The space closest to the door belongs in that same category.</p>
          <p>CedarPass creates a premium layer inside a free lot, generating measurable revenue while leaving the rest of your parking experience untouched.</p>
          <div className="story-metrics"><span><strong>0</strong>apps to download</span><span><strong>0</strong>gates to install</span><span><strong>1</strong>new revenue stream</span></div>
        </div>
      </section>

      <section className="steps section" aria-label="Guest journey">
        {[
          ['01', 'Pull in', 'A premium space is clearly marked, priced, and ready.'],
          ['02', 'Scan', 'The space-specific QR code opens instantly—no download.'],
          ['03', 'Pay', 'Add a plate, choose time, and pay securely in moments.'],
          ['04', 'Go enjoy', 'A digital session starts. Reminders and extensions follow by text.'],
        ].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><ChevronRight /></article>)}
      </section>

      <section className="guest-demo section" id="guest-demo">
        <div className="demo-number">01 / GUEST</div>
        <div className="demo-copy">
          <p className="eyebrow light"><span /> A checkout, not a commitment</p>
          <h2>Park now.<br /><em>Download nothing.</em></h2>
          <p>No account creation. No hunting through an app store. CedarPass keeps the moment simple, transparent, and on brand for your destination.</p>
          <ul>
            <li><Check /> Space-specific pricing and availability</li>
            <li><Check /> Apple Pay, Google Pay, or card-ready checkout</li>
            <li><Check /> Text receipt, reminders, and remote extension</li>
          </ul>
        </div>
        <div className="phone-wrap">
          <div className="phone" aria-label="Interactive guest parking demo">
            <div className="phone-top"><span>9:41</span><i /></div>
            {guestStep === 0 && <div className="phone-screen welcome">
              <Logo /><div className="phone-space">A·012</div><p>CEDAR ENTRANCE</p><h3>You found a closer spot.</h3><div className="price"><strong>$8</strong><span>up to 4 hours<br />until 10:30 PM</span></div><button onClick={() => setGuestStep(1)}>Park here <ArrowRight /></button><small>No app or account required</small>
            </div>}
            {guestStep === 1 && <div className="phone-screen form-screen">
              <button className="back" onClick={() => setGuestStep(0)}>← Back</button><p className="mini-label">SPACE A·012</p><h3>What are you driving?</h3><label>License plate<input defaultValue="ABC 1234" aria-label="License plate" /></label><label>State<select aria-label="State"><option>Washington</option></select></label><div className="summary"><span>Premium parking · 4 hours</span><strong>$8.00</strong></div><button onClick={() => setGuestStep(2)}>Continue to pay <CreditCard /></button>
            </div>}
            {guestStep === 2 && <div className="phone-screen pay-screen">
              <button className="back" onClick={() => setGuestStep(1)}>← Back</button><p className="mini-label">SECURE CHECKOUT</p><h3>Choose how to pay.</h3><button className="wallet" onClick={() => setGuestStep(3)}>Pay with Apple Pay</button><div className="or"><span>or use a card</span></div><div className="card-preview"><CreditCard /><span>•••• •••• •••• 4242</span></div><div className="summary"><span>Premium parking · 4 hours</span><strong>$8.00</strong></div><button onClick={() => setGuestStep(3)}>Pay $8.00 <ShieldCheck /></button><small>Instant receipt · Extend by text</small>
            </div>}
            {guestStep === 3 && <div className="phone-screen success">
              <div className="success-mark"><Check /></div><p className="mini-label">YOU'RE ALL SET</p><h3>Welcome. Go enjoy your visit.</h3><div className="ticket"><span>Space</span><strong>A·012</strong><span>Plate</span><strong>ABC 1234</strong><span>Good until</span><strong>10:30 PM</strong></div><p>We'll text you 30 minutes before your session ends.</p><button onClick={() => setGuestStep(0)}>Restart demo</button>
            </div>}
          </div>
          <div className="tap-note"><Sparkles /> Interactive preview</div>
        </div>
      </section>

      <section className="operators section" id="operators">
        <div className="section-index">02 / OPERATIONS</div>
        <div className="operators-heading">
          <div><p className="eyebrow"><span /> Control without complexity</p><h2>Your pavement finally has a <em>P&amp;L.</em></h2></div>
          <p>See what every premium space earns, when demand peaks, and where the next opportunity lives—from one destination to an entire portfolio.</p>
        </div>
        <div className="dashboard">
          <aside><Logo /><div className="dash-property"><span>PROPERTY</span><strong>Quil Ceda District</strong><small>3 premium zones</small></div>{['Overview', 'Live spaces', 'Pricing & events', 'Validations', 'Reports'].map((x, i) => <span className={i === 0 ? 'active' : ''} key={x}>{i === 0 ? <LayoutDashboard /> : i === 1 ? <MapPin /> : i === 2 ? <CalendarDays /> : i === 3 ? <ShieldCheck /> : <BarChart3 />}{x}</span>)}</aside>
          <div className="dash-main">
            <div className="dash-top"><div><small>FRIDAY · AUGUST 21 · ILLUSTRATIVE DEMO DATA</small><h3>Good afternoon, Jordan.</h3></div><div className="segmented"><button className={dashboardMode === 'today' ? 'active' : ''} onClick={() => setDashboardMode('today')}>Today</button><button className={dashboardMode === 'event' ? 'active' : ''} onClick={() => setDashboardMode('event')}>Event night</button></div></div>
            <div className="metrics"><div><span>Revenue today</span><strong>{dashboardMode === 'today' ? '$2,864' : '$7,440'}</strong><small>↑ 18.4% vs last Friday</small></div><div><span>Premium occupancy</span><strong>{dashboardMode === 'today' ? '74%' : '92%'}</strong><small>{dashboardMode === 'today' ? '89 of 120 spaces' : '110 of 120 spaces'}</small></div><div><span>Active sessions</span><strong>{dashboardMode === 'today' ? '86' : '107'}</strong><small>8 ending this hour</small></div></div>
            <div className="dash-grid">
              <div className="chart-card"><div className="card-title"><div><span>Arrival rhythm</span><small>Sessions by hour</small></div><span className="live"><i /> Live</span></div><div className="bars">{[24,35,42,38,56,65,88,72,96,78,60,45].map((h, i) => <i key={i} style={{height: `${dashboardMode === 'event' ? Math.min(100, h + 12) : h}%`}} />)}</div><div className="axis"><span>10a</span><span>1p</span><span>4p</span><span>7p</span><span>10p</span></div></div>
              <div className="zones"><div className="card-title"><div><span>Zone performance</span><small>Right now</small></div></div>{[['Cedar Entrance','34 / 36','94%'],['Event Center','31 / 44','70%'],['Retail Promenade','24 / 40','60%']].map(x => <div className="zone" key={x[0]}><span><i />{x[0]}</span><strong>{x[1]}</strong><em>{x[2]}</em></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section">
        <div className="section-index">03 / PLATFORM</div>
        <div className="cap-intro"><p className="eyebrow light"><span /> More than a payment page</p><h2>Built to earn.<br /><em>Designed to disappear.</em></h2></div>
        <div className="cap-list">{capabilities.map(({icon: Icon, title, copy}, i) => <article key={title}><span>{String(i + 1).padStart(2, '0')}</span><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>

      <section className="launch section" id="launch">
        <div className="section-index">04 / LAUNCH</div>
        <div className="launch-title"><p className="eyebrow"><span /> White-glove rollout</p><h2>Your lot. Our lift.<br /><em>Live in weeks.</em></h2></div>
        <div className="launch-roadmap">
          {[
            [MapPin, 'Walk & map', 'We identify the right premium inventory, guest paths, zones, and sign locations with your team.'],
            [QrCode, 'Build & install', 'We configure every space and install durable, destination-ready QR signage.'],
            [Zap, 'Launch & operate', 'We activate payments, reporting, support, and the workflows your operators choose.'],
            [Sparkles, 'Learn & optimize', 'We tune prices, schedules, and space mix using real demand—not guesswork.'],
          ].map(([Icon, title, copy], i) => { const C = Icon as typeof MapPin; return <article key={String(title)}><div><C /><span>0{i+1}</span></div><h3>{String(title)}</h3><p>{String(copy)}</p></article> })}
        </div>
      </section>

      <section className="responsibility section">
        <div className="responsibility-mark"><ShieldCheck /></div>
        <div><p className="eyebrow"><span /> Your property. Your policy.</p><h2>We make compliance visible—not confrontational.</h2></div>
        <div><p>CedarPass confirms active sessions, applies grace periods, records evidence, and gives authorized teams the information needed to manage the lot.</p><p>Your property chooses its parking policies, enforcement approach, and outside partners. CedarPass keeps those choices configurable—without making enforcement the guest experience.</p></div>
      </section>

      <section className="cta-section section">
        <div className="cta-rings" /><Building2 /><p className="eyebrow light"><span /> The opportunity is already striped</p><h2>Put your best spaces <em>to work.</em></h2><p>Start with one entrance, one event zone, or one destination. We’ll help you design a pilot that proves the experience and the opportunity.</p><button className="button copper" onClick={openPilot}>Design my CedarPass pilot <ArrowRight /></button><small><Clock3 /> A focused 30-minute property conversation</small>
      </section>
    </main>

    <footer><div><Logo /><p>Premium parking, beautifully managed.</p></div><div><span>Working product concept</span><p>CedarPass is a working name. Cultural, legal, and commercial review will inform the final brand and offering.</p></div><small>© 2026 CedarPass concept by CloudKicker</small></footer>

    {pilotOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closePilot()}>
      <div className="modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pilot-title">
        <button className="modal-close" aria-label="Close" onClick={closePilot}><X /></button>
        <p className="eyebrow"><span /> Start small. Learn fast.</p><h2 id="pilot-title">Let’s shape your first CedarPass zone.</h2><p>Tell us where guests gather and what a better arrival could mean. This concept form doesn’t send data yet—but it shows the pilot conversation we’re designing.</p>
        <div className="pilot-points"><span><MapPin /> Property walk and space selection</span><span><QrCode /> Signage and launch design</span><span><BarChart3 /> Success metrics and reporting</span><span><Headphones /> Ongoing guest and operator support</span></div>
        <button className="button dark" onClick={closePilot}>Got it—continue exploring <ArrowRight /></button>
      </div>
    </div>}
  </div>
}

export default App
