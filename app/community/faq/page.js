import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "FAQ · The Travel Nurse Guide",
  description:
    "Answers about the travel nurse community and about partnering with it. Straight answers, both sides of the table.",
};

const Arr = () => <span className="arr">→</span>;

export default function Faq() {
  return (
    <>
      <Fx spots=".faq" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-faq">
        <Nav active="community" />
        <div className="container">
          <span className="eyebrow-s">Questions</span>
          <h1 style={{ maxWidth: "22ch" }}>Ask it here <span className="hl">before you ask a recruiter</span>.</h1>
          <p className="sub">
            Straight answers about the community, and about partnering with it.
            Both sides at the same table, that&apos;s the whole idea.
          </p>
        </div>
      </header>

      {/* FOR NURSES */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">For nurses</span>
            <h2 className="h2">About the community.</h2>
          </div>
          <div className="faqwrap stagger">
            <details className="faq">
              <summary>Who runs this?</summary>
              <p>Drew, a working travel nurse. He started the group in 2018 and still takes contracts, which is why the advice in here sounds like the floor and not a brochure.</p>
            </details>
            <details className="faq">
              <summary>Does any of this cost money?</summary>
              <p>No. The group is free, the guides are free, the pay data is free. The site is supported by a small number of vetted partners, and they don&apos;t get a say in what gets posted.</p>
            </details>
            <details className="faq">
              <summary>Why do I have to answer join questions?</summary>
              <p>Because that&apos;s how we keep recruiters and spam out. Every join request gets read by a human. Answer honestly and you&apos;re in.</p>
            </details>
            <details className="faq">
              <summary>Are recruiters really not allowed?</summary>
              <p>Really. Recruiter join requests get denied, every time. Plenty of recruiters are good at their jobs, but nurses need one room where nobody is selling. This is that room.</p>
            </details>
            <details className="faq">
              <summary>Where do the pay numbers come from?</summary>
              <p>From nurses in the group reporting what they&apos;re actually making. That&apos;s why our numbers run lower than agency marketing. We&apos;d rather be right than exciting. <Link className="inline-link" href="/market">See the market data <Arr /></Link></p>
            </details>
            <details className="faq">
              <summary>I haven&apos;t taken my first contract yet. Is this for me?</summary>
              <p>Especially for you. First-timers get the most out of the group, and nobody gets talked down to for asking a basic question. Start with the guides, then bring your questions in. <Link className="inline-link" href="/guides">Read the guides <Arr /></Link></p>
            </details>
          </div>
        </div>
      </section>

      {/* FOR PARTNERS */}
      <section className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">For partners</span>
            <h2 className="h2">About building this with us.</h2>
            <p className="lead">Partners aren&apos;t advertisers here. The ones on this site are part of what makes the community useful, and these are the questions they asked first.</p>
          </div>
          <div className="faqwrap stagger">
            <details className="faq">
              <summary>Can I pay to be listed as a resource?</summary>
              <p>No, and that&apos;s the point. Money doesn&apos;t buy a listing, passing the vet does. Partners support the community financially, but every listed name got there because nurses vouched for it.</p>
            </details>
            <details className="faq">
              <summary>So how does a partnership actually work?</summary>
              <p>A short intro call, a fit check, and if we&apos;d genuinely recommend you to a nurse, we shape the placement together. If we wouldn&apos;t, we&apos;ll tell you straight and save everyone time. <Link className="inline-link" href="/partners">See how it works <Arr /></Link></p>
            </details>
            <details className="faq">
              <summary>Why a Facebook group instead of ad platforms?</summary>
              <p>Because this is where travel nurses already talk. 37,000 of them, every state, zero recruiters, moderated by a nurse they trust. A recommendation inside that room outperforms an impression outside it.</p>
            </details>
            <details className="faq">
              <summary>What does &quot;building together&quot; mean in practice?</summary>
              <p>It means we treat partners the way we ask them to treat nurses: as partners, not placements. Long-term spots over one-off campaigns, honest reporting over vanity numbers, and a community that gets more useful because you&apos;re in it.</p>
            </details>
            <details className="faq">
              <summary>Who&apos;s already in?</summary>
              <p>HeartStart CPR, Same Day CPR, Steve Does Insurance, and Tallewise. Each one was used and vouched for by nurses in the group before anything was signed.</p>
            </details>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Still curious</span>
          <div className="h2">Didn&apos;t find your question?</div>
          <p className="bandp">Nurses, ask it in the group, someone&apos;s answered it before. Partners, bring it to the intro call.</p>
          <Link className="btn-teal" href="/community/social-community">Visit the community <Arr /></Link>
          <Link className="alt-cta" href="/partners#contact">Partner question? Start the conversation <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
