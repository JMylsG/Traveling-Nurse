import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalculatorClient from "./calculator-client";

export const metadata = {
  title: "GSA Stipend Maximum Calculator · The Travel Nurse Guide",
  description:
    "See the GSA based daily and weekly tax-free maximum for lodging and M&IE for every month of your travel nurse assignment. Not an estimate of agency pay.",
};

export default function Calculator() {
  return (
    <>
      <header className="page-head ph-market">
        <Nav active="stipend calculator" />
        <div className="container">
          <span className="eyebrow-s">Stipend tool</span>
          <h1 style={{ maxWidth: "18ch" }}>GSA Stipend Maximum Calculator</h1>
          <p className="sub">See the GSA based daily and weekly maximum for every month of your assignment.</p>
        </div>
      </header>

      <section className="section light" style={{ paddingTop: 40 }}>
        <div className="container">
          <CalculatorClient />

          <div className="calc-disclaimer">
            <span className="calc-di-ic" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
            </span>
            <p>
              This calculator shows GSA based maximums, not the stipend an agency will offer. Tax free
              eligibility depends on your individual circumstances and employer reimbursement plan.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
