import React, { useEffect, useState } from "react";
import { PageType } from "../types/types";
import { Settings } from "../config/settings";
import CodeSmellList from "../components/CodeSmellList";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizTypeSelectionPage from "./QuizTypeSelectionPage/QuizSelectionPage";
import QuizFileSelectionPage from "./QuizFileSelectionPage/QuizFileSelectionPage";

const MainPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<PageType>(PageType.QUIZ_TYPE_SELECTION);
    const [selectedQuizId, setSelectedQuizId] = useState<string | undefined>(undefined);

    switch (currentPage) {
        case PageType.QUIZ_TYPE_SELECTION: {
            // TODO: fetch these
            const dummyQuizzes = [
                { id: "1", name: "Quiz 1" },
                { id: "2", name: "Quiz 2" },
                { id: "3", name: "Quiz 3" },
            ];

            const playerName = "Marek";

            return (
                <>
                    <QuizTypeSelectionPage
                        quizzes={dummyQuizzes}
                        playerName={playerName}
                        onQuizChosen={(quizId: string) => {
                            setSelectedQuizId(quizId);
                            setCurrentPage(PageType.QUIZ_FILE_SELECTION);
                        }}
                    ></QuizTypeSelectionPage>
                </>
            );
        }

        case PageType.QUIZ_FILE_SELECTION: {
            if (!selectedQuizId) throw Error("Quiz was not chosen!");
            // TODO
            return (
                <>
                    <QuizFileSelectionPage></QuizFileSelectionPage>
                </>
            );
        }

        case PageType.QUIZ: {
            // TODO: move it to its own component
            const QUIZ_ENDPOINT = Settings.SERVER_URL + "/quiz";
            const [quiz, setQuiz] = useState<string>(null);
            useEffect(() => {
                fetch(QUIZ_ENDPOINT, {
                    method: "GET",
                })
                    .then((rs) => rs.text())
                    .then((text) => setQuiz(text));
            }, []);

            return (
                <>
                    <div className="mainContainer">
                        <p>{quiz}</p>
                    </div>
                    <CodeSmellList></CodeSmellList>
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
