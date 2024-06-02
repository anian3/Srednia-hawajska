import React from "react";
import { ListGroup } from "react-bootstrap";

type ListStyleVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

interface ListItem {
    id: string | number;
    label: string;
}

interface InteractiveListProps {
    items: ListItem[];
    selectedItemId: string | number | undefined;
    onItemClick: (item: ListItem) => void;
    variant?: ListStyleVariant;
}

function InteractiveList({ items, selectedItemId, onItemClick, variant = "primary" }: InteractiveListProps) {
    return (
        <ListGroup>
            {items.map((item) => (
                <ListGroup.Item
                    key={item.id}
                    active={selectedItemId === item.id}
                    onClick={() => onItemClick(item)}
                    variant={variant}
                    action
                >
                    {item.label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default InteractiveList;
