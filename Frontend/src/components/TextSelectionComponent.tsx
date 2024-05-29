import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import TextSelector from "./TextSelector";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface TextSelectionComponentProps {
    text: string;
}

const TextSelectionComponent: React.FC<TextSelectionComponentProps> = ({ text }) => {
    const [selectionMode, setSelectionMode] = useState<"single" | "range">("single");
    const [selectedRange, setSelectedRange] = useState<{ start: number; end: number } | undefined>(undefined);

    const lines = text ? text.split("\n") : [];

    const handleLineClick = (index: number) => {
        if (selectionMode === "single") {
            setSelectedRange({ start: index, end: index });
            console.log(`Selected line index: ${index}`);
        } else {
            if (!selectedRange) {
                setSelectedRange({ start: index, end: index });
            } else {
                const newRange = {
                    start: Math.min(selectedRange.start, index),
                    end: Math.max(selectedRange.start, index),
                };
                setSelectedRange(newRange);
                console.log(`Selected range: ${newRange.start}-${newRange.end}`);
            }
        }
    };

    const handleModeChange = (mode: "single" | "range") => {
        setSelectionMode(mode);
        setSelectedRange(undefined);
    };

    return (
        <Card border="dark" bg="light" style={{ width: "36rem" }}>
            <Card.Body>
                <Card.Title>Select a Line or a Segment of Code</Card.Title>
                <ButtonGroup className="mb-3">
                    <Button
                        variant={selectionMode === "single" ? "primary" : "outline-primary"}
                        onClick={() => handleModeChange("single")}
                    >
                        Select Single Line
                    </Button>
                    <Button
                        variant={selectionMode === "range" ? "primary" : "outline-primary"}
                        onClick={() => handleModeChange("range")}
                    >
                        Select Range
                    </Button>
                </ButtonGroup>
                <div style={{ fontFamily: "monospace" }}>
                    <TextSelector
                        lines={lines}
                        selectedRange={selectedRange}
                        onLineClick={handleLineClick}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default TextSelectionComponent;
