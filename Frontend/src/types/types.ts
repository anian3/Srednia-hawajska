export enum PageType {
    QUIZ_TYPE_SELECTION = "quiz_type_selection",
    QUIZ_SELECTION = "quiz_selection",
    QUIZ = "quiz",
    RESULTS = "results",
}

export interface CodeSmellData {
    categories: string[];
    codeSmells: { linebegin: number; lineend: number; category: string }[];
}
