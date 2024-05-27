import React from "react";
import ScoreCard from "./ScoreCard";
import MistakesList from "./MistakesList";
import "bootstrap/dist/css/bootstrap.min.css";

interface QuizResultProps {
    score: number;
    mistakes: string[];
}

const QuizResult: React.FC<QuizResultProps> = ({ score, mistakes }) => {
    return (
        <div style={{ width: "16rem", margin: "auto"}}>
            <ScoreCard score={score} />
            {mistakes.length > 0 && <MistakesList mistakes={mistakes} />}
        </div>
    );
};

export default QuizResult;
