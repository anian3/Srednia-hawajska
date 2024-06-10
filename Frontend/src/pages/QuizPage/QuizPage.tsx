import React, { useState, useEffect } from "react";
import QuizResult from "../../components/QuizResult";
import { Card } from "react-bootstrap";
import { CodeSmell, CodeSmellData } from "../../types/types";
import { fetchQuizData } from "./utils";
import TextSelector from "../../components/TextSelector";
import { FaUndo } from "react-icons/fa";
import { checkQuiz } from "../../helpers/checkQuiz";

interface QuizPageProps {
    selectedQuizConfigId: string;
    quizId: string;
    onBack: () => void;
}

const QuizPage = ({ selectedQuizConfigId, quizId, onBack }: QuizPageProps) => {
    const [quiz, setQuiz] = useState<string | undefined>(undefined);
    const [codeSmellData, setCodeSmellData] = useState<CodeSmellData | undefined>(undefined);
    const [language, setLanguage] = useState<string | undefined>(undefined);
    const [maxScore, setMaxScore] = useState<number>(0);

    useEffect(() => {
        fetchQuizData(selectedQuizConfigId, quizId).then(
            ({ quiz: fetchedQuiz, codeSmellData: fetchedCodeSmellData, language: fetchedLanguage }) => {
                setQuiz(fetchedQuiz);
                setCodeSmellData(fetchedCodeSmellData);
                setLanguage(fetchedLanguage);
                setMaxScore(fetchedCodeSmellData.codeSmells.length);
            }
        );
    }, [selectedQuizConfigId, quizId]);

    const [marked, setMarked] = useState<CodeSmell[]>([]);

    const addSmell = (smell: CodeSmell) => {
        setMarked([smell, ...marked]);
        return;
    };

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
        const { correct, missed, extra, misclassified } = checkQuiz(marked, codeSmellData.codeSmells);

        const missedMapped = missed.map((smell) => `Missed:${smell.linebegin}-${smell.lineend},${smell.category}`);
        const extraMapped = extra.map((smell) => `Extra:${smell.linebegin}-${smell.lineend},${smell.category}`);
        const misclassifiedMapped = misclassified.map(
            (smell) => `Misclassified:${smell.linebegin}-${smell.lineend},${smell.category}`
        );

        setScore(Math.max(0, maxScore - missed.length - extra.length - misclassified.length));
        setMistakes([...extraMapped, ...missedMapped, ...misclassifiedMapped]);
        setSubmitted(true);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return (
        <div className="d-flex">
            {quiz !== undefined && codeSmellData !== undefined && (
                <>
                    <div style={{ flex: 6, padding: "1rem" }}>
                        <TextSelector quiz={quiz} smellData={codeSmellData} language={language} onSelect={addSmell} />
                        {!submitted && <button onClick={handleQuizSubmit}>Submit</button>}
                    </div>
                    <div style={{ flex: 1, padding: "1rem" }}>
                        <Card border="dark" bg="light" className="mb-3" style={{ width: "16rem" }}>
                            <Card.Body>
                                <Card.Title>Time: {formatTime(elapsedTime)}</Card.Title>
                            </Card.Body>
                        </Card>
                        {submitted && <QuizResult score={score} maxScore={maxScore} mistakes={mistakes} />}
                    </div>
                    {submitted && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                top: "10px",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <button
                                onClick={onBack}
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    border: "2px solid #000000",
                                    cursor: "pointer",
                                }}
                            >
                                <FaUndo size={24} color="#000000" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizPage;
