import React, { useState } from 'react';
import { api } from "../utilities/common_api";
import { Form, Button, Container, Row, Col, Image as BootstrapImage, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './image.css';

interface Cat {
    _id: string;
    name: string;
    age: number;
    breed: string;
    image: string;
}

export function Image() {
    const [cats, setCats] = useState<Cat[]>([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [breed, setBreed] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [catImages, setCatImages] = useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create a new FormData object and append the form data to it
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age.toString());
        formData.append('breed', breed);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            // Send a POST request to the server with the form data
            const res = await fetch(`${api.uri}/cats/upload?token=${token}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success('Cat uploaded successfully!');
                location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while uploading the cat.');
        }
    };

    const handleListClick = async () => {
        try {
            // Send a GET request to the server to list all the cats
            const res = await fetch(`${api.uri}/cats/list`);
            const cats = await res.json();
            setCats(cats);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleClick = async () => {
        try {
            const response = await fetch(`${api.uri}/cats/cat-images/${inputValue.trim()}`);
            const data = await response.json();
            setCatImages(data.images);
        } catch (err) {
            console.error(err);
        }
    };

    const renderCatImage = (image) => {
        return (
            <div key={image.id}>
                <BootstrapImage src={image.url} alt={`A ${inputValue} cat`} fluid />
            </div>
        );
    };

    const handleDeleteClick = async (id: string) => {
        try {
            const deleteUrl = `${api.uri}/cats/${id}?token=${token}`;
            // Send a DELETE request to the server to delete the cat
            const res = await fetch(deleteUrl, { method: 'DELETE' });
            console.log('Cat deleted successfully');
            toast.success('Cat deleted successfully!');
            location.reload();
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while deleting the cat.');
        }
    };

    const handleUpdateClick = async (id: string) => {
        const newName = prompt('Enter the new name:');
        const newAge = parseInt(prompt('Enter the new age:') || '0', 10);
        const newBreed = prompt('Enter the new breed:');

        // Create a new FormData object and append the updated cat data to it
        const updateData = new FormData();
        if (newName) {
            updateData.append('name', newName);
        }
        if (newAge) {
            updateData.append('age', newAge.toString());
        }
        if (newBreed) {
            updateData.append('breed', newBreed);
        }

        try {
            const updateUrl = `${api.uri}/cats/${id}?token=${token}`;
            // Send a PUT request to the server with the updated cat data
            const res = await fetch(updateUrl, {
                method: 'PUT',
                body: updateData,
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                toast.success('Cat updated successfully!');
                location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while updating the cat.');
        }
    };

    return (
        <>
            <ToastContainer />
            <Row>
                <Col>
                    <h1>Upload a Cat</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(parseInt(e.target.value, 10))} />
                        </Form.Group>

                        <Form.Group controlId="breed">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control type="text" placeholder="Enter breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => setImageFile(e.target.files && e.target.files[0])} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <h1>List of Cats</h1>
                    <ListGroup>
                        {cats.map((cat) => (
                            <ListGroup.Item key={cat._id}>
                                <div className="image-container">
                                    <img src={cat.image} alt={`A ${cat.breed} cat`} />
                                </div>
                                <div className="cat-details">
                                    <p>Name: {cat.name}</p>
                                    <p>Age: {cat.age}</p>
                                    <p>Breed: {cat.breed}</p>
                                    <Button variant="danger" onClick={() => handleDeleteClick(cat._id)}>Delete</Button>
                                    <Button variant="warning" onClick={() => handleUpdateClick(cat._id)}>Update</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Button variant="info" onClick={handleListClick}>List Cats</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>breed selection helper</h1>
                    <Form>
                        <Form.Group controlId="search">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="text" placeholder="Enter breed" value={inputValue} onChange={handleInput} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleClick}>
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <h1>Images of {inputValue} Cats</h1>
                    {catImages.map((image) => renderCatImage(image))}
                </Col>
            </Row>
        </>
    );
}