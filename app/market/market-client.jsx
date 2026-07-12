"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

const Arr = () => <span className="arr">→</span>;

// Sample community data, for illustration only.
const DATA = [
  { spec: "ICU", state: "Georgia", city: "Atlanta", amt: 2080, trend: 3, n: 64 },
  { spec: "ICU", state: "Texas", city: "Houston", amt: 2140, trend: 2, n: 88 },
  { spec: "ICU", state: "Florida", city: "Tampa", amt: 2050, trend: -1, n: 71 },
  { spec: "ICU", state: "California", city: "Sacramento", amt: 2960, trend: 4, n: 112 },
  { spec: "ICU", state: "New York", city: "Albany", amt: 2780, trend: 2, n: 54 },
  { spec: "ICU", state: "Arizona", city: "Phoenix", amt: 2260, trend: 1, n: 47 },
  { spec: "ICU", state: "Washington", city: "Spokane", amt: 2540, trend: 3, n: 39 },
  { spec: "ICU", state: "North Carolina", city: "Charlotte", amt: 2120, trend: -2, n: 58 },
  { spec: "ER", state: "Georgia", city: "Savannah", amt: 1940, trend: 1, n: 52 },
  { spec: "ER", state: "Tennessee", city: "Nashville", amt: 1980, trend: 2, n: 66 },
  { spec: "ER", state: "Texas", city: "Dallas", amt: 2060, trend: 1, n: 93 },
  { spec: "ER", state: "Florida", city: "Orlando", amt: 1990, trend: -1, n: 77 },
  { spec: "ER", state: "California", city: "Fresno", amt: 2840, trend: 3, n: 98 },
  { spec: "ER", state: "New York", city: "Buffalo", amt: 2650, trend: 2, n: 41 },
  { spec: "ER", state: "Colorado", city: "Denver", amt: 2230, trend: 1, n: 45 },
  { spec: "Med-Surg", state: "Georgia", city: "Augusta", amt: 1760, trend: -1, n: 49 },
  { spec: "Med-Surg", state: "Tennessee", city: "Memphis", amt: 1720, trend: 0, n: 38 },
  { spec: "Med-Surg", state: "Texas", city: "San Antonio", amt: 1850, trend: 1, n: 72 },
  { spec: "Med-Surg", state: "California", city: "Bakersfield", amt: 2520, trend: 2, n: 81 },
  { spec: "Med-Surg", state: "New York", city: "Rochester", amt: 2390, trend: 1, n: 36 },
  { spec: "Med-Surg", state: "Pennsylvania", city: "Pittsburgh", amt: 1880, trend: 0, n: 44 },
  { spec: "OR", state: "Georgia", city: "Atlanta", amt: 2320, trend: 2, n: 31 },
  { spec: "OR", state: "Texas", city: "Austin", amt: 2410, trend: 3, n: 42 },
  { spec: "OR", state: "Florida", city: "Miami", amt: 2280, trend: 1, n: 53 },
  { spec: "OR", state: "California", city: "San Diego", amt: 3080, trend: 4, n: 67 },
  { spec: "OR", state: "Washington", city: "Seattle", amt: 2690, trend: 2, n: 29 },
  { spec: "OR", state: "Massachusetts", city: "Boston", amt: 2740, trend: 1, n: 33 },
  { spec: "L&D", state: "Georgia", city: "Macon", amt: 2180, trend: 2, n: 27 },
  { spec: "L&D", state: "Tennessee", city: "Knoxville", amt: 2150, trend: 1, n: 24 },
  { spec: "L&D", state: "Texas", city: "Fort Worth", amt: 2260, trend: 2, n: 48 },
  { spec: "L&D", state: "California", city: "Riverside", amt: 2920, trend: 3, n: 57 },
  { spec: "L&D", state: "Arizona", city: "Tucson", amt: 2310, trend: 1, n: 22 },
  { spec: "L&D", state: "North Carolina", city: "Raleigh", amt: 2170, trend: -1, n: 35 },
  { spec: "Tele", state: "Georgia", city: "Columbus", amt: 1820, trend: 0, n: 41 },
  { spec: "Tele", state: "Texas", city: "El Paso", amt: 1900, trend: 1, n: 37 },
  { spec: "Tele", state: "Florida", city: "Jacksonville", amt: 1840, trend: -1, n: 55 },
  { spec: "Tele", state: "California", city: "Stockton", amt: 2560, trend: 2, n: 46 },
  { spec: "Tele", state: "Pennsylvania", city: "Philadelphia", amt: 1930, trend: 1, n: 39 },
  { spec: "Cath Lab", state: "Tennessee", city: "Nashville", amt: 2720, trend: 4, n: 26 },
  { spec: "Cath Lab", state: "Georgia", city: "Atlanta", amt: 2580, trend: 3, n: 21 },
  { spec: "Cath Lab", state: "Texas", city: "Houston", amt: 2660, trend: 2, n: 34 },
  { spec: "Cath Lab", state: "California", city: "Los Angeles", amt: 3240, trend: 5, n: 43 },
  { spec: "Cath Lab", state: "New York", city: "New York", amt: 3020, trend: 3, n: 30 },
  { spec: "Cath Lab", state: "Florida", city: "Tampa", amt: 2610, trend: 2, n: 25 },
  { spec: "Cath Lab", state: "Washington", city: "Seattle", amt: 2860, trend: 3, n: 19 },
  { spec: "ICU", state: "Nevada", city: "Las Vegas", amt: 2380, trend: 2, n: 44 },
  { spec: "ER", state: "Illinois", city: "Chicago", amt: 2190, trend: 1, n: 62 },
  { spec: "ER", state: "New Mexico", city: "Albuquerque", amt: 2010, trend: 1, n: 31 },
  { spec: "Med-Surg", state: "Ohio", city: "Cleveland", amt: 1790, trend: 0, n: 40 },
  { spec: "OR", state: "Oregon", city: "Portland", amt: 2480, trend: 2, n: 36 },
  { spec: "L&D", state: "Virginia", city: "Richmond", amt: 2090, trend: 1, n: 28 },
  { spec: "Tele", state: "Michigan", city: "Detroit", amt: 1810, trend: -1, n: 33 },
  { spec: "Cath Lab", state: "Colorado", city: "Denver", amt: 2700, trend: 3, n: 23 },
];

// card photo convention: /public/cities/<slug>.jpg, e.g. "Los Angeles" -> /cities/los-angeles.jpg.
// Missing files fall back to the navy gradient underneath, so images can land in batches.
const citySlug = (c) => c.toLowerCase().replace(/[^a-z]+/g, "-");

const SPECS = [...new Set(DATA.map((d) => d.spec))].sort();
const STATES = [...new Set(DATA.map((d) => d.state))].sort();

// header pulse stats derive from the listings so they can never drift from the grid
const avgOf = (rows) => rows.reduce((s, d) => s + d.amt, 0) / rows.length;
const top = (keys, key) => keys.map((k) => [k, avgOf(DATA.filter((d) => d[key] === k))]).sort((a, b) => b[1] - a[1])[0];
const NATL_AVG = Math.round(avgOf(DATA) / 10) * 10;
const HOT_SPEC = top(SPECS, "spec");
const HOT_STATE = top(STATES, "state");

// deterministic mini trend per listing (no real history yet, seeded so it never changes)
const seeded = (s, k) => { const x = Math.sin(s * 7.31 + k * 13.77) * 43758.545; return x - Math.floor(x); };
function sparkPath(d) {
  const s = d.amt + d.n; let y = 15; const pts = [];
  for (let k = 0; k < 7; k++) { y += (seeded(s, k) - 0.5) * 14; y = Math.max(6, Math.min(24, y)); pts.push(y); }
  pts[6] = d.trend >= 0 ? 6 : 24; pts[5] = (pts[4] + pts[6]) / 2;
  return pts.map((py, k) => (k ? "L" : "M") + ((k * 100) / 6).toFixed(1) + " " + py.toFixed(1)).join(" ");
}

// split-flap digits: each digit gets a span so it can cycle like a departure board
function FlapAmt({ amt }) {
  return (
    <>
      {"$"}
      {amt.toLocaleString().split("").map((ch, i) =>
        /\d/.test(ch) ? <span key={i} className="flap-d">{ch}</span> : ch
      )}
    </>
  );
}

export default function MarketClient({ bls }) {
  const [spec, setSpec] = useState("");
  const [state, setState] = useState("");
  const [sort, setSort] = useState("high");
  const gridRef = useRef(null);

  // support /market?spec=ICU deep links
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("spec");
    if (p && SPECS.includes(p)) setSpec(p);
  }, []);

  const rows = useMemo(() => {
    const r = DATA.filter((d) => (!spec || d.spec === spec) && (!state || d.state === state));
    if (sort === "high") r.sort((a, b) => b.amt - a.amt);
    if (sort === "low") r.sort((a, b) => a.amt - b.amt);
    if (sort === "az") r.sort((a, b) => a.spec.localeCompare(b.spec) || a.state.localeCompare(b.state));
    return r;
  }, [spec, state, sort]);

  // per-render card animations: sparkline draw, split-flap cycle, cursor spotlight
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.querySelectorAll(".spark path").forEach((p, i) => {
      const L = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset .9s ease " + Math.min(i * 35, 600) + "ms";
      p.style.strokeDashoffset = "0";
    });
    const timers = [];
    grid.querySelectorAll(".flap-d").forEach((el, i) => {
      const fin = el.textContent; let t = 0; const total = 3 + (i % 5);
      el.classList.add("cyc");
      const iv = setInterval(() => {
        el.textContent = (Math.random() * 10) | 0;
        if (++t >= total) { clearInterval(iv); el.textContent = fin; el.classList.remove("cyc"); }
      }, 60);
      timers.push(iv);
    });
    const bound = [];
    grid.querySelectorAll(".rcard").forEach((c) => {
      c.classList.add("spot");
      const h = (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      };
      c.addEventListener("mousemove", h);
      bound.push([c, h]);
    });
    return () => {
      timers.forEach(clearInterval);
      bound.forEach(([c, h]) => c.removeEventListener("mousemove", h));
    };
  }, [rows]);

  return (
    <>
      <Fx magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-market">
        <Nav active="market" />
        <div className="container">
          <span className="eyebrow-s">Pay insight</span>
          <h1 style={{ maxWidth: "18ch" }}>The market, in <span className="hl">real numbers</span>.</h1>
          <p className="sub">
            Weekly averages reported by nurses in the community, by specialty and state.
            Not recruiter promises, not &quot;up to&quot; rates.
          </p>
          <div className="pulse">
            <div className="item"><small>National average</small><b>${NATL_AVG.toLocaleString()} <span>/wk</span></b></div>
            <div className="item"><small>Hottest specialty</small><b>{HOT_SPEC[0]} <span>${(Math.round(HOT_SPEC[1] / 10) * 10).toLocaleString()}/wk</span></b></div>
            <div className="item"><small>Highest-paying state</small><b>{HOT_STATE[0]} <span>${(Math.round(HOT_STATE[1] / 10) * 10).toLocaleString()}/wk</span></b></div>
            {bls && <div className="item"><small>Staff RN average · BLS {bls.year}</small><b>${bls.national} <span>/hr</span></b></div>}
          </div>
        </div>
      </header>

      <div className="filters">
        <div className="row">
          <div className="fgroup">
            <label htmlFor="f-spec">Specialty</label>
            <select id="f-spec" value={spec} onChange={(e) => setSpec(e.target.value)}>
              <option value="">All specialties</option>
              {SPECS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="fgroup">
            <label htmlFor="f-state">State</label>
            <select id="f-state" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">All states</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="fgroup">
            <label htmlFor="f-sort">Sort</label>
            <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="high">Highest pay</option>
              <option value="low">Lowest pay</option>
              <option value="az">A to Z</option>
            </select>
          </div>
          <button className="reset" onClick={() => { setSpec(""); setState(""); setSort("high"); }}>Reset</button>
          <span className="count"><b>{rows.length}</b> listings</span>
        </div>
      </div>

      <main className="results">
        <div className="rgrid" ref={gridRef}>
          {rows.map((d, i) => (
            <div className="rcard" key={`${d.spec}-${d.city}-${d.state}`} style={{ animationDelay: `${Math.min(i * 40, 480)}ms` }}>
              <div className="cityph" aria-hidden="true">
                <img src={`/cities/${citySlug(d.city)}.jpg`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div className="top">
                <div>
                  <div className="spec">{d.spec}</div>
                  <div className="loc">{d.city}, {d.state}</div>
                </div>
                <span className={`trend ${d.trend >= 0 ? "up" : "down"}`}>{d.trend >= 0 ? "▲" : "▼"} {Math.abs(d.trend)}% mo</span>
              </div>
              <div className="amt"><FlapAmt amt={d.amt} /> <small>/wk avg</small></div>
              <svg className={`spark ${d.trend >= 0 ? "up" : "down"}`} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                <path d={sparkPath(d)} />
              </svg>
              <div className="meta">{d.n} pay reports</div>
            </div>
          ))}
        </div>
        {rows.length === 0 && <p className="empty">No listings match those filters yet. Try widening your search.</p>}
      </main>
      <p className="note">
        {bls && (
          <>
            Staff benchmark: {state && bls.states[state] ? `${state} RN average $${bls.states[state]}/hr` : `national RN average $${bls.national}/hr`}, per the U.S. Bureau of Labor
            Statistics, Occupational Employment and Wage Statistics ({bls.year} release, refreshed automatically as BLS publishes). Travel contracts add tax-free stipends on top of base pay.{" "}
          </>
        )}
        Contract listings are sample community data, shown for illustration. Averages update as members report pay.
      </p>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Free guide</span>
          <div className="h2">Get these numbers in your inbox.</div>
          <p className="bandp">The pay benchmarks, the cheat sheet, and the vetted resources, once a month. No recruiter blast list.</p>
          <Link className="btn-teal" href="/#getguide">Send me the guide <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
