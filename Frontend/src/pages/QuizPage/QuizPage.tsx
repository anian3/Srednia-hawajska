import React from "react";
import CodeSmellList from "../../components/CodeSmellList";
import TextSelectionComponent from "../../components/TextSelectionComponent";

interface QuizPageProps {
    selectedQuiz: string;
}

const QuizPage = ({ selectedQuiz }: QuizPageProps) => {
    const items = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
    ];
    const text = `            import matplotlib.pyplot as np
            import pandas as plt
            import numpy as pd
            
            #TODO: bake cheesecake
            for i in range(10):
                for j in range(10):
                    for k in range(10):
                        for m in range(10):
                            #pengiuns have knees
                            askliduhf = 8`;

    return (
        <>
            <div>QuizPage</div>
            <div>{selectedQuiz}</div>
            <CodeSmellList items={items}></CodeSmellList>
            <TextSelectionComponent text={text} />
        </>
    );
};

export default QuizPage;
