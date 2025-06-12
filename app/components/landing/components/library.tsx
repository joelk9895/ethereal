"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Type definitions
interface Library {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tracks: number;
  genre: string;
  bpm: string;
  size: string;
  color: string;
  accent: string;
}

const LibraryGrid = () => {
  const [hoveredLibrary, setHoveredLibrary] = useState<string | null>(null);

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // InView detection for animation triggers
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.5 });

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll position
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  const cardsY = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
  const footerScale = useTransform(scrollYProgress, [0.7, 0.9], [0.95, 1]);

  // Smooth scroll to footer
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Library data with simplified structure
  const libraries: Library[] = [
    {
      id: "dark-techno",
      title: "Dark Techno",
      subtitle: "Industrial Soundscapes",
      description:
        "Relentless basslines and mechanical rhythms forged in the underground. Perfect for peak-time sets and industrial atmospheres.",
      image:
        "/images/landing/syykart_ethereal_techno_abstract_atmosphere_smoke_051573bc-52dc-4ba1-89c2-a5129fa13194.png",
      tracks: 24,
      genre: "Techno",
      bpm: "128-140",
      size: "156 MB",
      color: "#DC2626", // red-600
      accent: "#F97316", // orange-500
    },
    {
      id: "ambient-dreams",
      title: "Ambient Dreams",
      subtitle: "Ethereal Soundscapes",
      description:
        "Floating textures and atmospheric pads that transport listeners to otherworldly dimensions. Ideal for cinematic scoring and meditation.",
      image:
        "/images/landing/syykart_ethereal_techno_abstract_atmosphere_smoke_125d7ccf-5fd3-4f3d-9991-bd159789e08a.png",
      tracks: 18,
      genre: "Ambient",
      bpm: "70-90",
      size: "203 MB",
      color: "#2563EB", // blue-600
      accent: "#06B6D4", // cyan-500
    },
    {
      id: "trap-heat",
      title: "Trap Heat",
      subtitle: "Urban Genesis",
      description:
        "Crushing 808s and razor-sharp hi-hats with contemporary urban attitude. Built for the streets, perfected for the charts.",
      image:
        "/images/landing/syykart_ethereal_techno_abstract_atmosphere_smoke_166bb881-8da8-4023-a231-c468c83107d6.png",
      tracks: 32,
      genre: "Trap",
      bpm: "140-160",
      size: "187 MB",
      color: "#7C3AED", // violet-600
      accent: "#F59E0B", // amber-500
    },
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 md:py-24 overflow-hidden relative"
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-1 bg-primary/20 origin-top z-50 hidden md:block"
        style={{
          scaleY: scrollYProgress,
          opacity: useTransform(
            scrollYProgress,
            [0, 0.1, 0.9, 1],
            [0, 1, 1, 0]
          ),
        }}
      />

      {/* Visual storytelling elements */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-2/3 w-60 h-60 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Visual storytelling lines */}
      <motion.div
        className="absolute left-0 top-1/4 w-full h-px bg-primary/10 pointer-events-none"
        style={{
          scaleX: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
          opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.4], [0, 1, 0]),
        }}
      />
      <motion.div
        className="absolute right-0 top-2/3 w-full h-px bg-primary/10 pointer-events-none"
        style={{
          scaleX: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
          opacity: useTransform(scrollYProgress, [0.6, 0.8, 0.9], [0, 1, 0]),
          transformOrigin: "right",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with scroll-based reveal */}
        <motion.header
          ref={headerRef}
          className="text-center mb-16 md:mb-24"
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-white uppercase">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Sample
            </motion.span>
            <motion.span
              className="block text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={
                headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Libraries
            </motion.span>
          </h1>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-xl text-gray-300 mb-2">
              Curated collections of premium samples across diverse genres.
            </p>
            <p className="text-gray-400">
              Each library crafted by industry professionals for exceptional
              music production.
            </p>
          </motion.div>
        </motion.header>

        {/* Library Grid with scroll-based reveal */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y: cardsY }}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {libraries.map((library) => (
            <motion.article
              key={library.id}
              variants={cardVariants}
              whileHover="hover"
              className="group"
              onMouseEnter={() => setHoveredLibrary(library.id)}
              onMouseLeave={() => setHoveredLibrary(null)}
            >
              {/* Enhanced card with staggered content reveal */}
              <div className="bg-black rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors shadow-lg">
                {/* Image container with parallax effect */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={library.image}
                    alt={library.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      transformOrigin: "center center",
                    }}
                  />

                  {/* Simple gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Stats badge with reveal */}
                  <motion.div
                    className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-2 text-sm text-white"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="font-medium">{library.tracks} Tracks</div>
                    <div className="text-xs text-gray-400">{library.size}</div>
                  </motion.div>
                </div>

                {/* Content section with staggered animation */}
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Genre badge with scroll reveal */}
                  <motion.div
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 border"
                    style={{
                      backgroundColor: `${library.color}12`,
                      color: library.accent,
                      borderColor: `${library.color}25`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: library.accent }}
                    />
                    {library.genre} • {library.bpm} BPM
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold mb-2"
                    style={{
                      color:
                        hoveredLibrary === library.id
                          ? library.accent
                          : "white",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {library.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-200 text-sm font-medium mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {library.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-gray-400 text-sm mb-6 line-clamp-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {library.description}
                  </motion.p>

                  {/* Button with reveal and hover effect */}
                  <motion.button
                    className="w-full py-3 rounded-lg font-body font-medium text-black bg-yellow-400 transition-all duration-300 transform-gpu"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "#f59e0b",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToFooter}
                  >
                    Explore Collection
                  </motion.button>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA with scroll reveal */}
        <motion.footer
          ref={footerRef}
          className="text-center mt-20"
          style={{ scale: footerScale }}
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 50,
          }}
        >
          <motion.button
            className="px-8 py-4 bg-white text-black font-body font-bold text-lg rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors transform-gpu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Discover Full Collection
          </motion.button>

          <motion.p
            className="text-gray-500 text-sm mt-4 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Join thousands of producers creating exceptional music with our
            premium samples
          </motion.p>
        </motion.footer>
      </div>
    </section>
  );
};

export default LibraryGrid;
