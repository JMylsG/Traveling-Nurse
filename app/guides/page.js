"use client";
import { useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

const Arr = () => <span className="arr">→</span>;

const CHIPS = [
  { label: "Pay", id: "pay" },
  { label: "Contracts", id: "contracts" },
  { label: "Taxes", id: "taxes" },
  { label: "Housing", id: "housing" },
  { label: "Certifications", id: "certs" },
];

export default function Guides() {
  // scrollspy: highlight the chip for the section under the sticky bar
  useEffect(() => {
    const chips = [...document.querySelectorAll(".chip")];
    const secs = CHIPS.map((c) => document.getElementById(c.id));
    const spy = () => {
      let idx = -1;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= 150) idx = i; });
      chips.forEach((c, i) => c.classList.toggle("active", i === idx));
    };
    addEventListener("scroll", spy, { passive: true });
    spy();
    return () => removeEventListener("scroll", spy);
  }, []);

  return (
    <>
      <Fx spots=".aside,.vetcard" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-guides">
        <Nav active="guides" />
        <div className="container">
          <span className="eyebrow-s">The business side</span>
          <h1 style={{ maxWidth: "20ch" }}>The four things that move your <span className="hl">paycheck</span>.</h1>
          <p className="sub">
            Pay, contracts, taxes, and housing, explained by people who&apos;ve actually done it.
            Short, direct, and written for nurses who are tired.
          </p>
        </div>
      </header>

      <div className="subnav">
        <div className="row">
          {CHIPS.map((c) => <a key={c.id} className="chip" href={`#${c.id}`}>{c.label}</a>)}
        </div>
      </div>

      {/* PAY */}
      <section id="pay" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Guide 01</span>
            <h2 className="h2">Pay: read the whole package, not the hourly rate.</h2>
            <p className="lead">The hospital agrees to pay a set amount to an agency for each travel nurse they place. That amount is called the bill rate. The agency uses the bill rate to cover its own costs, pay the travel nurse, and make a profit. What the agency pays the nurse is called the pay package.</p>
          </div>
          <div className="cols">
            <div className="pts stagger">
              <div className="pt"><span className="ic">01</span><div><h3>Compare weekly pay carefully</h3><p>Ask every recruiter for the same number: <mark className="hlm">gross weekly pay</mark>, with hourly rate, stipends, reimbursements, bonuses, and holiday and on-call pay listed. Net pay is just an estimate from your recruiter.</p></div></div>
              <div className="pt"><span className="ic">02</span><div><h3>Know the three parts</h3><p><b>Taxable base</b> (often low, $20 to $30/hr), <b>housing stipend</b>, and <b>meals and incidentals</b>. The stipends are where the real money lives.</p></div></div>
              <div className="pt"><span className="ic">03</span><div><h3>The IRS and GSA set the guardrails</h3><p>Many travelers and tax experts treat an RN base under <b>$20/hr</b> as an IRS red flag. On the other end, the <a className="inline-link" href="https://www.gsa.gov/travel?topnav=travel" target="_blank" rel="noopener noreferrer">GSA</a> caps how much an agency can pay you in tax-free stipends.</p></div></div>
              <div className="pt"><span className="ic">04</span><div><h3>Check the market first</h3><p>Look up the community average for your specialty and state before the call, so you know a lowball when you hear one. <Link className="inline-link" href="/market">See real pay rates <Arr /></Link></p></div></div>
            </div>
            <div className="aside math">
              <span className="at">Quick math · sample offer</span>
              <ul>
                <li>Base: $24/hr × 36 hrs = $864 taxable</li>
                <li>Housing stipend: $980/wk tax-free</li>
                <li>Meals and incidentals: $350/wk tax-free</li>
              </ul>
              <div className="sum">Gross weekly: <span>$2,194</span> · blended ≈ $61/hr</div>
            </div>
          </div>
          <Link className="gget" href="/#getguide">Want the printable version? Get the free guide <Arr /></Link>
        </div>
      </section>

      {/* CONTRACTS */}
      <section id="contracts" className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Guide 02</span>
            <h2 className="h2">Contracts: the clauses that cost you money.</h2>
            <p className="lead">Most contract pain comes from four clauses nobody reads. Read these four and you&apos;re ahead of 90 percent of first-timers.</p>
          </div>
          <div className="cols">
            <div className="pts stagger">
              <div className="pt"><span className="ic">01</span><div><h3>Guaranteed hours</h3><p>Without them, the hospital can cancel your shifts and your stipends shrink with them. Push for <mark className="hlm">36 guaranteed hours</mark> or a cap on cancelled shifts per contract.</p></div></div>
              <div className="pt"><span className="ic">02</span><div><h3>Cancellation policy</h3><p>What happens if the facility ends the contract early, and what happens if you do. Look for the notice window and the penalties for cancellations.</p></div></div>
              <div className="pt"><span className="ic">03</span><div><h3>Float clause</h3><p>Many contracts let the facility float you to other units. Make sure it&apos;s limited to units you&apos;re actually competent and credentialed for.</p></div></div>
              <div className="pt"><span className="ic">04</span><div><h3>Must be in the contract</h3><p>If it is not written in the contract, it is not guaranteed to happen. A recruiter&apos;s promise in email, text, or a phone call means nothing until it makes it into the contract.</p></div></div>
            </div>
            <div className="aside flag">
              <span className="at">Red flags · walk away or push back</span>
              <ul>
                <li>No guaranteed hours anywhere in the contract</li>
                <li>&quot;Facility policy applies&quot; with no policy attached</li>
                <li>Penalties charged per missed hour, not per shift</li>
                <li>Verbal promises that never make it into writing</li>
              </ul>
            </div>
          </div>
          <Link className="gget" href="/#getguide">Want the printable version? Get the free guide <Arr /></Link>
        </div>
      </section>

      {/* TAXES */}
      <section id="taxes" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Guide 03</span>
            <h2 className="h2">Taxes: stipends are only tax-free if you do this.</h2>
            <p className="lead">The IRS lets your stipends stay tax-free when you meet all three requirements. Get any one of them wrong and an audit gets expensive.</p>
          </div>
          <div className="cols">
            <div className="pts stagger">
              <div className="pt"><span className="ic">01</span><div><h3>Maintain a tax home</h3><p>A place you pay to maintain (rent, mortgage, utilities) and return to between contracts. Paying rent to your parents only counts if it&apos;s real, documented rent.</p></div></div>
              <div className="pt"><span className="ic">02</span><div><h3>Duplicate your expenses</h3><p>While you collect tax-free stipends, you pay fair market value for housing at the assignment and keep paying for your tax home. That duplication is what qualifies you.</p></div></div>
              <div className="pt"><span className="ic">03</span><div><h3>Distance: the 50-mile rule is a myth</h3><p>The IRS sets no specific distance. Fifty miles is an agency rule of thumb, nothing more. The real standard is that the assignment requires <mark className="hlm">rest away from your tax home</mark> to meet the demands of the work.</p></div></div>
              <div className="pt"><span className="ic">04</span><div><h3>Consult a tax expert</h3><p>A regular preparer will miss this stuff. A travel-nurse tax specialist usually pays for themselves in the first return.</p></div></div>
            </div>
            <div className="aside math">
              <span className="at">Keep these · your audit file</span>
              <ul>
                <li>Lease or mortgage statements for your tax home</li>
                <li>Utility bills that show duplicated expenses</li>
                <li>Every contract, with dates and locations</li>
                <li>Mileage log for travel between assignments</li>
              </ul>
            </div>
          </div>
          <Link className="gget" href="/#getguide">Want the printable version? Get the free guide <Arr /></Link>
        </div>
      </section>

      {/* HOUSING */}
      <section id="housing" className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Guide 04</span>
            <h2 className="h2">Housing: furnished, monthly, near your assignment. No scams.</h2>
            <p className="lead">Take the stipend if you can house yourself under it, that difference is yours. Just don&apos;t wire money to a stranger.</p>
          </div>
          <div className="cols">
            <div className="pts stagger">
              <div className="pt"><span className="ic">01</span><div><h3>Research housing before you sign</h3><p>Check availability and cost near the facility before you accept the contract. A strong rate in a town with no monthly rentals is not a strong rate.</p></div></div>
              <div className="pt"><span className="ic">02</span><div><h3>Verify before you pay anything</h3><p>Scammers work travelers hard, and urgency is their favorite tool. Never send money before you&apos;ve seen the place, in person or on a live video walkthrough, and confirm the landlord actually owns it.</p></div></div>
              <div className="pt"><span className="ic">03</span><div><h3>Get a lease and keep receipts</h3><p>If the IRS ever audits your stipends, a real rental agreement and <mark className="hlm">proof of every payment</mark> is what satisfies them. Handshake deals do not.</p></div></div>
              <div className="pt"><span className="ic">04</span><div><h3>Use platforms built for travelers</h3><p>Travel nurse housing platforms like <b>Vidle</b> (sponsored) filter for furnished, monthly, flexible terms, so you&apos;re not fighting twelve-month leases.</p></div></div>
            </div>
            <div className="aside flag">
              <span className="at">Scam signals · do not send money</span>
              <ul>
                <li>Deposit by wire, Zelle, or gift card before a tour</li>
                <li>Price sits far under every comparable listing</li>
                <li>&quot;Landlord&quot; is out of town and can&apos;t show the unit</li>
                <li>No lease, or a lease with someone else&apos;s name</li>
              </ul>
            </div>
          </div>
          <Link className="gget" href="/#getguide">Want the printable version? Get the free guide <Arr /></Link>
        </div>
      </section>

      {/* CERTIFICATIONS / PARTNERS */}
      <section id="certs" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Before you apply</span>
            <h2 className="h2">Keep your certs current, the easy way.</h2>
            <p className="lead">Expired BLS or ACLS can hold up a start date. These are the companies our nurses actually use, each one vetted by people who&apos;ve used them.</p>
            <p className="lead" style={{ marginTop: 10 }}><b>New:</b> AHA CPR Verification Stations are automated, self-guided testing units. Finish the online portion first, then the station&apos;s voice-assisted manikins run your hands-on skills check and issue your AHA eCard the same day. No instructor, no scheduling.</p>
          </div>
          <div className="vetgrid v3 stagger">
            <div className="vetcard"><b>HeartStart CPR</b><span>In-class and CPR Verification Station training for AHA BLS, ACLS, and PALS.</span><span className="vet">Vetted by nurses</span><a className="visit" href="https://refer.cprvam.com/MFf7baa86672/signup?mwr=drew-9025" target="_blank" rel="noopener sponsored">Get certified <Arr /></a></div>
            <div className="vetcard"><b>Same Day CPR</b><span>In-class and Verification Station training for AHA BLS, ACLS, and PALS, when the deadline is tomorrow.</span><span className="vet">Vetted by nurses</span></div>
            <div className="vetcard"><b>Med Max Edu</b><span>Virtual TNCC and ENPC courses, done from wherever your contract takes you.</span><span className="vet">Vetted by nurses</span><a className="visit" href="https://medmaxedu.com/" target="_blank" rel="noopener noreferrer">Get certified <Arr /></a></div>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Free guide</span>
          <div className="h2">Take all four guides with you.</div>
          <p className="bandp">The cheat sheet, the pay benchmarks, and the vetted resources, in your inbox.</p>
          <Link className="btn-teal" href="/#getguide">Send me the guide <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
