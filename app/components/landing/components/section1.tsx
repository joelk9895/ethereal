"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const imageData = [
  {
    src: "/images/landing/image1.png",
    title: "ETHEREAL TECHNO",
    subtitle: "Sculpted soundscapes for deep minds",
    color: "#6366f1",
  },
  {
    src: "/images/landing/image2.png",
    title: "COSMIC BEATS",
    subtitle: "Journey through infinite rhythms",
    color: "#ec4899",
  },
  {
    src: "/images/landing/image3.png",
    title: "DIGITAL DREAMS",
    subtitle: "Where technology meets melody",
    color: "#10b981",
  },
  {
    src: "/images/landing/image4.png",
    title: "FUTURE GROOVE",
    subtitle: "Innovative sounds for modern minds",
    color: "#f97316",
  },
  {
    src: "/images/landing/image5.png",
    title: "NEON VIBES",
    subtitle: "Illuminate your sound journey",
    color: "#8b5cf6",
  },
  {
    src: "/images/landing/image6.png",
    title: "AURAL ALCHEMY",
    subtitle: "Transforming sound into experience",
    color: "#ef4444",
  },
];

export default function Section1() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll detection with wheel/touch events for instant direction detection
  useEffect(() => {
    if (!containerRef.current) return;

    let wheelTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let touchTimeout: NodeJS.Timeout;
    let isHovering = false;

    // Mouse enter/leave tracking to know when we're over the carousel
    const handleMouseEnter = () => {
      isHovering = true;
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      isHovering = false;
      setIsActive(false);
    };

    // Detect scroll direction from wheel events (only when hovering over section)
    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when hovering over our container
      if (!isHovering) return;

      // Prevent scrolling the parent container
      e.preventDefault();
      e.stopPropagation();

      // Clear any existing timeout
      if (wheelTimeout) clearTimeout(wheelTimeout);

      // Detect direction from wheel delta
      const direction = e.deltaY > 0 ? "down" : "up";
      setScrollDirection(direction);

      // Update internal scroll position without affecting parent
      setScrollY((prev) => {
        const scrollAmount = Math.abs(e.deltaY) * 0.5; // Reduce sensitivity
        if (direction === "down") {
          return prev + scrollAmount;
        } else {
          return Math.max(0, prev - scrollAmount);
        }
      });

      // Use actual scroll position for smoother experience
      wheelTimeout = setTimeout(() => {
        // Internal scroll management
      }, 16);
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Check if the touch is within our container
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touch = e.touches[0];
      const isWithinContainer =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      if (isWithinContainer) {
        touchStartY = touch.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaY) > 10) {
        // Prevent parent container scrolling
        e.preventDefault();
        e.stopPropagation();

        // Minimum threshold
        const direction = deltaY > 0 ? "down" : "up";
        setScrollDirection(direction);

        // Clear any existing timeout
        if (touchTimeout) clearTimeout(touchTimeout);

        // Update internal scroll position
        setScrollY((prev) => {
          const scrollAmount = Math.abs(deltaY) * 2;
          if (direction === "down") {
            return prev + scrollAmount;
          } else {
            return Math.max(0, prev - scrollAmount);
          }
        });

        touchTimeout = setTimeout(() => {
          // Internal scroll management
        }, 50);
      }
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
    };

    const container = containerRef.current;

    // Add event listeners to the container for mouse events
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Add global event listeners for wheel and touch (but with container checks)
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (wheelTimeout) clearTimeout(wheelTimeout);
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, []);

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced image transition logic with keyboard and gesture controls
  useEffect(() => {
    const scrollThreshold = 400;
    let newImageIndex =
      Math.floor(scrollY / scrollThreshold) % imageData.length;

    if (newImageIndex < 0) {
      newImageIndex = imageData.length + newImageIndex;
    }

    if (newImageIndex !== currentImageIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(newImageIndex);
        setIsTransitioning(false);
      }, 100);
    }
  }, [scrollY, currentImageIndex]);

  // Keyboard navigation for direct control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events if the section is in focus or no other input is focused
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).contentEditable === "true");

      if (isInputFocused) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ": // Spacebar
          e.preventDefault();
          setScrollDirection("down");
          setScrollY((prev) => prev + 400);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          setScrollDirection("up");
          setScrollY((prev) => Math.max(0, prev - 400));
          break;
        case "Home":
          e.preventDefault();
          setScrollDirection("up");
          setScrollY(0);
          break;
        case "End":
          e.preventDefault();
          setScrollDirection("down");
          setScrollY((imageData.length - 1) * 400);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setScrollDirection("up");
          const prevIndex =
            currentImageIndex === 0
              ? imageData.length - 1
              : currentImageIndex - 1;
          setScrollY(prevIndex * 400);
          break;
        case "ArrowRight":
          e.preventDefault();
          setScrollDirection("down");
          const nextIndex = (currentImageIndex + 1) % imageData.length;
          setScrollY(nextIndex * 400);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentImageIndex]);

  const currentImage = imageData[currentImageIndex];

  // Advanced animation variants
  const imageVariants = {
    initial: {
      clipPath:
        scrollDirection === "down"
          ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
          : "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
      scale: 1.1,
      rotateZ: scrollDirection === "down" ? 1 : -1,
    },
    animate: {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        clipPath: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    exit: {
      clipPath:
        scrollDirection === "down"
          ? "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)"
          : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      scale: 0.95,
      rotateZ: scrollDirection === "down" ? -1 : 1,
      transition: {
        duration: 0.6,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: scrollDirection === "down" ? 60 : -60,
      rotateX: scrollDirection === "down" ? 30 : -30,
      filter: "blur(15px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: scrollDirection === "down" ? -30 : 30,
      rotateX: scrollDirection === "down" ? -20 : 20,
      filter: "blur(8px)",
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 30,
      rotateZ: 5,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={`fixed bg-black inset-0 min-h-screen flex items-end justify-start px-16 pb-10 z-10 overflow-hidden focus:outline-none transition-all duration-300 ${
        isActive
          ? "ring-2 ring-white/30 ring-inset"
          : "ring-1 ring-white/10 ring-inset"
      }`}
      tabIndex={0}
      role="region"
      aria-label="Image carousel - use arrow keys, space, or scroll to navigate"
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {/* Dynamic background gradient based on current image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentImage.color}20 0%, transparent 50%)`,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentImage.color}20 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Image transitions with advanced clip-path animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={currentImage.src}
            alt={`Background Image ${currentImageIndex + 1}`}
            fill
            className="object-cover object-center will-change-transform"
            priority={currentImageIndex === 0}
            quality={100}
          />
          {/* Subtle overlay that changes with each image */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${currentImage.color}10 0%, transparent 40%, ${currentImage.color}05 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced overlay with animated grain effect */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.3) 80%)",
          backdropFilter: "contrast(1.1) brightness(0.9)",
        }}
        animate={{
          opacity: isTransitioning ? 0.5 : 0.3,
        }}
      />

      {/* Text with sophisticated animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${currentImageIndex}`}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-20 space-y-6 will-change-transform"
          style={{ perspective: "1000px" }}
        >
          {/* Title with letter-by-letter animation */}
          <motion.h1 className="font-heading text-9xl text-white drop-shadow-2xl leading-none">
            {currentImage.title.split("").map((letter, index) => (
              <motion.span
                key={`${currentImageIndex}-${index}`}
                variants={letterVariants}
                className="inline-block will-change-transform"
                style={{
                  textShadow: `0 0 20px ${currentImage.color}40, 0 10px 40px rgba(0,0,0,0.5)`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-3xl font-body text-white/90 drop-shadow-lg max-w-2xl leading-relaxed"
            variants={{
              initial: { opacity: 0, y: 20, filter: "blur(8px)" },
              animate: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            style={{
              textShadow: `0 0 10px ${currentImage.color}30, 0 5px 20px rgba(0,0,0,0.3)`,
            }}
          >
            {currentImage.subtitle}
          </motion.p>

          {/* Enhanced scroll indicator with magnetic effect */}
          <motion.div
            className="flex items-center space-x-4 text-white/70 mt-12"
            variants={{
              initial: { opacity: 0, x: -30 },
              animate: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            whileHover={{ scale: 1.05, x: 10 }}
            style={{
              cursor: "pointer",
              filter: `drop-shadow(0 0 10px ${currentImage.color}40)`,
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center"
              style={{ backgroundColor: `${currentImage.color}20` }}
              animate={{ rotate: scrollY * 0.1 }}
            >
              <span className="text-sm font-bold">
                {String(currentImageIndex + 1).padStart(2, "0")}
              </span>
            </motion.div>
            <motion.div
              className="h-px bg-gradient-to-r from-white/30 to-transparent w-32"
              style={{
                background: `linear-gradient(90deg, ${currentImage.color}60 0%, transparent 100%)`,
              }}
            />
            <div className="flex flex-col space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-medium">
                Infinite • Explore ∞
              </span>
              <span className="text-xs text-white/50 font-light">
                Wheel • Arrows • Space • Touch
              </span>
            </div>
          </motion.div>

          {/* Control hints */}
          <motion.div
            className="flex items-center space-x-6 mt-6 text-white/40"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { duration: 0.6, delay: 0.6 },
              },
            }}
          >
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center">
                <span className="text-xs">↑</span>
              </div>
              <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center">
                <span className="text-xs">↓</span>
              </div>
              <span>Navigate</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center">
                <span className="text-xs">←</span>
              </div>
              <div className="w-6 h-6 border border-white/20 rounded flex items-center justify-center">
                <span className="text-xs">→</span>
              </div>
              <span>Direct</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="px-2 py-1 border border-white/20 rounded text-xs">
                Space
              </div>
              <span>Next</span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Floating elements for added visual interest */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
