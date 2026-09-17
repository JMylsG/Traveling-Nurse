"use client";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";
import ResourceSuggestionForm from "@/components/ResourceSuggestionForm";

const Arr = () => <span className="arr">→</span>;

const CHIPS = [
  { label: "Certifications", id: "certs" },
  { label: "Insurance", id: "insurance" },
  { label: "Job search", id: "jobs" },
  { label: "Taxes", id: "taxes" },
  { label: "Housing", id: "housing" },
];

function Badge({ children, quiet = false }) {
  return <span className={`resource-badge${quiet ? " quiet" : ""}`}>{children}</span>;
}

function PartnerCard({ initials, name, children, href, cta }) {
  return (
    <article className="resource-card partner">
      <div className="resource-card-head">
        <span className="resource-initials" aria-hidden="true">{initials}</span>
        <div><Badge>TNG Partner</Badge><h3>{name}</h3></div>
      </div>
      <div className="resource-copy">{children}</div>
      <a className="btn-teal resource-cta" href={href} target="_blank" rel="noopener sponsored">
        {cta} <Arr />
      </a>
    </article>
  );
}

function FeaturedCard({ initials, name, href, children }) {
  return (
    <article className="resource-card featured">
      <div className="resource-card-head">
        <span className="resource-initials quiet" aria-hidden="true">{initials}</span>
        <div>
          <Badge quiet>Featured Resource</Badge>
          <h3><a href={href} target="_blank" rel="noopener noreferrer">{name} <Arr /></a></h3>
        </div>
      </div>
      <div className="resource-copy">{children}</div>
    </article>
  );
}

export default function Resources() {
  useEffect(() => {
    const chips = [...document.querySelectorAll(".chip")];
    const sections = CHIPS.map((item) => document.getElementById(item.id));
    const spy = () => {
      let index = -1;
      sections.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= 150) index = i; });
      chips.forEach((chip, i) => chip.classList.toggle("active", i === index));
    };
    addEventListener("scroll", spy, { passive: true });
    spy();
    return () => removeEventListener("scroll", spy);
  }, []);

  return (
    <>
      <Fx spots=".resource-card" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-resources">
        <Nav active="resources" />
        <div className="container">
          <span className="eyebrow-s">For healthcare travelers</span>
          <h1 style={{ maxWidth: "20ch" }}>Resources <span className="hl">Worth Exploring</span></h1>
          <p className="sub" style={{ maxWidth: "54ch" }}>
            Find companies, services, and tools for the many decisions that come with travel nursing.
          </p>
        </div>
      </header>

      <div className="subnav">
        <div className="row">
          {CHIPS.map((chip) => <a key={chip.id} className="chip" href={`#${chip.id}`}>{chip.label}</a>)}
        </div>
      </div>

      <section className="gsec reveal resource-intro">
        <div className="container">
          <p className="lead">
            Companies labeled TNG Partner have a paid or referral relationship with Travel Nurse Guide.
            Other resources are included for informational purposes.
          </p>
        </div>
      </section>

      <section id="certs" className="gsec alt reveal res-cat">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Certifications</span>
            <h2 className="h2">Keep your certs current.</h2>
            <p className="lead">Expired certifications can delay onboarding. Explore in-person, verification-station, and virtual training options for healthcare professionals.</p>
          </div>
          <div className="resource-grid three stagger">
            <PartnerCard initials="HS" name="HeartStart CPR" href="https://cprvam.com/locations/" cta="See Locations">
              <p>In-class and CPR Verification Station training for AHA BLS, ACLS, and PALS.</p>
              <p>Certification locations across the western U.S., with new locations continuing to be added.</p>
            </PartnerCard>
            <PartnerCard initials="SD" name="Same Day CPR" href="https://samedaycpr.com/locations/" cta="See Locations">
              <p>In-class and CPR Verification Station training for AHA BLS, ACLS, and PALS.</p>
              <p>Certification locations across the eastern and central U.S., with new locations continuing to be added.</p>
            </PartnerCard>
            <PartnerCard initials="MM" name="Med Max Edu" href="https://medmaxedu.com/" cta="View Classes">
              <p>Virtual TNCC and ENPC classes for initial certification and renewal.</p>
            </PartnerCard>
          </div>
        </div>
      </section>

      <section id="insurance" className="gsec reveal res-cat">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Insurance</span>
            <h2 className="h2">Coverage that doesn&apos;t end with your contract.</h2>
            <p className="lead">Explore health coverage options that can travel with you between assignments.</p>
          </div>
          <div className="resource-grid single stagger">
            <PartnerCard initials="SI" name="Steve Does Insurance" href="https://calendly.com/stevedoesinsurance/appointment" cta="Book a Call">
              <p>Health coverage that follows you between contracts, built for people who move every thirteen weeks.</p>
              <p>Stephen has helped many Travel Nurse Guide members explore their health coverage options.</p>
            </PartnerCard>
          </div>
        </div>
      </section>

      <section id="jobs" className="gsec alt reveal res-cat">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Job search and recruiters</span>
            <h2 className="h2">Find contracts with someone on your side.</h2>
            <p className="lead">The right tools and support can make your job search easier. Explore options designed for healthcare travelers.</p>
          </div>
          <div className="resource-grid mixed stagger">
            <PartnerCard initials="PRN" name="PRN Healthcare" href="https://www.prnhealthservices.com/jobs" cta="Search Travel Jobs">
              <p>Search travel nursing and allied health jobs nationwide, with support from a dedicated recruiter.</p>
            </PartnerCard>
            <FeaturedCard initials="TW" name="Tallewise" href="https://tallewise.com/">
              <p>Find travel healthcare jobs while staying in control. Once verified, you get a free private Tallewise Number, so you don&apos;t have to share your personal number.</p>
            </FeaturedCard>
          </div>
        </div>
      </section>

      <section id="taxes" className="gsec reveal res-cat">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Tax services</span>
            <h2 className="h2">Navigate travel taxes with confidence.</h2>
            <p className="lead">Explore help with tax filing, tax homes, stipends, and other travel-related tax needs.</p>
          </div>
          <div className="resource-grid single stagger">
            <article className="resource-card tax-scrubs">
              <div className="resource-card-head">
                <span className="resource-initials" aria-hidden="true">TS</span>
                <h3>Tax Scrubs</h3>
              </div>
              <div className="resource-copy">
                <p>Tax filing and consultations for U.S. and Canadian healthcare travelers, including help with tax homes, stipends, and cross-border taxes.</p>
              </div>
              <a className="btn-teal resource-cta" href="https://www.taxscrubs.com/" target="_blank" rel="noopener noreferrer">
                View Tax Services <Arr />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="housing" className="gsec alt reveal res-cat">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Housing</span>
            <h2 className="h2">Furnished housing for your next assignment.</h2>
            <p className="lead">Explore furnished housing options for healthcare travelers.</p>
          </div>
          <div className="resource-grid featured-row stagger">
            <FeaturedCard initials="VH" name="Vidle Housing" href="https://www.vidlehousing.com/">
              <p>Furnished housing built specifically for healthcare travelers, with vetted hosts, transparent pricing, and support throughout your stay.</p>
            </FeaturedCard>
            <FeaturedCard initials="FF" name="Furnished Finder" href="https://www.furnishedfinder.com/">
              <p>Search furnished monthly rentals and connect directly with property owners.</p>
            </FeaturedCard>
          </div>
        </div>
      </section>

      <section className="gsec reveal suggestion-section">
        <div className="container">
          <span className="eyebrow-s">Resource suggestions</span>
          <h2 className="h2">Know a resource healthcare travelers should know about?</h2>
          <p className="lead">Tell us about a company, service, or tool you think should be considered for the TNG Resources page.</p>
          <ResourceSuggestionForm />
          <p className="suggest-note">Suggestions do not guarantee placement.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
