"use client";

import { useRef} from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

const Team = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alex Chen",
      role: "Sound Designer & Producer",
      description:
        "Master of atmospheric textures with 10+ years crafting ethereal soundscapes for film and electronic music.",
      image: "/images/landing/image1.png",
    },
    {
      id: "2",
      name: "Maya Rodriguez",
      role: "Audio Engineer",
      description:
        "Technical wizard specializing in spatial audio and innovative mixing techniques for immersive experiences.",
      image: "/images/landing/image2.png",
    },
    {
      id: "3",
      name: "David Kim",
      role: "Creative Director",
      description:
        "Visionary artist who bridges the gap between traditional composition and cutting-edge electronic production.",
      image: "/images/landing/image3.png",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      role: "Ambient Specialist",
      description:
        "Pioneer in generative music systems and AI-assisted composition for otherworldly sonic environments.",
      image: "/images/landing/image4.png",
    },
    {
      id: "5",
      name: "Marcus Thompson",
      role: "Bass & Rhythm Producer",
      description:
        "Deep house veteran who brings the underground energy that makes ethereal techno move your soul.",
      image: "/images/landing/image5.png",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320; // Width of card + gap
    const newScrollLeft =
      scrollRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Simple background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>

      <div className="relative z-10  mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 uppercase">
              The Minds Behind
              <span className="block text-primary"> the Sound</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Meet the visionary artists and technical innovators crafting the
              future of ethereal techno.
            </p>
          </motion.div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <button
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors border border-primary/20"
            >
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors border border-primary/20"
            >
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Team Cards */}
          <div
            ref={scrollRef}
            className="flex items-center justify-center gap-4 overflow-x-auto scrollbar-hide pb-6 w-screen"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="flex-none w-72"
                style={{ scrollSnapAlign: "start" }}
                variants={itemVariants}
              >
                <div className="bg-black h-[420px] rounded-xl overflow-hidden border border-gray-800 transition-colors flex flex-col">
                  {/* Member Photo */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* Member Info */}
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-heading font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-2">
                      {member.role}
                    </p>

                    {/* Description - simplified from expandable to always visible */}
                    <p className="text-white/70 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="lg:hidden text-center mt-6">
            <p className="text-white/50 text-sm flex items-center justify-center gap-2">
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
                  d="M7 16l4-4m0 0l4-4m-4 4H3m6 0v4"
                />
              </svg>
              Swipe to explore our team
            </p>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Team;
