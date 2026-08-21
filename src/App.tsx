import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronRight, Gauge, Menu, Minus, Plus, QrCode, X } from 'lucide-react'

const chapters = [
  { id: '01', time: '6:42 PM', title: 'The arrival', copy: 'A guest sees the closest space before they see the entrance. The value is immediate: less distance, less friction, a better beginning.' },
  { id: '02', time: '6:43 PM', title: 'The decision', copy: 'One scan opens the exact space. No account. No download. The plate becomes the permit in under a minute.' },
  { id: '03', time: '6:44 PM', title: 'The experience', copy: 'They leave the car already feeling looked after. CedarPass sends the receipt, reminder, and extension link automatically.' },
]

function Mark() {
  return <a className="mark" href="#top" aria-label="CedarPass home"><i /><span>CEDAR<b>PASS</b></span></a>
}

function App() {
  const [menu, setMenu] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [spaces, setSpaces] = useState(36)
  const [price, setPrice] = useState(10)
  const [turns, setTurns] = useState(18)
  const [demo, setDemo] = useState(0)
  const [modal, setModal] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const monthly = spaces * price * turns

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  useEffect(() => {
    if (!modal) return
    modalRef.current?.querySelector<HTMLElement>('button')?.focus()
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [modal])

  return <div id="top" className="site">
    <header>
      <Mark />
      <nav className={menu ? 'open' : ''}>
        <button onClick={() => go('film')}>The experience</button>
        <button onClick={() => go('case')}>Investment case</button>
        <button onClick={() => go('system')}>The system</button>
      </nav>
      <button className="pilot-link" onClick={() => setModal(true)}>Explore a pilot <ArrowRight /></button>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="opening">
        <div className="opening-photo"><img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="Guest arriving at a premium CedarPass parking space" /></div>
        <div className="opening-shade" />
        <div className="opening-copy">
          <span className="serial">CEDARPASS / ARRIVAL 001</span>
          <h1>Make arrival<br />feel first class.</h1>
          <p>A fully managed premium-parking experience for the best spaces already in your lot.</p>
        </div>
        <button className="opening-action" onClick={() => go('film')}><span>Experience the journey</span><ArrowDown /></button>
        <div className="opening-dials"><span><i>01</i> NO APP</span><span><i>02</i> NO GATES</span><span><i>03</i> LIVE IN WEEKS</span></div>
        <div className="speedline"><i /><span>THE LAST 300 FEET MATTER</span></div>
      </section>

      <section className="premise">
        <div className="premise-index">01</div>
        <p className="premise-lead">The parking lot is usually where the experience stops.</p>
        <h2>We make it<br /><em>where hospitality starts.</em></h2>
        <div className="premise-note"><span>THE OPPORTUNITY</span><p>Keep the lot free. Give guests the choice to pay for proximity—and turn a small piece of existing pavement into a new, measurable revenue stream.</p></div>
      </section>

      <section className="film" id="film">
        <div className="film-rail">
          <span>ONE GUEST</span><i /><span>ONE MINUTE</span><i /><span>ONE BETTER ARRIVAL</span>
        </div>
        <div className="film-stage">
          <div className="chapter-nav">
            {chapters.map((item, index) => <button key={item.id} className={chapter === index ? 'active' : ''} onClick={() => setChapter(index)}><b>{item.id}</b><span>{item.title}</span></button>)}
          </div>
          <div className="chapter-copy" key={chapter}>
            <span>{chapters[chapter].time}</span>
            <h2>{chapters[chapter].title}</h2>
            <p>{chapters[chapter].copy}</p>
            <button onClick={() => setChapter((chapter + 1) % chapters.length)}>Next scene <ChevronRight /></button>
          </div>
          <div className="device-scene">
            <div className="halo" />
            <div className="device">
              <div className="device-top"><span>9:41</span><i /></div>
              {demo === 0 && <div className="device-screen arrival-screen"><Mark /><span className="device-label">CEDAR ENTRANCE · A12</span><div className="space-number">A<span>—</span>12</div><h3>The closer space.</h3><p>Premium parking until 10:30 PM</p><div className="price"><b>$10</b><span>ONE-TIME<br />SESSION</span></div><button onClick={() => setDemo(1)}>Start parking <ArrowRight /></button></div>}
              {demo === 1 && <div className="device-screen plate-screen"><button className="back" onClick={() => setDemo(0)}>Back</button><span className="device-label">IDENTIFY YOUR VEHICLE</span><h3>Your plate<br />is your pass.</h3><label>LICENSE PLATE<input aria-label="License plate" defaultValue="ABC 1234" /></label><label>STATE<select aria-label="State" defaultValue="Washington"><option>Washington</option><option>Oregon</option></select></label><button onClick={() => setDemo(2)}>Continue <ArrowRight /></button></div>}
              {demo === 2 && <div className="device-screen payment-screen"><button className="back" onClick={() => setDemo(1)}>Back</button><span className="device-label">CONFIRM & PAY</span><h3>One tap<br />from arrival.</h3><div className="payment-total"><span>SPACE A12<br />UNTIL 10:30 PM</span><b>$10.00</b></div><button className="wallet" onClick={() => setDemo(3)}>Pay</button><small>SECURE PAYMENT · RECEIPT BY TEXT</small></div>}
              {demo === 3 && <div className="device-screen done-screen"><div className="done-ring"><Check /></div><span className="device-label">SESSION ACTIVE</span><h3>You're all set.</h3><p>Space A12 is active until 10:30 PM. Enjoy your visit.</p><div className="permit"><span>ABC 1234</span><b>ACTIVE</b></div><button onClick={() => setDemo(0)}>Replay experience</button></div>}
            </div>
            <span className="demo-callout">INTERACTIVE DEMO <i /> TAP THE SCREEN</span>
          </div>
        </div>
      </section>

      <section className="case" id="case">
        <div className="case-heading"><span>THE EXECUTIVE VIEW / 02</span><h2>A premium layer.<br />Not a parking overhaul.</h2></div>
        <div className="case-orbit">
          <div className="orbit-center"><Gauge /><span>ILLUSTRATIVE<br />MONTHLY GROSS</span><strong>${monthly.toLocaleString()}</strong><small>before utilization, costs, taxes & revenue share</small></div>
          <div className="orbit-control north"><button aria-label="Decrease premium spaces" onClick={() => setSpaces(Math.max(12, spaces - 6))}><Minus /></button><div><span>PREMIUM SPACES</span><b>{spaces}</b></div><button aria-label="Increase premium spaces" onClick={() => setSpaces(Math.min(120, spaces + 6))}><Plus /></button></div>
          <div className="orbit-control east"><button aria-label="Decrease average price" onClick={() => setPrice(Math.max(4, price - 1))}><Minus /></button><div><span>AVERAGE PRICE</span><b>${price}</b></div><button aria-label="Increase average price" onClick={() => setPrice(Math.min(24, price + 1))}><Plus /></button></div>
          <div className="orbit-control south"><button aria-label="Decrease monthly turns" onClick={() => setTurns(Math.max(4, turns - 2))}><Minus /></button><div><span>SESSIONS / SPACE</span><b>{turns}</b></div><button aria-label="Increase monthly turns" onClick={() => setTurns(Math.min(40, turns + 2))}><Plus /></button></div>
        </div>
        <div className="case-outcomes"><p><b>New yield</b><span>from pavement you already own</span></p><p><b>Better arrival</b><span>for guests who value convenience</span></p><p><b>Clear intelligence</b><span>across price, demand, and dwell time</span></p></div>
      </section>

      <section className="system" id="system">
        <div className="system-word">MANAGED</div>
        <div className="system-copy"><span>FROM CURB TO CONTROL ROOM / 03</span><h2>You choose the spaces.<br />We make them perform.</h2></div>
        <div className="system-line">
          <article><i>01</i><h3>Design the zone</h3><p>Property walk, space strategy, pricing model, and guest-flow planning.</p></article>
          <article><i>02</i><h3>Install the experience</h3><p>Premium signs, unique QR identity, payments, and launch configuration.</p></article>
          <article><i>03</i><h3>Operate the platform</h3><p>Live sessions, validations, reporting, support, and pricing intelligence.</p></article>
          <article><i>04</i><h3>Respect your policy</h3><p>We provide accurate session status. Your property controls its own enforcement approach.</p></article>
        </div>
      </section>

      <section className="finale">
        <span>THE BEST SPACE IN THE LOT</span>
        <h2>Should do more<br />than sit empty.</h2>
        <button onClick={() => setModal(true)}>Explore a CedarPass pilot <ArrowRight /></button>
        <div className="finale-floor"><span>NO CONSTRUCTION</span><span>FULLY MANAGED</span><span>EXECUTIVE REPORTING</span></div>
      </section>
    </main>

    <footer><Mark /><span>PREMIUM PARKING, FULLY MANAGED.</span><small>CedarPass is a working name and product concept. © 2026 CloudKicker.</small></footer>

    {modal && <div className="modal-wrap" onMouseDown={event => event.target === event.currentTarget && setModal(false)}><div className="pilot-modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="pilot-heading"><button className="modal-x" aria-label="Close" onClick={() => setModal(false)}><X /></button><span>CEDARPASS / PILOT PROGRAM</span><h2 id="pilot-heading">Start with one entrance.</h2><p>We’ll identify the premium zone, model its opportunity, design the arrival experience, and deliver a focused launch plan.</p><div className="modal-sequence"><span>01 Property walk</span><span>02 Opportunity model</span><span>03 Launch design</span></div><button className="modal-primary" onClick={() => setModal(false)}>Continue exploring <ArrowRight /></button></div></div>}
  </div>
}

export default App
