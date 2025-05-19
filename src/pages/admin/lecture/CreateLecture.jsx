import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { useCreateQuizMutation } from "@/features/api/quizApi";
import { Loader2, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "options") {
      newQuestions[index].options = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const createQuizHandler = async () => {
    try {
      await createQuiz({
        lectureId: currentLectureId,
        courseId,
        questions
      }).unwrap();
      toast.success("Quiz created successfully");
      setShowQuizDialog(false);
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    } catch (error) {
      toast.error(error.data?.message || "Failed to create quiz");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <div key={lecture._id} className="flex items-center gap-4 mb-4">
                <Lecture
                  lecture={lecture}
                  courseId={courseId}
                  index={index}
                />
                <Dialog open={showQuizDialog && currentLectureId === lecture._id} onOpenChange={setShowQuizDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentLectureId(lecture._id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Quiz for Lecture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {questions.map((q, qIndex) => (
                        <div key={qIndex} className="space-y-2">
                          <Label>Question {qIndex + 1}</Label>
                          <Textarea
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                            placeholder="Enter your question"
                          />
                          <div className="space-y-2">
                            {q.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-2">
                                <Input
                                  value={option}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                  placeholder={`Option ${oIndex + 1}`}
                                />
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={q.correctAnswer === option}
                                  onChange={() => handleQuestionChange(qIndex, "correctAnswer", option)}
                                />
                                <Label>Correct Answer</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 space-x-2">
                        <Button onClick={addQuestion}>Add Question</Button>
                        <Button onClick={createQuizHandler} disabled={isCreatingQuiz}>
                          {isCreatingQuiz ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Quiz...
                            </>
                          ) : (
                            "Create Quiz"
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
