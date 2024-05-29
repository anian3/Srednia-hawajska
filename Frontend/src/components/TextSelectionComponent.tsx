import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import TextSelector from "./TextSelector";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface TextSelectionComponentProps {
    text: string;
}

// const TextSelectionComponent = ({ text }: TextSelectionComponentProps) => {
const TextSelectionComponent: React.FC<TextSelectionComponentProps> = ({ text }) => {
    // const [selectedLineIndex, setSelectedLineIndex] = useState<number | undefined>(undefined);
    const [selectionMode, setSelectionMode] = useState<"single" | "range">("single");
    const [selectedRange, setSelectedRange] = useState<{ start: number; end: number } | undefined>(undefined);

    const lines = text ? text.split("\n") : [];

    // const handleLineClick = (index: number) => {
    //     setSelectedLineIndex(index);
    //     console.log(`Selected line index: ${index}`);
    // };

    // const handleLineClick = (index: number) => {
    //     if (!selectedRange) {
    //         setSelectedRange({ start: index, end: index });
    //     } else if (index < selectedRange.start) {
    //         setSelectedRange({ start: index, end: selectedRange.end });
    //     } else if (index > selectedRange.end) {
    //         setSelectedRange({ start: selectedRange.start, end: index });
    //     } else {
    //         setSelectedRange(undefined); // Reset selection if clicked within the range
    //     }
    //     console.log(`Selected range: ${selectedRange ? `${selectedRange.start}-${selectedRange.end}` : "none"}`);
    // };

    // const handleLineClick = (index: number) => {
    //     if (!selectedRange) {
    //         setSelectedRange({ start: index, end: index });
    //     } else if (selectedRange.start === selectedRange.end) {
    //         // Currently selecting a single line
    //         if (index === selectedRange.start) {
    //             setSelectedRange(undefined); // Deselect if the same line is clicked again
    //         } else if (index < selectedRange.start) {
    //             setSelectedRange({ start: index, end: selectedRange.start });
    //         } else {
    //             setSelectedRange({ start: selectedRange.start, end: index });
    //         }
    //     } else {
    //         // Currently selecting a range
    //         if (index >= selectedRange.start && index <= selectedRange.end) {
    //             setSelectedRange(undefined); // Deselect if a line within the range is clicked again
    //         } else {
    //             setSelectedRange({ start: index, end: index }); // Start a new selection
    //         }
    //     }
    //     console.log(`Selected range: ${selectedRange ? `${selectedRange.start}-${selectedRange.end}` : "none"}`);
    // };

    // const handleLineClick = (index: number) => {
    //     if (selectionMode === "single") {
    //         setSelectedRange({ start: index, end: index });
    //         console.log(`Selected line index: ${index}`);
    //     } else {
    //         if (!selectedRange || (selectedRange && selectedRange.start === selectedRange.end)) {
    //             setSelectedRange({ start: index, end: index });
    //         } else {
    //             if (index < selectedRange.start) {
    //                 setSelectedRange({ start: index, end: selectedRange.start });
    //             } else {
    //                 setSelectedRange({ start: selectedRange.start, end: index });
    //             }
    //             console.log(`Selected range: ${selectedRange ? `${selectedRange.start}-${selectedRange.end}` : "none"}`);
    //         }
    //     }
    // };
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
        setSelectedRange(undefined); // Clear the selection when mode changes
    };

    // return (
    //     <Card border="dark" bg="light" style={{ width: "36rem" }}>
    //         <Card.Body>
    //             <Card.Title>Select a Line or a Segment of Code</Card.Title>
    //             <ButtonGroup className="mb-3">
    //                 <Button
    //                     variant={selectionMode === "single" ? "primary" : "outline-primary"}
    //                     onClick={() => setSelectionMode("single")}
    //                 >
    //                     Select Single Line
    //                 </Button>
    //                 <Button
    //                     variant={selectionMode === "range" ? "primary" : "outline-primary"}
    //                     onClick={() => setSelectionMode("range")}
    //                 >
    //                     Select Range
    //                 </Button>
    //             </ButtonGroup>
    //             <div style={{ fontFamily: "monospace" }}>
    //                 <TextSelector
    //                     lines={lines}
    //                     selectedRange={selectedRange}
    //                     onLineClick={handleLineClick}
    //                     selectionMode={selectionMode}
    //                 />
    //             </div>
    //         </Card.Body>
    //     </Card>
    // );

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
                        selectionMode={selectionMode}
                    />
                </div>
            </Card.Body>
        </Card>
    );
    // return (
    //     <Card border="dark" bg="light" style={{ width: "36rem" }}>
    //         <Card.Body>
    //             <Card.Title>Select a Line of Code</Card.Title>
    //             <div style={{ fontFamily: "monospace" }}>
    //                 {" "}
    //                 {}
    //                 <TextSelector lines={lines} selectedRange={selectedRange} onLineClick={handleLineClick} />
    //                 {/* <TextSelector lines={lines} selectedLineIndex={selectedLineIndex} onLineClick={handleLineClick} /> */}
    //             </div>
    //         </Card.Body>
    //     </Card>
    // );
};

export default TextSelectionComponent;
