"use client";

import { useState } from "react";
// Heroicons ব্যবহার করা হয়েছে
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 
import { motion, AnimatePresence, Variants } from "framer-motion";

// হিরো সেকশনের সাথে সামঞ্জস্যপূর্ণ রঙের কোড:
const PRIMARY_COLOR = "#7C3AED";
const ACCENT_COLOR = "#4F46E5";
const PRIMARY_DARK = "#5B21B6";
const SOFT_BG = "#F5F3FF";

// স্ট্যাটিক এনভায়রনমেন্টে next/link কাজ না করায় এই সাধারণ লিঙ্ক কম্পোনেন্টটি ব্যবহার করা হয়েছে
const Link = ({ href, children, className, ...props }: { href: string, children: any, className?: string, [key: string]: any }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/projects", label: "Projects" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about", "label": "About" },
];

const linkVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    } as any, 
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((s) => !s);
  const closeMenu = () => setOpen(false);

  return (
    // ✨ Hero Section এর সাথে সামঞ্জস্য রেখে Gradient Background ব্যবহার করা হয়েছে
    <header
      className={`w-full sticky top-0 z-50 shadow-2xl 
                 bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}]`} 
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* ব্র্যান্ড/লোগো */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            
            {/* ডামি ইমেজ লোগো (Hero Section এর রঙের সাথে মিল রেখে) */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                            bg-white p-1 shadow-lg transition-transform hover:scale-105`}>
              <img 
                src={`https://via.placeholder.com/40x40/${PRIMARY_COLOR.substring(1)}/FFFFFF?text=CH`} // ডামি ইমেজ URL
                alt="CodexHub Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-white leading-none">
                CodexHub
              </h1>
              <p className="text-xs text-white/80 font-medium tracking-wider mt-0.5">
                LEARN & GROW
              </p>
            </div>
          </Link>
        </motion.div>

        {/* ডেস্কটপ লিঙ্ক */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-white/90 p-2 rounded-lg 
                             hover:text-white transition-all hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Log in Button - সাদা বর্ডার */}
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl font-medium border-2 border-white/60 text-white 
                             hover:bg-white/20 transition-all hover:shadow-md"
              >
                Log in
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Get Started Button - সাদা ব্যাকগ্রাউন্ড, গাঢ় বেগুনি টেক্সট (PRIMARY_DARK) */}
              <Link
                href="/signup"
                className={`px-4 py-2 rounded-xl font-bold text-[${PRIMARY_DARK}] bg-white 
                             shadow-lg shadow-white/30 hover:opacity-90 transition-opacity`} 
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>

        {/* মোবাইল হ্যামবার্গার */}
        <div className="md:hidden">
          <motion.button
            aria-label="Toggle menu"
            onClick={toggleMenu}
            className="p-2 rounded-lg bg-white/20 border border-white/30 shadow-md"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* মোবাইল মেনু */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`md:hidden absolute top-full left-0 w-full bg-[${SOFT_BG}]/95 backdrop-blur-sm border-b border-gray-200 shadow-xl`}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-6 pb-6 pt-4 space-y-4">
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block w-full text-base font-medium py-3 px-4 rounded-lg text-gray-800 hover:bg-[${PRIMARY_COLOR}]/10 transition-colors border border-transparent hover:border-primary/10`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={`flex-1 text-center px-4 py-3 rounded-xl font-medium border border-[${PRIMARY_COLOR}]/30 text-[${PRIMARY_DARK}] hover:bg-[${PRIMARY_COLOR}]/10 transition-all`}
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className={`flex-1 text-center px-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}] shadow-md hover:opacity-90 transition-opacity`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}