import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom";
import { toast } from "sonner";

const PurchaseCourseProtectedRoute = ({children}) => {
    const {courseId} = useParams();
    const {data, isLoading} = useGetCourseDetailWithStatusQuery(courseId);

    if(isLoading) return <p>Loading...</p>

    if (!data?.purchased) {
        toast.error("Please enroll in the course first");
        return <Navigate to={`/course-detail/${courseId}`}/>;
    }

    return children;
}

export default PurchaseCourseProtectedRoute;