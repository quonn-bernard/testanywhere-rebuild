import { Button } from "@chakra-ui/react";

const DefaultButton = ({text, cb}) => {
  return (
    <Button onClick={cb} variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
      {text}
    </Button>
  );
};

export default DefaultButton;
