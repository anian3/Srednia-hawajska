import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Settings } from "../../config/settings";

interface Quiz {
    name: string;
    id: string;
}

export interface QuizFileSelectionPageProps {
    selectedQuizType: string;
    quizzes: Quiz[];
    playerName: string;
    onQuizChosen: (quizId: string) => void;
}

function QuizSelectionPage({ selectedQuizType, quizzes, playerName, onQuizChosen }: QuizFileSelectionPageProps) {
    return (
        <Card className="mt-5">
            <Card.Header className="position-relative text-center">
                <h4 className="mb-0">Select a Test</h4>
                <p
                    className="text-muted mb-0 position-absolute"
                    style={{ top: "50%", left: "2%", transform: "translate(0, -50%)" }}
                >
                    Hi, {playerName}
                </p>
            </Card.Header>
            <Card.Body>
                <ListGroup style={{ maxWidth: "60%", margin: "0 auto", overflowY: "auto" }}>
                    <ListGroup.Item
                        key={"type-title"}
                        className="text-center"
                        style={{ fontSize: "20px", padding: "15px" }}
                        variant={"primary"}
                    >
                        {selectedQuizType}
                    </ListGroup.Item>

                    {quizzes?.map((item) => (
                        <ListGroup.Item
                            key={item.id}
                            onClick={() => onQuizChosen(item.id)}
                            variant={Settings.COMPONENT_VARIANT}
                            action
                            className="text-center"
                            style={{ fontSize: "20px", padding: "15px" }}
                        >
                            {item.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default QuizSelectionPage;
