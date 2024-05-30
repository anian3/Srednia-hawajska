import React, { useState, useEffect } from "react";
import CodeSmellList from "../../components/CodeSmellList";
import QuizResult from "../../components/QuizResult";
import { Card } from "react-bootstrap";

interface QuizPageProps {
    selectedQuiz: string;
}

const QuizPage = ({ selectedQuiz }: QuizPageProps) => {
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

    const items = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
    ];

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
            <div style={{ flex: 6, padding: "1rem" }}>
                <div>QuizPage</div>
                <div>{selectedQuiz}</div>
                <CodeSmellList items={items} />
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
        </div>
    );
};

export default QuizPage;
