import { useGetRankingsQuery } from "@/features/api/gamificationApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award, Crown, Gem } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const GamificationRankings = () => {
    const { data, isLoading, error } = useGetRankingsQuery();
    const { user } = useSelector((state) => state.auth);

    if (isLoading) return <div>Loading rankings...</div>;
    if (error) return <div>Error loading rankings</div>;

    const getLevelIcon = (level) => {
        switch (level) {
            case "diamond":
                return <Gem className="w-7 h-7 text-blue-500" />;
            case "gold":
                return <Trophy className="w-7 h-7 text-yellow-500" />;
            case "silver":
                return <Medal className="w-7 h-7 text-gray-500" />;
            case "bronze":
                return <Award className="w-7 h-7 text-orange-500" />;
            default:
                return null;
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case "diamond":
                return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
            case "gold":
                return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
            case "silver":
                return "border-gray-400 bg-gray-50 dark:bg-gray-700/20";
            case "bronze":
                return "border-orange-500 bg-orange-50 dark:bg-orange-900/20";
            default:
                return "";
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const getSpecialIcon = (rankInLevel) => {
        switch (rankInLevel) {
            case 1:
                return <Crown className="w-6 h-6 text-blue-500" />;
            case 2:
                return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 3:
                return <Award className="w-6 h-6 text-orange-500" />;
            default:
                return null;
        }
    };

    const getLevelTitleClass = (level) => {
        switch (level) {
            case "diamond":
                return "text-blue-700";
            case "gold":
                return "text-yellow-600";
            case "silver":
                return "text-gray-500";
            case "bronze":
                return "text-orange-600";
            default:
                return "text-gray-400";
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Student Rankings</h1>
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {(data?.data
                    ?.slice() // make a shallow copy
                    ?.sort((a, b) => {
                        const order = { diamond: 0, gold: 1, silver: 2, bronze: 3 };
                        return order[a.level] - order[b.level];
                    })
                ).map((level) => (
                    <Card
                        key={level.level}
                        className={`border-2 ${getLevelColor(level.level)}`}
                    >
                        <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
                            <div className="flex flex-row items-center justify-center gap-3 w-full">
                                {getLevelIcon(level.level)}
                                <CardTitle className={`text-3xl font-extrabold text-center drop-shadow-sm tracking-wide mb-1 ${getLevelTitleClass(level.level)}`}>
                                    {level.level.charAt(0).toUpperCase() + level.level.slice(1)} Level
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {level.students
                                    .filter(student => student.totalScore !== 0)
                                    .map((student, idx) => {
                                        const rankInLevel = idx + 1;
                                        return (
                                            <div
                                                key={student.studentId._id}
                                                className={`flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${user && user._id === student.studentId._id ? 'border-2 border-green-300' : ''}`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage
                                                                src={student.studentId.photoUrl || "https://github.com/shadcn.png"}
                                                                alt={student.studentId.name}
                                                            />
                                                            <AvatarFallback>
                                                                {getInitials(student.studentId.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-white border border-white">
                                                            {student.rank}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {student.studentId.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Score: {student.totalScore}
                                                        </p>
                                                    </div>
                                                </div>
                                                {getSpecialIcon(rankInLevel) && (
                                                    <div className="flex items-center justify-end ml-4">{getSpecialIcon(rankInLevel)}</div>
                                                )}
                                            </div>
                                        );
                                    })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {/* New table for students with score 0 */}
                {data?.data && (() => {
                    // Gather all students with score 0 from all levels
                    const zeroScoreStudents = data.data
                        .flatMap(level => level.students.map(student => ({
                            ...student,
                            level: level.level
                        })))
                        .filter(student => student.totalScore === 0);
                    if (zeroScoreStudents.length === 0) return null;
                    return (
                        <Card className="border-2 border-gray-400 bg-gray-50 dark:bg-gray-800/20">
                            <CardHeader className="flex flex-col items-center justify-center space-y-0 pb-2">
                                <CardTitle className="text-3xl font-extrabold text-center drop-shadow-sm tracking-wide mb-1 text-gray-400">
                                    Unranked Level
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {zeroScoreStudents.map((student, idx) => (
                                        <div
                                            key={student.studentId._id}
                                            className={`flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${user && user._id === student.studentId._id ? 'border-2 border-green-300' : ''}`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage
                                                            src={student.studentId.photoUrl || "https://github.com/shadcn.png"}
                                                            alt={student.studentId.name}
                                                        />
                                                        <AvatarFallback>
                                                            {getInitials(student.studentId.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-white border border-white">
                                                        {student.rank}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {student.studentId.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Score: {student.totalScore}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })()}
            </div>
        </div>
    );
};

export default GamificationRankings;