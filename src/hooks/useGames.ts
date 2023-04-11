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
}

const useGames = () => useData<Game>("/games");

export default useGames;
