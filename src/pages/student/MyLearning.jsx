import React, { useState, useEffect } from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { PlayCircle, CheckCircle2, Clock, BookOpen } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1/progress";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  console.log('User data from useLoadUserQuery:', data);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("in-progress");
  const [progressMap, setProgressMap] = useState({});
  const myLearning = data?.user.enrolledCourses || [];
  console.log('Enrolled courses:', myLearning);

  // Fetch progress for all courses
  useEffect(() => {
    const fetchProgress = async () => {
      const results = {};
      await Promise.all(
        myLearning.map(async (course) => {
          try {
            const res = await fetch(`${API_BASE}/${course._id || course.id || course.courseId}`, { credentials: 'include' });
            const json = await res.json();
            if (json && json.data) {
              results[course._id] = json.data;
            }
          } catch (e) {
            // ignore error for now
          }
        })
      );
      setProgressMap(results);
    };
    if (myLearning.length > 0) fetchProgress();
  }, [myLearning]);

  // Helper to get progress data for a course
  const getProgress = (course) => progressMap[course._id] || {};

  // Filter courses based on real progress
  const inProgressCourses = myLearning.filter(course => {
    const progress = getProgress(course);
    return !progress.completed;
  });
  const completedCourses = myLearning.filter(course => {
    const progress = getProgress(course);
    return progress.completed;
  });

  const CourseCard = ({ course }) => {
    const progress = getProgress(course);
    // Get all valid lecture IDs from course details
    const lectureIds = (progress.courseDetails?.lectures || []).map(l => l._id || l);
    // Only count completed lectures that exist in the course
    const completedLectures = (progress.progress || []).filter(
      lecture => lecture.viewed && lectureIds.includes(lecture.lectureId)
    ).length;
    const totalLectures = lectureIds.length;
    const isCompleted = progress.completed;
    const percent = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;
    return (
      <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-bold line-clamp-2">{course.courseTitle}</h3>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                onClick={() => navigate(`/course-progress/${course._id}`)}
                className="bg-white text-black hover:bg-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                {isCompleted ? "Review Course" : "Continue Learning"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{course.duration || "0"} hours</span>
            </div>
            <CardTitle className="text-xl font-bold line-clamp-2 text-gray-900 dark:text-white">
              {course.courseTitle}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <Badge className="bg-green-500 hover:bg-green-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              ) : (
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  In Progress
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span>{completedLectures} of {totalLectures} lectures completed</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-1">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Progress</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Learning</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-video animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeTab === "in-progress" ? (
            inProgressCourses.length > 0 ? (
              inProgressCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No courses in progress.</p>
                <Button
                  onClick={() => navigate("/")}
                  className="mt-4"
                >
                  Browse Courses
                </Button>
              </div>
            )
          ) : (
            completedCourses.length > 0 ? (
              completedCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No completed courses yet.</p>
                <Button
                  onClick={() => navigate("/")}
                  className="mt-4"
                >
                  Browse Courses
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
