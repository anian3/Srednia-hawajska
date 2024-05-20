import React from "react";
import CodeSmellList from "../../components/CodeSmellList";

interface QuizPageProps {
    selectedQuiz: string;
}

const QuizPage = ({ selectedQuiz }: QuizPageProps) => {
    const items = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
    ];
    return (
        <>
            <div>QuizPage</div>
            <div>{selectedQuiz}</div>
            <CodeSmellList items={items}></CodeSmellList>
        </>
    );
};

export default QuizPage;
