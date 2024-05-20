import { CodeSmell, QuizData, CheckQuizResult } from "../types/types";

export function checkQuiz(userInput: CodeSmell[], data: QuizData): CheckQuizResult {
    const actualSmells: CodeSmell[] = data.codesmell;

    const correct: CodeSmell[] = [];
    const missed: CodeSmell[] = [];
    const extra: CodeSmell[] = [];
    const misclassified: CodeSmell[] = [];

    const actualSmellMap = new Map<string, CodeSmell>();
    actualSmells.forEach(smell => {
        const key = `${smell.linebegin},${smell.lineend},${smell.category}`;
        actualSmellMap.set(key, smell);
    });

    const userSmellMap = new Map<string, CodeSmell>();
    userInput.forEach(input => {
        const key = `${input.linebegin},${input.lineend},${input.category}`;
        userSmellMap.set(key, input);
    });

    actualSmellMap.forEach((actualSmell, key) => {
        if (userSmellMap.has(key)) {
            const userSmell = userSmellMap.get(key);
            if (userSmell && userSmell.category === actualSmell.category) {
                correct.push(actualSmell);
            } else {
                misclassified.push(userSmell!);
            }
        } else {
            missed.push(actualSmell);
        }
    });

    userSmellMap.forEach((userSmell, key) => {
        if (!actualSmellMap.has(key)) {
            extra.push(userSmell);
        }
    });

    return { correct, missed, extra, misclassified };
}

// example quiz data
const data: QuizData = {
    id: "quiz1/plik1.txt",
    type: "file",
    language: "python",
    categories: ["kategoria1", "kategoria2"],
    codesmell: [
        {
            linebegin: 2,
            lineend: 2,
            category: "kategoria1",
        },
        {
            linebegin: 7,
            lineend: 10,
            category: "kategoria2",
        },
        {
            linebegin: 7,
            lineend: 10,
            category: "kategoria3",
        }
    ],
};

// Example user input
const userInput: CodeSmell[] = [
    { linebegin: 2, lineend: 2, category: "kategoria1" },
    { linebegin: 7, lineend: 10, category: "kategoria2" },
];

console.log(checkQuiz(userInput, data));
