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
    <div className="relative bg-[hsl(231,53%,55%)] dark:bg-[hsl(231,33%,45%)] py-24 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-5xl font-bold mb-4">
          Welcome to Course HUB
        </h1>
        <p className="text-gray-200 dark:text-gray-300 text-xl mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-8"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-[hsl(231,53%,55%)] dark:bg-[hsl(231,33%,45%)] text-white px-6 py-3 rounded-r-full hover:bg-[hsl(231,53%,45%)] dark:hover:bg-[hsl(231,33%,55%)]"
          >
            Search
          </Button>
        </form>

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
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white dark:bg-gray-800 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3"
          >
            Explore All Courses
          </Button>
          <Button
            onClick={() => navigate('/CourseRecommendationForm')}
            className="bg-[hsl(231,53%,45%)] dark:bg-[hsl(231,33%,55%)] text-white rounded-full hover:bg-[hsl(231,53%,40%)] dark:hover:bg-[hsl(231,33%,50%)] px-8 py-3"
          >
            Take Course Recommendation Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
