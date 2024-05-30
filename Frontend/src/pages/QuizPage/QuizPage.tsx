import React, { useState, useEffect } from "react";
import QuizResult from "../../components/QuizResult";
import { Card } from "react-bootstrap";
import { CodeSmellData } from "../../types/types";
import { fetchQuizData } from "./utils";
import TextSelector from "../../components/TextSelector";

interface QuizPageProps {
    selectedQuizConfigId: string;
    quizId: string;
}

const QuizPage = ({ selectedQuizConfigId, quizId }: QuizPageProps) => {
    const [quiz, setQuiz] = useState<string | undefined>(undefined);
    const [codeSmellData, setCodeSmellData] = useState<CodeSmellData | undefined>(undefined);

    fetchQuizData(selectedQuizConfigId, quizId).then(({ quiz: fetchedQuiz, codeSmellData: fetchedCodeSmellData }) => {
        setQuiz(fetchedQuiz);
        setCodeSmellData(fetchedCodeSmellData);
    });

    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [mistakes, setMistakes] = useState<string[]>([]);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!submitted) {
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [submitted]);

    const handleQuizSubmit = () => {
        const calculatedScore = 8;
        const quizMistakes = ["Mistake 1", "Mistake 2", "Mistake 3"];

        setScore(calculatedScore);
        setMistakes(quizMistakes);
        setSubmitted(true);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="d-flex">
            {quiz !== undefined && codeSmellData !== undefined} ? (
            <>
                <div style={{ flex: 6, padding: "1rem" }}>
                    <TextSelector quiz={quiz} smellData={codeSmellData} />
                    {!submitted && <button onClick={handleQuizSubmit}>Submit</button>}
                </div>
                <div style={{ flex: 1, padding: "1rem" }}>
                    <Card border="dark" bg="light" className="mb-3" style={{ width: "16rem" }}>
                        <Card.Body>
                            <Card.Title>Time: {formatTime(elapsedTime)}</Card.Title>
                        </Card.Body>
                    </Card>
                    {submitted && <QuizResult score={score} mistakes={mistakes} />}
                </div>
            </>
            )
        </div>
    );
};

export default QuizPage;
