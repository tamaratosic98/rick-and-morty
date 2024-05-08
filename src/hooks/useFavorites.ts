import { useLocalStorage } from "@uidotdev/usehooks";
import { FAVORITE_CHARACTERS_IDS } from "../utils/constants";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Array<string>>(
    FAVORITE_CHARACTERS_IDS,
    []
  );

  function addFavorite(id: string) {
    if (isFavorite(id)) {
      return;
    }

    setFavorites([...favorites, id]);
  }

  function removeFavorite(id: string) {
    setFavorites(favorites.filter((favorite) => favorite !== id));
  }

  function isFavorite(id: string) {
    return favorites?.length && favorites.includes(id);
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
