"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  index: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/", index: "01" },
  { label: "ABOUT", href: "/about", index: "02" },
  { label: "CONTACT", href: "/contact", index: "03" },
];

export default function Nav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Mount check for hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (!isMounted) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isMounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-auto z-[100] transition-all duration-700">
        <div className="px-8 py-3 flex items-center justify-between space-x-4 w-screen">
          <div className="relative cursor-pointer">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-heading text-white font-light tracking-[0.15em] uppercase opacity-0">
                ETHEREAL
              </h1>
            </div>
          </div>
          <button className="relative w-8 h-8 flex flex-col justify-center items-center opacity-0">
            <span className="w-5 h-0.5 bg-white/80 rounded-full" />
            <span className="w-5 h-0.5 bg-white/80 rounded-full mt-1" />
            <span className="w-5 h-0.5 bg-white/80 rounded-full mt-1" />
          </button>
        </div>
      </nav>
    );
  }

  // Advanced animation variants with Awwwards-style easing
  const containerVariants = {
    initial: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, x: -30, rotateY: -45 },
    animate: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20, rotateZ: 5 },
    animate: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const menuToggleVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -180 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      clipPath: "circle(0% at 100% 0%)",
      pointerEvents: "none" as const,
    },
    open: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "circle(150% at 100% 0%)",
      pointerEvents: "auto" as const,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.12,
        delayChildren: 0.2,
        clipPath: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        ref={navRef}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="fixed top-6 left-1/2 transform -translate-x-1/2 w-auto z-[100] transition-all duration-700"
      >
        <div className="px-8 py-3 flex items-center justify-between space-x-4 w-screen ">
          {/* Minimalist Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="relative cursor-pointer"
          >
            <motion.div className="flex items-center space-x-3">
              <motion.h1
                className="text-lg font-heading text-white font-light tracking-[0.15em] uppercase"
                style={{
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                  fontWeight: 300,
                }}
              >
                {"ETHEREAL".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    whileHover={{
                      y: -2,
                      textShadow: "0 0 10px var(--color-primary)",
                      transition: { duration: 0.2 },
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Menu Button (Always visible) */}
          <motion.button
            variants={menuToggleVariants}
            className="relative w-8 h-8 flex flex-col justify-center items-center z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="w-5 h-0.5 bg-white/80 rounded-full"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 4 : 0,
                backgroundColor: isMenuOpen
                  ? "#6366f1"
                  : "rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.span
              className="w-5 h-0.5 bg-white/80 rounded-full mt-1"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scale: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-white/80 rounded-full mt-1"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -4 : 0,
                backgroundColor: isMenuOpen
                  ? "#6366f1"
                  : "rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Full Screen Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[99] flex items-center justify-center"
            style={{
              backgroundImage: isMounted
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.03) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)`
                : "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(0, 0, 0, 0.98) 100%)",
            }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-black to-purple-900/10" />
            <div className="absolute inset-0 backdrop-blur-2xl" />

            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
                  style={{ left: `${5 + i * 5}%` }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            {/* Navigation Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-8">
              {/* Main Navigation */}
              <motion.div
                className="text-center mb-16"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
                  },
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="mb-8 group cursor-pointer"
                    variants={{
                      closed: {
                        opacity: 0,
                        y: 100,
                        rotateX: 90,
                        filter: "blur(20px)",
                      },
                      open: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: index * 0.1,
                        },
                      },
                    }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <motion.a
                      href={item.href}
                      className="block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {/* Index Number */}
                      <motion.div
                        className="text-primary/40 font-mono text-sm mb-2"
                        animate={{
                          color:
                            hoveredItem === item.label
                              ? "#6366f1"
                              : "rgba(99, 102, 241, 0.4)",
                        }}
                      >
                        {item.index}
                      </motion.div>

                      {/* Main Text */}
                      <motion.h2
                        className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none font-heading"
                        style={{
                          textShadow:
                            hoveredItem === item.label
                              ? "0 0 40px rgba(99, 102, 241, 0.3)"
                              : "0 0 20px rgba(255, 255, 255, 0.1)",
                        }}
                        animate={{
                          letterSpacing:
                            hoveredItem === item.label ? "0.02em" : "-0.02em",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.label.split("").map((letter, letterIndex) => (
                          <motion.span
                            key={letterIndex}
                            className="inline-block"
                            whileHover={{
                              y: -20,
                              rotateZ: Math.random() * 10 - 5,
                              color: "#6366f1",
                              textShadow: "0 0 30px rgba(99, 102, 241, 0.8)",
                            }}
                            transition={{
                              duration: 0.3,
                              delay: letterIndex * 0.05,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </motion.h2>

                      {/* Subtitle */}
                      <motion.div
                        className="text-white/40 text-sm md:text-base tracking-[0.3em] uppercase font-light mt-4"
                        animate={{
                          opacity: hoveredItem === item.label ? 1 : 0.4,
                          y: hoveredItem === item.label ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Explore {item.label.toLowerCase()}
                      </motion.div>

                      {/* Hover Line */}
                      <motion.div
                        className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-6"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: hoveredItem === item.label ? 1 : 0,
                          opacity: hoveredItem === item.label ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer Info */}
              <motion.div
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                variants={{
                  closed: { opacity: 0, y: 50 },
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.8, duration: 0.6 },
                  },
                }}
              >
                <div className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
                  Ethereal Music Store
                </div>
                <div className="flex items-center space-x-8 text-white/20 text-xs">
                  <span>EST. 2024</span>
                  <div className="w-1 h-1 bg-primary/30 rounded-full" />
                  <span>PREMIUM EXPERIENCE</span>
                </div>
              </motion.div>

              {/* Floating Elements */}
              {isMounted &&
                [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/10 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + Math.random() * 40}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.1, 0.4, 0.1],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.2,
                    }}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient floating elements */}
      {isMounted && (
        <div className="fixed top-0 left-0 w-full h-24 pointer-events-none z-40 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
