import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

interface ScoreCardProps {
    score: number;
    maxScore: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score,maxScore }) => {
    return (
        <Card border="dark" bg="light" className="mb-3">
            <Card.Body>
                <Card.Title>Final Score</Card.Title>
                <Card.Text>
                    <strong>{score}/{maxScore}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ScoreCard;
