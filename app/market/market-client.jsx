"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

const Arr = () => <span className="arr">→</span>;

// Every number on this page is real and cited: staff RN wages + employment
// from BLS OEWS, tax-free stipend ceilings from GSA per diem, licensure and
// tax facts encoded per state. No sample data.

// Real state facts nurses check before a contract (licensure + income tax).
// NLC membership and no-income-tax states as of 2026.
const STATE_FACTS = {
  Georgia: { nlc: true, noTax: false }, Texas: { nlc: true, noTax: true },
  Florida: { nlc: true, noTax: true }, Arizona: { nlc: true, noTax: false },
  Washington: { nlc: true, noTax: true }, "North Carolina": { nlc: true, noTax: false },
  Tennessee: { nlc: true, noTax: true }, Colorado: { nlc: true, noTax: false },
  Pennsylvania: { nlc: true, noTax: false }, Virginia: { nlc: true, noTax: false },
  Ohio: { nlc: true, noTax: false }, "New Mexico": { nlc: true, noTax: false },
  California: { nlc: false, noTax: false }, "New York": { nlc: false, noTax: false },
  Massachusetts: { nlc: false, noTax: false }, Nevada: { nlc: false, noTax: true },
  Illinois: { nlc: false, noTax: false }, Oregon: { nlc: false, noTax: false },
  Michigan: { nlc: false, noTax: false },
};

// card photo convention: /public/cities/<slug>.jpg, e.g. "Los Angeles" -> /cities/los-angeles.jpg.
const citySlug = (c) => c.toLowerCase().replace(/[^a-z]+/g, "-");

const money = (n) => "$" + Math.round(n).toLocaleString();

// split-flap digits: each digit gets a span so it can cycle like a departure board
function Flap({ text }) {
  return (
    <>
      {String(text).split("").map((ch, i) =>
        /\d/.test(ch) ? <span key={i} className="flap-d">{ch}</span> : ch
      )}
    </>
  );
}

export default function MarketClient({ data }) {
  const [state, setState] = useState("");
  const [sort, setSort] = useState("wage");
  const [sel, setSel] = useState(null); // market shown in the detail overlay
  const gridRef = useRef(null);

  const STATES = useMemo(
    () => (data ? [...new Set(data.rows.map((r) => r.state))].sort() : []),
    [data]
  );

  const rows = useMemo(() => {
    if (!data) return [];
    const r = data.rows.filter((d) => !state || d.state === state);
    if (sort === "wage") r.sort((a, b) => Number(b.wage) - Number(a.wage));
    if (sort === "stipend") r.sort((a, b) => (b.gsa?.weekly || 0) - (a.gsa?.weekly || 0));
    if (sort === "az") r.sort((a, b) => a.city.localeCompare(b.city));
    return r;
  }, [data, state, sort]);

  // header stats derive from the live rows so they can never drift from the grid
  const topMetro = useMemo(
    () => (data ? [...data.rows].sort((a, b) => Number(b.wage) - Number(a.wage))[0] : null),
    [data]
  );

  // detail overlay: close on Escape, lock page scroll while open
  useEffect(() => {
    if (!sel) return;
    const onKey = (e) => { if (e.key === "Escape") setSel(null); };
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sel]);

  // per-render card animations: split-flap cycle, cursor spotlight
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
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
            Staff RN wages from the Bureau of Labor Statistics and tax-free stipend ceilings
            from the GSA, metro by metro. The government baselines every travel package builds on.
          </p>
          {data && (
            <div className="pulse">
              <div className="item"><small>National staff RN average</small><b>${data.national} <span>/hr</span></b></div>
              {topMetro && <div className="item"><small>Highest-paying metro</small><b>{topMetro.city} <span>${topMetro.wage}/hr</span></b></div>}
              <div className="item"><small>Markets tracked</small><b>{data.rows.length} <span>metros</span></b></div>
              <div className="item"><small>Data year</small><b>BLS {data.year} <span>· GSA FY{data.fy}</span></b></div>
            </div>
          )}
        </div>
      </header>

      <div className="filters">
        <div className="row">
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
              <option value="wage">Highest staff pay</option>
              <option value="stipend">Highest stipend ceiling</option>
              <option value="az">A to Z</option>
            </select>
          </div>
          <button className="reset" onClick={() => { setState(""); setSort("wage"); }}>Reset</button>
          <span className="count"><b>{rows.length}</b> markets</span>
        </div>
      </div>

      <main className="results">
        {!data && (
          <p className="empty">
            The wage feed is refreshing. Check back in a few minutes, the numbers come straight from the
            Bureau of Labor Statistics.
          </p>
        )}
        <div className="rgrid" ref={gridRef}>
          {rows.map((d, i) => (
            <div
              className="rcard"
              key={`${d.city}-${d.state}`}
              style={{ animationDelay: `${Math.min(i * 40, 480)}ms` }}
              role="button"
              tabIndex={0}
              aria-label={`${d.city}, ${d.state}: market overview`}
              onClick={() => setSel(d)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(d); } }}
            >
              <div className="cityph" aria-hidden="true">
                <img src={`/cities/${citySlug(d.city)}.jpg`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div className="top">
                <div>
                  <div className="spec">{d.city}</div>
                  <div className="loc">{d.state}</div>
                </div>
                {STATE_FACTS[d.state]?.nlc && <span className="trend up">NLC</span>}
              </div>
              <div className="amt">$<Flap text={d.wage} /> <small>/hr staff avg{d.wageScope === "state" ? " · state" : ""}</small></div>
              {d.gsa && <div className="stip">Stipends up to <b>{money(d.gsa.weekly)}/wk</b> tax-free</div>}
              <div className="meta">
                {d.emp ? `${Number(d.emp).toLocaleString()} RNs employed · ` : ""}BLS {data.year}{d.gsa ? ` · GSA FY${data.fy}` : ""}
              </div>
            </div>
          ))}
        </div>
        {data && rows.length === 0 && <p className="empty">No markets match that filter yet. Try widening your search.</p>}
      </main>
      <p className="note">
        Staff wages and RN employment: U.S. Bureau of Labor Statistics, Occupational Employment and Wage
        Statistics{data ? ` (${data.year} release)` : ""}, occupation 29-1141, by metro area. Stipend ceilings: GSA per diem rates
        {data ? ` (FY${data.fy})` : ""}, lodging plus meals and incidentals, the legal maximum an agency can pay tax-free.
        Both refresh automatically as new rates publish. Travel contracts negotiate a taxable base plus stipends
        on top of these baselines; the <Link className="inline-link" href="/guides#pay">pay guide</Link> shows the math.
      </p>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Free guide</span>
          <div className="h2">Get these numbers in your inbox.</div>
          <p className="bandp">The pay benchmarks, the cheat sheet, and the vetted resources, once a month. No recruiter blast list.</p>
          <Link className="btn-teal" href="/#getguide">Send me the guide <Arr /></Link>
        </div>
      </div>

      {sel && (() => {
        const f = STATE_FACTS[sel.state] || {};
        const pct = Math.round(((Number(sel.wage) - Number(data.national)) / Number(data.national)) * 100);
        return (
          <>
            <div className="mkt-backdrop" onClick={() => setSel(null)} />
            <div className="mkt" role="dialog" aria-modal="true" aria-label={`${sel.city}, ${sel.state}`}>
              <div className="mkt-hero">
                <img src={`/cities/${citySlug(sel.city)}.jpg`} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <button type="button" className="mkt-x" aria-label="Close" onClick={() => setSel(null)}>×</button>
              </div>
              <div className="mkt-body">
                <div className="mkt-head">
                  <div>
                    <div className="spec">{sel.city}</div>
                    <div className="loc">{sel.state}</div>
                  </div>
                  <span className={`trend ${f.nlc ? "up" : "down"}`}>{f.nlc ? "Compact state" : "Single-state license"}</span>
                </div>

                <div className="mkt-pay">
                  <div className="big">${sel.wage}<small>/hr staff RN average{sel.wageScope === "state" ? " (state)" : ""} · ≈ {money(Number(sel.wage) * 2080)}/yr</small></div>
                  <div className="range">
                    {pct === 0 ? "Right at the national staff average" : `${Math.abs(pct)}% ${pct > 0 ? "above" : "below"} the national staff average`} of ${data.national}/hr
                  </div>
                </div>

                {sel.gsa && (
                  <div className="mkt-split">
                    <span className="mkt-label">Max tax-free stipends · GSA FY{data.fy}</span>
                    <div className="row"><span>Lodging, per night</span><b>${sel.gsa.lodging}</b></div>
                    <div className="row"><span>Meals and incidentals, per day</span><b>${sel.gsa.meals}</b></div>
                    <div className="row"><span>Weekly ceiling · 7 nights + 7 days</span><b>{money(sel.gsa.weekly)}</b></div>
                  </div>
                )}

                <div className="mkt-facts">
                  <div><small>License</small><b>{f.nlc ? "Compact (NLC)" : "Single-state"}</b></div>
                  <div><small>State income tax</small><b>{f.noTax ? "None" : "Yes"}</b></div>
                  {sel.emp && <div><small>RNs employed here</small><b>{Number(sel.emp).toLocaleString()}</b></div>}
                  <div><small>Contract length</small><b>13 weeks typical</b></div>
                </div>

                <div className="mkt-notes">
                  <span className="mkt-label">Worth knowing</span>
                  <ul>
                    <li>
                      Staff RNs here average ${sel.wage}/hr. Travel packages are negotiated on top of local
                      staffing economics like these, so the baseline tells you which markets have room.
                    </li>
                    {sel.gsa && (
                      <li>
                        The GSA caps tax-free stipends around {money(sel.gsa.weekly)}/wk here. An agency can
                        pay less than the cap, but never more of it tax-free. Offers far under it leave money
                        on the table.
                      </li>
                    )}
                    <li>{f.nlc
                      ? `${sel.state} honors the Nurse Licensure Compact, so a multistate license works here with no new application.`
                      : `${sel.state} is not a compact state. Start licensure by endorsement well before your target start date.`}</li>
                    <li>{f.noTax
                      ? `No state income tax in ${sel.state}, so the taxable base stretches further than the same rate elsewhere.`
                      : `${sel.state} taxes income at the state level. Compare take-home against no-tax states, not just gross.`}</li>
                  </ul>
                </div>

                <div className="mkt-foot">
                  <span className="mkt-src">
                    Sources: BLS OEWS {data.year} (wages, employment) · GSA per diem FY{data.fy} (stipend ceilings) ·
                    licensure and tax facts current 2026
                  </span>
                  <div className="mkt-ctas">
                    <Link className="btn-teal" href="/community/social-community" onClick={() => setSel(null)}>Ask about {sel.city} in the group <Arr /></Link>
                    <Link className="mkt-alt" href="/#getguide" onClick={() => setSel(null)}>Get monthly benchmarks by email <Arr /></Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      <Footer />
    </>
  );
}
