import { Container, Flex, Stack } from "@chakra-ui/layout";
import { customTheme } from "../../theme";
const PageSection = ({bgColor="transparent", padding="50px 0", bgImage="transparent",...props}) => {
  return (
    <Flex
      align={{base: "center"}}
      justify={{ base: "center" }}
      direction={{ base: "column", md: "row" }}
      wrap="no-wrap"
      padding={padding}
      backgroundColor={bgColor}
      bgImage={bgImage}
    >
      <Container maxW={{ base: customTheme.sections.content.width }}>
        <Stack
          flexDir={{ base: "column", lg: "row" }}
        //   spacing={8}
          justify={{ base: "center", lg: "space-between" }}
          align={{ base: "left", lg: "center" }}
          maxW={{ base: "100%", lg: "100%" }}
        >
          {props.children}
        </Stack>
      </Container>
    </Flex>
  );
};

export default PageSection;
