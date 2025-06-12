"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Simple background gradient instead of multiple animated layers */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          {/* CTA Text */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 uppercase">
              Stay Inspired.
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get Exclusive Sounds, Updates & Early Access.
            </p>
          </motion.div>

          {/* Newsletter Form - Simplified */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="bg-gray-900 border border-primary/20 rounded-xl p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Email Input */}
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full px-5 py-3 bg-black/70 border rounded-lg text-white placeholder-white/50 focus:outline-none transition-colors ${
                        isError
                          ? "border-red-500"
                          : "border-primary/30 focus:border-primary"
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`px-6 py-3 rounded-lg font-heading font-semibold text-black transition-colors ${
                      isSubmitted
                        ? "bg-green-500 hover:bg-green-600"
                        : isError
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-primary hover:bg-primary/90"
                    } disabled:opacity-70`}
                  >
                    <span>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Joining...
                        </span>
                      ) : isSubmitted ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Welcome!
                        </span>
                      ) : isError ? (
                        "Try Again"
                      ) : (
                        "Join the Journey"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </form>

            {/* Success/Error Messages */}
            <div className="mt-4 h-6 text-sm">
              {isSubmitted && (
                <p className="text-green-400">
                  🎉 You&apos;re in! Check your email for exclusive sounds.
                </p>
              )}
              {isError && (
                <p className="text-red-400">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Additional Info */}
            <p className="mt-4 text-white/50 text-sm">
              Join 10,000+ artists and producers. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
