import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
   
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={
            course.courseTitle.toLowerCase().includes('python')
              ? 'data:image/jpeg;base64,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'
              : course.courseTitle.toLowerCase().includes('docker')
              ? 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png'
              : course.courseThumbnail
          }
          alt="course-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Intructor: <span className="font-bold">{course.creator?.name}</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">${course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
