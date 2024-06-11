import React, { useState } from "react";
import { PageType } from "../types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizTypeSelectionPage from "./QuizTypeSelectionPage/QuizTypeSelectionPage";
import QuizSelectionPage from "./QuizSelectionPage/QuizSelectionPage";
import QuizPage from "./QuizPage/QuizPage";

const MainPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<PageType>(PageType.QUIZ_TYPE_SELECTION);
    const [selectedQuizTypeId, setSelectedQuizTypeId] = useState<string | undefined>(undefined);
    const [selectedQuizId, setSelectedQuizId] = useState<string | undefined>(undefined);

    const dummyQuizzes = [
        {
            id: "ExampleQuizzes",
            quizzes: [
                {
                    id: "cpp/file1cpp",
                    name: "C++ quiz 1",
                },
                {
                    id: "cpp/file2cpp",
                    name: "C++ quiz 2",
                },
                {
                    id: "python/file1",
                    name: "Python quiz 1",
                },
                {
                    id: "python/file2",
                    name: "Python quiz 2",
                },
            ],
        },
    ];

    const playerName = "Marek";

    switch (currentPage) {
        case PageType.QUIZ_TYPE_SELECTION: {
            return (
                <>
                    <QuizTypeSelectionPage
                        quizTypes={dummyQuizzes}
                        playerName={playerName}
                        onQuizChosen={(quizTypeId: string) => {
                            setSelectedQuizTypeId(quizTypeId);
                            setCurrentPage(PageType.QUIZ_SELECTION);
                        }}
                    ></QuizTypeSelectionPage>
                </>
            );
        }

        case PageType.QUIZ_SELECTION: {
            const selectedQuizConfig = dummyQuizzes.find((quizConfig) => quizConfig.id === selectedQuizTypeId);
            if (!selectedQuizConfig) throw Error("Quiz was not chosen!");
            return (
                <>
                    <QuizSelectionPage
                        selectedQuizType={selectedQuizConfig.id}
                        quizzes={selectedQuizConfig.quizzes}
                        playerName={playerName}
                        onQuizChosen={(quizId: string) => {
                            setSelectedQuizId(quizId);
                            setCurrentPage(PageType.QUIZ);
                        }}
                    ></QuizSelectionPage>
                </>
            );
        }

        case PageType.QUIZ: {
            const selectedQuizConfig = dummyQuizzes.find((quizConfig) => quizConfig.id === selectedQuizTypeId);
            if (!selectedQuizConfig) throw Error("Quiz was not chosen!");
            return (
                <QuizPage
                    selectedQuizConfigId={selectedQuizConfig.id}
                    quizId={selectedQuizId}
                    onBack={() => setCurrentPage(PageType.QUIZ_SELECTION)} // Pass the onBack function here
                />
            );
        }

        case PageType.RESULTS: {
            // TODO
            return <></>;
        }
    }
};

export default MainPage;
