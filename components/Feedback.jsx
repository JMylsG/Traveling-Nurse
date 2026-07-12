"use client";
import { useState } from "react";

// Floating feedback widget, site-wide. Mock only: submit shows a thank-you,
// nothing is sent anywhere yet.
export default function Feedback() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {open && (
        <div className="fb-panel">
          <div className="fb-head">
            <span className="fb-title">Share feedback</span>
            <button type="button" className="fb-x" aria-label="Close feedback" onClick={() => { setOpen(false); setSent(false); }}>×</button>
          </div>
          {sent ? (
            <p className="fb-thanks">Got it. Thank you for helping make the site better.</p>
          ) : (
            <form className="fb-form" onSubmit={submit}>
              <label htmlFor="fb-cat">Category</label>
              <select id="fb-cat" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Something&apos;s broken</option>
                <option>An idea or suggestion</option>
                <option>A question</option>
                <option>Something else</option>
              </select>
              <label htmlFor="fb-msg">Tell us more</label>
              <textarea id="fb-msg" placeholder="What happened? What would make this better?" required />
              <button type="submit" className="btn-teal fb-send">Send it</button>
            </form>
          )}
        </div>
      )}
      <button type="button" className="fb-btn" onClick={() => { setOpen(!open); setSent(false); }} aria-expanded={open}>
        {open ? (
          <>× Close</>
        ) : (
          <>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H4l2.5-2.9A8 8 0 1 1 21 12z" /></svg>
            Feedback
          </>
        )}
      </button>
    </>
  );
}
