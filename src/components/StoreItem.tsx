import { Button, Card } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { Link } from "react-router-dom";

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
    <Card className="h-100 shadow-sm" style={{ margin: '1rem', borderRadius: '1rem' }}>
      <Card.Img variant="top" src={image} height="200px" style={{ objectFit: "cover" }} />
      <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0" style={{ fontWeight: 600 }}>{name}</h4>
            <span className="text-muted">{breed}</span>
          </div>
          <div>
            <Link to={`/direct-messages/${_id}`}>
              <Button
                className="mt-2"
                variant="primary"
                size="sm"
                style={{ borderRadius: '1rem', fontWeight: 600 }}
              >
                View Comments
              </Button>
            </Link>
          </div>
        </div>
        <hr />
        <p className="text-muted mb-0">{age} years old</p>
      </div>
    </Card>
  )
}
