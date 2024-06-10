import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Settings } from "../../config/settings";

interface QuizType {
    name?: string;
    id: string;
}

export interface QuizTypeSelectionPageProps {
    quizTypes: QuizType[];
    playerName: string;
    onQuizChosen: (quizTypeId: string) => void;
}

function QuizTypeSelectionPage({ quizTypes, playerName, onQuizChosen }: QuizTypeSelectionPageProps) {
    return (
        <Card className="mt-5">
            <Card.Header className="position-relative text-center">
                <h4 className="mb-0">Select a Quiz</h4>
                <p
                    className="text-muted mb-0 position-absolute"
                    style={{ top: "50%", left: "2%", transform: "translate(0, -50%)" }}
                >
                    Hi, {playerName}
                </p>
            </Card.Header>
            <Card.Body>
                <ListGroup style={{ maxWidth: "60%", margin: "0 auto", overflowY: "auto" }}>
                    {quizTypes?.map((item) => (
                        <ListGroup.Item
                            key={item.id}
                            onClick={() => onQuizChosen(item.id)}
                            variant={Settings.COMPONENT_VARIANT}
                            action
                            className="text-center"
                            style={{ fontSize: "20px", padding: "15px" }}
                        >
                            {item.name ?? item.id}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default QuizTypeSelectionPage;
