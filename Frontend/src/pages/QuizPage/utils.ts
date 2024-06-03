import { CodeSmellData } from "../../types/types";

export async function fetchQuizData(
    quizName: string,
    path: string
): Promise<{ quiz: string; codeSmellData: CodeSmellData } | null> {
    const smellsURL = `http://localhost:8080/apiv1/quizfile?quiz=${encodeURIComponent(quizName)}&path=${encodeURIComponent(path + ".json")}`;
    const codeURL = `http://localhost:8080/apiv1/codefile?quiz=${encodeURIComponent(quizName)}&path=${encodeURIComponent(path + ".txt")}`;

    try {
        // Fetch code smell data
        const codeSmellResponse = await fetch(smellsURL);
        if (!codeSmellResponse.ok) {
            throw new Error(`Failed to fetch code smell data: ${codeSmellResponse.statusText}`);
        }
        const codeSmellData = (await codeSmellResponse.json()) as CodeSmellData;

        // Fetch quiz data
        const quizResponse = await fetch(codeURL);
        if (!quizResponse.ok) {
            throw new Error(`Failed to fetch quiz data: ${quizResponse.statusText}`);
        }
        const quiz = await quizResponse.text();

        return { quiz, codeSmellData };
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return null;
    }
}