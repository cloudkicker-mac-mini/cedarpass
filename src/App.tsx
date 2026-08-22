import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  QrCode,
  Tag,
} from "lucide-react";

const chapters = [
  ["01", "Convert"],
  ["02", "Scan"],
  ["03", "Pay"],
  ["04", "Own"],
  ["05", "Perform"],
];

function Mark() {
  return (
    <a className="mark" href="#opening" aria-label="CedarSpaces home">
      <i>CS</i>
      <span>
        CEDAR
        <br />
        SPACES
      </span>
    </a>
  );
}

function Phone() {
  const [step, setStep] = useState(0);
  return (
    <div className="device-wrap">
      <div className="device">
        <div className="island" />
        <div className="status">
          9:41 <span>● ● ▰</span>
        </div>
        {step === 0 && (
          <div className="screen start">
            <div className="phone-brand">CEDAR / SPACES</div>
            <div className="space-number">A12</div>
            <div className="space-meta">
              <span>CEDAR ENTRANCE</span>
              <span>AVAILABLE</span>
            </div>
            <div className="price">
              <strong>$10</strong>
              <span>
                UNTIL
                <br />
                10:30 PM
              </span>
            </div>
            <button onClick={() => setStep(1)}>
              Claim this space <ArrowRight />
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="screen detail">
            <button className="back" onClick={() => setStep(0)}>
              <ChevronLeft /> A12
            </button>
            <h3>
              Your plate
              <br />
              is your pass.
            </h3>
            <label>
              LICENSE PLATE
              <input aria-label="License plate" defaultValue="ABC 1234" />
            </label>
            <label>
              MOBILE NUMBER
              <input aria-label="Mobile number" defaultValue="(425) 555-0148" />
            </label>
            <button onClick={() => setStep(2)}>
              Continue <ArrowRight />
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="screen detail payment">
            <button className="back" onClick={() => setStep(1)}>
              <ChevronLeft /> VEHICLE
            </button>
            <h3>
              Confirm
              <br />
              the upgrade.
            </h3>
            <div className="receipt">
              <span>Premium space A12</span>
              <b>$10.00</b>
              <span>Service</span>
              <b>Included</b>
            </div>
            <button onClick={() => setStep(3)} className="apple-pay">
               Pay&nbsp;&nbsp; $10.00
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="screen complete">
            <div className="complete-ring">
              <Check />
            </div>
            <span>SESSION ACTIVE</span>
            <h3>Walk in.</h3>
            <p>
              Space A12 is active until 10:30 PM. We’ll text before time runs
              out.
            </p>
            <div className="plate">
              <span>ABC 1234</span>
              <b>A12</b>
            </div>
            <button onClick={() => setStep(0)}>Replay</button>
          </div>
        )}
      </div>
      <span className="demo-label">LIVE DEMO — TAP TO DRIVE</span>
    </div>
  );
}

function RevenueModel() {
  const [spaces, setSpaces] = useState(36);
  const [price, setPrice] = useState(10);
  const [sessions, setSessions] = useState(18);
  const monthly = spaces * price * sessions;
  const annual = monthly * 12;
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="revenue-model">
      <div className="model-output">
        <span>PROJECTED GROSS / MONTH</span>
        <strong aria-live="polite">{money(monthly)}</strong>
        <div>
          <b>{money(annual)}</b>
          <small>ILLUSTRATIVE ANNUAL GROSS</small>
        </div>
      </div>
      <div className="model-controls">
        <label>
          <span>
            <b>PREMIUM SPACES</b>
            <output>{spaces}</output>
          </span>
          <input
            aria-label="Premium spaces"
            type="range"
            min="5"
            max="100"
            step="1"
            value={spaces}
            onChange={(e) => setSpaces(Number(e.target.value))}
          />
          <i>
            <small>5</small>
            <small>100</small>
          </i>
        </label>
        <label>
          <span>
            <b>PRICE PER SESSION</b>
            <output>${price}</output>
          </span>
          <input
            aria-label="Price per session"
            type="range"
            min="5"
            max="30"
            step="1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <i>
            <small>$5</small>
            <small>$30</small>
          </i>
        </label>
        <label>
          <span>
            <b>MONTHLY BOOKINGS / SPACE</b>
            <output>{sessions}</output>
          </span>
          <input
            aria-label="Monthly bookings per space"
            type="range"
            min="4"
            max="60"
            step="1"
            value={sessions}
            onChange={(e) => setSessions(Number(e.target.value))}
          />
          <i>
            <small>4</small>
            <small>60</small>
          </i>
        </label>
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState(0);
  const nodes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
        }),
      { threshold: 0.55 },
    );
    nodes.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <aside className="spine">
        <Mark />
        <div className="chapter-rail">
          {chapters.map(([n, label], i) => (
            <a
              key={n}
              href={`#chapter-${i}`}
              className={active === i ? "active" : ""}
            >
              <i />
              <span>{n}</span>
              <b>{label}</b>
            </a>
          ))}
        </div>
        <a className="spine-cta" href="#chapter-0">
          HOW <ArrowDown />
        </a>
      </aside>

      <section className="opening" id="opening">
        <img
          src={`${import.meta.env.BASE_URL}assets/cedarpass-arrival-hero.webp`}
          alt="A guest arriving at a premium CedarSpaces space"
        />
        <div className="opening-title">
          <strong>
            The best spaces
            <br />
            are already built.
          </strong>
          <span>CEDARSPACES / PREMIUM ARRIVAL</span>
        </div>
        <div className="opening-caption">
          <p>
            CedarSpaces turns the spaces closest to your entrance into a fully
            managed premium experience.
          </p>
          <a href="#chapter-0" className="opening-cta">
            See how it works <ArrowDown />
          </a>
        </div>
      </section>

      <section className="journey">
        <article
          id="chapter-0"
          data-chapter="0"
          ref={(n) => {
            nodes.current[0] = n;
          }}
          className="chapter convert"
        >
          <div className="chapter-index">
            <b>01</b>
            <span>CONVERT</span>
          </div>
          <div className="convert-copy">
            <span>START WITH THE PAVEMENT YOU ALREADY OWN.</span>
            <h2>
              Choose
              <br />
              the spaces.
            </h2>
            <p>
              We turn each one into premium inventory with a CedarSpaces
              sign—temporary for an event, or permanently installed for everyday
              use.
            </p>
          </div>
          <div className="sign-stage" aria-label="CedarSpaces parking sign">
            <div className="sign-shadow" />
            <div className="parking-sign">
              <span>THIS SPACE IS AVAILABLE</span>
              <strong>A12</strong>
              <b>
                SCAN TO
                <br />
                PARK HERE
              </b>
              <QrCode />
              <small>CEDAR / PARKING</small>
            </div>
            <div className="sign-options">
              <span>
                <i /> TEMPORARY
              </span>
              <span className="active">
                <i /> PERMANENT
              </span>
            </div>
          </div>
          <div className="conversion-note">
            <b>WE HANDLE</b>
            <span>Site plan</span>
            <span>Sign production</span>
            <span>Installation</span>
          </div>
        </article>

        <article
          id="chapter-1"
          data-chapter="1"
          ref={(n) => {
            nodes.current[1] = n;
          }}
          className="chapter choose"
        >
          <div className="chapter-index">
            <b>02</b>
            <span>SCAN</span>
          </div>
          <div className="distance">
            <span>GENERAL PARKING</span>
            <strong>1,240'</strong>
            <i />
            <span>CEDARSPACES</span>
            <strong>300'</strong>
          </div>
          <div className="choice-copy">
            <p>The sign makes the offer at exactly the right moment.</p>
            <h2>
              See it.
              <br />
              Scan it.
            </h2>
          </div>
          <div className="space-tag">
            <span>SPACE</span>
            <b>A12</b>
            <small>SCAN TO PARK</small>
          </div>
        </article>

        <article
          id="chapter-2"
          data-chapter="2"
          ref={(n) => {
            nodes.current[2] = n;
          }}
          className="chapter activate"
        >
          <div className="chapter-index">
            <b>03</b>
            <span>PAY</span>
          </div>
          <div className="activation-copy">
            <p>
              NO DOWNLOAD
              <br />
              NO ACCOUNT
              <br />
              APPLE PAY READY
            </p>
            <h2>
              Tap.
              <br />
              Done.
            </h2>
            <span>
              Enter the plate, choose the time, and pay. The whole transaction
              takes less time than finding another space.
            </span>
            <div className="access-code">
              <Tag />
              <b>VIP &amp; STAFF CODES</b>
              <small>Free or discounted access, controlled by your team.</small>
            </div>
          </div>
          <Phone />
          <div className="scan-beam">
            <i />
            <i />
            <i />
          </div>
        </article>

        <article
          id="chapter-3"
          data-chapter="3"
          ref={(n) => {
            nodes.current[3] = n;
          }}
          className="chapter arrive"
        >
          <div className="chapter-index">
            <b>04</b>
            <span>OWN</span>
          </div>
          <div className="arrival-word">YOURS</div>
          <blockquote>
            Payment confirmed. The guest walks away knowing the space is theirs
            for the time they purchased.
          </blockquote>
          <div className="service-strip">
            <span>SMS REMINDERS</span>
            <span>ONE-TAP EXTENSIONS</span>
            <span>DIGITAL RECEIPTS</span>
            <span>LIVE SESSION STATUS</span>
          </div>
        </article>

        <article
          id="chapter-4"
          data-chapter="4"
          ref={(n) => {
            nodes.current[4] = n;
          }}
          className="chapter perform"
        >
          <div className="chapter-index">
            <b>05</b>
            <span>PERFORM</span>
          </div>
          <div className="performance-line">
            <span>EXISTING PAVEMENT</span>
            <i />
            <span>NEW YIELD</span>
          </div>
          <div className="model-heading">
            <span>INVESTMENT MODEL / LIVE</span>
            <h2>
              Run your
              <br />
              own numbers.
            </h2>
            <p>
              Model a premium zone in seconds. Adjust the inventory, session
              price, and booking pace.
            </p>
          </div>
          <RevenueModel />
          <small className="model-disclaimer">
            Illustrative only. Before utilization, costs, taxes, and revenue
            sharing.
          </small>
        </article>
      </section>

      <section className="boardroom">
        <div className="boardroom-lead">
          <span>THE ARRIVAL ENDS HERE.</span>
          <h2>
            The operating burden
            <br />
            doesn't begin.
          </h2>
        </div>
        <div className="managed">
          <p>
            We walk the property, select the inventory, install every sign, run
            the payment experience, and report performance. Your team chooses
            policy. CedarSpaces runs the platform.
          </p>
          <ol>
            <li>
              <b>01</b>Property & demand study
            </li>
            <li>
              <b>02</b>Space and pricing plan
            </li>
            <li>
              <b>03</b>Sign fabrication & installation
            </li>
            <li>
              <b>04</b>Payments, reporting & optimization
            </li>
          </ol>
        </div>
        <div className="control">
          <span>PROPERTY CONTROL</span>
          <div>
            <b>Pricing</b>
            <b>Hours</b>
            <b>Inventory</b>
            <b>Enforcement policy</b>
          </div>
          <p>
            CedarSpaces identifies valid sessions. The property retains control of
            enforcement and towing decisions.
          </p>
        </div>
      </section>

      <section className="final-frame">
        <Mark />
        <p>See the whole journey.</p>
        <a className="final-how" href="#chapter-0">
          HOW IT WORKS <ArrowRight />
        </a>
        <span>PREMIUM PARKING / FULLY MANAGED</span>
      </section>
    </main>
  );
}

export default App;
