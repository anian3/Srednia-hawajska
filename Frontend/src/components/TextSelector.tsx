import React from "react";
import { ListGroup } from "react-bootstrap";

interface TextSelectorProps {
    lines: string[];
    selectedLineIndex: number | undefined;
    onLineClick: (index: number) => void;
}

const TextSelector: React.FC<TextSelectorProps> = ({ lines, selectedLineIndex, onLineClick }) => {
    const textSize = 16; // Assuming the text size is 16px
    const paddingTop = 10; // 10px padding top
    const paddingBottom = 10; // 10px padding bottom
    const minHeight = textSize + paddingTop + paddingBottom;

    return (
        <ListGroup>
            {lines.map((line, index) => (
                <ListGroup.Item
                    key={index}
                    active={selectedLineIndex === index + 1}
                    onClick={() => onLineClick(index + 1)}
                    action
                    style={{
                        paddingLeft: `${line.match(/^\s*/)[0].length * 0.5}rem`,
                        paddingTop: `${paddingTop}px`,
                        paddingBottom: `${paddingBottom}px`,
                        minHeight: `${minHeight}px`,
                    }}
                >
                    {line}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TextSelector;
