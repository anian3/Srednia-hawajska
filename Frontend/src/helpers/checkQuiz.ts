import { CodeSmell, QuizData, CheckQuizResult } from "../types/types";

// works only if there are no two code smells witin the same line range
export function checkQuiz(userInput: CodeSmell[], actualSmells: CodeSmell[]): CheckQuizResult {
    const correct: CodeSmell[] = [];
    const missed: CodeSmell[] = [];
    const extra: CodeSmell[] = [];
    const misclassified: CodeSmell[] = [];

    const actualSmellMap = new Map<string, CodeSmell>();
    actualSmells.forEach((smell) => {
        const key = `${smell.linebegin},${smell.lineend},${smell.category}`;
        actualSmellMap.set(key, smell);
    });

    const userSmellMap = new Map<string, CodeSmell>();
    userInput.forEach((input) => {
        const key = `${input.linebegin},${input.lineend},${input.category}`;
        userSmellMap.set(key, input);
    });

    actualSmellMap.forEach((actualSmell, key) => {
        if (userSmellMap.has(key)) {
            const userSmell = userSmellMap.get(key);
            if (userSmell && userSmell.category === actualSmell.category) {
                correct.push(actualSmell);
            } else {
                misclassified.push(userSmell);
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
