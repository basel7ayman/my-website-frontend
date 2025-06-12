import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
  const navigate = useNavigate();
 
  if(isError) return <ErrorPage />;
  if(isLoading) return <LoadingSpinner />;

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
                    src={
                      course.courseTitle.toLowerCase().includes('python')
                        ? 'data:image/jpeg;base64,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'
                        : course.courseTitle.toLowerCase().includes('docker')
                        ? 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png'
                        : course.courseThumbnail
                    }
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
