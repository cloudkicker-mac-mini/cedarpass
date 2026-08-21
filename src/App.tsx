import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, BarChart3, CalendarClock, Check, ChevronLeft, ChevronRight,
  Clock3, CreditCard, Headphones, Map, MapPin, Menu, QrCode, ShieldCheck, Sparkles,
  TicketCheck, TrendingUp, X, Zap,
} from 'lucide-react'

const guestSteps = [
  { n: '01', label: 'ARRIVE', title: 'See the better spot.', body: 'Clearly marked premium spaces make the upgrade obvious before your guest ever leaves the car.', detail: 'Cedar entrance · Space A-012' },
  { n: '02', label: 'SCAN', title: 'Point. Tap. Done.', body: 'A space-specific QR code opens a fast mobile checkout. No app store. No account wall.', detail: 'Average start time · under 60 sec' },
  { n: '03', label: 'GO', title: 'Walk right in.', body: 'The plate becomes the permit. Receipts, reminders, and extensions arrive by text.', detail: 'Paid until · 10:30 PM' },
]

const operatorTools = [
  ['Demand pricing', 'Schedule standard, event, and peak pricing by zone.'],
  ['Live occupancy', 'See active, available, expiring, and attention-needed spaces.'],
  ['Guest validation', 'Create customer, employee, vendor, merchant, and VIP access.'],
  ['Portfolio control', 'Run one entrance or fifty properties from one account.'],
  ['Revenue intelligence', 'Understand yield, dwell time, repeat visits, and zone performance.'],
  ['Policy controls', 'Set grace periods and workflows around your property’s rules.'],
]

function Logo() {
  return <a className="logo" href="#top" aria-label="CedarPass home"><span className="logo-glyph">C</span><span>CEDAR<strong>PASS</strong></span></a>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [journey, setJourney] = useState(0)
  const [spaces, setSpaces] = useState(40)
  const [price, setPrice] = useState(8)
  const [days, setDays] = useState(12)
  const [pilotOpen, setPilotOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const estimate = spaces * price * days
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  useEffect(() => {
    if (!pilotOpen) return
    modalRef.current?.querySelector<HTMLElement>('button')?.focus()
    const key = (event: KeyboardEvent) => event.key === 'Escape' && setPilotOpen(false)
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [pilotOpen])

  return <div id="top">
    <header className="header">
      <Logo />
      <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
        <button onClick={() => scrollTo('guest')}>Guest flow</button>
        <button onClick={() => scrollTo('economics')}>Lot economics</button>
        <button onClick={() => scrollTo('operate')}>Operations</button>
      </nav>
      <button className="header-cta" onClick={() => setPilotOpen(true)}>Plan a pilot <ArrowRight /></button>
      <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-image"><img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="Guest scanning a premium parking sign at a Pacific Northwest destination" /><div className="image-tag"><span>CEDAR ENTRANCE</span><strong>3 MINUTES CLOSER</strong></div></div>
        <div className="hero-word">CLOSER</div>
        <div className="hero-copy-block">
          <p>PREMIUM PARKING / ZERO FRICTION</p>
          <h1>The upgrade<br />before the entrance.</h1>
          <div><p>Turn the closest spaces in your free lot into a fast, fully managed guest upgrade.</p><button onClick={() => scrollTo('economics')}>See the opportunity <ArrowDown /></button></div>
        </div>
        <div className="hero-seal"><span>SCAN</span><QrCode /><span>PAY & GO</span></div>
      </section>

      <section className="statement">
        <p>THE SIMPLE IDEA</p>
        <h2>Parking stays free.<br /><span>Convenience becomes a choice.</span></h2>
        <div className="statement-foot"><p>Guests already understand premium access. CedarPass gives them the option to shorten the walk—without gates, meters, downloads, or construction.</p><div><strong>NO APP</strong><strong>NO GATE</strong><strong>NO NEW PAVEMENT</strong></div></div>
      </section>

      <section className="journey" id="guest">
        <div className="journey-sidebar"><span>01</span><p>THE GUEST<br />MOMENT</p><div className="journey-controls"><button aria-label="Previous guest step" onClick={() => setJourney((journey + 2) % 3)}><ChevronLeft /></button><button aria-label="Next guest step" onClick={() => setJourney((journey + 1) % 3)}><ChevronRight /></button></div></div>
        <div className="journey-stage">
          <div className="journey-head"><span>{guestSteps[journey].label}</span><span>{guestSteps[journey].n} / 03</span></div>
          <h2>{guestSteps[journey].title}</h2>
          <p>{guestSteps[journey].body}</p>
          <div className="journey-detail"><QrCode /><span>{guestSteps[journey].detail}</span></div>
          <div className="journey-tabs">{guestSteps.map((step, i) => <button className={journey === i ? 'active' : ''} onClick={() => setJourney(i)} key={step.n}><span>{step.n}</span>{step.label}</button>)}</div>
        </div>
        <div className="journey-ticket">
          <div className="ticket-top"><Logo /><span>SPACE</span></div><strong>A—012</strong><p>CEDAR ENTRANCE</p><div className="ticket-price"><strong>$8</strong><span>UP TO 4 HOURS<br />UNTIL 10:30 PM</span></div><button onClick={() => setJourney((journey + 1) % 3)}>Park here <ArrowRight /></button><small>NO APP OR ACCOUNT REQUIRED</small>
        </div>
      </section>

      <section className="economics" id="economics">
        <div className="economics-intro"><span>02 / THE BUSINESS CASE</span><h2>Find the revenue hiding between the stripes.</h2><p>This is not a forecast or promise. It is a simple way to size the gross transaction opportunity before occupancy, costs, taxes, and revenue sharing.</p></div>
        <div className="calculator">
          <div className="calc-result"><span>ILLUSTRATIVE MONTHLY GROSS</span><strong>${estimate.toLocaleString()}</strong><small>{spaces} spaces × ${price} × {days} paid sessions each</small></div>
          <label><span>Premium spaces <strong>{spaces}</strong></span><input aria-label="Premium spaces" type="range" min="10" max="120" step="5" value={spaces} onChange={e => setSpaces(Number(e.target.value))} /></label>
          <label><span>Average session <strong>${price}</strong></span><input aria-label="Average session price" type="range" min="4" max="20" value={price} onChange={e => setPrice(Number(e.target.value))} /></label>
          <label><span>Paid sessions per space / month <strong>{days}</strong></span><input aria-label="Paid sessions per month" type="range" min="2" max="30" value={days} onChange={e => setDays(Number(e.target.value))} /></label>
        </div>
        <div className="lot-map" aria-label="Illustrative premium parking zone map">
          <div className="venue"><MapPin /><span>ENTRANCE</span></div>
          {[...Array(18)].map((_, i) => <i key={i} className={i < 6 ? 'premium' : ''}><span>{i < 6 ? `$${price}` : 'FREE'}</span></i>)}
          <p><strong>6 premium spaces</strong><span>Closest to arrival</span></p>
        </div>
      </section>

      <section className="operate" id="operate">
        <div className="operate-title"><span>03 / CONTROL ROOM</span><h2>Run the lot.<br />Not around it.</h2><p>One operating picture for every space, price, session, validation, and property.</p></div>
        <div className="control-room">
          <div className="control-nav"><Logo /><span>QUIL CEDA DISTRICT</span><div>{['Portfolio', 'Live map', 'Pricing', 'Guests', 'Reports'].map((x,i)=><button className={i===1?'active':''} key={x}>{i===1&&<i />}{x}</button>)}</div><small>3 PROPERTIES · 120 SPACES</small></div>
          <div className="control-map">
            <div className="map-top"><div><span>LIVE SPACE MAP</span><h3>Cedar Entrance</h3></div><strong><i /> 34 ACTIVE</strong></div>
            <div className="space-grid">{[...Array(24)].map((_,i)=><span className={i===5?'attention':i<18?'active':''} key={i}>{String(i+1).padStart(2,'0')}</span>)}</div>
            <div className="map-legend"><span><i className="active"/>Active</span><span><i/>Available</span><span><i className="attention"/>Expiring</span></div>
          </div>
          <div className="control-stats"><div><span>TODAY</span><strong>$2,864</strong><small><TrendingUp /> 18.4%</small></div><div><span>OCCUPANCY</span><strong>74%</strong><small>89 / 120</small></div><div><span>NEXT PEAK</span><strong>6:30</strong><small><CalendarClock /> Event night</small></div></div>
        </div>
      </section>

      <section className="toolkit">
        <div className="toolkit-head"><span>THE PLATFORM</span><h2>Everything behind the sign.</h2></div>
        <div className="tool-list">{operatorTools.map(([title, body], i) => <article key={title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowRight /></article>)}</div>
      </section>

      <section className="service">
        <div className="service-marquee">WE MAP IT&nbsp; / &nbsp;WE INSTALL IT&nbsp; / &nbsp;WE RUN IT&nbsp; / &nbsp;</div>
        <div className="service-grid">
          <div><Map /><span>01</span><h3>Choose the right spaces.</h3><p>We walk the property with your team and map premium inventory, guest paths, zones, and signage.</p></div>
          <div><QrCode /><span>02</span><h3>Install every touchpoint.</h3><p>We configure each space and install durable, destination-ready QR signs.</p></div>
          <div><Headphones /><span>03</span><h3>Operate and optimize.</h3><p>We run payments, reporting, support, and continuous performance tuning.</p></div>
        </div>
      </section>

      <section className="policy">
        <ShieldCheck />
        <div><span>PROPERTY-CONTROLLED POLICY</span><h2>We verify the session.<br />You decide what happens next.</h2></div>
        <p>CedarPass confirms payment, tracks grace periods, and gives authorized teams clear information. Your property chooses its rules, enforcement approach, and outside partners. The guest experience stays focused on arrival—not towing.</p>
      </section>

      <section className="closing">
        <div className="closing-number">04</div><p>YOUR BEST SPACES ARE ALREADY THERE</p><h2>Make the short walk<br />worth something.</h2><button onClick={() => setPilotOpen(true)}>Build my pilot <ArrowRight /></button><div className="closing-notes"><span><Zap /> Start with one zone</span><span><Clock3 /> Focused property review</span><span><Sparkles /> Fully managed launch</span></div>
      </section>
    </main>

    <footer><Logo /><p>Premium parking, fully managed.</p><span>CedarPass is a working name and product concept. Final commercial, legal, and cultural review pending.</span><small>© 2026 CLOUDKICKER</small></footer>

    {pilotOpen && <div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget&&setPilotOpen(false)}><div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="pilot-title"><button className="modal-close" aria-label="Close" onClick={()=>setPilotOpen(false)}><X /></button><span>CEDARPASS PILOT</span><h2 id="pilot-title">Start with the spaces closest to what matters.</h2><p>We’ll map one focused premium zone, model the opportunity, define success, and handle the physical and digital launch.</p><div><span><MapPin /> Property walk</span><span><QrCode /> Sign installation</span><span><CreditCard /> Payment setup</span><span><BarChart3 /> Performance reporting</span></div><button className="modal-action" onClick={()=>setPilotOpen(false)}>Continue exploring <ArrowRight /></button></div></div>}
  </div>
}

export default App
