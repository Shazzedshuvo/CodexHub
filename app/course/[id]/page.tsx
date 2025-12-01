"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function CoursePage() {
  const params = useParams(); // useParams() gives object with string id
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((courses: Course[]) => {
        const found = courses.find((c) => c.id === Number(params.id));
        setCourse(found || null);
      });
  }, [params?.id]);

  if (!course) return <div className="p-6">Course not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <img src={course.image} alt={course.title} className="w-64 h-64 object-cover mb-4" />
      <p className="text-lg">{course.description}</p>
    </div>
  );
}
