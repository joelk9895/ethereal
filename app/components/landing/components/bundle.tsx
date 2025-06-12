"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Bundle = () => {
  const bundleRef = useRef<HTMLDivElement>(null);

  // Use for scroll-triggered animations - reduce the number of observers for better performance
  const isInView = useInView(bundleRef, { once: true, amount: 0.2 });

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Bundle features
  const features = [
    {
      title: "300+ Samples",
      description: "Premium quality audio files",
      icon: "♪",
    },
    {
      title: "Bonus Stems",
      description: "Exclusive individual tracks",
      icon: "⚡",
    },
    {
      title: "Commercial License",
      description: "Full rights included",
      icon: "✓",
    },
  ];

  return (
    <section
      ref={bundleRef}
      className="relative w-full py-16 md:py-24 bg-black"
    >
      {/* Static ambient background instead of animated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/3 w-60 h-60 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
        <div className="absolute -right-20 bottom-1/3 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl opacity-30"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full mb-6"
          variants={itemVariants}
        >
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-xs font-medium tracking-wider text-primary">
            EXCLUSIVE COLLECTION
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          className="text-5xl md:text-7xl font-bold font-heading text-white leading-tight mb-6"
          variants={itemVariants}
        >
          TRILOGY
          <br />
          <span className="text-primary">BUNDLE</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10"
          variants={itemVariants}
        >
          Three complete sample libraries bundled together with exclusive bonus
          content.
          <br />
          <span className="text-primary/80">
            Save 40% compared to individual purchases.
          </span>
        </motion.p>

        {/* Bundle Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group rounded-2xl p-6 border border-white/10 overflow-hidden transition-colors duration-300 hover:border-white/20"
              style={{
                background: `
              radial-gradient(circle at 20% 80%, rgba(255, 235, 59, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.12) 0%, transparent 50%),
              linear-gradient(135deg, rgba(17, 17, 17, 0.95) 0%, rgba(24, 24, 27, 0.98) 100%)
            `,
              }}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Simple static overlay instead of animated */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-30"
                style={{
                  background: `
                radial-gradient(circle at 60% 30%, rgba(255, 235, 59, 0.25) 0%, transparent 40%),
                radial-gradient(circle at 30% 70%, rgba(255, 193, 7, 0.18) 0%, transparent 40%)
              `,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl mb-4 filter drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Simple static highlight accent */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-xl text-white/40 line-through">$89.97</span>
            <span className="text-4xl font-bold font-body text-white">
              $49.99
            </span>
          </div>
          <p className="text-amber-300/80 text-sm italic">
            Limited time offer - Save $40
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            className="px-8 py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW TRILOGY BUNDLE
          </motion.button>

          <p className="text-white/50 text-sm mt-4">
            Instant download • 24/7 support • 30-day money back guarantee
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Bundle;
