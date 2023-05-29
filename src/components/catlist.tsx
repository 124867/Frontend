import React, { useState, useEffect } from 'react';
import catsData from '../data/cat.json';
import '../components/cat.css';

interface Cat {
  name: string;
  type: string;
  age: number;
  image: string;
}


const App = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setCats(catsData);
  }, []);

  const filteredCats = filter
    ? cats.filter((cat) =>
      cat.name.toLowerCase().includes(filter.toLowerCase())
    )
    : cats;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      {/* render the filter input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={handleFilterChange}
      />

      {/* Use the `map()` method to loop over the `filteredCats` array */}
      {filteredCats.map((cat) => (
        <div key={cat.name}>
          {/* Display the cat image */}
          <img src={cat.image} alt={`${cat.name} - ${cat.type}`} />

          {/* Display the cat name and type */}
          <p>{`${cat.name} - ${cat.type}`}</p>

          {/* Display the cat age */}
          <p>{`Age: ${cat.age}`}</p>
        </div>
      ))}
    </div>
  );
};


export default App;


