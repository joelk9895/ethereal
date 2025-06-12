"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of sample packs with image/video paths, names, descriptions, and colors
  // Wrapped in useMemo to prevent recreation on every render
  const samplePacks = useMemo(() => [
    {
      image: "/images/landing/image1.png",
      title: "ETHEREAL",
      subtitle: "Dark atmospheric sounds with haunting melodies and deep bass",
      color: "#8b5cf6",
      type: "image",
    },
    {
      image: "/images/landing/image2.png",
      title: "AMBIENT",
      subtitle: "Flowing soundscapes perfect for cinematic productions",
      color: "#06b6d4",
      type: "image",
    },
    {
      image: "/images/landing/image3.png",
      title: "URBAN",
      subtitle: "Street-inspired beats with modern trap influences",
      color: "#f59e0b",
      type: "image",
    },
    {
      image: "/images/landing/image4.png",
      title: "DIGITAL",
      subtitle: "Futuristic synths and glitchy electronic textures",
      color: "#10b981",
      type: "image",
    },
    {
      image: "/images/landing/image5.png",
      title: "COSMIC",
      subtitle: "Space-age sounds for otherworldly music experiences",
      color: "#8b5cf6",
      type: "image",
    },
    {
      image: "/images/landing/hero-video.mov",
      title: "CINEMATIC",
      subtitle:
        "Immersive visual experiences that transport you beyond reality",
      color: "#c4a734",
      type: "video",
    },
  ], []);

  // Animation variants
  const textVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which slide should be shown based on scroll position
      // Each 100vh of scroll = one slide
      const slideIndex = Math.floor(scrollY / windowHeight);

      // Ensure we don't exceed the number of available images
      const newSlide = Math.min(slideIndex, samplePacks.length - 1);

      setCurrentSlide(newSlide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [samplePacks.length]);

  // Handle video playback when slide changes
  useEffect(() => {
    const currentPack = samplePacks[currentSlide];
    if (currentPack?.type === "video") {
      const video = document.querySelector(
        `video[src="${currentPack.image}"]`
      ) as HTMLVideoElement;
      if (video) {
        video.currentTime = 0;
        video.play().catch(console.error);
      }
    }

    // Pause other videos
    samplePacks.forEach((pack, index) => {
      if (pack.type === "video" && index !== currentSlide) {
        const video = document.querySelector(
          `video[src="${pack.image}"]`
        ) as HTMLVideoElement;
        if (video) {
          video.pause();
        }
      }
    });
  }, [currentSlide, samplePacks]);

  return (
    <div className="relative">
      {/* Spacer div to create the scroll area - 600vh total height */}
      <div className="h-[700vh]">
        {/* Sticky container that stays fixed during scroll */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Media container */}
          <div className="relative w-full h-full">
            {samplePacks.map((pack, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {pack.type === "video" ? (
                  <video
                    src={pack.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={pack.image}
                    alt={pack.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
            ))}

            {/* Sample pack info - bottom left */}
            <div className="absolute bottom-24 left-12 z-10 max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentSlide}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative z-20 space-y-6 will-change-transform"
                  style={{ perspective: "1000px" }}
                >
                  {/* Title with letter-by-letter animation */}
                  <motion.h1 className="font-heading text-9xl text-white leading-none">
                    {samplePacks[currentSlide]?.title
                      .split("")
                      .map((letter, index) => (
                        <motion.span
                          key={`${currentSlide}-${index}`}
                          variants={letterVariants}
                          className="inline-block will-change-transform"
                          style={{
                            textShadow: `0 0 20px ${samplePacks[currentSlide]?.color}40, 0 10px 40px rgba(0,0,0,0.5)`,
                          }}
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))}
                  </motion.h1>

                  <motion.p
                    className="text-3xl text-white/90 max-w-4xl font-body leading-relaxed"
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
                      textShadow: `0 0 10px ${samplePacks[currentSlide]?.color}30, 0 5px 20px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {samplePacks[currentSlide]?.subtitle}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Optional: Slide indicator dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {samplePacks.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Optional: Scroll progress indicator */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="w-full bg-white rounded-full transition-all duration-300 ease-out"
                  style={{
                    height: `${
                      ((currentSlide + 1) / samplePacks.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
