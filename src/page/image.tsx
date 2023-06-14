import React, { useState } from 'react';
import { api } from "../utilities/common_api";

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
      location.reload();
    } catch (err) {
      console.error(err);
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

  const handleDeleteClick = async (id: string) => {
    try {
      const deleteUrl = `${api.uri}/cats/${id}?token=${token}`;
      // Send a DELETE request to the server to delete the cat
      const res = await fetch(deleteUrl, { method: 'DELETE' });
      console.log('Cat deleted successfully');
      location.reload();
    } catch (err) {
      console.error(err);
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
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  return (
    <div>
      <h1>Upload a Cat</h1>
      <form onSubmit={handleFormSubmit}>
        <div id="reg">
          <h2>Cat info</h2>
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="age">Age</label>
          <br />
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <br />
          <label htmlFor="breed">Breed</label>
          <br />
          <input
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input id="image" type="file" onChange={handleImageChange} />
          <br />
          <button type="submit">Submit</button>
          <br />
        </div>
      </form>
      <div id="catList">
        <h2>All Cats</h2>
        <ul>
          {cats.map((cat) => (
            <li key={cat._id}>
              <img src={cat.image} alt={cat.name} />
              {cat.name}, {cat.age}, {cat.breed}
              <button onClick={() => handleDeleteClick(cat._id)}>Delete</button>
              <button onClick={() => handleUpdateClick(cat._id)}>Update</button>
            </li>
          ))}
        </ul>
        <button onClick={handleListClick}>List Cats</button>
      </div>
    </div>
  );
}
