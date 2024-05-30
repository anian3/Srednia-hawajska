import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import TextSelector from "./TextSelector";

interface TextSelectionComponentProps {
    text: string;
}

const TextSelectionComponent = ({ text }: TextSelectionComponentProps) => {
    const lines = text ? text.split("\n") : [];

    return (
        <Card border="dark" bg="light" style={{ width: "36rem" }}>
            <Card.Body>
                <Card.Title>Select a Line of Code</Card.Title>
                <div style={{ fontFamily: "monospace" }}>
                    {" "}
                    {}
                    <TextSelector lines={lines} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default TextSelectionComponent;
