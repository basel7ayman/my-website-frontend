import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <>
      <div className="relative bg-[hsl(231,53%,55%)] dark:bg-[hsl(231,33%,45%)] py-24 px-4 text-center">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(231,53%,55%)] via-blue-700/80 to-[hsl(231,33%,45%)] opacity-90 pointer-events-none z-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-white text-5xl font-bold mb-4">
            Welcome to Course HUB
          </h1>
          <p className="text-gray-200 dark:text-gray-300 text-xl mb-8">
            Discover, Learn, and Upskill with our wide range of courses
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 dark:bg-white/5 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-white">Interactive Learning</h3>
              <p className="text-gray-200 dark:text-gray-300">Engage with interactive content and hands-on projects</p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-white">Expert Instructors</h3>
              <p className="text-gray-200 dark:text-gray-300">Learn from industry professionals and experienced educators</p>
            </div>
            <div className="bg-white/10 dark:bg-white/5 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-white">Gamified Experience</h3>
              <p className="text-gray-200 dark:text-gray-300">Earn points, badges, and rewards as you progress</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button
              onClick={() => navigate('/CourseRecommendationForm')}
              className="bg-[hsl(231,53%,45%)] dark:bg-[hsl(231,33%,55%)] text-white rounded-full hover:bg-[hsl(231,53%,40%)] dark:hover:bg-[hsl(231,33%,50%)] px-8 py-3"
            >
              Take Course Recommendation Test
            </Button>
            <Button
              onClick={() => navigate('/gamification')}
              className="bg-white dark:bg-gray-800 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3"
            >
              Gamification
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar Below Hero Section */}
      <div className="flex justify-center bg-white dark:bg-gray-900 py-8 shadow-md">
        <form
          onSubmit={searchHandler}
          className="flex items-center w-full max-w-2xl mx-auto bg-white/80 dark:bg-[#181c27] rounded-full shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-400 rounded-l-full"
          />
          <Button
            type="submit"
            className="h-full bg-[hsl(231,53%,55%)] text-white px-8 py-4 rounded-r-full font-bold transition-colors duration-200 hover:bg-[hsl(231,53%,45%)]"
            style={{ minHeight: "3.5rem" }}
          >
            Search
          </Button>
        </form>
      </div>
    </>
  );
};

export default HeroSection;
