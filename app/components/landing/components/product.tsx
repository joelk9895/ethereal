"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  color: string;
  bgColor: string;
  type: "bundle" | "pack";
}

const Product = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced product data with premium aesthetic
  const products: Product[] = [
    {
      id: "trilogy",
      title: "TRILOGY COLLECTION",
      subtitle: "Complete Sonic Experience",
      description:
        "Three meticulously crafted sample packs featuring exclusive stems, bonus content, and premium audio engineering.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&crop=center",
      price: "$49.99",
      originalPrice: "$69.99",
      color: "#D4AF37",
      bgColor: "from-amber-950/30 via-yellow-950/20 to-orange-950/30",
      type: "bundle",
    },
    {
      id: "ethereal",
      title: "ETHEREAL DEPTHS",
      subtitle: "Atmospheric Techno Pack",
      description:
        "Dark cinematic soundscapes with haunting melodies, deep basslines, and ethereal textures for immersive productions.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center",
      price: "$24.99",
      color: "#8B4513",
      bgColor: "from-orange-950/30 via-red-950/20 to-amber-950/30",
      type: "pack",
    },
    {
      id: "ambient",
      title: "AMBIENT WAVES",
      subtitle: "Cinematic Soundscapes",
      description:
        "Flowing organic textures perfect for film scoring, meditation, and ambient music with pristine sound quality.",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&h=500&fit=crop&crop=center",
      price: "$24.99",
      color: "#4682B4",
      bgColor: "from-blue-950/30 via-indigo-950/20 to-purple-950/30",
      type: "pack",
    },
    {
      id: "urban",
      title: "URBAN NOCTURNE",
      subtitle: "Street-Inspired Beats",
      description:
        "Contemporary trap influences with urban textures, crisp drums, and modern production techniques.",
      image:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop&crop=center",
      price: "$24.99",
      color: "#36454F",
      bgColor: "from-slate-950/30 via-gray-950/20 to-zinc-950/30",
      type: "pack",
    },
  ];

  // Refined animation variants with professional easing
  const vinylVariants = {
    initial: {
      scale: 0.85,
      rotateY: -35,
      rotateX: 15,
      opacity: 0,
      z: -150,
      filter: "blur(12px)",
    },
    animate: {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
      z: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1], // Professional cubic-bezier
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      rotateY: 25,
      rotateX: -10,
      opacity: 0,
      z: 100,
      filter: "blur(8px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  // Enhanced text animation with staggered reveals
  const textVariants = {
    initial: { opacity: 0, y: 40, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  // Subtle pulse animation for audio feedback
  const pulseVariants = {
    idle: { scale: 1 },
    playing: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Enhanced scroll handler with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        -rect.top / (rect.height - window.innerHeight)
      );
      const slideIndex = Math.floor(scrollProgress * products.length);
      const newSlide = Math.min(Math.max(slideIndex, 0), products.length - 1);

      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    };

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [products.length, currentSlide]);

  // Audio simulation with realistic timing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Utility function for throttling
  function throttle<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
  ): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return ((...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    }) as T;
  }

  return (
    <div className="relative font-sans" ref={containerRef}>
      {/* Extended scroll area for smooth progression */}
      <div className="h-[400vh]">
        {/* Sticky showcase container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* Sophisticated background system */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse at 25% 75%, ${products[currentSlide]?.color}08 0%, transparent 60%),
                radial-gradient(ellipse at 75% 25%, ${products[currentSlide]?.color}05 0%, transparent 50%),
                radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)
              `,
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Dynamic gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${products[currentSlide]?.bgColor} opacity-60`}
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
          />

          {/* Subtle grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating design elements */}
          <motion.div
            className="absolute top-1/4 right-1/5 w-20 h-20 rounded-2xl backdrop-blur-sm border border-white/5"
            style={{ backgroundColor: `${products[currentSlide]?.color}10` }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/5 w-28 h-12 rounded-full backdrop-blur-sm border border-white/5"
            style={{ backgroundColor: `${products[currentSlide]?.color}08` }}
            animate={{
              x: [0, 10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main content grid */}
            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Product visualization */}
              <div className="relative flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`product-${currentSlide}`}
                    variants={vinylVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative"
                    style={{ perspective: "1200px" }}
                  >
                    {/* Product container */}
                    <motion.div
                      className="relative w-80 h-80 lg:w-96 lg:h-96"
                      variants={pulseVariants}
                      animate={isPlaying ? "playing" : "idle"}
                    >
                      {/* Premium shadow system */}
                      <div
                        className="absolute inset-0 rounded-3xl blur-3xl opacity-30 translate-y-6"
                        style={{
                          background: `linear-gradient(135deg, ${products[currentSlide]?.color}40, ${products[currentSlide]?.color}20, transparent)`,
                        }}
                      />

                      {/* Main product sleeve */}
                      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-gray-900 to-black shadow-2xl border border-white/10 backdrop-blur-sm">
                        <Image
                          src={products[currentSlide]?.image}
                          alt={products[currentSlide]?.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={100}
                          height={100}
                        />

                        {/* Sophisticated overlay system */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-white/8" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                        {/* Audio visualization */}
                        {isPlaying && (
                          <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-3xl"
                              style={{
                                background: `radial-gradient(circle at center, ${products[currentSlide]?.color}15 0%, transparent 70%)`,
                              }}
                              animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Vinyl record backdrop */}
                      <motion.div
                        className="absolute -z-10 w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-zinc-800 via-gray-800 to-zinc-900 top-6 left-6 shadow-xl border border-white/5"
                        animate={{
                          rotate: isPlaying ? 360 : 0,
                        }}
                        transition={{
                          duration: 4,
                          repeat: isPlaying ? Infinity : 0,
                          ease: "linear",
                        }}
                      >
                        {/* Vinyl details */}
                        <div className="absolute inset-4 rounded-full border border-zinc-600/30" />
                        <div className="absolute inset-8 rounded-full border border-zinc-600/20" />
                        <div className="absolute inset-12 rounded-full border border-zinc-600/10" />

                        {/* Center label */}
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-red-600/30">
                          <div className="absolute inset-2 bg-black rounded-full border border-red-800/50" />
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Product information */}
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${currentSlide}`}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Category badge */}
                    <motion.div
                      className={`inline-flex px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.1em] uppercase backdrop-blur-md border ${
                        products[currentSlide]?.type === "bundle"
                          ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30"
                          : "bg-white/5 text-zinc-300 border-white/10"
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        boxShadow:
                          products[currentSlide]?.type === "bundle"
                            ? `0 0 20px ${products[currentSlide]?.color}30`
                            : "none",
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {products[currentSlide]?.type === "bundle"
                        ? "Complete Collection"
                        : "Premium Pack"}
                    </motion.div>

                    {/* Main heading */}
                    <div className="space-y-3">
                      <motion.h1
                        className="text-4xl lg:text-6xl xl:text-7xl font-heading text-white leading-[0.9] tracking-tight"
                        style={{
                          textShadow: `
                            0 0 40px ${products[currentSlide]?.color}40,
                            0 8px 32px rgba(0,0,0,0.6)
                          `,
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        {products[currentSlide]?.title}
                      </motion.h1>

                      <motion.p
                        className="text-lg lg:text-xl text-zinc-400 font-light tracking-wide"
                        style={{
                          fontFamily:
                            "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
                          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {products[currentSlide]?.subtitle}
                      </motion.p>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl font-body"
                      style={{
                        lineHeight: 1.7,
                      }}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {products[currentSlide]?.description}
                    </motion.p>

                    {/* Pricing */}
                    <motion.div
                      className="flex items-baseline space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <span
                        className="text-3xl lg:text-4xl font-bold"
                        style={{
                          fontFamily:
                            '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                          color: products[currentSlide]?.color,
                          textShadow: `0 0 20px ${products[currentSlide]?.color}50`,
                        }}
                      >
                        {products[currentSlide]?.price}
                      </span>
                      {products[currentSlide]?.originalPrice && (
                        <span className="text-lg text-zinc-500 line-through font-medium">
                          {products[currentSlide]?.originalPrice}
                        </span>
                      )}
                    </motion.div>

                    {/* Call to action */}
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <motion.button
                        className="group relative px-8 py-4 bg-white text-black font-body font-semibold text-base rounded-2xl shadow-lg transition-all duration-300 overflow-hidden"
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          boxShadow: `0 8px 32px ${products[currentSlide]?.color}30, 0 0 0 1px ${products[currentSlide]?.color}20`,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">
                          {products[currentSlide]?.type === "bundle"
                            ? "Get Complete Bundle"
                            : "Add to Collection"}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${products[currentSlide]?.color}20, ${products[currentSlide]?.color}10)`,
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation indicators */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              {products.map((product, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  style={{
                    boxShadow:
                      index === currentSlide
                        ? `0 0 20px ${product.color}60`
                        : "none",
                  }}
                  whileHover={{ scale: index === currentSlide ? 1.25 : 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (containerRef.current) {
                      const containerTop = containerRef.current.offsetTop;
                      window.scrollTo({
                        top: containerTop + index * window.innerHeight * 0.25,
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
