"use client";
import { useState } from "react";
import { POLL_TOPICS } from "@/lib/poll";

export default function HomepagePoll() {
  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function toggle(id) {
    setStatus("idle");
    setMessage("");
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) {
        setMessage("Please select up to three topics.");
        return current;
      }
      return [...current, id];
    });
  }

  async function submit(e) {
    e.preventDefault();
    if (!selected.length) {
      setMessage("Please select at least one topic.");
      return;
    }
    setStatus("busy");
    setMessage("");
    try {
      const response = await fetch("/api/poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected, other, website: e.currentTarget.website.value }),
      });
      if (!response.ok) throw new Error("Poll submission failed");
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage("We couldn’t save your response. Please try again.");
    }
  }

  if (status === "done") {
    return <div className="poll-success" role="status">Thank you! Your feedback will help us decide what to build next.</div>;
  }

  return (
    <form className="poll-form" onSubmit={submit}>
      <fieldset>
        <legend className="sr-only">Select one to three topics</legend>
        <div className="poll-grid">
          {POLL_TOPICS.map((topic) => (
            <label className={`poll-choice${selected.includes(topic.id) ? " selected" : ""}`} key={topic.id}>
              <input
                type="checkbox"
                checked={selected.includes(topic.id)}
                onChange={() => toggle(topic.id)}
              />
              <span className="poll-check" aria-hidden="true">✓</span>
              <span>{topic.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {selected.includes("other") && (
        <div className="poll-other">
          <label htmlFor="poll-other">Tell us what else would help</label>
          <input
            id="poll-other"
            type="text"
            maxLength={150}
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
          <small>{other.length}/150</small>
        </div>
      )}
      <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {message && <p className="form-message error" role="alert">{message}</p>}
      <button className="btn-teal" type="submit" disabled={status === "busy"}>
        {status === "busy" ? "SUBMITTING…" : "SUBMIT MY CHOICES"}
      </button>
    </form>
  );
}
