import React, { useState, useRef, useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";
import CodeSmellList from "./CodeSmellList";

interface TextSelectorProps {
    lines: string[];
}

const TextSelector: React.FC<TextSelectorProps> = ({ lines }) => {
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

    const items = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
        { id: "3", label: "Option 3" },
    ];

    return (
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
                        {line}
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
                        items={items}
                        onSelected={(selectedItemId: string | number) => {
                            setPopupPosition(null);
                            selectedItemId === selectedItemId; // tp surpress linting errors as its not used
                            // TODO: handle code smell selection
                        }}
                    />
                </Card>
            )}
        </div>
    );
};

export default TextSelector;
