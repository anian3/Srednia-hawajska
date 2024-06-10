import React from "react";
import ScoreCard from "./ScoreCard";
import MistakesList from "./MistakesList";
import "bootstrap/dist/css/bootstrap.min.css";

interface QuizResultProps {
    score: number;
    mistakes: string[];
    maxScore: number;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, mistakes, maxScore}) => {
    return (
        <div style={{ width: "16rem", margin: "auto" }}>
            <ScoreCard score={score} maxScore={maxScore} />
            {mistakes.length > 0 && <MistakesList mistakes={mistakes} />}
        </div>
    );
};

export default QuizResult;
