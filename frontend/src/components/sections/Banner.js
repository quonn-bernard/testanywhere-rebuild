import { Container, Flex, Heading, Link, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { customTheme } from "../../theme";
import { useNavigate } from "react-router-dom";
import StyledButton from "../Buttons/StyledButton";

const Banner = ({
  img,
  headerText,
  subtext,
  ctaText,
  ctaLink,
  bgPosition,
  textShadow = "none",
  color = "primary",
  ...props
}) => {
    const navigate = useNavigate()
  return (
    <Flex
      align="flex-start"
      justify={{ base: "center" }}
      direction={{ base: "column", md: "row" }}
      wrap="no-wrap"
      padding={customTheme.sections.padding}
      bgImage={img}
      backgroundSize={"cover"}
      bgPosition={bgPosition}
      minH={["auto", "55vh"]}
    >
      <Container maxW={{ base: customTheme.sections.content.width }}>
        <Stack
          spacing={8}
          justify={{ base: "flex-start" }}
          align={["left"]}
          paddingX={{ base: "0" }}
          maxW={{ base: "100%", md: "40%" }}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color={color}
            textShadow={textShadow}
          >
            {headerText}
          </Heading>
          <Heading
            as="h2"
            size="md"
            color={color}
            fontWeight="normal"
            lineHeight={1.5}
            textShadow={textShadow}
          >
            {subtext}
          </Heading>
          <Link to={ctaLink}>
            <StyledButton handleClick={() => navigate(ctaLink)} bgDefault={customTheme.colors.primary} bgHover={customTheme.colors.secondary} color={customTheme.colors.secondary} text="Get A Covid Test" />
          </Link>
        </Stack>
        {props.children}
      </Container>
    </Flex>
  );
};

export default Banner;
