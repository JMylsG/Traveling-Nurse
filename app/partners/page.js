import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";
import PartnerForm from "@/components/PartnerForm";

export const metadata = {
  title: "Partner with us · The Travel Nurse Guide",
  description:
    "Get recommended to 37,000 travel nurses. A boutique community built on trust, not ad blasts. See how partnering works.",
};

const Arr = () => <span className="arr">→</span>;

export default function Partners() {
  return (
    <>
      <Fx spots=".card,.wcard,.q2,.step" magnets=".btn-teal,.nav-cta,.pform button" />

      <header className="page-head ph-partners">
        <Nav cta={{ href: "#contact", label: "Start the conversation", filled: true }} ctaOnMobile={false} />
        <div className="container">
          <span className="eyebrow-s">For brands</span>
          <h1 style={{ maxWidth: "22ch" }}>Get recommended to <span className="hl">37,000 travel nurses</span>.</h1>
          <p className="sub tight">
            Ads get scrolled past. Recommendations get acted on. This community is run by a working
            travel nurse, and when a brand earns a spot here, nurses listen.
          </p>
          <p className="trustline"><span className="tick">✓</span> Already trusted by HeartStart CPR, Same Day CPR, Med Max Edu, Steve Does Insurance, Tax Scrubs, and Tallewise</p>
          <a className="btn-teal" href="#contact">Start the conversation <Arr /></a>
          <p className="head-note">No media kits, no pressure. A short call to see if it&apos;s a fit.</p>
        </div>
      </header>

      <div className="stats">
        <div className="row">
          <div className="stat"><b>37,000+</b><small>Members</small></div>
          <div className="stat"><b><span>Daily</span></b><small>Active conversations</small></div>
          <div className="stat"><b>All 50</b><small>States</small></div>
          <div className="stat"><b><span>10.4%</span></b><small>Click-to-signup conversion</small></div>
          <div className="stat"><b>Since 2018</b><small>Community</small></div>
        </div>
      </div>

      {/* THE NOISE PROBLEM */}
      <section className="psec alt reveal">
        <div className="container">
          <span className="eyebrow-s">Cutting through the noise</span>
          <h2 className="h2">Skip the noise. Show up <span className="hlr">where nurses already are</span>.</h2>
          <p className="lead">The challenge isn&apos;t how you support nurses. It&apos;s breaking through early enough for a nurse to see the difference before you&apos;re lumped in with every other agency.</p>
          <div className="grid3 stagger">
            <div className="card"><span className="ic">21</span><h3>Days a year on the scroll</h3><p>That&apos;s how much time the average person spends scrolling. The question isn&apos;t reach. It&apos;s whether you ever show up with context when they do.</p></div>
            <div className="card"><span className="ic">#1</span><h3>Facebook is still where it happens</h3><p>It&apos;s the #1 platform where recruiters and travelers actually talk. Real conversations, real nurses, no bots, no job blasts.</p></div>
            <div className="card"><span className="ic">37K</span><h3>Warmer leads, built on trust</h3><p>Access to 37,000 nurses in one place. Show up consistently and let familiarity do the work. By the time a nurse reaches out, they already know who you are.</p></div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="psec reveal">
        <div className="container">
          <span className="eyebrow-s">Why it converts</span>
          <h2 className="h2">An audience you can&apos;t buy with ads.</h2>
          <p className="lead">Facebook is still where recruiters actually reach travelers, and this is one of the most focused rooms in it. Members join for value, not entertainment, and they act on recommendations from people they trust. That trust is the product.</p>
          <div className="grid3 stagger">
            <div className="card"><span className="ic">01</span><h3>A trusted voice, not a billboard</h3><p>Recommendations come from a working travel nurse with eight years in the community, not a media company guessing.</p></div>
            <div className="card"><span className="ic">02</span><h3>One profession, zero waste</h3><p>Every member is a travel nurse or interested in becoming one. No broad healthcare audience to pay for and filter out.</p></div>
            <div className="card"><span className="ic">03</span><h3>Vetted placement</h3><p>Your brand appears as a vetted resource nurses are pointed to, not as an ad they scroll past. Warmer leads, fewer ghosted messages.</p></div>
          </div>
        </div>
      </section>

      {/* WAYS TO PARTNER */}
      <section className="psec alt reveal">
        <div className="container">
          <span className="eyebrow-s">Ways to partner</span>
          <h2 className="h2">Pick the shape that fits.</h2>
          <p className="lead">Every placement is clearly disclosed and kept clean. If it would annoy a nurse, it doesn&apos;t run.</p>
          <div className="grid4 stagger" style={{ marginTop: 38, gap: 16 }}>
            <div className="wcard"><span className="tag">Always on</span><h3>Vetted resource listing</h3><p>A permanent spot in the resources nurses are sent to for tax, insurance, certs, and housing.</p></div>
            <div className="wcard"><span className="tag">Recurring</span><h3>Newsletter feature</h3><p>A featured slot in the email that carries the pay benchmarks and guides nurses signed up for.</p></div>
            <div className="wcard"><span className="tag">Content</span><h3>Sponsored guide or tool</h3><p>Put your name on a resource nurses actually use, like a pay guide or a certification checklist.</p></div>
            <div className="wcard"><span className="tag">Perks</span><h3>Member discount spotlight</h3><p>A clean, non-spammy offer for members, framed as a perk they get for being here.</p></div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="psec reveal">
        <div className="container">
          <span className="eyebrow-s">In good company</span>
          <h2 className="h2">Brands already working with us.</h2>
          <div className="logos"><span>HeartStart CPR</span><span>Same Day CPR</span><span>Med Max Edu</span><span>Steve Does Insurance</span><span>Tax Scrubs</span><span>Tallewise</span></div>
          <div className="quotes2 stagger" style={{ marginTop: 38 }}>
            <div className="q2">
              <p>&quot;Working with Drew put us in front of exactly the nurses we wanted to reach. The response felt like word of mouth, not advertising.&quot;</p>
              <div className="who"><span className="av">SI</span><div><b>Partner testimonial</b><small>Insurance services</small></div></div>
            </div>
            <div className="q2">
              <p>&quot;The community actually engages. We saw more qualified traffic from one feature than from a month of paid social.&quot;</p>
              <div className="who"><span className="av">CP</span><div><b>Partner testimonial</b><small>Certification provider</small></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="psec alt reveal">
        <div className="container">
          <span className="eyebrow-s">How it works</span>
          <h2 className="h2">Three steps, no runaround.</h2>
          <div className="steps stagger">
            <div className="step"><span className="n">STEP 1</span><h3>Intro call</h3><p>Fifteen minutes on who you are, who we are, and what you&apos;re trying to reach.</p></div>
            <div className="step"><span className="n">STEP 2</span><h3>Fit check</h3><p>We only list what we&apos;d genuinely recommend to a nurse. If it&apos;s a fit, we shape the placement together.</p></div>
            <div className="step"><span className="n">STEP 3</span><h3>Launch and report</h3><p>Your placement goes live and you get simple recaps of how it&apos;s performing. No dashboards to decode.</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <div className="cta-wrap" id="contact">
        <div className="capture-band left reveal">
          <span className="eyebrow-s">Start the conversation</span>
          <h2 className="h2">Win the relationship. The deals follow.</h2>
          <p className="lead">Tell us who you want to reach. A short note is enough, we&apos;ll reply with times for an intro call.</p>
          <PartnerForm />
          <p className="micro">We reply to every serious inquiry. If it&apos;s not a fit, we&apos;ll tell you straight.</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
