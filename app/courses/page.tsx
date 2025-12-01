"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, Zap } from "lucide-react";

// হিরো সেকশন এবং নেভিগেশন বারের সাথে সামঞ্জস্যপূর্ণ রঙের কোড:
const PRIMARY_COLOR = "#7C3AED"; // Primary Purple
const ACCENT_COLOR = "#4F46E5"; // Accent/Indigo
const PRIMARY_DARK = "#5B21B6"; // Dark Purple
const SOFT_BG = "#F5F3FF"; // Light Background

// স্ট্যাটিক এনভায়রনমেন্টে next/link কাজ না করায় এই সাধারণ লিঙ্ক কম্পোনেন্টটি ব্যবহার করা হয়েছে
const Link = ({ href, children, className, ...props }: { href: string, children: any, className?: string, [key: string]: any }) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

// ইউজার কর্তৃক প্রদত্ত ডেটা
const COURSES = [
    { id: 1, title: "JavaScript Basics", description: "Learn the fundamentals of JavaScript.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=JS" },
    { id: 2, title: "React for Beginners", description: "Start building React applications.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=React" },
    { id: 3, title: "Next.js Mastery", description: "Learn Next.js 13 App Router.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=Next" },
    { id: 4, title: "TypeScript Essentials", description: "Understand TypeScript for modern JS apps.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=TS" },
    { id: 5, title: "Node.js Fundamentals", description: "Backend development with Node.js.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=Node" },
    { id: 6, title: "Express.js Crash Course", description: "Build REST APIs with Express.js.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=Express" },
    { id: 7, title: "CSS Flexbox & Grid", description: "Master modern layout techniques.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=CSS" },
    { id: 8, title: "Responsive Web Design", description: "Build mobile-first websites.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=RWD" },
    { id: 9, title: "HTML5 Advanced", description: "Learn semantic HTML & modern features.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=HTML" },
    { id: 10, title: "MongoDB Basics", description: "Database essentials with MongoDB.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=MongoDB" },
    { id: 11, title: "GraphQL Introduction", description: "Query APIs efficiently with GraphQL.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=GraphQL" },
    { id: 12, title: "Redux Essentials", description: "State management for React apps.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=Redux" },
    { id: 13, title: "Tailwind CSS Guide", description: "Rapid UI development with Tailwind CSS.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=Tailwind" },
    { id: 14, title: "Git & GitHub Basics", description: "Version control and collaboration skills.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=Git" },
    { id: 15, title: "Docker for Beginners", description: "Containerize your applications.", image: "https://via.placeholder.com/150x150/7C3AED/FFFFFF?text=Docker" },
    { id: 16, title: "CI/CD with GitHub Actions", description: "Automate workflows & deployments.", image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=CI/CD" }
];


// ফ্রেমার মোশন ভ্যারিয়েন্ট
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

// কোর্স কার্ড কম্পোনেন্ট
const CourseCard = ({ course }: { course: typeof COURSES[0] }) => {
    // রঙের বৈচিত্র্য বজায় রাখার জন্য অ্যাকসেন্ট রঙ বেছে নেওয়া
    const cardBgColor = course.id % 2 === 0 ? ACCENT_COLOR : PRIMARY_COLOR;
    const hoverBgColor = course.id % 2 === 0 ? PRIMARY_COLOR : ACCENT_COLOR;
    const isDark = true; // যেহেতু ব্যাকগ্রাউন্ড গাঢ়, টেক্সট সাদা হবে

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: `0 15px 30px rgba(0, 0, 0, 0.3)` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-2xl shadow-xl overflow-hidden cursor-pointer 
                        bg-[${cardBgColor}] text-white flex flex-col transition-all duration-300`}
        >
            <Link href={`/course/${course.id}`}>
                {/* ইমেজ বা আইকন সেকশন */}
                <div className="relative w-full h-36 flex items-center justify-center p-4 bg-white/10">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-24 h-24 object-cover rounded-lg shadow-inner"
                        onError={(e) => {
                            e.currentTarget.onerror = null; 
                            e.currentTarget.src = `https://placehold.co/150x150/${cardBgColor.substring(1)}/FFFFFF?text=Code`;
                        }}
                    />
                    <Zap className="absolute top-2 right-2 w-5 h-5 text-yellow-300 opacity-80" />
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                    <h3 className="text-xl font-bold mb-2 leading-tight">{course.title}</h3>
                    <p className="text-sm text-white/80 mb-4 flex-grow">{course.description}</p>
                    
                    {/* ডিটেইলস বাটন */}
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center gap-1">
                            <BookOpenCheck className="w-4 h-4" />
                            Module {course.id}
                        </span>
                        <motion.div
                            className={`p-2 rounded-full bg-white text-[${cardBgColor}]`}
                            whileHover={{ x: 5 }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};


export default function CourseListing() {
  return (
    <div className={`min-h-screen pt-16 pb-20 bg-[${SOFT_BG}]`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* হেডার সেকশন */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 py-8 rounded-xl bg-white shadow-lg border-t-4 border-b-4 border-primary"
        >
          <h1 className={`text-4xl md:text-5xl font-extrabold text-[${PRIMARY_DARK}] mb-2`}>
            Explore Our Pathways
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect course to level up your development skills, from JavaScript basics to advanced CI/CD.
          </p>
        </motion.header>

        {/* কোর্স গ্রিড */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </motion.div>
        
        {/* ফুটার CTA */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className={`mt-20 p-8 rounded-2xl text-center bg-gradient-to-r from-[${ACCENT_COLOR}] to-[${PRIMARY_DARK}] text-white shadow-2xl`}
        >
            <h2 className="text-3xl font-bold mb-3">Ready to Start Coding?</h2>
            <p className="mb-6 text-white/90">
                Enroll now and gain instant access to all course materials and projects.
            </p>
            <Link
                href="/signup"
                className={`inline-flex items-center px-8 py-3 rounded-full font-extrabold text-[${PRIMARY_DARK}] bg-white shadow-xl hover:bg-gray-100 transition-colors transform hover:scale-105`}
            >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
        </motion.div>

      </div>
    </div>
  );
}