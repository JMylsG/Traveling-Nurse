import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "Terms of Service · The Travel Nurse Guide",
  description:
    "The terms for using The Travel Nurse Guide, in plain language. Written to be read, not to trip you up.",
};

const Arr = () => <span className="arr">→</span>;

export default function Terms() {
  return (
    <>
      <Fx spots=".legal" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-faq">
        <Nav active="" />
        <div className="container">
          <span className="eyebrow-s">Terms</span>
          <h1 style={{ maxWidth: "20ch" }}>The deal, <span className="hl">in plain language</span>.</h1>
          <p className="sub">
            The rules for using this site, written to be read, not to trip you up.
            Short version up top, the honest detail below.
          </p>
          <span className="lstamp">Last updated: September 8, 2026</span>
        </div>
      </header>

      <section className="gsec reveal">
        <div className="container">
          <div className="legal">
            <p className="lead">
              The short version: this site gives healthcare travelers honest information and useful resources.
              It&apos;s here to help, not to give you professional advice or make you any promises. Use it in
              good faith and we&apos;re glad you&apos;re here.
            </p>

            <h3>Who these terms are with</h3>
            <p>
              The Travel Nurse Guide is operated by Guide Media LLC. By using this site you&apos;re agreeing to
              these terms. If you don&apos;t agree with them, that&apos;s okay, but please don&apos;t use the site.
            </p>

            <h3>What this site is</h3>
            <p>
              This is an independent information and community resource created to help healthcare travelers
              make more informed decisions.
            </p>

            <h3>Informational and educational purposes only</h3>
            <p>
              The website, calculators, guides, articles, examples, community discussions, and other
              resources are provided for general informational and educational purposes only. They do not
              constitute tax, accounting, financial, investment, legal, contract, employment, medical,
              nursing, clinical, or other professional advice.
            </p>

            <h3>No professional relationship</h3>
            <p>
              Using the website or participating in the community does not create an attorney client,
              accountant client, financial advisor client, clinician patient, nurse patient, fiduciary,
              employment, agency, or other professional relationship with Guide Media LLC, Drew Jones, or any
              contributor, partner, employee, contractor, or representative.
            </p>

            <h3>Your responsibility</h3>
            <p>
              You are responsible for evaluating your own circumstances, verifying information, and consulting
              appropriately qualified tax, accounting, financial, legal, employment, medical, nursing, or
              other professionals before making decisions. Nothing on the website or in the community should
              be used to diagnose or treat a condition, direct patient care, replace an employer&apos;s policy,
              or override applicable laws, regulations, licensing requirements, professional standards, or
              facility procedures.
            </p>

            <h3>Using the site fairly</h3>
            <p>When you use this site, you agree not to:</p>
            <ul>
              <li>Break it, overload it, or try to get around its security.</li>
              <li>Scrape or copy it wholesale to rebuild it somewhere else.</li>
              <li>Use it to spam, harass, or mislead other people.</li>
              <li>Pretend to be us, or misrepresent your connection to us.</li>
            </ul>
            <p>Basically: use it the way it&apos;s meant to be used, and don&apos;t make it worse for the next nurse.</p>

            <h3>Our content</h3>
            <p>
              The writing, data, and design on this site belong to us. You&apos;re welcome to read it, link to it,
              and share it. Republishing large chunks as your own, or using it commercially without asking,
              is not okay. If you want to use something, just reach out.
            </p>

            <h3>Third party companies and paid relationships</h3>
            <p>
              Some companies, services, links, content, or placements may be advertisements, sponsored
              content, paid partnerships, or referral relationships. Guide Media LLC may receive payment or
              referral compensation. A paid relationship does not make Guide Media LLC responsible for a third
              party&apos;s products, services, pricing, claims, availability, privacy practices, or performance.
              You should evaluate each company, product, and service based on your own needs.
            </p>

            <h3>The email list and free guide</h3>
            <p>
              If you sign up, we&apos;ll send you the guide and occasional emails. It&apos;s free, and you can
              unsubscribe anytime with one click. How we handle your email is covered in our
              {" "}<Link className="inline-link" href="/privacy">privacy policy <Arr /></Link>.
            </p>

            <h3>Accuracy and changes</h3>
            <p>
              We make reasonable efforts to provide useful information, but we do not guarantee that any
              content is complete, current, accurate, or error free. Laws, tax rules, GSA rates, agency
              policies, employment practices, healthcare requirements, products, and services may change. You
              are responsible for verifying information that may affect your finances, employment, taxes,
              licensing, contracts, or patient care.
            </p>

            <h3>Assumption of risk and limitation of liability</h3>
            <p>
              Your use of the website, calculators, resources, linked services, and community information is
              voluntary and at your own discretion and risk. To the fullest extent permitted by applicable
              law, Guide Media LLC and its owners, employees, contractors, contributors, partners, and
              representatives will not be responsible for losses, damages, claims, penalties, tax
              consequences, employment consequences, contract disputes, clinical outcomes, or other results
              arising from reliance on website content, community discussions, calculations, third party
              services, or decisions made using them.
            </p>

            <h3>Calculator specific clarification</h3>
            <p>
              The GSA Stipend Calculator displays GSA based maximum amounts using the information entered by
              the user. It does not determine whether a person qualifies for tax free stipends, calculate an
              agency&apos;s actual pay package, or guarantee that any amount can or will be paid tax free.
              Eligibility and reimbursement treatment depend on the user&apos;s individual facts, tax home,
              assignment, expenses, employer practices, and applicable law.
            </p>

            <h3>Changes to these terms</h3>
            <p>
              We may update these terms as the site grows. When we do, we&apos;ll change the date at the top of this
              page. If a change is significant, we&apos;ll say so plainly rather than slip it past you.
            </p>

            <h3>Contact us</h3>
            <p>
              Questions about these terms? Reach us through the
              {" "}<Link className="inline-link" href="/partners#contact">contact form <Arr /></Link> and we&apos;ll help.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
