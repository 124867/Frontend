import { Button, Stack } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import catlist from "../data/cat.json"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const item = catlist.find(i => i.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.image}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item.type}
        </div>
      </div>
      <div> {item.age}</div>
      <Button
        variant={isFavorite(item.id) ? "warning" : "outline-warning"}
        size="sm"
        onClick={() => toggleFavorite(item.id)}
      >
        {isFavorite(item.id) ? "★" : "☆"}
      </Button>
    </Stack>
  )
}
