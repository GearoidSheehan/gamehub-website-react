import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

//Interface for an individual game object returned from the rawg.io API
interface Game {
  id: number;
  name: string;
}

//Interface for the array of game objects returned from the rawg.io API
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  //Saving the state of the games returned from the rawg.io API and/or the errors
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  //API call to the rawg.io API to get the array of games, with error handling
  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  });

  return (
    //If error occurs in rawg.io API call then show error text. Otherwise show return from API as a list
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
