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
          <h1 style={{ maxWidth: "18ch" }}>GSA Stipend Calculator</h1>
          <p className="sub">See the GSA based daily and weekly maximum for every month of your assignment.</p>
        </div>
      </header>

      <section className="section light" style={{ paddingTop: 40 }}>
        <div className="container">
          <CalculatorClient />
        </div>
      </section>

      <Footer />
    </>
  );
}
