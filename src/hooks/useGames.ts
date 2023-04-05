import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

//Interface for an individual game object returned from the rawg.io API
export interface Game {
  id: number;
  name: string;
  background_image: string;
}

//Interface for the array of game objects returned from the rawg.io API
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export const useGames = () => {
  //Saving the state of the games returned from the rawg.io API and/or the errors
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  //API call to the rawg.io API to get the array of games, with error handling
  useEffect(() => {
    /*
      Uses the browsers AbortController API to handle cancellations. When called this causes 
      the fetch operation and every subsequent, then() method to be discarded, and the catch() 
      method to execute. The catch() block then has a check to differentiate whether an actual 
      error occurred, which would require an error message to be set in the state.
    */
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();

    //The array below is an array of dependencies. This prevents constant calls to the backend.
  }, []);

  return { games, error };
};
