"use client";
import { useState } from "react";

const Arr = () => <span className="arr">→</span>;

export default function ResourceSuggestionForm() {
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    if (status === "busy") return;
    setStatus("busy");
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/resource-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!response.ok) throw new Error("Suggestion submission failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="suggest-success" role="status">Thank you! Your suggestion has been saved for review.</p>;
  }

  return (
    <form className="suggest-form" onSubmit={submit}>
      <div className="suggest-field">
        <label htmlFor="suggest-name">Resource or company name</label>
        <input id="suggest-name" name="name" type="text" required maxLength={200} />
      </div>
      <div className="suggest-field">
        <label htmlFor="suggest-website">Website</label>
        <input id="suggest-website" name="website" type="url" required placeholder="https://" maxLength={500} />
      </div>
      <div className="suggest-field">
        <label htmlFor="suggest-category">Category</label>
        <select id="suggest-category" name="category" required defaultValue="">
          <option value="" disabled>Select a category</option>
          <option>Certifications</option>
          <option>Insurance</option>
          <option>Job search and recruiters</option>
          <option>Tax services</option>
          <option>Housing</option>
          <option>Other</option>
        </select>
      </div>
      <div className="suggest-field">
        <label htmlFor="suggest-affiliation">Do you work for or represent this company?</label>
        <select id="suggest-affiliation" name="affiliation" required defaultValue="">
          <option value="" disabled>Select an answer</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div className="suggest-field full">
        <label htmlFor="suggest-reason">Why are you recommending it?</label>
        <textarea id="suggest-reason" name="reason" required maxLength={2000} />
      </div>
      <div className="suggest-field full">
        <label htmlFor="suggest-email">Email address <span>Optional</span></label>
        <input id="suggest-email" name="email" type="email" maxLength={200} />
      </div>
      <input className="hp-field" type="text" name="websiteHoneypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === "error" && <p className="form-message error full" role="alert">We couldn’t save your suggestion. Please try again.</p>}
      <button className="btn-teal" type="submit" disabled={status === "busy"}>
        {status === "busy" ? "Saving…" : <>Suggest a Resource <Arr /></>}
      </button>
    </form>
  );
}
