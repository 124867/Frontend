import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from '../utilities/common_api';

import './Favorites.css';

type CatType = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  image: string;
};

const Favorites = () => {
  const [cats, setCats] = useState<CatType[]>([]);

  useEffect(() => {
    // Retrieve the user's favorite cats from the server
    axios
      .get(`${api.uri}/user/favorites?token=${localStorage.getItem("token")}`)
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRemoveFavorite = (catId: string) => {
    // Remove the cat from the user's favorites
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }

    axios
      .delete(`${api.uri}/user/favorites/${catId}?token=${token}`)
      .then(() => {
        // Remove the cat from the state so it gets removed from the UI
        setCats(cats.filter(cat => cat._id !== catId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorite Cats</h1>
      {cats.length === 0 && <p>You haven't added any cats to your favorites yet.</p>}
      <div className="favorites-grid">
        {cats.map((cat) => (
          <div key={cat._id} className="favorites-card">
            <h2>{cat.name}</h2>
            <p>Age: {cat.age}</p>
            <p>Breed: {cat.breed}</p>
            <img src={`${api.uri}/images/${cat.image}`} alt={cat.name} width="100" style={{ marginRight: '1rem' }} />
            <button onClick={() => handleRemoveFavorite(cat._id)}>Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;