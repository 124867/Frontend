import { Button, Card } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { Link } from "react-router-dom";

import './StoreItem.css';

type StoreItemProps = {
  _id: string
  name: string
  breed: string
  age: number
  image: string
}

export function StoreItem({ _id, name, breed, age, image }: StoreItemProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <Card className="store-item-container h-100 shadow-sm">
      <Card.Img variant="top" src={image} height="200px" className="store-item-img" />
      <div className="store-item-details">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="store-item-title">{name}</h4>
            <span className="store-item-subtitle">{breed}</span>
          </div>
          <div>
            <Link to={`/direct-messages/${_id}`}>
              <Button
                className="mt-2 store-item-btn"
                variant="primary"
                size="sm"
              >
                View Comments
              </Button>
            </Link>
          </div>
        </div>
        <hr className="store-item-divider" />
        <p className="store-item-age">{age} years old</p>
      </div>
    </Card>
  )
}