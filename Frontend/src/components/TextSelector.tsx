import React, { useState, useRef, useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";
import CodeSmellList from "./CodeSmellList";
import { CodeSmellData } from "../types/types";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface TextSelectorProps {
    quiz: string;
    smellData: CodeSmellData;
    language: string;
}

const TextSelector: React.FC<TextSelectorProps> = ({ quiz, smellData, language }) => {
    const lines = quiz ? quiz.split("\n") : [];
    const [isDragging, setIsDragging] = useState(false);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const textSize = 16; // Assuming the text size is 16px
    const paddingTop = 10; // 10px padding top
    const paddingBottom = 10; // 10px padding bottom
    const minHeight = textSize + paddingTop + paddingBottom;

    const handleMouseDown = (index: number, event: React.MouseEvent) => {
        if (event.button !== 0) return; // Only allow left mouse button
        setIsDragging(true);
        setSelectedIndices([index]);
    };

    const handleMouseUp = (event: MouseEvent) => {
        if (event.button !== 0) return; // Only handle left mouse button
        setIsDragging(false);
    };

    const handleMouseEnter = (index: number) => {
        if (isDragging) {
            setSelectedIndices((prevIndices) => {
                if (!prevIndices.includes(index)) {
                    return [...prevIndices, index];
                }
                return prevIndices;
            });
        }
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            document.addEventListener("mouseup", handleMouseUp as EventListener, { once: true });
        }
    };

    const handleContextMenu = (index: number, event: React.MouseEvent) => {
        event.preventDefault();
        if (selectedIndices.includes(index)) {
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (containerRect) {
                setPopupPosition({
                    x: event.clientX - containerRect.left,
                    y: event.clientY - containerRect.top,
                });
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setPopupPosition(null);
            }
        };

        if (popupPosition) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupPosition]);

    return (
        <Card border="dark" bg="light" style={{ width: "48rem" }}>
            <Card.Body>
                <Card.Title>Select a Line of Code</Card.Title>
                <div style={{ fontFamily: "monospace" }}>
                    <div ref={containerRef} style={{ position: "relative" }}>
                        <ListGroup>
                            {lines.map((line, index) => (
                                <ListGroup.Item
                                    key={index}
                                    active={selectedIndices.includes(index)}
                                    onMouseDown={(event) => handleMouseDown(index, event)}
                                    onMouseUp={(event) => handleMouseUp(event.nativeEvent)}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onContextMenu={(event) => handleContextMenu(index, event)}
                                    action
                                    style={{
                                        paddingLeft: `${line.match(/^\s*/)[0].length * 0.5}rem`,
                                        paddingTop: `${paddingTop}px`,
                                        paddingBottom: `${paddingBottom}px`,
                                        minHeight: `${minHeight}px`,
                                        cursor: "pointer",
                                    }}
                                >
                                    <SyntaxHighlighter
                                        language={language}
                                        style={docco}
                                        lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
                                        wrapLines={true}
                                        customStyle={{
                                            margin: 0,
                                            padding: 0,
                                            background: "none",
                                        }}
                                    >
                                        {line}
                                    </SyntaxHighlighter>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        {popupPosition && (
                            <Card
                                ref={popupRef}
                                style={{
                                    position: "absolute",
                                    top: `${popupPosition.y}px`,
                                    left: `${popupPosition.x}px`,
                                    zIndex: 1000,
                                    width: "200px",
                                }}
                            >
                                <CodeSmellList
                                    categories={smellData.categories}
                                    onSelected={(category: string | number) => {
                                        setPopupPosition(null); // hide popup
                                        category === category; // tp surpress linting errors as its not used
                                        // TODO: handle code smell selection
                                        console.log("Selected code smell: ", category);
                                    }}
                                />
                            </Card>
                        )}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TextSelector;
