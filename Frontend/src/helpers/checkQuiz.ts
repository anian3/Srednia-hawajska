import { CodeSmell, QuizData } from "../types/types";

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
    ],
};

export function checkQuiz(userInput: CodeSmell[], data: QuizData): { result: boolean; message: string } {
    const actualSmells = data.codesmell;

    // Convert actual smells to a set of strings for comparison
    const actualSmellSet = new Set(
        actualSmells.map((smell) => `${smell.linebegin},${smell.lineend},${smell.category}`)
    );

    // Convert user input to a set of strings for comparison
    const userInputSet = new Set(userInput.map((input) => `${input.linebegin},${input.lineend},${input.category}`));

    if (userInputSet.size === actualSmellSet.size && [...userInputSet].every((smell) => actualSmellSet.has(smell))) {
        return { result: true, message: "All code smells were correctly identified." };
    } else {
        const missingSmells = [...actualSmellSet].filter((smell) => !userInputSet.has(smell));
        const extraSmells = [...userInputSet].filter((smell) => !actualSmellSet.has(smell));
        let message = "Some code smells were not identified correctly.\n";
        if (missingSmells.length > 0) {
            message += `Missing smells: ${missingSmells.join("; ")}\n`;
        }
        if (extraSmells.length > 0) {
            message += `Extra smells identified: ${extraSmells.join("; ")}\n`;
        }
        return { result: false, message };
    }
}

// Example user input
const userInput: CodeSmell[] = [
    { linebegin: 2, lineend: 3, category: "kategoria1" },
    { linebegin: 7, lineend: 10, category: "kategoria2" },
];

console.log(checkQuiz(userInput, data));
