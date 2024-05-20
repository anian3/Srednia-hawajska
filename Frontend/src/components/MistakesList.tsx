import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MistakesListProps {
    mistakes: string[];
}

const MistakesList: React.FC<MistakesListProps> = ({ mistakes }) => {
    return (
        <Card border="dark" bg="light">
            <Card.Body>
                <Card.Title>Your mistakes</Card.Title>
                <hr style={{ margin: '0 0 1rem' }} /> {}
                <ListGroup variant="flush">
                    {mistakes.map((mistake, index) => (
                        <ListGroup.Item key={index}>{mistake}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default MistakesList;