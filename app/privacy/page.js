import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "Privacy · The Travel Nurse Guide",
  description:
    "How The Travel Nurse Guide handles your data, in plain language. We collect almost nothing and never sell it.",
};

const Arr = () => <span className="arr">→</span>;

export default function Privacy() {
  return (
    <>
      <Fx spots=".legal" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-faq">
        <Nav active="" />
        <div className="container">
          <span className="eyebrow-s">Privacy</span>
          <h1 style={{ maxWidth: "20ch" }}>Your privacy, <span className="hl">in plain language</span>.</h1>
          <p className="sub">
            No dark patterns, no data selling, no fine print written to confuse you.
            Here&apos;s exactly what we collect, why, and what you can do about it.
          </p>
          <span className="lstamp">Last updated: July 14, 2026</span>
        </div>
      </header>

      <section className="gsec reveal">
        <div className="container">
          <div className="legal">
            <p className="lead">
              The short version: we collect almost nothing. If you hand us your email, we use it to send you
              what you asked for. We don&apos;t sell it, we don&apos;t rent it, and we don&apos;t hand it to advertisers.
              The rest of this page is the honest detail behind that promise.
            </p>

            <h3>Who runs this site</h3>
            <p>
              The Travel Nurse Guide is operated by Guide Media LLC. The site is built and maintained by
              Drew Jones, RN, a working travel nurse. When this page says &quot;we,&quot; that&apos;s who it means.
            </p>

            <h3>What we collect</h3>
            <p>We only collect information you choose to give us, plus the basics any website needs to run:</p>
            <ul>
              <li>
                <b>Your email address,</b> if you sign up for the free guide or the email list. That&apos;s the
                only thing the signup form asks for.
              </li>
              <li>
                <b>What you send us,</b> if you use a contact or partner form: your name, your email, and your
                message. Nothing you don&apos;t type in yourself.
              </li>
              <li>
                <b>Feedback,</b> if you use the feedback button: your note, and your email only if you choose
                to add it so we can reply.
              </li>
              <li>
                <b>Basic, anonymous traffic data.</b> Like most sites, ours counts visits so we know which
                pages are useful. We use cookieless analytics that tally page views without identifying you
                or following you around the web.
              </li>
              <li>
                <b>Standard server logs.</b> Our host, Cloudflare, processes normal request data (including
                IP addresses) to deliver the site and protect it from abuse. That&apos;s ordinary web plumbing,
                not a profile of you.
              </li>
            </ul>

            <h3>What we do with it</h3>
            <ul>
              <li>Send you the guide and the occasional email, if you asked to be on the list.</li>
              <li>Reply to your message, if you sent one.</li>
              <li>Understand which pages help nurses so we can make the site better.</li>
              <li>Keep the site online, fast, and free of spam and bots.</li>
            </ul>
            <p>
              That&apos;s the whole list. We don&apos;t use your information to build advertising profiles, and we
              never sell or rent it to anyone.
            </p>

            <h3>Who else touches your data</h3>
            <p>
              To run the site we use a few trusted service providers, and each one only gets the piece it
              needs to do its job:
            </p>
            <ul>
              <li><b>Kit</b> (formerly ConvertKit) stores the email list and delivers our emails.</li>
              <li><b>Resend</b> delivers the messages you send through our forms to our inbox.</li>
              <li><b>Cloudflare</b> hosts the site and provides the cookieless analytics.</li>
            </ul>
            <p>
              These providers handle your data on our behalf under their own privacy terms. They are not
              allowed to sell it or use it for their own advertising.
            </p>

            <h3>Cookies and tracking</h3>
            <p>
              We don&apos;t use cookies to track you, and there are no third-party advertising trackers or
              cross-site pixels on this site. Because our analytics are cookieless, you won&apos;t get a
              cookie-consent banner here, there&apos;s nothing to consent to.
            </p>

            <h3>Your choices</h3>
            <ul>
              <li><b>Unsubscribe anytime.</b> Every email we send has a one-click unsubscribe link, and it works.</li>
              <li><b>Ask us what we have.</b> Email us and we&apos;ll tell you what&apos;s on file and delete it if you want.</li>
              <li><b>Browse anonymously.</b> You can read every page on this site without giving us anything at all.</li>
            </ul>

            <h3>How we protect it</h3>
            <p>
              The whole site runs over an encrypted connection (HTTPS), and we keep what little we collect
              limited and access-controlled. No system is ever 100% secure, so we don&apos;t pretend otherwise,
              but we don&apos;t hold data we don&apos;t need, which is the best protection there is.
            </p>

            <h3>Children</h3>
            <p>
              This site is meant for working nurses. It isn&apos;t directed at children, and we don&apos;t knowingly
              collect information from anyone under 16.
            </p>

            <h3>Changes to this policy</h3>
            <p>
              If we change how we handle your data, we&apos;ll update the date at the top of this page. If it&apos;s
              a meaningful change, we&apos;ll say so plainly rather than bury it.
            </p>

            <h3>Contact us</h3>
            <p>
              Questions about your privacy, or want us to delete your information? Reach us through the
              {" "}<Link className="inline-link" href="/partners#contact">contact form <Arr /></Link> and we&apos;ll take care of it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
