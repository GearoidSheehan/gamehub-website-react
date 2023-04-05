import { Text } from "@chakra-ui/react";
import { useGames } from "../hooks/useGames";

const GameGrid = () => {
  //Hook to make rawg.io API call
  const { games, error } = useGames();
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
