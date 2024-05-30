import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InteractiveList from "./InteractiveList";
import { Settings } from "../config/settings";

interface CodeSmellListProps {
    items: { id: string; label: string }[];
    onSelected: (selectedItemId: string | number) => void;
}

const CodeSmellList: React.FC<CodeSmellListProps> = ({ items, onSelected }) => {
    const [selectedItemId, setSelectedItemId] = useState<string | number | undefined>();

    const handleItemClick = (itemId: string | number) => {
        setSelectedItemId(itemId);
        // Log the selected item ID for now
        console.log("Selected item ID:", itemId);
    };

    const handleSelectButtonClick = () => {
        if (selectedItemId !== undefined) {
            onSelected(selectedItemId);
        } else {
            console.log("No item selected");
        }
    };

    return (
        <Card border="dark" bg={Settings.COMPONENT_VARIANT} style={{ width: "36rem" }}>
            <Card.Body>
                <Card.Title>Code Smells</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
          Common indicators of code issues
        </Card.Subtitle>
        <Card.Text>
          Code smells are certain patterns in code that may indicate deeper
          problems. Identifying and addressing these smells can lead to better
          maintainability and readability of code.
        </Card.Text> */}
                <InteractiveList
                    items={items}
                    selectedItemId={selectedItemId}
                    onItemClick={handleItemClick}
                    variant={Settings.COMPONENT_VARIANT}
                />
                <div className="d-flex justify-content-end mt-3">
                    <Button onClick={handleSelectButtonClick} variant="primary">
                        Select
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CodeSmellList;
