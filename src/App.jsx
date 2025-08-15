import { useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxP3p-keJj-Wni5B62s3yI4bszD7GGy7MNDUMlfF0kca4m6EFcfDNWf2T8-fS8W5VL5/exec"; // Replace with your Google Apps Script URL

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return alert("Please enter your email");

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("feedback", feedback);

    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (result.status === "success") {
      setStatus("✅ Thank you! You’re on the early access list.");
      setName("");
      setEmail("");
      setFeedback("");
    } else {
      throw new Error();
    }
  } catch {
    setStatus("❌ Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Socially Crystal Clear
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
        Schedule, repurpose, and grow your social media effortlessly — all in one place.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <input
          type="email"
          placeholder="Your email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
          required
        />
        <textarea
          placeholder="What’s your biggest challenge in managing social media? (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
          rows="3"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition"
        >
          Get Early Access
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}

      <div className="mt-10">
        <img
          src="/mockup-dashboard.png"
          alt="Dashboard Preview"
          className="rounded-xl shadow-lg border border-white/20"
        />
      </div>

      <footer className="mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Socially Crystal Clear. All rights reserved.
      </footer>
    </div>
  );
}
