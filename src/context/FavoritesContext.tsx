import React, { createContext, useContext, useState } from "react"

type FavoritesContextType = {
  favorites: number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
  closeFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => { },
  removeFavorite: () => { },
  isFavorite: () => false,
  toggleFavorite: () => { },
  closeFavorites: () => { }
})

type FavoritesProviderProps = {
  children: React.ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  function addFavorite(id: number) {
    setFavorites((prevFavorites) => [...prevFavorites, id])
  }

  function removeFavorite(id: number) {
    setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id))
  }

  function isFavorite(id: number) {
    return favorites.includes(id)
  }

  function toggleFavorite(id: number) {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  function closeFavorites() {
    // Implement the function to close the favorites list here
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    closeFavorites
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}