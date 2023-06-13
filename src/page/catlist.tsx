import { Col, Container, Row, CardGroup } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useState, useEffect } from "react";
import { api } from "../utilities/common_api"

export function Store() {
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${api.uri}/cats/list`);
        if (response.ok) {
          const json = await response.json();
          setCatList(json);
        } else {
          throw new Error('Unable to retrieve cat data');
        }
      } catch (error) {
        console.error(error);
        // Display error message to user
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="mb-4">Cat List</h1>
      <CardGroup>
        {catList.map(cat => (
          <StoreItem key={cat._id} {...cat} />
        ))}
      </CardGroup>
    </Container>
  )
}
