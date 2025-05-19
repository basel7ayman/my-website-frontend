import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import {
  useGetQuizByLectureQuery,
  useSubmitQuizMutation,
  useGetStudentQuizResultsQuery,
  useGetQuizzesByCourseQuery,
} from "@/features/api/quizApi";
import { CheckCircle, CheckCircle2, CirclePlay, FileQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { user } = useSelector((state) => state.auth);
  console.log("Current User:", user);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  console.log("Course Progress Data:", data);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Get all quizzes for the course
  const { data: quizzesData } = useGetQuizzesByCourseQuery(courseId);
  console.log("Quizzes Data:", quizzesData);
  const quizzes = quizzesData?.quizzes || [];

  const { data: quizData, isLoading: quizLoading, error: quizError } = useGetQuizByLectureQuery(
    currentLecture?._id,
    { skip: !currentLecture?._id }
  );
  console.log("Current Quiz Data:", quizData);
  console.log("Quiz Error:", quizError);

  const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();

  const { data: quizResults, refetch: refetchQuizResults } = useGetStudentQuizResultsQuery(
    { quizId: quizData?.quiz?._id, studentId: user?._id },
    { skip: !quizData?.quiz?._id || !user?._id }
  );

  // Check if student has already submitted this quiz
  const hasSubmittedQuiz = quizResults?.success && quizResults?.response;

  // Debug: log quizResults to check score
  console.log('quizResults:', quizResults);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData?.message, markInCompleteData?.message, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;
  if (!data?.data) return <p>No course data available</p>;

  const { courseDetails, progress, completed } = data.data;
  console.log("Course Details:", courseDetails);
  console.log("Progress:", progress);
  console.log("Completed:", completed);

  if (!courseDetails?.lectures?.length) {
    return <p>No lectures available for this course</p>;
  }

  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);
  console.log("Initial Lecture:", initialLecture);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      if (!user?._id) {
        toast.error("Please log in to submit the quiz");
        return;
      }

      const answers = Object.entries(selectedAnswers).map(([questionIndex, selectedAnswer]) => ({
        questionIndex: parseInt(questionIndex),
        selectedAnswer,
      }));

      const result = await submitQuiz({
        quizId: quizData.quiz._id,
        data: {
          studentId: user._id,
          answers,
        },
      }).unwrap();

      if (result.success) {
        await refetchQuizResults();
        setQuizSubmitted(true);
        toast.success("Quiz submitted successfully!");
        
        // Add a delay before refreshing to ensure the user sees the results
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(result.message || "Failed to submit quiz");
      }
    } catch (error) {
      console.error("Quiz submission error:", error);
      toast.error(error.data?.message || "Failed to submit quiz");
    }
  };

  const hasQuiz = (lectureId) => {
    return quizzes.some(quiz => quiz.lectureId === lectureId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">
                {`Lecture ${
                  courseDetails.lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id)
                  ) + 1
                } : ${
                  currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
              </h3>
              {quizData?.success && quizData?.quiz && (
                <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <FileQuestion className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Lecture Quiz</DialogTitle>
                    </DialogHeader>
                    {quizLoading ? (
                      <p>Loading quiz...</p>
                    ) : quizSubmitted || hasSubmittedQuiz ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quiz Results</h3>
                        <div className="space-y-2">
                          <p>Your score: {quizResults?.response?.score} out of {quizData.quiz.questions.length}</p>
                          <p className="font-medium text-blue-600">
                            Percentage: {Math.round((quizResults?.response?.score / quizData.quiz.questions.length) * 100)}%
                          </p>
                        </div>
                        {hasSubmittedQuiz && (
                          <p className="text-sm text-gray-500">You have already submitted this quiz.</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {quizData.quiz.questions.map((question, qIndex) => (
                          <div key={qIndex} className="space-y-4">
                            <h4 className="font-medium">Question {qIndex + 1}: {question.question}</h4>
                            <RadioGroup
                              value={selectedAnswers[qIndex]}
                              onValueChange={(value) => handleAnswerSelect(qIndex, value)}
                            >
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center space-x-2">
                                  <RadioGroupItem value={option} id={`q${qIndex}-o${oIndex}`} />
                                  <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        ))}
                        <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2">
                          <Button
                            onClick={handleSubmitQuiz}
                            disabled={isSubmitting || Object.keys(selectedAnswers).length !== quizData.quiz.questions.length}
                            className="w-full"
                          >
                            {isSubmitting ? "Submitting..." : "Submit Quiz"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasQuiz(lecture._id) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentLecture(lecture);
                          setShowQuizDialog(true);
                        }}
                      >
                        <FileQuestion className="h-4 w-4 text-blue-500" />
                      </Button>
                    )}
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className="bg-green-200 text-green-600"
                      >
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
