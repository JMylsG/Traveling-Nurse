"use client";
import { useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

const Arr = () => <span className="arr">→</span>;

const CHIPS = [
  { label: "How it works", id: "how" },
  { label: "Certifications", id: "certs" },
  { label: "Insurance", id: "insurance" },
  { label: "Job search", id: "jobs" },
  { label: "Taxes", id: "taxes" },
  { label: "Housing", id: "housing" },
];

export default function Resources() {
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
      <Fx spots=".rescard,.step" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-resources">
        <Nav active="resources" />
        <div className="container">
          <span className="eyebrow-s">Vetted, not paid</span>
          <h1 style={{ maxWidth: "20ch" }}>Skip the search. Start with <span className="hl">the short list</span>.</h1>
          <p className="sub" style={{ maxWidth: "54ch" }}>
            Tax help, insurance, certifications, housing, and job search, pulled from
            what nurses in the group actually use and vouch for.
          </p>
        </div>
      </header>

      <div className="subnav">
        <div className="row">
          {CHIPS.map((c) => <a key={c.id} className="chip" href={`#${c.id}`}>{c.label}</a>)}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">How this list works</span>
            <h2 className="h2">Recommendations, not ads.</h2>
            <p className="lead">Plenty of sites sell this page to whoever pays. Here, partners support the community, but money doesn&apos;t buy a listing. <mark className="hlm">Passing the vet does.</mark></p>
          </div>
          <div className="steps stagger">
            <div className="step"><span className="n">STEP 1</span><h3>Nurses vouch first</h3><p>Nothing gets listed because a company asked. It gets considered because members used it and said so in the group.</p></div>
            <div className="step"><span className="n">STEP 2</span><h3>Then we kick the tires</h3><p>Pricing, service, and what happens when something goes wrong. If we wouldn&apos;t send a friend, it doesn&apos;t go up.</p></div>
            <div className="step"><span className="n">STEP 3</span><h3>Slip, and it&apos;s gone</h3><p>A listing that stops earning recommendations comes down. That&apos;s the whole deal, and everyone listed knows it.</p></div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Certifications</span>
            <h2 className="h2">BLS due? Don&apos;t let it hold up a start date.</h2>
            <p className="lead">Expired certs stall onboarding more than anything else. These two are the ones our nurses actually renew with.</p>
          </div>
          <div className="resgrid stagger">
            <div className="rescard feat">
              <div className="rtop"><span className="ric">HS</span><span className="rtag">Community partner</span></div>
              <h3>HeartStart CPR</h3>
              <p className="what">BLS and CPR certification, online and in person, with cards issued fast.</p>
              <p className="earned">Recommended in the group long before it was listed here.</p>
              <div className="rfoot"><span className="vet">Vetted by nurses</span><a className="visit" href="#">Visit site <Arr /></a></div>
            </div>
            <div className="rescard feat">
              <div className="rtop"><span className="ric">SD</span><span className="rtag">Community partner</span></div>
              <h3>Same Day CPR</h3>
              <p className="what">BLS, ACLS, and PALS renewals when the deadline is tomorrow.</p>
              <p className="earned">Named by members who needed a cert overnight and got one.</p>
              <div className="rfoot"><span className="vet">Vetted by nurses</span><a className="visit" href="#">Visit site <Arr /></a></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">+</span><span className="rtag teal">Your pick</span></div>
              <h3>Your favorite missing?</h3>
              <p className="what">Every listing starts as a recommendation from a nurse in the group. If yours earned it, say the name.</p>
              <div className="rfoot"><Link className="visit" href="/community/social-community">Nominate them in the community <Arr /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section id="insurance" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Insurance</span>
            <h2 className="h2">Coverage that doesn&apos;t end with your contract.</h2>
            <p className="lead">Between assignments is exactly when you can&apos;t afford a gap. Start here before you count on agency benefits.</p>
          </div>
          <div className="resgrid stagger">
            <div className="rescard feat">
              <div className="rtop"><span className="ric">SI</span><span className="rtag">Community partner</span></div>
              <h3>Steve Insurance</h3>
              <p className="what">Health coverage that follows you between contracts, built for people who move every thirteen weeks.</p>
              <p className="earned">Vetted through member policies, not a sales pitch.</p>
              <div className="rfoot"><span className="vet">Vetted by nurses</span><a className="visit" href="#">Visit site <Arr /></a></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">…</span><span className="rtag teal">Vetting now</span></div>
              <h3>More coverage in vetting</h3>
              <p className="what">Supplemental and disability options are being vetted with the group right now. The keepers land here.</p>
              <div className="rfoot"><span className="vet">In review</span></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">?</span><span className="rtag teal">Ask around</span></div>
              <h3>Not sure what you need?</h3>
              <p className="what">Coverage questions come up in the group every week, answered by nurses who&apos;ve been through open enrollment on the road.</p>
              <div className="rfoot"><Link className="visit" href="/community/social-community">Ask in the community <Arr /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* JOB SEARCH */}
      <section id="jobs" className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Job search and recruiters</span>
            <h2 className="h2">Find contracts with someone on your side.</h2>
            <p className="lead">Recruiters aren&apos;t the enemy, bad ones are. Work from names nurses vouch for, and know the rate before the call.</p>
          </div>
          <div className="resgrid stagger">
            <div className="rescard feat">
              <div className="rtop"><span className="ric">TW</span><span className="rtag">Community partner</span></div>
              <h3>Tallewise</h3>
              <p className="what">Job search help built around travel contracts, not permanent placements.</p>
              <p className="earned">Members used them to land contracts and reported back.</p>
              <div className="rfoot"><span className="vet">Vetted by nurses</span><a className="visit" href="#">Visit site <Arr /></a></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">…</span><span className="rtag teal">Vetting now</span></div>
              <h3>The recruiter short list</h3>
              <p className="what">Recruiter recommendations are collected inside the group, name by name. The short list lands here once it&apos;s earned.</p>
              <div className="rfoot"><span className="vet">In review</span></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">$</span><span className="rtag teal">Do this first</span></div>
              <h3>Know the rate before the call</h3>
              <p className="what">Check the community average for your specialty and state, so a lowball sounds like one.</p>
              <div className="rfoot"><Link className="visit" href="/market">See real pay rates <Arr /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* TAXES */}
      <section id="taxes" className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Tax services</span>
            <h2 className="h2">A preparer who knows what a tax home is.</h2>
            <p className="lead">A regular preparer will miss the stipend rules. We only list travel-tax specialists, and we&apos;re picky on purpose.</p>
          </div>
          <div className="resgrid stagger">
            <div className="rescard open">
              <div className="rtop"><span className="ric">…</span><span className="rtag teal">Vetting now</span></div>
              <h3>Travel-tax specialists</h3>
              <p className="what">Being vetted with the group right now. Names land here when nurses vouch for the returns, not the marketing.</p>
              <div className="rfoot"><span className="vet">In review</span></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">✓</span><span className="rtag teal">Free guide</span></div>
              <h3>Keep your stipends tax-free</h3>
              <p className="what">The tax guide covers tax homes, the 50-mile myth, and the audit file worth keeping.</p>
              <div className="rfoot"><Link className="visit" href="/guides#taxes">Read the tax guide <Arr /></Link></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">+</span><span className="rtag teal">Your pick</span></div>
              <h3>Got one who earned it?</h3>
              <p className="what">If a specialist saved your return, the community wants the name.</p>
              <div className="rfoot"><Link className="visit" href="/community/social-community">Nominate them in the group <Arr /></Link></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOUSING */}
      <section id="housing" className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Housing</span>
            <h2 className="h2">Furnished, monthly, and actually real.</h2>
            <p className="lead">Housing is where travelers get scammed. Vetted platforms will land here. Until then, use the guide and ask the group.</p>
          </div>
          <div className="resgrid stagger">
            <div className="rescard open">
              <div className="rtop"><span className="ric">…</span><span className="rtag teal">Vetting now</span></div>
              <h3>Furnished rental platforms</h3>
              <p className="what">We&apos;re comparing the monthly-rental platforms members actually book with. The keepers land here.</p>
              <div className="rfoot"><span className="vet">In review</span></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">✓</span><span className="rtag teal">Free guide</span></div>
              <h3>Spot a scam in one read</h3>
              <p className="what">The housing guide covers stipend math, verification steps, and the do-not-send-money signals.</p>
              <div className="rfoot"><Link className="visit" href="/guides#housing">Read the housing guide <Arr /></Link></div>
            </div>
            <div className="rescard open">
              <div className="rtop"><span className="ric">?</span><span className="rtag teal">Ask around</span></div>
              <h3>Leads from nurses on the ground</h3>
              <p className="what">Members post housing leads and warnings for the cities they&apos;re actually working in.</p>
              <div className="rfoot"><Link className="visit" href="/community/social-community">Ask in the community <Arr /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Free guide</span>
          <div className="h2">Get the vetted list in your inbox.</div>
          <p className="bandp">The short list, the pay benchmarks, and all four guides. One email, no spam, unsubscribe anytime.</p>
          <Link className="btn-teal" href="/#getguide">Send me the guide <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
