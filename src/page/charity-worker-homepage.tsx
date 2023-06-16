import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utilities/common_api';
import { Button, Container, Row, Col } from 'react-bootstrap';

interface Cat {
  _id: string;
  name: string;
  age: number;
  breed: string;
  image: string;
}

interface WorkerHomepageProps {
  token: string;
}

const WorkerHomepage: React.FC<WorkerHomepageProps> = ({ token: propToken }) => {
  const catListRef = React.useRef<HTMLDivElement>(null);
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    // Fetch the cat list from the server and display it
    fetch(`${api.uri}/cats/list`)
      .then((res) => res.json())
      .then((cats: Cat[]) => {
        // Clear the previous list items
        if (catListRef.current) {
          catListRef.current.innerHTML = '';
        }

        // Add each cat to the list
        cats.forEach((cat) => {
          if (catListRef.current) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = cat.image;
            img.alt = cat.name;
            div.appendChild(img);
            div.appendChild(document.createTextNode(`${cat.name}, ${cat.age}, ${cat.breed}`));

            // Add a add to favorites button for each cat
            const viewCommentsBtn = document.createElement('button');
            viewCommentsBtn.innerText = 'View Comments';

            viewCommentsBtn.addEventListener('click', () => {
              // Navigate to the direct messages page for this cat
              window.location.href = `/direct-messages/${cat._id}?token=${token}`;
            });

            // Append the View Comments button to the div
            div.appendChild(viewCommentsBtn);

            catListRef.current.appendChild(div);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  // Define the searchCats function
  function searchCats() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const filterInput = document.getElementById('filter-input') as HTMLSelectElement;
    const searchValue = searchInput.value.trim().toLowerCase();

    // Loop through all the cats in the list and hide/show them based on the search value
    catListRef.current!.querySelectorAll('div').forEach((cat) => {
      const name = cat.querySelector('img')?.alt.toLowerCase() ?? '';

      if (name.includes(searchValue)) {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    });
  }
  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
    window.location.href = '/';// optional: reload the page to reflect the logout state
  }
  // Define the filterCats function
  function filterCats() {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const filterInput = document.getElementById('filter-input') as HTMLSelectElement;
    const filterValue = filterInput.value;

    // Loop through all the cats in the list and hide/show them based on the filter value
    catListRef.current!.querySelectorAll('div').forEach((cat) => {
      const age = cat.textContent?.split(',')[1].trim().split(' ')[0] ?? '';

      if (filterValue === 'all' || age === filterValue) {
        cat.style.display = 'block';
      } else {
        cat.style.display = 'none';
      }
    });
  }


  return (
    <>
      <Button onClick={logout} variant="primary">Logout</Button>
      <h1>Welcome to the Worker Home Page</h1>
      <p>You are logged in as a worker.</p>
      <p>Here, you can view and manage your account information, as well as access any features or services that are available to you.</p>
      <p>Thank you for using our application!</p>
      <Link to={`/Image_upload${token ? `?token=${token}` : ''}`}><button>Add New Cat</button></Link>
      <div className="search-filter">
        <label htmlFor="search-input">Search:</label>
        <input type="text" id="search-input" onChange={searchCats} />
        <label htmlFor="filter-input">Filter by age:</label>
        <select id="filter-input" onChange={filterCats}>
          <option value="all">All</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
        </select>
      </div>
      <div ref={catListRef} id="cat-list" />
    </>
  );
};

export default WorkerHomepage;
