// api/submit.js
export const config = {
  api: {
    bodyParser: false, // allow raw FormData
  },
};

import FormData from "form-data";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz8dGM8QIWG6OwDu6LT4UtgLH0yPfaIPu_ahGBGWcwEdffvOBB7eqb0gTelSFUD4QcF/exec";

  if (req.method === "POST") {
    try {
      // Collect form data from the request
      let data = [];
      req.on("data", chunk => data.push(chunk));
      req.on("end", async () => {
        const bodyBuffer = Buffer.concat(data);
        // Forward FormData to Google Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: bodyBuffer,
        });

        const text = await response.text();
        res.status(200).send(text);
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: err.toString() });
    }
  } else {
    res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}
