import React, { useState } from "react";
import { PageType } from "../types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizTypeSelectionPage from "./QuizTypeSelectionPage/QuizTypeSelectionPage";
import QuizSelectionPage from "./QuizSelectionPage/QuizSelectionPage";
import QuizPage from "./QuizPage/QuizPage";
import TextSelectionComponent from "../components/TextSelectionComponent";

const MainPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<PageType>(PageType.QUIZ_TYPE_SELECTION);
    const [selectedQuizTypeId, setSelectedQuizTypeId] = useState<string | undefined>(undefined);
    const [selectedQuizId, setSelectedQuizId] = useState<string | undefined>(undefined);

    // TODO: fetch these
    const dummyQuizzes = [
        {
            id: "1",
            name: "Type 1",
            quizzes: [
                { id: "T1 Q1", name: "T1 Quiz 1" },
                { id: "T1 Q2", name: "T1 Quiz 2" },
                { id: "T1 Q3", name: "T1 Quiz 3" },
            ],
        },
        {
            id: "2",
            name: "Type 2",
            quizzes: [
                { id: "T2 Q1", name: "T2 Quiz 1" },
                { id: "T2 Q2", name: "T2 Quiz 2" },
                { id: "T2 Q3", name: "T2 Quiz 3" },
            ],
        },
        {
            id: "3",
            name: "Type 3",
            quizzes: [
                { id: "T3 Q1", name: "T3 uiz 1" },
                { id: "T3 Q2", name: "T3 uiz 2" },
                { id: "T3 Q3", name: "T3 uiz 3" },
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
                        selectedQuizType={selectedQuizConfig.name}
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
            const selectedQuiz = "Selected quiz with" + selectedQuizId;
            return (
                <>
                    <QuizPage selectedQuiz={selectedQuiz}></QuizPage>
                </>
            );
        }

        case PageType.RESULTS: {
            // TODO
            return <></>;
        }

        case PageType.TEXT_SELECTION: {
            const text = 
`            import matplotlib.pyplot as np
            import pandas as plt
            import numpy as pd
            
            #TODO: bake cheesecake
            for i in range(10):
                for j in range(10):
                    for k in range(10):
                        for m in range(10):
                            #pengiuns have knees
                            askliduhf = 8`;

            return <TextSelectionComponent text={text} />;
        }
    }
};

export default MainPage;
