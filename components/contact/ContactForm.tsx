"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <div>
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <div>
        <button type="submit" disabled={status === "sending"}>Send</button>
        {status === "sent" && <div>Message sent. Thank you.</div>}
        {status === "error" && <div>Failed to send. Try again later.</div>}
      </div>
    </form>
  );
}
