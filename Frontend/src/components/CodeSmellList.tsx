import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InteractiveList from "./InteractiveList";
import { Settings } from "../config/settings";

interface CodeSmellListProps {
    categories: string[];
    onSelected: (selectedCategory: string) => void;
}

const CodeSmellList: React.FC<CodeSmellListProps> = ({ categories, onSelected }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>();

    return (
        <Card border="dark" bg={Settings.COMPONENT_VARIANT} style={{ width: "36rem" }}>
            <Card.Body>
                <Card.Title>Code Smells</Card.Title>
                <InteractiveList
                    items={categories.map((category, i) => ({ id: String(i), label: category }))}
                    selectedItemId={selectedCategory}
                    onItemClick={(item) => setSelectedCategory(item.label)}
                    variant={Settings.COMPONENT_VARIANT}
                />
                <div className="d-flex justify-content-end mt-3">
                    <Button onClick={() => onSelected(selectedCategory)} variant="primary">
                        Select
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CodeSmellList;
