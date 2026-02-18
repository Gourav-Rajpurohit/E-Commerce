import React from "react";

import { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // handle newsletter logic here
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Subscribe now & get 20% off
        </h2>

        {/* Sub text */}
        <p className="mt-3 text-sm md:text-base text-gray-500">
          Subscribe to our newsletter and stay updated on the latest products and offers!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 text-sm outline-none focus:none"
            required
          />

          <button
            type="submit"
            className="px-8 py-3 bg-black text-white text-sm font-medium hover:opacity-90 transition"
          >
            SUBSCRIBE
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsletterBox;
