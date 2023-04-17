import {
    Box,
    Container,
    Stack,
    Text,
    Link,
  } from "@chakra-ui/react";
  
  const Footer = () => {
    return (
      <Box boxShadow="xl" bg={"#000"} color={"#fff"}>
        <Container
          as={Stack}
          maxW={"container.xl"}
          pt={4}
          pb={6}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack justifyContent="space-between" direction={"row"} spacing={{base: 24, lg: 6}}>
            <Link href={"#"}>Privacy Statement</Link>
            <Link href={"#"}>Terms of Use</Link>
          </Stack>
          <Text>© 2022 Test Anywhere Labs. All rights reserve<Link href={"/login"}>d</Link></Text>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
