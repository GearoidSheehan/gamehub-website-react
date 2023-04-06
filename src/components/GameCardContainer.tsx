import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

//Interface to allow a React element to be passed in
interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  //Box is a primitive component in Chakra UI. When rendered it returns a div.
  //Creates rounded corners on the cards with the overflow from the image hidden
  return (
    <Box width="300px" borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;
