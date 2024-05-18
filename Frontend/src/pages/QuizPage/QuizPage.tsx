import React from "react";
import CodeSmellList from "../../components/CodeSmellList";

interface QuizPageProps {
    selectedQuiz: string;
}

const QuizPage = ({ selectedQuiz }: QuizPageProps) => {
    return (
        <>
            <div>QuizPage</div>
            <div>{selectedQuiz}</div>
            <CodeSmellList></CodeSmellList>
        </>
    );
};

export default QuizPage;
