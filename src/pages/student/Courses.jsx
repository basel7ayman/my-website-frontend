import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
  const navigate = useNavigate();
 
  if(isError) return <h1>Some error occurred while fetching courses.</h1>

  // Get one course from each category
  const getFeaturedCourses = (courses) => {
    if (!courses) return [];
    
    const categories = new Set();
    const featuredCourses = [];
    
    // First, sort courses by enrollment count
    const sortedCourses = [...courses].sort((a, b) => 
      (b.enrolledStudents?.length || 0) - (a.enrolledStudents?.length || 0)
    );
    
    // Then, get one course from each category until we have 6 courses
    for (const course of sortedCourses) {
      if (!categories.has(course.category) && featuredCourses.length < 6) {
        categories.add(course.category);
        featuredCourses.push(course);
      }
    }
    
    return featuredCourses;
  };

  const featuredCourses = getFeaturedCourses(data?.courses);

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="container mx-auto px-4 py-1">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-center py-2 text-[hsl(231,53%,55%)]">Featured Courses</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Explore our most popular courses from different categories</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            featuredCourses.map((course, index) => (
              <div key={course._id || index}>
                <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden dark:bg-gray-800 flex flex-col h-full">
                  {/* Category Badge inside card */}
                  <div className="px-5 pt-4">
                    <span className="inline-block bg-[hsl(231,53%,55%)] text-white text-s font-semibold px-4 py-1 rounded-full shadow-md border border-white dark:border-gray-800 mb-2">
                      {course.category}
                    </span>
                  </div>
                  {/* Course Thumbnail */}
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="px-5 pb-4 flex-1 flex flex-col justify-between">
                    <div className="py-3">
                      <h3 className="font-bold text-lg truncate">{course.courseTitle}</h3>
                    </div>
                    <Button
                      onClick={() => navigate(`/course-detail/${course._id}`)}
                      className="bg-[hsl(231,53%,55%)] text-white w-full mt-2"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* View All Courses Button */}
        <div className="flex justify-center mt-16">
          <Button
            onClick={() => navigate('/course/search?query=')}
            className="bg-[hsl(231,53%,55%)] text-white px-8 py-3 mb-4 rounded-full hover:bg-[hsl(231,53%,45%)]"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
