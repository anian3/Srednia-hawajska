import { CodeSmellData } from "../../types/types";

export async function fetchQuizData(
    quizName: string,
    path: string
): Promise<{ quiz: string; codeSmellData: CodeSmellData } | null> {
    const smellsURL = `https://srednia-hawajska.onrender.com/apiv1/quizfile?quiz=${encodeURIComponent(quizName)}&path=${encodeURIComponent(path + ".json")}`;
    const codeURL = `https://srednia-hawajska.onrender.com/apiv1/codefile?quiz=${encodeURIComponent(quizName)}&path=${encodeURIComponent(path + ".txt")}`;

    try {
        // Fetch code smell data
        const codeSmellResponse = await fetch(smellsURL);
        if (!codeSmellResponse.ok) {
            throw new Error(`Failed to fetch code smell data: ${codeSmellResponse.statusText}`);
        }
        const codeSmellJson = await codeSmellResponse.json();
        const codeSmellData: CodeSmellData = {
            categories: codeSmellJson.categories,
            codeSmells: codeSmellJson.codeSmells,
        };
        const language = codeSmellJson.language;

        // Fetch quiz data
        const quizResponse = await fetch(codeURL);
        if (!quizResponse.ok) {
            throw new Error(`Failed to fetch quiz data: ${quizResponse.statusText}`);
        }
        const quiz = await quizResponse.text();

        return { quiz, codeSmellData, language };
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return null;
    }
}
