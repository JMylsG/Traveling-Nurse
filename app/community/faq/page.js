import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "FAQ · The Travel Nurse Guide",
  description:
    "Answers about The Travel Nurse Guide: who the community is for, what it costs, how to join the Facebook group, and how resources are selected.",
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
            Straight answers about the community, the calculator, and how resources
            get on the site.
          </p>
        </div>
      </header>

      {/* ABOUT THE COMMUNITY */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">The basics</span>
            <h2 className="h2">About The Travel Nurse Guide.</h2>
          </div>
          <div className="faqwrap stagger">
            <details className="faq">
              <summary>What is The Travel Nurse Guide?</summary>
              <p>The Travel Nurse Guide is an independent website and online community created to help healthcare travelers find useful information, tools, resources, and community support. TNG began in 2018 and has grown to more than 37,000 Facebook group members.</p>
            </details>
            <details className="faq">
              <summary>Who is the TNG community for?</summary>
              <p>Despite the name, The Travel Nurse Guide is for all healthcare workers who are currently traveling or interested in travel healthcare. Nurses, allied health professionals, and other healthcare travelers are welcome because much of the information applies across specialties and professions.</p>
            </details>
            <details className="faq">
              <summary>Does it cost anything to use the website or join the Facebook group?</summary>
              <p>No. The website, GSA Stipend Calculator, current resources, and Facebook group are free to use. TNG may offer optional paid products or services in the future, but any cost will be clearly disclosed before purchase.</p>
            </details>
            <details className="faq">
              <summary>How do I join the Travel Nurse Guide Facebook group?</summary>
              <p>Use the Visit the Community link on the website to open the Facebook group. Submit a membership request, answer every required admission question, and agree to follow the group rules. The admission questions are required, and requests with incomplete or unanswered questions may not be approved.</p>
            </details>
            <details className="faq">
              <summary>How are companies and resources selected for the website?</summary>
              <p>Resources may be selected because they appear relevant or useful to healthcare travelers, because community members have recommended them, or as part of a paid advertising or partnership agreement. Some featured companies may pay TNG or provide referral compensation. A listing does not guarantee a particular result, and travelers should evaluate each product or service based on their own needs.</p>
            </details>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Still curious</span>
          <div className="h2">Didn&apos;t find your question?</div>
          <p className="bandp">Ask it in the group. Someone has almost certainly answered it before.</p>
          <Link className="btn-teal" href="/community/social-community">Visit the community <Arr /></Link>
          <Link className="alt-cta" href="/partners#contact">Partner question? Start the conversation <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
