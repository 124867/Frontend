import { Button, Card } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"

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
    <Card className="h-100 shadow-sm" >
      <Card.Img variant="top" src={image} height="200px" style={{ objectFit: "cover" }} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">{name}</h4>
            <span className="text-muted">{breed}</span>
          </div>
          <Button
            className="mt-2"
            onClick={() => toggleFavorite(_id)}
            variant={isFavorite(_id) ? "warning" : "outline-warning"}
            size="sm"
          >
            {isFavorite(_id) ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>
        <hr />
        <p className="text-muted mb-0">{age} years old</p>
      </Card.Body>
    </Card>
  )
}