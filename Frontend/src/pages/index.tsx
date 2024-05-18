import React, { useEffect, useState } from "react";
import { PageType } from "../types/types";
import { Settings } from "../config/settings";
import CodeSmellList from "../components/CodeSmellList";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentPage, setCurrentPage] = useState<PageType>(PageType.QUIZ);
    switch (currentPage) {
        case PageType.QUIZ_TYPE_SELECTION: {
            // TODO
            return <></>;
        }

        case PageType.QUIZ_LEVEL_SELECTION: {
            // TODO
            return <></>;
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
