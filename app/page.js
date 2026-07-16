import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";
import SubscribeForm from "@/components/SubscribeForm";
import { getMarketData, ABBR } from "@/lib/market";

const Arr = () => <span className="arr">→</span>;

// Pick a few real, high-paying metros for the homepage teaser: highest staff
// RN wage, one per state for geographic variety, and only ones with a GSA
// stipend ceiling so both numbers on the card are real. Empty if the feed is
// down, in which case the band drops its numbers instead of faking them.
function payTeaser(data) {
  if (!data?.rows?.length) return [];
  const seen = new Set();
  return [...data.rows]
    .filter((r) => r.gsa && r.wageScope === "metro")
    .sort((a, b) => Number(b.wage) - Number(a.wage))
    .filter((r) => (seen.has(r.state) ? false : seen.add(r.state)))
    .slice(0, 3);
}

export default async function Home() {
  const market = await getMarketData();
  const teaser = payTeaser(market);
  return (
    <>
      <Fx spots=".gcard,.pcard,.q2" magnets=".btn-hero,.btn-teal,.form button,.nav-cta" />

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-overlay top" />
        <div className="hero-overlay bottom" />

        <svg className="route" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path id="routePath" d="M-40 720 C 240 660, 380 520, 620 470 S 1040 360, 1280 200" fill="none" stroke="#65BFBE" strokeWidth="1.5" />
          <circle className="pin" cx="620" cy="470" r="4" fill="#7DE9E8" />
          <circle cx="1280" cy="200" r="3" fill="#7DE9E8" />
          <g>
            <path d="M15 0 L9 1.4 L3 1.5 L-5 9.5 L-7 9.5 L-2 2 L-8 1.8 L-9 1.6 L-13 5 L-14 5 L-12 1.4 L-14 0 L-12 -1.4 L-14 -5 L-13 -5 L-9 -1.6 L-8 -1.8 L-2 -2 L-7 -9.5 L-5 -9.5 L3 -1.5 L9 -1.4 Z" transform="scale(0.8)" fill="#7DE9E8" />
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto" calcMode="linear">
              <mpath href="#routePath" />
            </animateMotion>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite" values="0;1;1;1;0" keyTimes="0;0.07;0.5;0.9;1" />
          </g>
        </svg>

        <Nav active="home" />

        <div className="hero-body">
          <div className="hero-inner">
            <span className="eyebrow">Built by Drew Jones, RN · 37,000+ strong</span>
            <h1>Know what you&apos;re <span className="hl">worth</span> before you sign.</h1>
            <p className="sub">
              Straight answers on pay, contracts, taxes, and housing, plus vetted resources from people
              who&apos;ve actually done it. Everything you need to travel smarter and earn more.
            </p>
            <div className="hero-actions">
              <Link className="btn-hero primary" href="/guides">Explore the guides <Arr /></Link>
              <Link className="btn-hero ghost" href="/market">See real pay rates <Arr /></Link>
            </div>
            <p className="door">
              Are you a brand looking to reach travel nurses? <Link href="/partners">Partner with us <Arr /></Link>
            </p>
          </div>
        </div>

        <div className="proof">
          <div className="item"><b>37,000+</b> members</div>
          <span className="dot" />
          <div className="item"><b>All 50</b> states</div>
          <span className="dot" />
          <div className="item"><b>Since 2018</b></div>
          <span className="dot" />
          <div className="item"><b>Free</b> to join</div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="section light reveal" style={{ padding: "48px 0 0" }}>
        <div className="container vstrip stagger">
          <div className="vitem">
            <span className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
            </span>
            <div><h3>Everything in one place</h3><p>Pay, contracts, taxes, housing, and vetted partners, without the runaround.</p></div>
          </div>
          <div className="vitem">
            <span className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.4 3.1-6 7-6s7 2.6 7 6" /></svg>
            </span>
            <div><h3>Built by a travel nurse</h3><p>Run by Drew Jones, RN. Real time on the road, not a media company guessing.</p></div>
          </div>
          <div className="vitem">
            <span className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.1 1.6 2.6-.2 1 2.4 2.3 1.4-.6 2.6.6 2.6-2.3 1.4-1 2.4-2.6-.2L12 21l-2.1-1.6-2.6.2-1-2.4L3 17.6l.6-2.6L3 12.4l2.3-1.4 1-2.4 2.6.2z" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            <div><h3>Vetted, then featured</h3><p>Resources earn their spot. Recommendations you can trust.</p></div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="section light reveal" style={{ paddingTop: 36 }}>
        <div className="container">
          <span className="eyebrow-s">The business side</span>
          <h2 className="h2">Straight answers, minus the fluff.</h2>
          <p className="lead">The four things that actually move your paycheck, explained by people who&apos;ve done it.</p>
          <div className="grid4 stagger">
            <div className="gcard">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.6 9.2c-.4-.8-1.4-1.2-2.6-1.2-1.5 0-2.5.8-2.5 1.9s1 1.7 2.5 2 2.6.9 2.6 2-1.1 2-2.6 2c-1.2 0-2.2-.5-2.6-1.3" /></svg>
              </span>
              <h3>Pay</h3><p>What you should actually make by specialty and state.</p>
              <Link href="/guides#pay">Read the guide <Arr /></Link>
            </div>
            <div className="gcard">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 12h5M9.5 15.5h5" /></svg>
              </span>
              <h3>Contracts</h3><p>The clauses that cost you money, and how to push back.</p>
              <Link href="/guides#contracts">Read the guide <Arr /></Link>
            </div>
            <div className="gcard">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="2.3" /><circle cx="16" cy="16" r="2.3" /><path d="M6.5 17.5l11-11" /></svg>
              </span>
              <h3>Taxes</h3><p>Stipends and tax-home rules, without the audit anxiety.</p>
              <Link href="/guides#taxes">Read the guide <Arr /></Link>
            </div>
            <div className="gcard">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></svg>
              </span>
              <h3>Housing</h3><p>Furnished, monthly, near your assignment. No scams.</p>
              <Link href="/guides#housing">Read the guide <Arr /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* PAY INSIGHT */}
      <section id="pay" className="section navy reveal">
        <div className="container">
          <span className="eyebrow-s">Pay insight</span>
          <h2 className="h2">Know what <span className="hlt">good pay</span> looks like before you apply.</h2>
          <p className="lead">The federal baselines every travel package is built on: staff RN wages from the Bureau of Labor Statistics, tax-free stipend ceilings from the GSA.</p>
          {teaser.length === 3 ? (
            <>
              <div className="pay stagger">
                {teaser.map((r) => (
                  <div className="pcard" key={r.city}>
                    <div className="spec">{r.city}, {ABBR[r.state]}</div>
                    <div className="loc">Staff RN mean · BLS {market.year}</div>
                    <div className="amt">${Number(r.wage).toFixed(2)} <small>/hr</small></div>
                    <div className="pstip">Tax-free stipend ceiling <b>${r.gsa.weekly.toLocaleString()}/wk</b> · GSA FY{market.fy}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 30, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
                <Link className="btn-teal" href="/market">See all 46 metros <Arr /></Link>
                <span style={{ fontSize: 13, color: "#9BA3A8" }}>Source: BLS OEWS (occupation 29-1141) and GSA per diem.</span>
              </div>
            </>
          ) : (
            <div style={{ marginTop: 30, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
              <Link className="btn-teal" href="/market">Explore the market data <Arr /></Link>
              <span style={{ fontSize: 13, color: "#9BA3A8" }}>Staff wages and stipend ceilings for 46 metros, straight from BLS and GSA.</span>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT / FOUNDER */}
      <section id="about" className="section light reveal" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="cols" style={{ marginTop: 0 }}>
            <div>
              <span className="eyebrow-s">About The Travel Nurse Guide</span>
              <h2 className="h2">Honest information, <span className="hlr">nurses first</span>.</h2>
              <p className="lead" style={{ maxWidth: "58ch" }}>
                The Travel Nurse Guide is a 37,000 member community built on one premise: travel nurses
                deserve honest, unbiased information and a place to find it without wading through recruiter noise.
              </p>
              <p className="lead" style={{ maxWidth: "58ch", marginTop: 12 }}>
                Since 2018, TNG has been the go-to resource for nurses navigating pay packages, contracts,
                taxes, housing, and everything else that comes with life on the road. Every resource on this
                site is vetted, and every partner earns their spot through a vetting process, not just a check.
              </p>
            </div>
            <div className="aside math">
              <span className="at">A note from the founder</span>
              <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "var(--navy)" }}>
                TNG was started by Drew Jones, RN, after his first year of travel nursing taught him the
                hard way how broken the information landscape was. He built the community he wished had
                existed. Eight years later it is still run the same way it started, with nurses first.
              </p>
              <div className="sum">Drew Jones, RN <span>· Founder</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="resources" className="section light reveal" style={{ paddingBottom: 36 }}>
        <div className="container">
          <span className="eyebrow-s">Trusted, both ways</span>
          <h2 className="h2">Partners <span className="hlr">worth</span> your time.</h2>
          <p className="lead">
            The companies we point you to for tax, insurance, certification, and housing.
            Each one vetted by nurses who&apos;ve actually used them.
          </p>
          <div className="logos"><span>HeartStart CPR</span><span>Same Day CPR</span><span>Steve Does Insurance</span><span>Tallewise</span></div>
          <div className="quotes2 stagger">
            <div className="q2">
              <p>&ldquo;This community helped me negotiate my best contract yet.&rdquo;</p>
              <div className="who"><span className="av">SR</span><div><b>Sarah</b><small>ICU travel nurse</small></div></div>
            </div>
            <div className="q2">
              <p>&ldquo;Finally a place with honest, unbiased information.&rdquo;</p>
              <div className="who"><span className="av">MK</span><div><b>Marcus</b><small>ER travel nurse</small></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="section light reveal" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="capture-band lg">
            <span className="eyebrow-s">Free guide</span>
            <h2 className="h2">Seen enough? Take it with you.</h2>
            <p className="lead">The cheat sheet, the pay benchmarks, and the vetted resources, in your inbox.</p>
            <div className="capture" id="getguide" style={{ maxWidth: 540, margin: "26px auto 0", textAlign: "left" }}>
              <div className="label"><span className="tag">Free</span> Get the insider guide to your first travel contract.</div>
              <SubscribeForm />
              <div className="micro"><b>Free guide,</b> instant access. Unsubscribe anytime.</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
