import { Button } from "@chakra-ui/react";

const StyledButton = ({ bgDefault, bgHover, color, text, size="lg", handleClick }) => {
  return (
    <Button
      border={`1px solid ${bgHover}`}
      bgColor={bgDefault}
      _hover={{ bgColor: bgHover, color: bgDefault }}
      color={color}
      size={size}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default StyledButton;
