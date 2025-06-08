"use client";
import * as React from "react";
import { useState } from "react";
import {
  BookOpenIcon,
  AcademicCapIcon,
  BeakerIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";


interface Blog {
  title: string;
  imageSrc: string;
  summary: string;
  category: "neet" | "mhtcet" | "jeemain" | "jeeadvanced";
}

const blogs: Blog[] = [
  {
    title: "AIIMS DELHI",
    imageSrc: "/assets/Colleges/neet1.webp",
    summary:
      "Explore the best AIIMS colleges based on NEET scores, infrastructure, and academic excellence.",
    category: "neet",
  },
  {
    title: "CMC VELLORE",
    imageSrc: "/assets/Colleges/neet2.AVIF",
    summary: "Smart strategies and time management tips to ace NEET 2025 with confidence.",
    category: "neet",
  },
  {
    title: "AFMC PUNE",
    imageSrc: "/assets/Colleges/neet3.webp",
    summary: "Smart strategies and time management tips to ace NEET 2025 with confidence.",
    category: "neet",
  },
  {
    title: "AIIMS NAGPUR",
    imageSrc: "/assets/Colleges/neet4.webp",
    summary: "Smart strategies and time management tips to ace NEET 2025 with confidence.",
    category: "neet",
  },
  {
    title: "COEP PUNE",
    imageSrc: "/assets/Colleges/mhtcet1.webp",
    summary: "Detailed analysis of MHT-CET cutoffs and top engineering colleges in Maharashtra.",
    category: "mhtcet",
  },
  {
    title: "VJTI MUMBAI",
    imageSrc: "/assets/Colleges/mhtcet2.jpg",
    summary: "List of top colleges you can target through MHT-CET for engineering and pharmacy.",
    category: "mhtcet",
  },
  {
    title: "ICT MUMBAI",
    imageSrc: "/assets/Colleges/mhtcet3.webp",
    summary: "List of top colleges you can target through MHT-CET for engineering and pharmacy.",
    category: "mhtcet",
  },
  {
    title: "PICT PUNE",
    imageSrc: "/assets/Colleges/mhtcet4.jpg",
    summary: "List of top colleges you can target through MHT-CET for engineering and pharmacy.",
    category: "mhtcet",
  },
  {
    title: "NIT TRICHY",
    imageSrc: "/assets/Colleges/main1.jpg",
    summary: "Key differences between JEE Main and Advanced and how to prepare for both.",
    category: "jeemain",
  },
  {
    title: "NIT WARANGAL",
    imageSrc: "/assets/Colleges/main2.webp",
    summary: "Know which NITs and IIITs are best for different engineering branches.",
    category: "jeemain",
  },
  {
    title: "NIT SURATHKAL",
    imageSrc: "/assets/Colleges/main3.jpg",
    summary: "What rank gets which IIT and branch? Complete breakdown from last year.",
    category: "jeemain",
  },
  {
    title: "NIT ALLAHABAD",
    imageSrc: "/assets/Colleges/main4.webp",
    summary: "What rank gets which IIT and branch? Complete breakdown from last year.",
    category: "jeemain",
  },
  {
    title: "IIT DELHI",
    imageSrc: "/assets/Colleges/advanced1.jpeg",
    summary: "In-depth guide to cracking one of India’s toughest engineering entrance exams.",
    category: "jeeadvanced",
  },
  {
    title: "IIT MADRAS",
    imageSrc: "/assets/Colleges/advanced2.webp",
    summary: "In-depth guide to cracking one of India’s toughest engineering entrance exams.",
    category: "jeeadvanced",
  },
  {
    title: "IIT MUMBAI",
    imageSrc: "/assets/Colleges/advanced3.AVIF",
    summary: "In-depth guide to cracking one of India’s toughest engineering entrance exams.",
    category: "jeeadvanced",
  },
  {
    title: "IIT KHARAGPUR",
    imageSrc: "/assets/Colleges/advanced4.AVIF",
    summary: "In-depth guide to cracking one of India’s toughest engineering entrance exams.",
    category: "jeeadvanced",
  },
];

const CollegeBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "neet" | "mhtcet" | "jeemain" | "jeeadvanced"
  >("neet");
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  const filteredBlogs = showAllBlogs
    ? blogs
    : blogs.filter((blog) => blog.category === selectedCategory);

  const handleExploreAll = () => {
    setShowAllBlogs(true);
  };

  const handleCategoryClick = (
    category: "neet" | "mhtcet" | "jeemain" | "jeeadvanced"
  ) => {
    setSelectedCategory(category);
    setShowAllBlogs(false);
  };

  return (
    <div
      id="colleges-section"
      className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8"
    >
       <div className='sm:flex justify-between items-center pb-12'>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Popular Colleges</h2>
                    <div>
                        <button onClick={handleExploreAll} className="bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-purple hover:border-transparent rounded">
                            Explore Clolleges
                        </button>
                    </div>
                </div>

      {/* CATEGORY TABS */}
      <div className="flex space-x-5 overflow-x-auto rounded-xl bg-white p-2">
        {/* Desktop tabs */}
        <button
          onClick={() => handleCategoryClick("neet")}
          className={`${
            selectedCategory === "neet" && !showAllBlogs
              ? "text-black border-b-2 border-orange"
              : "text-lightgrey"
          } hidden sm:block pb-2 text-lg`}
        >
          NEET
        </button>
        <button
          onClick={() => handleCategoryClick("mhtcet")}
          className={`${
            selectedCategory === "mhtcet" && !showAllBlogs
              ? "text-black border-b-2 border-orange"
              : "text-lightgrey"
          } hidden sm:block pb-2 text-lg`}
        >
          MHT-CET
        </button>
        <button
          onClick={() => handleCategoryClick("jeemain")}
          className={`${
            selectedCategory === "jeemain" && !showAllBlogs
              ? "text-black border-b-2 border-orange"
              : "text-lightgrey"
          } hidden sm:block pb-2 text-lg`}
        >
          JEE Main
        </button>
        <button
          onClick={() => handleCategoryClick("jeeadvanced")}
          className={`${
            selectedCategory === "jeeadvanced" && !showAllBlogs
              ? "text-black border-b-2 border-orange"
              : "text-lightgrey"
          } hidden sm:block pb-2 text-lg`}
        >
          JEE Advanced
        </button>

        {/* Mobile icons */}
       {/* Mobile logos */}
<img
  src="/assets/Colleges/neet.jpg" // your NEET logo path
  alt="NEET"
  onClick={() => handleCategoryClick("neet")}
  className={`${
    selectedCategory === "neet" && !showAllBlogs
      ? "border-b-2 border-orange"
      : ""
  } block sm:hidden h-10 w-10 object-contain cursor-pointer`}
/>

<img
  src="/assets/Colleges/mhtcet.jpg" // your MHT-CET logo path
  alt="MHT-CET"
  onClick={() => handleCategoryClick("mhtcet")}
  className={`${
    selectedCategory === "mhtcet" && !showAllBlogs
      ? "border-b-2 border-orange"
      : ""
  } block sm:hidden h-10 w-10 object-contain cursor-pointer`}
/>

<img
  src="/assets/Colleges/jeemain.jpg" // your JEE Main logo path
  alt="JEE Main"
  onClick={() => handleCategoryClick("jeemain")}
  className={`${
    selectedCategory === "jeemain" && !showAllBlogs
      ? "border-b-2 border-orange"
      : ""
  } block sm:hidden h-10 w-10 object-contain cursor-pointer`}
/>

<img
  src="/assets/Colleges/jeeadvanced.png"// your JEE Advanced logo path
  alt="JEE Advanced"
  onClick={() => handleCategoryClick("jeeadvanced")}
  className={`${
    selectedCategory === "jeeadvanced" && !showAllBlogs
      ? "border-b-2 border-orange"
      : ""
  } block sm:hidden h-10 w-10 object-contain cursor-pointer`}
/>

      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, idx) => (
            <div
            key={idx}
            className="rounded-xl shadow-lg overflow-hidden bg-white transition-transform duration-300 hover:scale-105 flex flex-col"
          >
            <div className="h-48 w-full">
              <img
                src={blog.imageSrc}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">{blog.summary}</p>
              <button className="mt-auto self-start text-sm text-purple-600 hover:underline">
                Read more →
              </button>
            </div>
          </div>
          
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No blogs available
          </p>
        )}
      </div>
    </div>
  );
};

export default CollegeBlogs;
