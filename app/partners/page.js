import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";
import PartnerForm from "@/components/PartnerForm";

export const metadata = {
  title: "Partner with us · The Travel Nurse Guide",
  description:
    "Reach more than 37,000 healthcare travelers through advertising, sponsored content, resource placements, and custom partnerships. See how partnering works.",
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
          <h1 style={{ maxWidth: "26ch" }}>Connect with a community of more than <span className="hl">37,000 healthcare professionals</span> who travel or are interested in travel healthcare.</h1>
          <p className="sub tight">
            Put your company in front of a focused audience through advertising, sponsored content,
            resource placements, and custom partnerships built around your goals.
          </p>
          <p className="trustline"><span className="tick">✓</span> Companies that have partnered with TNG include PRN Healthcare, HeartStart CPR, Same Day CPR, Med Max Edu, Steve Does Insurance, Tax Scrubs, and Tallewise</p>
          <a className="btn-teal" href="#contact">Start the conversation <Arr /></a>
          <p className="head-note">No media kits, no pressure. A short call to see if it&apos;s a fit.</p>
        </div>
      </header>

      <div className="stats">
        <div className="row">
          <div className="stat"><b>37,000+</b><small>Members</small></div>
          <div className="stat"><b>All 50</b><small>States</small></div>
          <div className="stat"><b>Since 2018</b><small>Community</small></div>
          <div className="stat"><b>Free</b><small>To join</small></div>
        </div>
      </div>

      {/* THE NOISE PROBLEM */}
      <section className="psec alt reveal">
        <div className="container">
          <span className="eyebrow-s">Cutting through the noise</span>
          <h2 className="h2">Show up <span className="hlr">where healthcare travelers already are</span>.</h2>
          <p className="lead">Breaking through is the hard part. A consistent presence inside a trusted community lets travelers get familiar with your company before they ever need what you offer.</p>
          <div className="grid3 stagger">
            <div className="card"><span className="clabel">Since 2018</span><h3>An established travel healthcare community</h3><p>TNG has served the travel healthcare community since 2018 and has grown to more than 37,000 members.</p></div>
            <div className="card"><span className="clabel">Active conversations</span><h3>Where healthcare travelers connect</h3><p>Members use the TNG Facebook group to ask questions, compare experiences, share information, and discuss life on assignment.</p></div>
            <div className="card"><span className="clabel">Recurring visibility</span><h3>Build familiarity over time</h3><p>Recurring placements give companies multiple opportunities to build awareness and become more familiar to the TNG community.</p></div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="psec reveal">
        <div className="container">
          <span className="eyebrow-s">What you&apos;re getting</span>
          <h2 className="h2">We sell access, not leads.</h2>
          <p className="lead">Connect with a focused community of healthcare travelers through relevant, consistent placements. Build awareness and familiarity so members know who you are before they need what your company offers.</p>
          <div className="grid3 stagger">
            <div className="card"><span className="ic">01</span><h3>Relevant by design</h3><p>Placements are shaped around what your company offers and how it may be useful to healthcare travelers, helping your message fit both the audience and the platform.</p></div>
            <div className="card"><span className="ic">02</span><h3>One focused audience</h3><p>Members are healthcare professionals who currently travel or are interested in travel healthcare, keeping campaigns focused on a relevant audience.</p></div>
            <div className="card"><span className="ic">03</span><h3>Flexible placement options</h3><p>Choose from advertising, sponsored content, resource placements, community access, and custom campaigns based on what fits your company and goals.</p></div>
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
            <div className="wcard"><span className="tag">Always on</span><h3>Featured resource listing</h3><p>A featured placement within the TNG resource directory, organized in the category that best fits your company and partnership.</p></div>
            <div className="wcard"><span className="tag">Community</span><h3>Facebook community campaign</h3><p>Reach healthcare travelers through sponsored posts, partner representatives, featured placements, and custom campaigns inside the TNG Facebook community.</p></div>
            <div className="wcard"><span className="tag">Content</span><h3>Sponsored resource or tool</h3><p>Align your company with a useful TNG calculator, resource, or educational project that fits your audience and campaign goals.</p></div>
            <div className="wcard"><span className="tag">Perks</span><h3>Exclusive member offer</h3><p>Share a discount, free trial, special rate, or other benefit created specifically for members of the TNG community.</p></div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="psec reveal">
        <div className="container">
          <span className="eyebrow-s">In good company</span>
          <h2 className="h2">Brands that have partnered with TNG.</h2>
          <div className="logos"><span>PRN Healthcare</span><span>HeartStart CPR</span><span>Same Day CPR</span><span>Med Max Edu</span><span>Steve Does Insurance</span><span>Tax Scrubs</span><span>Tallewise</span></div>
          <div className="stagger" style={{ marginTop: 38, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            <div className="q2">
              <p>&quot;The campaign we ran with The Travel Nurse Guide was by far our most successful promotional campaign during our entire launch period.&quot;</p>
              <div className="who"><span className="av">AC</span><div><b>Andrew Craig</b><small>Tallewise</small></div></div>
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
            <div className="step"><span className="n">STEP 2</span><h3>Campaign fit</h3><p>We review your company, audience, goals, and offer, then identify the placement options that make the most sense.</p></div>
            <div className="step"><span className="n">STEP 3</span><h3>Launch and review</h3><p>Your campaign goes live, and we stay in touch about performance, feedback, and next steps based on the scope of the partnership.</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <div className="cta-wrap" id="contact">
        <div className="capture-band left reveal">
          <span className="eyebrow-s">Start the conversation</span>
          <h2 className="h2">Tell us what you want to accomplish.</h2>
          <p className="lead">Share who you want to reach and what you want the campaign to do. A short note is enough, and we will follow up to discuss the options.</p>
          <PartnerForm />
          <p className="micro">We reply to every serious inquiry. If it&apos;s not a fit, we&apos;ll tell you straight.</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
