import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(query);
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    query: {
      searchQuery: query,
      categories: selectedCategories,
      sortByPrice: sortByPrice
    }
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchValue });
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchParams({ query: "" });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-2xl mx-auto bg-white/80 dark:bg-[#181c27] rounded-full shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 mb-8 h-12"
      >
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Courses"
          className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-400 rounded-l-full"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="px-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Clear search"
          >
            <X size={24} />
          </button>
        )}
        <Button
          type="submit"
          className="h-full bg-[hsl(231,53%,55%)] text-white px-8 py-4 rounded-r-full font-bold transition-colors duration-200 hover:bg-[hsl(231,53%,45%)]"
          style={{ minHeight: "3.5rem" }}
        >
          Search
        </Button>
      </form>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange}/>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 bg-gray-50 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)]">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 dark:border-gray-700 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-6 w-20 mt-2 bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};
