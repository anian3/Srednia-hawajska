import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

type ListStyleVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface ListItem {
  id: string | number;
  label: string;
}

interface ListGroupProps {
  items: ListItem[];
  selectedItemsIds: (string | number)[];
  onItemClick: (selectedItems: (string | number)[]) => void;
  variant?: ListStyleVariant;
}

function InteractiveList({
  items,
  selectedItemsIds,
  onItemClick,
  variant = "primary",
}: ListGroupProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (id: string | number) => {
    setIsMouseDown(true);
    handleItemClick(id);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (id: string | number) => {
    if (isMouseDown) {
      handleItemClick(id);
    }
  };

  const handleItemClick = (id: string | number) => {
    const newSelectedItems = selectedItemsIds.includes(id)
      ? selectedItemsIds.filter((itemId) => itemId !== id)
      : [...selectedItemsIds, id];
    onItemClick(newSelectedItems);
  };

  return (
    <ListGroup
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {items.map((item) => (
        <ListGroup.Item
          key={item.id}
          active={selectedItemsIds.includes(item.id)}
          onMouseDown={() => handleMouseDown(item.id)}
          onMouseEnter={() => handleMouseEnter(item.id)}
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
