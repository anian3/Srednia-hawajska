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

    //for active quiz
    const [smells, setSmells] = useState(undefined);
    const [code, setCode] = useState<string | undefined>(undefined);

    const dummyQuizzes = [
        {
            id: "ExampleQuizzes",
            quizzes: [
                {
                    id: "cpp/file1cpp",
                    name: "C++ quiz 1",
                },
            ],
        },
    ];

    const fetchQuizfile = (quiz: string, path: string) => {
        const smellsURL = `http://localhost:8080/apiv1/quizfile?quiz=${encodeURIComponent(quiz)}&path=${encodeURIComponent(path + ".json")}`;
        const codeURL = `http://localhost:8080/apiv1/codefile?quiz=${encodeURIComponent(quiz)}&path=${encodeURIComponent(path + ".txt")}`;
        fetch(smellsURL)
            .then((rs) => rs.json())
            .then((json) => setSmells(json));
        fetch(codeURL)
            .then((rs) => rs.text())
            .then((txt) => setCode(txt));
    };

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
                            fetchQuizfile(selectedQuizConfig.id, quizId);
                            setSelectedQuizId(quizId);
                            setCurrentPage(PageType.QUIZ);
                        }}
                    ></QuizSelectionPage>
                </>
            );
        }

        case PageType.QUIZ: {
            return (
                <>
                    <QuizPage selectedQuiz={code}></QuizPage>
                </>
            );
        }

        case PageType.RESULTS: {
            // TODO
            return <></>;
        }
    }
};

export default MainPage;
