import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Clock, Lock, PlayCircle, Users } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`);
    } else {
      toast.error("Please enroll in the course first");
    }
  }

  // Calculate total duration of all lectures
  const totalDuration = course.lectures.reduce((acc, lecture) => acc + (lecture.duration || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300">{course?.subTitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <p>{course?.enrolledStudents.length} students enrolled</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <p>{hours}h {minutes}m total length</p>
            </div>
            <div className="flex items-center gap-2">
              <BadgeInfo size={16} />
              <p>Last updated {new Date(course?.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="text-[#C0C4FC]">
            Created By{" "}
            <span className="underline italic">
              {course?.creator.name}
            </span>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none break-words overflow-x-auto"
                style={{ wordBreak: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} lectures • {hours}h {minutes}m total length</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-blue-600 dark:text-blue-400">
                      {purchased ? <PlayCircle size={16} /> : <Lock size={16} />}
                    </span>
                    <p className="font-medium">{lecture.lectureTitle}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.floor(lecture.duration / 60)}m {lecture.duration % 60}s
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="dark:bg-gray-800 sticky top-24">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0]?.videoUrl}
                  controls={true}
                  light={course.courseThumbnail}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">${course.coursePrice}</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {course.lectures.length} lectures
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{hours}h {minutes}m total length</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{course.enrolledStudents.length} students enrolled</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button 
                  onClick={handleContinueCourse} 
                  className="w-full bg-[hsl(231,53%,55%)] hover:bg-[hsl(231,53%,45%)] text-white"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
