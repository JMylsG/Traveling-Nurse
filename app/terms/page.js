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
          <span className="lstamp">Last updated: July 15, 2026</span>
        </div>
      </header>

      <section className="gsec reveal">
        <div className="container">
          <div className="legal">
            <p className="lead">
              The short version: this site gives travel nurses honest information and vetted recommendations.
              It&apos;s here to help, not to give you professional advice or make you any promises. Use it in
              good faith and we&apos;re glad you&apos;re here.
            </p>

            <h3>Who these terms are with</h3>
            <p>
              The Travel Nurse Guide is operated by Guide Media LLC. By using this site you&apos;re agreeing to
              these terms. If you don&apos;t agree with them, that&apos;s okay, but please don&apos;t use the site.
            </p>

            <h3>What this site is, and isn&apos;t</h3>
            <p>
              This is an information and community resource built by a working travel nurse. The guides, pay
              data, and articles are here to help you make your own decisions.
            </p>
            <p>
              <b>They are not professional advice.</b> Nothing here is legal, tax, financial, or medical advice,
              and reading it doesn&apos;t create any kind of professional relationship. Contracts, tax homes, and
              pay packages have real stakes, so for decisions that matter, check with a qualified professional
              who knows your situation.
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

            <h3>Recommendations and partner links</h3>
            <p>
              We only feature resources we&apos;d actually recommend to a nurse, and money doesn&apos;t buy a listing.
              But a recommendation is not a guarantee. When you follow a link to a partner or another site, you&apos;re
              dealing with them under their terms, not ours, and we&apos;re not responsible for their services,
              pricing, or promises. Some links may earn us a referral fee, and it never changes who we vouch for.
            </p>

            <h3>The email list and free guide</h3>
            <p>
              If you sign up, we&apos;ll send you the guide and occasional emails. It&apos;s free, and you can
              unsubscribe anytime with one click. How we handle your email is covered in our
              {" "}<Link className="inline-link" href="/privacy">privacy policy <Arr /></Link>.
            </p>

            <h3>No guarantees</h3>
            <p>
              We work hard to keep the information here accurate and current, and we use real, cited sources.
              Still, we provide the site &quot;as is.&quot; We can&apos;t promise it will always be complete,
              error-free, or available, and pay data especially can shift with the market. Use your own judgment.
            </p>

            <h3>Where our responsibility ends</h3>
            <p>
              To the extent the law allows, Guide Media LLC isn&apos;t liable for losses that come from using the
              site or acting on the information in it. You&apos;re responsible for your own decisions, including the
              contracts you sign and the taxes you file.
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
