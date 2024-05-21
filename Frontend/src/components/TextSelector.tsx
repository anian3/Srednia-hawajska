import React from "react";
import { ListGroup } from "react-bootstrap";

interface TextSelectorProps {
    lines: string[];
    selectedLineIndex: number | undefined;
    onLineClick: (index: number) => void;
}

const TextSelector: React.FC<TextSelectorProps> = ({ lines, selectedLineIndex, onLineClick }) => {
    return (
        <ListGroup>
            {lines.map((line, index) => (
                <ListGroup.Item
                    key={index}
                    active={selectedLineIndex === index}
                    onClick={() => onLineClick(index)}
                    action
                    style={{ paddingLeft: `${line.match(/^\s*/)[0].length * 0.5}rem`, height: '50px'}}

                >
                    {line}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TextSelector;
