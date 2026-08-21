import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Check, Menu, Pause, Play, QrCode, Volume2, X } from 'lucide-react'

const scenes = [
  { time: '00:00', title: 'The lot is free.', line: 'The best arrival does not have to be.', note: 'A new premium layer for the spaces guests already want.' },
  { time: '00:18', title: 'Three minutes closer.', line: 'Worth it before they leave the car.', note: 'Premium spaces create an immediate, understandable choice.' },
  { time: '00:31', title: 'Scan. Plate. Pay.', line: 'The entire transaction takes less than a minute.', note: 'No app. No account. No gate. The plate becomes the permit.' },
  { time: '00:47', title: 'Arrival, upgraded.', line: 'The guest walks in. CedarPass keeps working.', note: 'Receipts, reminders, extensions, and live session status happen automatically.' },
  { time: '01:02', title: 'The space performs.', line: 'Hospitality for the guest. Yield for the property.', note: 'A managed revenue stream built from pavement you already own.' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="CedarPass home"><i /><span>CEDAR<b>PASS</b></span></a>
}

function App() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [menu, setMenu] = useState(false)
  const [phone, setPhone] = useState(0)
  const [pilot, setPilot] = useState(false)
  const sceneRefs = useRef<(HTMLElement | null)[]>([])
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.scene))
    }), { threshold: .58 })
    sceneRefs.current.forEach(scene => scene && observer.observe(scene))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pilot) return
    modalRef.current?.querySelector<HTMLElement>('button')?.focus()
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setPilot(false)
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [pilot])

  const jump = (index: number) => sceneRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return <div id="top">
    <header className="film-header">
      <Brand />
      <div className="film-title">A CEDARPASS FILM <span>01:18</span></div>
      <button className="header-pilot" onClick={() => setPilot(true)}>Plan a pilot <ArrowRight /></button>
      <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      {menu && <nav><button onClick={() => jump(0)}>Restart film</button><button onClick={() => jump(4)}>The business case</button><button onClick={() => setPilot(true)}>Plan a pilot</button></nav>}
    </header>

    <main>
      <section className="prologue">
        <div className="prologue-photo"><img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="Guest arriving at a CedarPass premium parking space" /></div>
        <div className="prologue-grade" />
        <div className="prologue-copy">
          <span>PREMIUM PARKING / FULLY MANAGED</span>
          <h1>THE<br />ARRIVAL</h1>
          <p>A one-minute story about the value hiding in the final three hundred feet.</p>
          <button onClick={() => jump(0)}>Begin <ArrowDown /></button>
        </div>
        <div className="prologue-credit"><span>CEDARPASS</span><span>QUIL CEDA / CONCEPT 01</span></div>
      </section>

      <section className={`film-reel scene-${active} ${playing ? 'playing' : 'paused'}`}>
        <div className="film-viewport">
          <div className="film-image"><img src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`} alt="" /></div>
          <div className="film-vignette" />
          <div className="grain" />

          <div className="frame-copy" key={active}>
            <span>{scenes[active].time} / SCENE {String(active + 1).padStart(2, '0')}</span>
            <h2>{scenes[active].title}</h2>
            <p>{scenes[active].line}</p>
            <small>{scenes[active].note}</small>
          </div>

          <div className={`scan-moment ${active === 2 ? 'visible' : ''}`}>
            <div className="sign"><i>CP</i><QrCode /><span>SPACE A12</span></div>
            <div className="scan-ring"><i /><i /><i /></div>
          </div>

          <div className={`phone-moment ${active === 2 || active === 3 ? 'visible' : ''}`}>
            <div className="cinema-phone">
              <div className="phone-bar"><span>9:41</span><i /></div>
              {phone === 0 && <div className="phone-frame"><Brand /><span>CEDAR ENTRANCE · A12</span><h3>You found<br />the closer spot.</h3><div className="phone-fare"><b>$10</b><small>UNTIL 10:30 PM</small></div><button onClick={() => setPhone(1)}>Park here <ArrowRight /></button></div>}
              {phone === 1 && <div className="phone-frame"><button className="phone-back" onClick={() => setPhone(0)}>Back</button><span>YOUR VEHICLE</span><h3>Your plate<br />is your pass.</h3><label>LICENSE PLATE<input aria-label="License plate" defaultValue="ABC 1234" /></label><button onClick={() => setPhone(2)}>Continue <ArrowRight /></button></div>}
              {phone === 2 && <div className="phone-frame"><button className="phone-back" onClick={() => setPhone(1)}>Back</button><span>SECURE PAYMENT</span><h3>One tap<br />and go.</h3><div className="pay-line"><span>SPACE A12</span><b>$10.00</b></div><button onClick={() => setPhone(3)}>Pay $10.00</button></div>}
              {phone === 3 && <div className="phone-frame success"><div className="success-icon"><Check /></div><span>SESSION ACTIVE</span><h3>You're parked.</h3><p>Enjoy your visit. We’ll text you before your session ends.</p><div className="permit"><span>ABC 1234</span><b>10:30 PM</b></div><button onClick={() => setPhone(0)}>Replay demo</button></div>}
            </div>
            <span className="tap-note">INTERACTIVE / TAP THROUGH</span>
          </div>

          <div className={`yield-moment ${active === 4 ? 'visible' : ''}`}>
            <span>ILLUSTRATIVE MONTHLY GROSS</span>
            <strong>$6,480</strong>
            <p>36 premium spaces × $10 × 18 monthly sessions</p>
            <small>Before utilization, costs, taxes, and revenue sharing.</small>
          </div>

          <div className="film-controls">
            <button aria-label={playing ? 'Pause film' : 'Play film'} onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</button>
            <div className="timeline">{scenes.map((scene, index) => <button key={scene.time} aria-label={`Scene ${index + 1}: ${scene.title}`} className={active === index ? 'active' : ''} onClick={() => jump(index)}><i /><span>{scene.time}</span></button>)}</div>
            <Volume2 />
          </div>
        </div>

        <div className="scroll-scenes">
          {scenes.map((scene, index) => <article key={scene.time} data-scene={index} ref={node => { sceneRefs.current[index] = node }}><span>{scene.time}</span><p>{scene.title}</p></article>)}
        </div>
      </section>

      <section className="after-film">
        <div className="end-card">
          <span>THE FILM ENDS. THE PLATFORM BEGINS.</span>
          <h2>One better arrival.<br />Fully managed.</h2>
        </div>
        <div className="continuous-line"><i /><span>PROPERTY WALK</span><i /><span>SPACE & PRICING STRATEGY</span><i /><span>SIGN INSTALLATION</span><i /><span>PAYMENTS & REPORTING</span><i /><span>ONGOING OPTIMIZATION</span></div>
        <div className="executive-note">
          <span>FOR PROPERTY LEADERS</span>
          <p>CedarPass adds a premium choice without gates, construction, or changing the promise of free parking. We map the right inventory, install every sign, operate the platform, and show exactly how the spaces perform.</p>
          <div><strong>New non-rent revenue</strong><strong>Measurable guest demand</strong><strong>Property-controlled policy</strong></div>
        </div>
      </section>

      <section className="closing-shot">
        <div className="closing-rule"><span>CEDARPASS / ARRIVAL 001</span><i /></div>
        <h2>The best space<br />should create<br /><em>the best return.</em></h2>
        <button onClick={() => setPilot(true)}>Create a pilot plan <ArrowRight /></button>
        <footer><Brand /><span>PREMIUM PARKING, FULLY MANAGED.</span><small>CedarPass is a working name and concept. © 2026 CloudKicker.</small></footer>
      </section>
    </main>

    {pilot && <div className="modal-backdrop" onMouseDown={event => event.target === event.currentTarget && setPilot(false)}><div className="pilot-dialog" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="pilot-title"><button className="dialog-close" aria-label="Close" onClick={() => setPilot(false)}><X /></button><span>CEDARPASS PILOT / ACT ONE</span><h2 id="pilot-title">Begin with one entrance.</h2><p>We’ll walk the property, identify the strongest premium zone, model the opportunity, and design the complete arrival experience.</p><div><span>01 / PROPERTY WALK</span><span>02 / OPPORTUNITY MODEL</span><span>03 / LAUNCH PLAN</span></div><button className="dialog-action" onClick={() => setPilot(false)}>Return to the film <ArrowRight /></button></div></div>}
  </div>
}

export default App
