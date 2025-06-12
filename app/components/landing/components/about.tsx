"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const paragraph = `We are a community-driven platform dedicated to empowering artists and producers with high-quality, royalty-free sounds.`;

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      wordsRef.current,
      {
        filter: "blur(6px)",
        opacity: 0.4,
        color: "black",
        y: 20,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        color: "white",
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="h-[200vh]">
      <section
        ref={sectionRef}
        className="sticky inset-0 bg-black text-white py-16 h-screen flex items-center"
      >
        <div className="container flex flex-col items-center mx-auto px-4 text-left">
          <div className="text-8xl font-heading uppercase font-semibold leading-tight max-w-6xl flex flex-wrap justify-start">
            {paragraph.split(" ").map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className="inline-block mr-2"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
