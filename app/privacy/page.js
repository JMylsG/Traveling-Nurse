import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = {
  title: "Privacy · The Travel Nurse Guide",
  description:
    "How The Travel Nurse Guide handles your data, in plain language. We collect almost nothing and don't sell your data.",
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
          <span className="lstamp">Last updated: September 17, 2026</span>
        </div>
      </header>

      <section className="gsec reveal">
        <div className="container">
          <div className="legal">
            <p className="lead">
              The short version: we collect almost nothing. If you hand us your email, we use it to send you
              what you asked for and occasional updates. At this time we don&apos;t sell it, rent it, or hand it
              to advertisers. The rest of this page is the honest detail.
            </p>

            <h3>Who runs this site</h3>
            <p>
              The Travel Nurse Guide is operated by Guide Media LLC. When this page says &quot;we,&quot; it
              refers to Guide Media LLC and the people who help operate the website.
            </p>

            <h3>What we collect</h3>
            <p>We only collect information you choose to give us, plus the basics any website needs to run:</p>
            <ul>
              <li>
                <b>Your email address,</b> when you request a guide or complete an email signup form, along
                with any other information you voluntarily provide, such as your healthcare specialty.
              </li>
              <li>
                <b>What you send us,</b> if you use a contact or partner form. This may include your name,
                company, work email, the products or services you offer, and your message.
              </li>
              <li>
                <b>Feedback,</b> if you use the feedback button: your note, and your email only if you choose
                to add it so we can reply.
              </li>
              <li>
                <b>Poll and survey responses,</b> when you voluntarily tell us which resources, tools, or
                topics you would like us to develop.
              </li>
              <li>
                <b>Resource suggestions,</b> including the resource or company name, website, category,
                your reason for recommending it, whether you represent the company, and an optional email address.
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
              That&apos;s the whole list. We don&apos;t use your information to build advertising profiles.
            </p>

            <h3>Email addresses and communications</h3>
            <p>
              When you request a guide or complete an email signup form, we may collect your email address
              and any other information you voluntarily provide, such as your healthcare specialty.
            </p>
            <p>
              We may use this information to deliver requested materials, respond to your requests, and send
              occasional emails about Travel Nurse Guide resources, community updates, products, services,
              partners, and special offers.
            </p>
            <p>
              You may unsubscribe from promotional emails at any time by using the unsubscribe link included
              in the email. After unsubscribing, you may still receive necessary messages directly related to
              a request or transaction you initiated.
            </p>
            <p>
              We may use third party email and technology providers to collect information, deliver requested
              materials, and manage communications on our behalf.
            </p>

            <h3>Polls and surveys</h3>
            <p>
              We may collect responses you voluntarily submit through website polls or surveys. These responses
              help us understand which resources, tools, and topics visitors would like us to develop. The current
              homepage poll does not request your name or email address and is not designed to collect identifying information.
            </p>

            <h3>Resource suggestions</h3>
            <p>
              If you submit a resource suggestion, we may collect the resource or company name, website, category,
              your reason for recommending it, whether you work for or represent the company, and an optional email
              address. We use this information to review suggestions and, if you provide an email address, to contact
              you about the submission. Submitting a resource does not guarantee that it will be listed.
            </p>

            <h3>Do we sell your information?</h3>
            <p>
              At this time, we do not sell or rent personal information. If our practices change, we will
              update this policy and provide any notice or choices required by applicable law before the new
              practice begins.
            </p>

            <h3>Who else touches your data</h3>
            <p>
              To run the site we use a few trusted service providers, and each one only gets the piece it
              needs to do its job:
            </p>
            <ul>
              <li><b>Resend</b> delivers the messages you send through our forms, stores the email list, and sends the emails you sign up to receive.</li>
              <li><b>Cloudflare</b> hosts the site and provides the cookieless analytics.</li>
              <li><b>Google</b> provides the private spreadsheet used to store homepage poll responses and resource suggestions.</li>
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
