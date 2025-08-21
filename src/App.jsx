

import { useState } from "react";
//import "../public/mockup-dashboard.png";
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email) return alert("Please enter your email");

  //   try {
  //     const res = await fetch("https://socially-landingbackend.onrender.com/api/submit", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: new URLSearchParams({ name, email, feedback }).toString(),
  //     });

  //     // Always expect JSON from backend
  //     const data = await res.json();

  //     if (!res.ok) throw new Error(data.message || "Request failed");

  //     if (data.status === "success") {
  //       setStatus("✅ Thank you! You’re on the early access list.");
  //       setName(""); setEmail(""); setFeedback("");
  //     } else {
  //       throw new Error(data.message || "Failed to submit");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setStatus("❌ Something went wrong. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch("https://socially-landingbackend.onrender.com/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, feedback }),
    });
  } catch (err) {
    console.error("❌ Ignored error:", err.message);
  }

  // Always show thank you message
  setStatus("✅ Thank you! You’re on the early access list.");
  setName("");
  setEmail("");
  setFeedback("");
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Socially</h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
        Schedule, repurpose, and grow your social media effortlessly — all in one place.
      </p>

      <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <input
          type="text" placeholder="Your name" value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <input
          type="email" placeholder="Your email *" value={email} required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <textarea
          placeholder="What’s your biggest challenge in managing social media? (optional)"
          value={feedback} rows={3}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition">
          Get Early Access
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}

      <div className="mt-10">
       <img
  src="/mockup-dashboard.png"
  alt="Dashboard mockup"
  className="mt-6 w-full max-w-md rounded-lg shadow-md"
/> 
  <img
  src="/postcomposer.png"
  alt="Post composer mockup"
  className="mt-6 w-full max-w-md rounded-lg shadow-md"
/>

      </div>

      <footer className="mt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Socially Crystal Clear. All rights reserved.
      </footer>
    </div>
  );
}
