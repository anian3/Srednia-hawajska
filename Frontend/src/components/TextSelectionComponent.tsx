import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import TextSelector from "./TextSelector";

interface TextSelectionComponentProps {
    text: string;
}

const TextSelectionComponent = ({ text }: TextSelectionComponentProps) => {
    const [selectedLineIndex, setSelectedLineIndex] = useState<number | undefined>(undefined);

    const lines = text ? text.split("\n") : [];

    const handleLineClick = (index: number) => {
        setSelectedLineIndex(index);
        console.log(`Selected line index: ${index}`);
    };

    return (
        <Card border="dark" bg="light" style={{ width: "36rem" }}>
            <Card.Body>
                <Card.Title>Select a Line of Code</Card.Title>
                <div style={{ fontFamily: "monospace" }}>
                    {" "}
                    {}
                    <TextSelector lines={lines} selectedLineIndex={selectedLineIndex} onLineClick={handleLineClick} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default TextSelectionComponent;
