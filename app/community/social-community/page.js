import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "Community · The Travel Nurse Guide",
  description:
    "Inside the 37,000-member travel healthcare community. Real conversations, house rules, and how to join the group.",
};

const Arr = () => <span className="arr">→</span>;

export default function Community() {
  return (
    <>
      <Fx spots=".q2,.aside" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-community">
        <Nav active="community" />
        <div className="container">
          <span className="eyebrow-s">The group</span>
          <h1 style={{ maxWidth: "20ch" }}>Where <span className="hl">healthcare travelers</span> connect.</h1>
          <p className="sub tight">
            Real conversations, shared experiences, and practical support from healthcare
            professionals who understand life on assignment.
          </p>
          <p className="trustline"><span className="tick">✓</span> 37,000 members · All 50 states · Since 2018</p>
          <a className="btn-teal" href="https://www.facebook.com/share/g/1BcxDjK3Q8/" target="_blank" rel="noopener noreferrer">Join the Facebook group <Arr /></a>
          <p className="head-note">Takes a minute. Answer every required admission question so we can properly review your request.</p>
        </div>
      </header>

      {/* INSIDE THE GROUP: reserved for genuine member screenshots (Drew to supply).
          Fabricated threads and staged postcard images removed per Sep 2026 content review. */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head" style={{ margin: "0 auto", textAlign: "center", maxWidth: "56ch" }}>
            <span className="eyebrow-s" style={{ justifyContent: "center" }}>Inside the group</span>
            <h2 className="h2">Real conversations, shared with permission.</h2>
            <p className="lead" style={{ margin: "14px auto 0" }}>
              We are gathering genuine posts and comments from members to feature here. They will appear
              with identifying details removed unless a member has given permission to include them.
            </p>
          </div>
        </div>
      </section>

      {/* WHY IT STAYS GOOD */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Why it stays good</span>
            <h2 className="h2">A community built for useful conversations.</h2>
            <p className="lead">Membership requests are reviewed before approval. Required admission questions and clear group rules help reduce spam and keep conversations relevant for healthcare travelers.</p>
          </div>
          <div className="cols">
            <div className="qstack stagger">
              <div className="q2"><p>&quot;This was the first group that I joined once I officially started my journey and I&apos;ve learned so much just by being a part of this group.&quot;</p><div className="who"><span className="av">MH</span><div><b>Michayla H.</b><small>Travel RN</small></div></div></div>
              <div className="q2"><p>&quot;My goal always is to not let anyone have bad info and we both know how much of that is out there. As I am winding down my career I am very happy to say that your group will carry the torch.&quot;</p><div className="who"><span className="av">TN</span><div><b>Tricia N.</b><small>Travel RN</small></div></div></div>
            </div>
            <div className="aside flag">
              <span className="at">House rules</span>
              <p className="ruleslead">What we do not allow:</p>
              <ul>
                <li>No job postings</li>
                <li>No spam or unauthorized promotions</li>
              </ul>
              <div className="sum">A moderated place where healthcare travelers can <span>learn, ask questions, and share experiences</span>.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Join us</span>
          <div className="h2">Connect with healthcare travelers who understand life on assignment.</div>
          <p className="bandp">The community is free to join. Ask questions, share experiences, and learn from healthcare professionals who have traveled before.</p>
          <a className="btn-teal" href="https://www.facebook.com/share/g/1BcxDjK3Q8/" target="_blank" rel="noopener noreferrer">Join the Facebook group <Arr /></a>
          <Link className="alt-cta" href="/#getguide">Not on Facebook? Get the free guide by email <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
