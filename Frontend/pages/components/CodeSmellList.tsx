import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import InteractiveList from "./InteractiveList";

const CodeSmellList = () => {
  const items = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  const [selectedItemId, setSelectedItemId] = useState<
    string | number | undefined
  >();

  const handleItemClick = (itemId: string | number) => {
    setSelectedItemId(itemId);
    // Do something with the selected item ID logging for now
    console.log();
  };

  return (
    <Card border="dark" bg="light" style={{ width: "36rem" }}>
      <Card.Body>
        <Card.Title>Code Smells</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Common indicators of code issues
        </Card.Subtitle>
        <Card.Text>
          Code smells are certain patterns in code that may indicate deeper
          problems. Identifying and addressing these smells can lead to better
          maintainability and readability of code.
        </Card.Text>
        <InteractiveList
          items={items}
          selectedItemId={selectedItemId}
          onItemClick={handleItemClick}
          variant="light"
        />
      </Card.Body>
    </Card>
  );
};

export default CodeSmellList;
