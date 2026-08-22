import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronLeft, X } from 'lucide-react'

const chapters = [
  ['00', 'Approach'], ['01', 'Choose'], ['02', 'Activate'], ['03', 'Arrive'], ['04', 'Perform'],
]

function Mark() {
  return <a className="mark" href="#opening" aria-label="CedarPass home"><i>CP</i><span>CEDAR<br />PASS</span></a>
}

function Phone() {
  const [step, setStep] = useState(0)
  return <div className="device-wrap">
    <div className="device">
      <div className="island" /><div className="status">9:41 <span>● ● ▰</span></div>
      {step === 0 && <div className="screen start">
        <div className="phone-brand">CEDAR / PASS</div>
        <div className="space-number">A12</div>
        <div className="space-meta"><span>CEDAR ENTRANCE</span><span>AVAILABLE</span></div>
        <div className="price"><strong>$10</strong><span>UNTIL<br />10:30 PM</span></div>
        <button onClick={() => setStep(1)}>Claim this space <ArrowRight /></button>
      </div>}
      {step === 1 && <div className="screen detail">
        <button className="back" onClick={() => setStep(0)}><ChevronLeft /> A12</button>
        <h3>Your plate<br />is your pass.</h3>
        <label>LICENSE PLATE<input aria-label="License plate" defaultValue="ABC 1234" /></label>
        <label>MOBILE NUMBER<input aria-label="Mobile number" defaultValue="(425) 555-0148" /></label>
        <button onClick={() => setStep(2)}>Continue <ArrowRight /></button>
      </div>}
      {step === 2 && <div className="screen detail payment">
        <button className="back" onClick={() => setStep(1)}><ChevronLeft /> VEHICLE</button>
        <h3>Confirm<br />the upgrade.</h3>
        <div className="receipt"><span>Premium space A12</span><b>$10.00</b><span>Service</span><b>Included</b></div>
        <button onClick={() => setStep(3)}>Pay $10.00</button>
      </div>}
      {step === 3 && <div className="screen complete">
        <div className="complete-ring"><Check /></div>
        <span>SESSION ACTIVE</span><h3>Walk in.</h3><p>Space A12 is active until 10:30 PM. We’ll text before time runs out.</p>
        <div className="plate"><span>ABC 1234</span><b>A12</b></div>
        <button onClick={() => setStep(0)}>Replay</button>
      </div>}
    </div>
    <span className="demo-label">LIVE DEMO — TAP TO DRIVE</span>
  </div>
}

function App() {
  const [active, setActive] = useState(0)
  const [pilot, setPilot] = useState(false)
  const nodes = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.chapter))
    }), { threshold: .55 })
    nodes.current.forEach(node => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return <main>
    <aside className="spine">
      <Mark />
      <div className="chapter-rail">{chapters.map(([n, label], i) => <a key={n} href={`#chapter-${i}`} className={active === i ? 'active' : ''}><i /><span>{n}</span><b>{label}</b></a>)}</div>
      <button onClick={() => setPilot(true)}>PILOT <ArrowRight /></button>
    </aside>

    <section className="opening" id="opening">
      <img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="A guest arriving at a premium CedarPass parking space" />
      <div className="opening-title"><span>THE VALUE OF</span><strong>300</strong><em>FEET</em></div>
      <div className="opening-caption"><p>A closer space changes the arrival.</p><span>Premium parking for places that already offer free parking.</span></div>
      <a href="#chapter-0" className="start-film"><span>START THE ARRIVAL</span><ArrowDown /></a>
    </section>

    <section className="journey">
      <article id="chapter-0" data-chapter="0" ref={n => { nodes.current[0] = n }} className="chapter approach">
        <div className="chapter-index"><b>00:08</b><span>APPROACH</span></div>
        <div className="approach-meter" aria-label="300 feet to the entrance">
          <div className="distance-readout"><strong>300</strong><span>FT</span></div>
          <div className="lane-line"><i /><i /><i /><i /></div>
          <div className="destination"><span>DESTINATION</span><b>CEDAR ENTRANCE</b></div>
        </div>
        <div className="approach-statement">
          <span>THE LAST 300 FEET</span>
          <p>Every property has a shortest walk.<br /><strong>CedarPass turns it into premium inventory.</strong></p>
        </div>
        <div className="drive-data"><span>SPACE <b>A12</b></span><span>STATUS <b>AVAILABLE</b></span><span>ARRIVAL <b>00:49</b></span></div>
      </article>

      <article id="chapter-1" data-chapter="1" ref={n => { nodes.current[1] = n }} className="chapter choose">
        <div className="chapter-index"><b>00:21</b><span>CHOOSE</span></div>
        <div className="distance"><span>GENERAL PARKING</span><strong>1,240'</strong><i /><span>CEDARPASS</span><strong>300'</strong></div>
        <div className="choice-copy"><p>Guests do not need an explanation.</p><h2>Closer<br />is the product.</h2></div>
        <div className="space-tag"><span>SPACE</span><b>A12</b><small>SCAN TO PARK</small></div>
      </article>

      <article id="chapter-2" data-chapter="2" ref={n => { nodes.current[2] = n }} className="chapter activate">
        <div className="chapter-index"><b>00:34</b><span>ACTIVATE</span></div>
        <div className="activation-copy"><p>NO DOWNLOAD<br />NO ACCOUNT<br />NO GATE</p><h2>Fifty<br />seconds.</h2><span>Scan the sign. Enter the plate. Pay. Walk in.</span></div>
        <Phone />
        <div className="scan-beam"><i /><i /><i /></div>
      </article>

      <article id="chapter-3" data-chapter="3" ref={n => { nodes.current[3] = n }} className="chapter arrive">
        <div className="chapter-index"><b>00:49</b><span>ARRIVE</span></div>
        <div className="arrival-word">ARRIVE</div>
        <blockquote>“Premium should feel like a better welcome—not another parking system.”</blockquote>
        <div className="service-strip"><span>SMS REMINDERS</span><span>ONE-TAP EXTENSIONS</span><span>DIGITAL RECEIPTS</span><span>LIVE SESSION STATUS</span></div>
      </article>

      <article id="chapter-4" data-chapter="4" ref={n => { nodes.current[4] = n }} className="chapter perform">
        <div className="chapter-index"><b>01:03</b><span>PERFORM</span></div>
        <div className="performance-line"><span>PAVEMENT</span><i /><span>HOSPITALITY</span><i /><span>REVENUE</span></div>
        <div className="number"><strong>$6,480</strong><span>ILLUSTRATIVE<br />MONTHLY GROSS</span></div>
        <p>36 premium spaces × $10 × 18 monthly sessions</p>
        <small>Illustrative only. Before utilization, costs, taxes, and revenue sharing.</small>
      </article>
    </section>

    <section className="boardroom">
      <div className="boardroom-lead"><span>THE ARRIVAL ENDS HERE.</span><h2>The operating burden<br />doesn't begin.</h2></div>
      <div className="managed">
        <p>We walk the property, select the inventory, install every sign, run the payment experience, and report performance. Your team chooses policy. CedarPass runs the platform.</p>
        <ol><li><b>01</b>Property & demand study</li><li><b>02</b>Space and pricing plan</li><li><b>03</b>Sign fabrication & installation</li><li><b>04</b>Payments, reporting & optimization</li></ol>
      </div>
      <div className="control"><span>PROPERTY CONTROL</span><div><b>Pricing</b><b>Hours</b><b>Inventory</b><b>Enforcement policy</b></div><p>CedarPass identifies valid sessions. The property retains control of enforcement and towing decisions.</p></div>
    </section>

    <section className="final-frame">
      <Mark /><p>Start with one entrance.</p><button onClick={() => setPilot(true)}>DESIGN THE PILOT <ArrowRight /></button><span>PREMIUM PARKING / FULLY MANAGED</span>
    </section>

    {pilot && <div className="modal" onMouseDown={e => e.target === e.currentTarget && setPilot(false)}><div role="dialog" aria-modal="true" aria-labelledby="pilot-heading"><button className="close" aria-label="Close" onClick={() => setPilot(false)}><X /></button><span>CEDARPASS / PILOT 001</span><h2 id="pilot-heading">One entrance.<br />A measurable case.</h2><p>We’ll identify the strongest premium zone, model demand and pricing, and design the complete guest arrival.</p><ol><li>Property walk</li><li>Opportunity model</li><li>Launch plan</li></ol><button className="modal-action" onClick={() => setPilot(false)}>Return to CedarPass <ArrowRight /></button></div></div>}
  </main>
}

export default App
