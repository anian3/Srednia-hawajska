import React, {useState} from "react";
import CodeSmellList from "../../components/CodeSmellList";
import QuizResult from "../../components/QuizResult";

interface QuizPageProps {
    selectedQuiz: string;
}

const QuizPage = ({ selectedQuiz }: QuizPageProps) => {
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [mistakes, setMistakes] = useState<string[]>([]);

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


    return (
        <div className="d-flex">
            <div style={{ flex: 1, padding: '1rem' }}>
                <div>QuizPage</div>
                <div>{selectedQuiz}</div>
                <CodeSmellList items={items} />
                {!submitted && <button onClick={handleQuizSubmit}>Submit</button>}
            </div>
            <div style={{ flex: 1, padding: '1rem' }}>
                {submitted && <QuizResult score={score} mistakes={mistakes} />}
            </div>
        </div>
    );
};

export default QuizPage;
