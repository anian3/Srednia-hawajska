import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

interface TextSelectorProps {
    lines: string[];
}

const TextSelector: React.FC<TextSelectorProps> = ({ lines }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

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
            console.log(selectedIndices);
        }
    };

    return (
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
    );
};

export default TextSelector;
