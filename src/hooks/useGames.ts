import { GameQuery } from "../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

//Interface for an individual game object returned from the rawg.io API, exported to be used elsewhere
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  rating: number;
}

const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    //Uses optional chaining as the selected genre and platforms can be null (When loading all games)
    {
      params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    },
    //Added as dependencies so that when an id changes, the data is refetched
    [gameQuery]
  );

export default useGames;
