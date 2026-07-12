import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fx from "@/components/Fx";

export const metadata = { title: "Community · The Travel Nurse Guide" };

const Arr = () => <span className="arr">→</span>;

export default function Community() {
  return (
    <>
      <Fx spots=".post,.q2,.aside,.snap" magnets=".btn-teal,.nav-cta" />

      <header className="page-head ph-community">
        <Nav active="community" />
        <div className="container">
          <span className="eyebrow-s">The group</span>
          <h1 style={{ maxWidth: "20ch" }}>Where travel nurses <span className="hl">talk together</span>.</h1>
          <p className="sub tight">
            Real stories from nurses on the road. Step inside and see what the
            travel nursing journey actually looks like.
          </p>
          <p className="trustline"><span className="tick">✓</span> 37,000 nurses · All 50 states · Recruiters get denied at the door</p>
          <a className="btn-teal" href="#">Join the Facebook group <Arr /></a>
          <p className="head-note">Takes a minute. Answer the join questions so we know you&apos;re a nurse.</p>
        </div>
      </header>

      {/* THE FEED */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head" style={{ margin: "0 auto", textAlign: "center", maxWidth: "52ch" }}>
            <span className="eyebrow-s" style={{ justifyContent: "center" }}>Inside the group</span>
            <h2 className="h2">This is what it sounds like in there.</h2>
            <p className="lead" style={{ margin: "14px auto 0" }}>Four threads, recreated from the group. Names changed, <mark className="hlm">numbers real</mark>.</p>
          </div>
          <div className="feedwrap stagger">
            <div className="post">
              <div className="phead"><span className="av">ER</span><div><b>ER traveler, Georgia</b><small>Pay thread</small></div></div>
              <p className="pbody">Recruiter says $1,850 is &quot;top of market&quot; for ER in Georgia. Is that true or am I getting worked?</p>
              <div className="preplies">
                <div className="preply"><b>ICU, on assignment:</b> I&apos;m at $1,940 in Savannah right now and I didn&apos;t have to fight for it.</div>
                <div className="preply"><b>Former recruiter, now RN:</b> ICU Atlanta was going for $2,080 last month. Push back.</div>
              </div>
              <div className="pfoot">47 replies <span className="dot" /> answered within the hour</div>
            </div>
            <div className="post">
              <div className="phead"><span className="av">MS</span><div><b>First-time traveler, Ohio</b><small>Contract gut check</small></div></div>
              <p className="pbody">Contract says guaranteed hours are &quot;subject to facility needs.&quot; That&apos;s not actually guaranteed, right?</p>
              <div className="preplies">
                <div className="preply"><b>8-year traveler:</b> That clause ate two of my shifts in January. Make them cap cancellations per contract, in writing.</div>
              </div>
              <div className="pfoot">23 replies <span className="dot" /> signed with the fix</div>
            </div>
            <div className="post">
              <div className="phead"><span className="av">CL</span><div><b>Cath Lab traveler, Tennessee</b><small>Housing warning</small></div></div>
              <p className="pbody">Heads up: the &quot;travel nurse special&quot; listing near the hospital wants a Zelle deposit before a tour. It&apos;s a scam. Reported it, don&apos;t send money.</p>
              <div className="pfoot">312 reactions <span className="dot" /> pinned by mods</div>
            </div>
            <div className="post">
              <div className="phead"><span className="av">TX</span><div><b>New grad traveler, Texas</b><small>Week six</small></div></div>
              <p className="pbody">Week 6 of my first contract and homesick as hell. Tell me it gets better.</p>
              <div className="preplies">
                <div className="preply"><b>3 states in:</b> It does. Week 8 you stop counting days and start planning weekends.</div>
                <div className="preply"><b>Night shift, Denver:</b> Homesick at week 6, extended at week 11. Give it time.</div>
              </div>
              <div className="pfoot">89 replies <span className="dot" /> still going</div>
            </div>
            <div className="post">
              <div className="phead"><span className="av">RN</span><div><b>First-year traveler, Florida</b><small>Tax question</small></div></div>
              <p className="pbody">Do I really need a &quot;tax home&quot; or is that one of those optional things nobody actually does?</p>
              <div className="preplies">
                <div className="preply"><b>5 contracts in:</b> Not optional if you want your stipends tax-free. Read up before your first contract, not at filing time.</div>
              </div>
              <div className="pfoot">31 replies <span className="dot" /> audit avoided</div>
            </div>
            <div className="post">
              <div className="phead"><span className="av">W</span><div><b>ICU traveler, Arizona</b><small>The win</small></div></div>
              <p className="pbody">Signed today. ICU nights in Phoenix at $2,300 a week. Thank you all for the rate check last Tuesday, I would have taken the first offer.</p>
              <div className="preplies">
                <div className="preply"><b>The whole thread:</b> LFG.</div>
              </div>
              <div className="pfoot">204 reactions <span className="dot" /> celebration thread</div>
            </div>
          </div>
          <p className="feednote">Threads recreated from real conversations, shown for illustration. Details changed to protect members.</p>
        </div>
      </section>

      {/* POSTCARDS FROM ASSIGNMENT */}
      <section className="gsec alt reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">From the road</span>
            <h2 className="h2">Postcards from assignment.</h2>
            <p className="lead">Thirteen weeks somewhere new, then somewhere newer. The parts of this job nobody puts in the contract.</p>
          </div>
          <div className="snaps stagger">
            <figure className="snap snap-1"><div className="ph" /><figcaption><b>Night shift sunrise</b><span>Denver, CO</span></figcaption></figure>
            <figure className="snap snap-2"><div className="ph" /><figcaption><b>Moving day, again</b><span>Savannah, GA</span></figcaption></figure>
            <figure className="snap snap-3"><div className="ph" /><figcaption><b>Between contracts</b><span>Phoenix, AZ</span></figcaption></figure>
            <figure className="snap snap-4"><div className="ph" /><figcaption><b>Day off, finally</b><span>San Diego, CA</span></figcaption></figure>
          </div>
        </div>
      </section>

      {/* WHY IT STAYS GOOD */}
      <section className="gsec reveal">
        <div className="container">
          <div className="head">
            <span className="eyebrow-s">Why it stays good</span>
            <h2 className="h2">The group is only useful because it&apos;s protected.</h2>
            <p className="lead">Every join request gets read by a human. That&apos;s why people post their real numbers here and nowhere else.</p>
          </div>
          <div className="cols">
            <div className="qstack stagger">
              <div className="q2"><p>&quot;This community helped me negotiate my best contract yet.&quot;</p><div className="who"><span className="av">SR</span><div><b>Sarah</b><small>ICU travel nurse</small></div></div></div>
              <div className="q2"><p>&quot;Finally a place with honest, unbiased information.&quot;</p><div className="who"><span className="av">MK</span><div><b>Marcus</b><small>ER travel nurse</small></div></div></div>
            </div>
            <div className="aside flag">
              <span className="at">House rules · not allowed inside</span>
              <ul>
                <li>Recruiters. Join requests from recruiters get denied, every time.</li>
                <li>Agency ads and &quot;DM me about rates&quot; posts</li>
                <li>Spam, MLMs, and anything sold in the comments</li>
              </ul>
              <div className="sum">What&apos;s left: <span>nurses helping nurses</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-wrap">
        <div className="capture-band reveal">
          <span className="eyebrow-s">Join us</span>
          <div className="h2">Bring the question you&apos;d never ask a recruiter.</div>
          <p className="bandp">Free to join, nurses only, since 2018. Somebody in there has already lived your next contract.</p>
          <a className="btn-teal" href="#">Join the Facebook group <Arr /></a>
          <Link className="alt-cta" href="/#getguide">Not on Facebook? Get the free guide by email <Arr /></Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
