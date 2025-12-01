"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// FIX: ArrowRight was used but not imported. Added ArrowRight to the import list.
import { Clock, Users, Zap, CheckCircle, GraduationCap, ArrowRight } from "lucide-react";

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

// Canvas environment-এ useParams/Next.js router simulate করা হচ্ছে।
// Real Next.js app-এ এটি `import { useParams } from "next/navigation";` থেকে আসত।
const useParams = () => {
    // Simulating URL parameter (e.g., /course/3)
    // Hardcoding to '3' for Next.js Mastery example.
    return { id: '3' }; 
};


// ডেটা টাইপিং (বিস্তারিত ডেটা যা ডিজাইনের জন্য প্রয়োজন)
interface CourseDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  students: number;
  modules: { title: string; content: string[] }[];
  keyTakeaways: string[];
}

// সিমুলেটেড কোর্সের তালিকা (API বা JSON fetch এর পরিবর্তে local data)
const ALL_COURSES: CourseDetail[] = [
    { 
        id: 3, 
        title: "Next.js Mastery: App Router", 
        description: "Master modern full-stack development using Next.js 14 App Router, Server Components, and advanced data fetching techniques. Build production-ready, highly scalable applications.", 
        image: "https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Next.js+14",
        duration: "10 Weeks",
        level: "Advanced",
        students: 4500,
        modules: [
            { title: "Module 1: Foundations & Setup", content: ["Project Structure", "Routing Fundamentals", "Layouts & Templates"] },
            { title: "Module 2: Server & Client Components", content: ["Understanding the differences", "When to use 'use client'", "Data fetching strategies"] },
            { title: "Module 3: Advanced APIs & Data", content: ["Building API Routes", "Server Actions", "Integrating Databases (e.g., MongoDB)"] },
            { title: "Module 4: Deployment & Optimization", content: ["Caching and Revalidation", "SEO Best Practices", "Vercel Deployment"] }
        ],
        keyTakeaways: [
            "Build scalable full-stack applications with Next.js.",
            "Utilize Server Components for maximum performance.",
            "Master Server Actions for secure form handling.",
            "Implement modern authentication and authorization patterns."
        ]
    },
    { 
        id: 1, 
        title: "JavaScript Basics", 
        description: "Learn the fundamentals of JavaScript, the language of the web. Perfect for absolute beginners.", 
        image: "https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=JS+Basics",
        duration: "4 Weeks",
        level: "Beginner",
        students: 12000,
        modules: [
            { title: "Module 1: Variables & Data Types", content: ["let, const, var", "Primitives and Objects"] },
            { title: "Module 2: Control Flow", content: ["If/Else statements", "Loops (for, while)"] },
        ],
        keyTakeaways: ["Write basic JavaScript code.", "Understand scope and hoisting.", "Manipulate the DOM (Document Object Model)."]
    }
    // অন্যান্য কোর্স এখানে যোগ করা যেতে পারে...
];

export default function CoursePage() {
  const params = useParams(); // Simulate getting { id: '3' }
  const [course, setCourse] = useState<CourseDetail | null>(null);
  
  useEffect(() => {
    // useParams() gives object with string id
    const courseId = Number(params?.id);
    if (!courseId) return;

    // Simulating fetching detailed data by ID (as if from an API or JSON file)
    // Note: In a real app, you would replace this with your `fetch("/data/courses.json")` logic
    const found = ALL_COURSES.find(c => c.id === courseId);
    setCourse(found || null);
  }, [params?.id]);
  
  // ফ্রেমার মোশন ভ্যারিয়েন্ট
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (!course) {
    return (
      <div className={`min-h-[60vh] flex items-center justify-center bg-[${SOFT_BG}]`}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl text-gray-700">
          Course not found or loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-12 pb-20 bg-[${SOFT_BG}]`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto px-6"
      >
        
        {/* টপ সেকশন: টাইটেল, ইমেজ ও CTA */}
        <motion.div variants={fadeIn} className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-10">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* কোর্স মেটা ও ডিটেইলস */}
            <div className="lg:w-2/3">
              <span className={`text-sm font-semibold uppercase tracking-widest text-[${ACCENT_COLOR}] mb-2 block`}>
                {course.level} Pathway
              </span>
              <h1 className={`text-4xl md:text-5xl font-extrabold text-[${PRIMARY_DARK}] mb-4 leading-tight`}>
                {course.title}
              </h1>
              <p className="text-lg text-gray-700 mb-6">{course.description}</p>
              
              {/* মেটা ইনফো */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-gray-600">
                <motion.div variants={fadeIn} className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 text-[${ACCENT_COLOR}]`} />
                  <span className="font-medium">{course.duration}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center gap-2">
                  <GraduationCap className={`w-5 h-5 text-[${ACCENT_COLOR}]`} />
                  <span className="font-medium">{course.level}</span>
                </motion.div>
                <motion.div variants={fadeIn} className="flex items-center gap-2">
                  <Users className={`w-5 h-5 text-[${ACCENT_COLOR}]`} />
                  <span className="font-medium">{course.students.toLocaleString()} Enrolled</span>
                </motion.div>
              </div>

              {/* অ্যাকশন বাটন */}
              <motion.div variants={fadeIn}>
                <Link
                  href={`/enroll/${course.id}`}
                  className={`inline-flex items-center px-10 py-3 rounded-full font-extrabold text-white 
                             bg-gradient-to-r from-[${PRIMARY_COLOR}] to-[${ACCENT_COLOR}] shadow-lg shadow-[${PRIMARY_COLOR}]/40 
                             hover:opacity-95 transition-all transform hover:scale-[1.02]`}
                >
                  Start Course Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
            
            {/* কোর্স ইমেজ */}
            <motion.div 
              variants={fadeIn} 
              className="lg:w-1/3 flex-shrink-0 relative rounded-xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* মডিউল এবং টেকঅ্যাওয়ে সেকশন */}
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* মডিউল কন্টেন্ট (বাম দিক, ২/৩ প্রস্থ) */}
            <motion.div variants={fadeIn} className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className={`text-3xl font-bold text-[${PRIMARY_DARK}] mb-6 border-b pb-2 border-gray-200`}>
                    Course Curriculum
                </h2>
                
                <div className="space-y-6">
                    {course.modules.map((module, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-[${SOFT_BG}] border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <h3 className={`text-xl font-semibold text-[${PRIMARY_COLOR}] flex items-center gap-2`}>
                                <Zap className="w-5 h-5" />
                                {module.title}
                            </h3>
                            <ul className="list-inside mt-2 text-gray-700 text-sm space-y-1">
                                {module.content.map((item, i) => (
                                    <li key={i} className="flex items-start before:content-['•'] before:mr-2 before:text-gray-500">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* কী টেকঅ্যাওয়ে (ডান দিক, ১/৩ প্রস্থ) */}
            <motion.div variants={fadeIn} className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-4">
                <h2 className={`text-2xl font-bold text-[${PRIMARY_DARK}] mb-4 border-b pb-2 border-gray-200`}>
                    What You Will Learn
                </h2>
                <ul className="space-y-3">
                    {course.keyTakeaways.map((takeaway, index) => (
                        <motion.li
                            key={index}
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="flex items-start gap-3 text-gray-700 font-medium"
                        >
                            <CheckCircle className={`w-5 h-5 flex-shrink-0 text-[${ACCENT_COLOR}] mt-1`} />
                            <span>{takeaway}</span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

        </div>
      </motion.div>
    </div>
  );
}