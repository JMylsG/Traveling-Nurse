"use client";
import { useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const money = (n) => "$" + Math.round(n).toLocaleString("en-US");

// GSA rates run on the federal fiscal year (Oct 1 - Sep 30). Oct-Dec belong to
// the NEXT fiscal year; Jan-Sep stay in the same calendar year.
const fiscalYear = (year, month1) => (month1 >= 10 ? year + 1 : year);

// Every calendar month touched by the contract, inclusive of partial months.
function monthList(start, end) {
  const out = [];
  let y = start.getFullYear();
  let m = start.getMonth(); // 0-based
  const ey = end.getFullYear();
  const em = end.getMonth();
  while (y < ey || (y === ey && m <= em)) {
    out.push({ year: y, month: m + 1 });
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return out;
}

export default function CalculatorClient() {
  const [zip, setZip] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!/^\d{5}$/.test(zip)) return setError("Enter a valid five digit ZIP code.");
    if (!start || !end) return setError("Select both a contract start and end date.");
    const s = new Date(start + "T00:00:00");
    const en = new Date(end + "T00:00:00");
    if (Number.isNaN(s) || Number.isNaN(en)) return setError("Enter valid contract dates.");
    if (en < s) return setError("The end date cannot be earlier than the start date.");
    if (!days) return setError("Select the number of qualifying days per week.");
    const qd = Number(days);

    const months = monthList(s, en);
    const fys = [...new Set(months.map((mm) => fiscalYear(mm.year, mm.month)))];

    setLoading(true);
    let data;
    try {
      const res = await fetch(`/api/perdiem?zip=${zip}&years=${fys.join(",")}`);
      data = await res.json();
    } catch {
      setLoading(false);
      return setError("The GSA service is temporarily unavailable. Please try again in a moment.");
    }
    setLoading(false);

    if (!data.ok) {
      if (data.code === "unsupported") {
        return setError(
          "This location is not currently supported. The GSA per diem tool covers the 48 contiguous states and Washington, DC. Alaska, Hawaii, and US territories are not included."
        );
      }
      if (data.code === "bad-zip") return setError("Enter a valid five digit ZIP code.");
      return setError("Something went wrong looking up GSA rates. Please try again.");
    }

    const yr = data.years;
    if (fys.some((f) => yr[f]?.status === "unavailable")) {
      return setError("The GSA service is temporarily unavailable. Please try again in a moment.");
    }
    const okYears = fys.filter((f) => yr[f]?.status === "ok");
    if (!okYears.length) {
      return setError("No GSA rate was found for that ZIP code. Please double check it and try again.");
    }
    if (fys.some((f) => yr[f]?.status !== "ok")) {
      // The ZIP is valid (some years returned data), so a missing year means
      // GSA has not published those rates yet.
      return setError(
        "GSA rates have not yet been published for part of this assignment. Please return after the new rates are released."
      );
    }

    let location = null;
    const rows = months.map((mm) => {
      const yd = yr[fiscalYear(mm.year, mm.month)];
      if (!location && yd.location) location = yd.location;
      const lodging = yd.months[mm.month];
      const meals = yd.meals;
      const combined = lodging + meals;
      return {
        key: `${mm.year}-${mm.month}`,
        label: `${MONTHS[mm.month - 1]} ${mm.year}`,
        monthName: MONTHS[mm.month - 1],
        lodging,
        meals,
        combined,
        weekly: combined * qd,
      };
    });

    // Rate change vs the previous month in the list.
    for (let i = 1; i < rows.length; i += 1) {
      const diff = rows[i].combined - rows[i - 1].combined;
      if (diff !== 0) {
        rows[i].change = {
          dir: diff > 0 ? "Increases" : "Decreases",
          amount: Math.abs(diff),
          when: `${rows[i].monthName} 1`,
        };
      }
    }

    setResult({ rows, location, days: qd });
  }

  return (
    <div className="calc-wrap">
      <form className="calc-form" onSubmit={onSubmit} noValidate>
        <h2>Enter your assignment details</h2>

        <div className="calc-field">
          <label htmlFor="zip">Assignment ZIP code</label>
          <input
            id="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="20171"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
          />
        </div>

        <div className="calc-field">
          <label htmlFor="start">Contract start date</label>
          <input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>

        <div className="calc-field">
          <label htmlFor="end">Contract end date</label>
          <input id="end" type="date" min={start || undefined} value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>

        <div className="calc-field">
          <label htmlFor="days">Qualifying days away per week</label>
          <select id="days" value={days} onChange={(e) => setDays(e.target.value)}>
            <option value="" disabled>Select days</option>
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <option key={d} value={d}>{d} {d === 1 ? "day" : "days"}</option>
            ))}
          </select>
          <p className="calc-help">
            Enter the number of days per week you expect to qualify for tax free stipends.
          </p>
        </div>

        <button className="btn-teal" type="submit" disabled={loading}>
          {loading ? "Looking up rates…" : "View stipend maximums"}
        </button>
      </form>

      <div className="calc-results-col">
        {error && (
          <div className="calc-msg calc-msg-err" role="alert">{error}</div>
        )}

        {!error && !result && !loading && (
          <div className="calc-placeholder">
            <p>Enter your assignment details and select <b>View stipend maximums</b> to see the GSA based lodging and M&amp;IE maximums for each month of your contract.</p>
          </div>
        )}

        {result && (
          <div className="calc-results">
            <span className="calc-badge">GSA based maximums</span>
            {result.location && <h3 className="calc-loc">{result.location}</h3>}
            <p className="calc-sub">Based on {result.days} qualifying {result.days === 1 ? "day" : "days"} per week</p>

            {/* Desktop table */}
            <div className="calc-table-wrap">
              <table className="calc-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Lodging / day</th>
                    <th>M&amp;IE / day</th>
                    <th>Combined / day</th>
                    <th>Weekly maximum</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r) => (
                    <tr key={r.key} className={r.change ? "chg" : undefined}>
                      <td className="mn">{r.label}</td>
                      <td>{money(r.lodging)}</td>
                      <td>{money(r.meals)}</td>
                      <td>{money(r.combined)}</td>
                      <td>{money(r.weekly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.rows.some((r) => r.change) && (
                <div className="calc-notes">
                  {result.rows.filter((r) => r.change).map((r) => (
                    <p className="calc-note" key={r.key}>
                      <b>Rate change:</b> {r.change.dir} {money(r.change.amount)} per qualifying day beginning {r.change.when}.
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile cards */}
            <div className="calc-cards">
              {result.rows.map((r) => (
                <div className={`calc-card${r.change ? " chg" : ""}`} key={r.key}>
                  <h4>{r.label}</h4>
                  <div className="calc-crow">
                    <div className="calc-cell"><span className="k">Lodging / day</span><span className="v">{money(r.lodging)}</span></div>
                    <div className="calc-cell"><span className="k">M&amp;IE / day</span><span className="v">{money(r.meals)}</span></div>
                    <div className="calc-cell"><span className="k">Combined / day</span><span className="v">{money(r.combined)}</span></div>
                    <div className="calc-cell wk"><span className="k">Weekly maximum</span><span className="v">{money(r.weekly)}</span></div>
                  </div>
                  {r.change && (
                    <p className="calc-cnote">
                      <b>Rate change:</b> {r.change.dir} {money(r.change.amount)} per qualifying day beginning {r.change.when}.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="calc-source">
              Source: <a href="https://www.gsa.gov/travel/plan-book/per-diem-rates" target="_blank" rel="noopener noreferrer">GSA Per Diem Rates</a>
            </p>
          </div>
        )}
      </div>

      <div className="calc-disclaimer">
        <span className="calc-di-ic" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
        </span>
        <p>
          This calculator shows GSA based maximums, not the stipend an agency will offer. Tax free
          eligibility depends on your individual circumstances and employer reimbursement plan.
        </p>
      </div>

      <aside className="calc-ad">
        <span className="calc-ad-eyebrow">Featured tax resource</span>
        <h3>Not sure if you qualify for tax free stipends?</h3>
        <p>
          Tax Scrubs is a Travel Nurse Guide partner that offers personalized tax home consultations for
          travel nurses. A tax professional will review your work, housing, and tax home situation to help
          determine whether you qualify for tax free stipends.
        </p>
        <p>
          If you do not currently qualify, they can explain the legitimate steps you may be able to take to
          establish or maintain a qualifying tax home.
        </p>
        <a className="btn-teal" href="https://www.taxscrubs.com/services" target="_blank" rel="noopener noreferrer">
          Learn About Tax Home Consultations
        </a>
      </aside>
    </div>
  );
}
