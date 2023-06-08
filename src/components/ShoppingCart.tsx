import { Offcanvas, Stack } from "react-bootstrap"
import { useFavorites } from "../context/FavoritesContext"
import { StoreItem } from "./StoreItem"
import storeItems from "../data/cat.json"

type FavoritesListProps = {
  isOpen: boolean
}

export function FavoritesList({ isOpen }: FavoritesListProps) {
  const { favorites, closeFavorites } = useFavorites()

  return (
    <Offcanvas show={isOpen} onHide={closeFavorites} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Favorites</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {storeItems
            .filter((item) => favorites.includes(item.id))
            .map((item) => (
              <StoreItem key={item.id} {...item} />
            ))}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}