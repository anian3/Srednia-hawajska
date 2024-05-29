import React from "react";
import { ListGroup } from "react-bootstrap";

interface TextSelectorProps {
    lines: string[];
    // selectedLineIndex: number | undefined;
    selectedRange: { start: number; end: number } | undefined;
    onLineClick: (index: number) => void;
    selectionMode: "single" | "range";
}

const TextSelector: React.FC<TextSelectorProps> = ({ lines, selectedRange, onLineClick, selectionMode }) => {
    const isLineSelected = (index: number) => {
        if (!selectedRange) return false;
        const { start, end } = selectedRange;
        return index >= start && index <= end;
    };
    return (
        <ListGroup>
            {lines.map((line, index) => (
                <ListGroup.Item
                    key={index}
                    active={isLineSelected(index + 1)}
                    // active={selectedLineIndex === index + 1}
                    onClick={() => onLineClick(index + 1)}
                    action
                    style={{ paddingLeft: `${line.match(/^\s*/)[0].length * 0.5}rem`, height: "50px" }}
                >
                    {line}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TextSelector;
