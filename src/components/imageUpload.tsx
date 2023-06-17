import React, { useState } from 'react';
import { api } from '../utilities/common_api';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

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
            const res = await fetch(`${api.uri}/cats/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data);
            location.reload();
        } catch (err) {
            console.error(err);
            setError('An error occurred while uploading the cat. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleListClick = async () => {
        setLoading(true);
        setError('');

        try {
            // Send a GET request to the server to list all the cats
            const res = await fetch(`${api.uri}/cats/list`);
            const cats = await res.json();
            setCats(cats);
        } catch (err) {
            console.error(err);
            setError('An error occurred while listing the cats. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = async (id: string) => {
        setLoading(true);
        setError('');

        try {
            const deleteUrl = `${api.uri}/cats/${id}`;
            // Send a DELETE request to the server to delete the cat
            const res = await fetch(deleteUrl, { method: 'DELETE' });
            console.log('Cat deleted successfully');
            location.reload();
        } catch (err) {
            console.error(err);
            setError('An error occurred while deleting the cat. Please try again later.');
        } finally {
            setLoading(false);
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

        setLoading(true);
        setError('');

        try {
            const updateUrl = `${api.uri}/cats/${id}`;
            // Send a PUT request to the server with the updated cat data
            const res = await fetch(updateUrl, {
                method: 'PUT',
                body: updateData,
            });
            const data = await res.json();
            console.log(data);
            location.reload();
        } catch (err) {
            console.error(err);
            setError('An error occurred while updating the cat. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Cat Shelter</h1>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <inputclassName="form-control"
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
              />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Breed</label>
                            <input
                                id="breed"
                                className="form-control"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                className="form-control"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Cat'}
                        </button>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-8 mx-auto">
                    <h2 className="text-center mb-3">All Cats</h2>
                    <ul className="list-group">
                        {cats.length === 0 && (
                            <li className="list-group-item text-center">No cats found</li>
                        )}
                        {cats.map((cat) => (
                            <li key={cat._id} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={cat.image} alt={cat.name} className="img-fluid" />
                                    </div>
                                    <div className="col-md-8">
                                        <h4>{cat.name}</h4>
                                        <p>
                                            <strong>Age:</strong> {cat.age}
                                        </p>
                                        <p>
                                            <strong>Breed:</strong> {cat.breed}
                                        </p>
                                        <button
                                            className="btn btn-danger mr-3"
                                            onClick={() => handleDeleteClick(cat._id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Deleting...' : 'Delete'}
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleUpdateClick(cat._id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleListClick}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'List All Cats'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}