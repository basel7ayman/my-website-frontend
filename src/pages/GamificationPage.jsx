import GamificationRankings from "./student/GamificationRankings";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetRankingsQuery } from "@/features/api/gamificationApi";
import ErrorPage from "@/pages/ErrorPage";

const GamificationPage = () => {
    const { isLoading, isError } = useGetRankingsQuery();
    if (isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorPage />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <GamificationRankings />
        </div>
    );
};

export default GamificationPage;
