"use client";

import { motion } from "framer-motion";
// FIX: "next/link" could not be resolved. Replaced with standard HTML anchor tag wrapped in a component.
// import Link from "next/link"; 
import { Zap, Code, BookOpen, Layers } from "lucide-react"; // Bento গ্রিডের জন্য আইকন আমদানি করা হয়েছে

// স্ট্যাটিক এনভায়রনমেন্টে next/link কাজ না করায় এই সাধারণ লিঙ্ক কম্পোনেন্টটি ব্যবহার করা হয়েছে
// FIX: 'href' implicitly has an 'any' type error fixed by adding explicit typing for props.
const Link = ({ href, children, className, ...props }: { href: string, children: any, className?: string, [key: string]: any }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

export default function HeroSection() {
  // Re-using the specified gradient color for accents
  const ACCENT_COLOR_HEX = "#4F46E5"; 

  // Updated grid items with better image URLs/placeholders
  const gridItems = [
    { title: "JavaScript", icon: <Code className="w-6 h-6 text-primary" />, color: "bg-softBg", text: "text-primary" },
    { title: "TypeScript", icon: <Zap className="w-6 h-6 text-white" />, color: "bg-primaryDark", text: "text-white" },
    { title: "Next.js", icon: <Layers className="w-6 h-6 text-white" />, color: "bg-primary", text: "text-white" },
    { title: "Deep Dive", icon: <BookOpen className="w-6 h-6 text-primaryDark" />, color: "bg-white", text: "text-primaryDark" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="relative min-h-[70vh] flex items-center 
                        bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] 
                        text-white overflow-hidden rounded-b-3xl shadow-2xl">
      
      {/* সজ্জার জন্য ব্যাকগ্রাউন্ড শেপ */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 810" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="50" r="300" fill="url(#grad1)"/>
          <circle cx="1200" cy="800" r="400" fill="url(#grad2)"/>
          <defs>
            <radialGradient id="grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 50) rotate(90) scale(300)">
              <stop stopColor="#5B21B6"/>
              <stop offset="1" stopColor="#7C3AED" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1200 800) rotate(90) scale(400)">
              <stop stopColor="#4F46E5"/>
              <stop offset="1" stopColor="#5B21B6" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 
                      flex flex-col-reverse md:flex-row items-center justify-between gap-16">

        {/* টেক্সট কন্টেন্ট */}
        <motion.div
          className="flex-1 space-y-6 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Master Code, <span className="text-white drop-shadow-lg">Build Futures.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Jumpstart your development journey with real-world projects and interactive learning pathways at **CodexHub**.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {/* প্রাথমিক অ্যাকশন বাটন (White/SoftBg ফর কনট্রাস্ট) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signup"
                className="px-8 py-3 rounded-xl bg-white text-primaryDark font-extrabold shadow-2xl 
                           hover:bg-gray-100 transition-colors transform translate-y-[-2px]"
              >
                Start Free Trial
              </Link>
            </motion.div>
            
            {/* দ্বিতীয় অ্যাকশন বাটন (আউটলাইন) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/courses"
                className="px-8 py-3 rounded-xl border-2 border-white/60 text-white font-semibold 
                           hover:bg-white/20 transition-colors"
              >
                Explore Courses
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* বেন্টো গ্রিড (ভিজ্যুয়াল ইন্টারেস্ট) */}
        <motion.div
          className="w-full md:w-1/2 relative p-4 bg-white/10 rounded-3xl shadow-2xl backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            
            {/* প্রধান গ্রিড আইটেম */}
            {gridItems.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`p-6 rounded-2xl shadow-xl transition-all aspect-[5/3] flex flex-col justify-between 
                            ${item.color} ${item.text}`}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-full bg-white/20">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <p className="text-sm opacity-70 mt-2">
                  {i === 0 ? "Fundamentals first." : i === 1 ? "Strong typing." : i === 2 ? "Production ready." : "Theory & Practice."}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ভাসমান উপাদান (ঐচ্ছিক অতিরিক্ত ভিজ্যুয়াল ফ্লেয়ার) */}
          <motion.div 
            className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full 
                       bg-white/30 backdrop-blur-lg flex items-center justify-center shadow-2xl"
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}