import { useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  Image,
  Container,
  Show,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../features/categories/categoriesSlice";
import { customTheme } from "../theme";

const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllCategories());
  }, [dispatch, isError, message]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={0} bg={useColorModeValue("gray.100", "gray.900")}>
      <Container maxW={{ base: customTheme.sections.content.width }}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box maxW={{ base: "53vw", lg: "15vw" }} mt="5px">
              <Link px={2} rounded={"md"} href={"/"}>
                <Image src="https://res.cloudinary.com/dowmtolou/image/upload/v1681358057/Test_Anywhere_Lab_Logos_jodx5t.png" />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* {categories.map((category) => (
                <NavLink
                  key={category._id}
                  href={`${process.env.REACT_APP_API_CAT_URL}${category.slug}`}
                >
                  {category.name}
                </NavLink>
              ))} */}
              <NavLink
                href="about-us"
              >
               About
              </NavLink>
              <NavLink
                href="about-us"
              >
               Contact Us
              </NavLink>
              <NavLink
                href="about-us"
              >
               lab Tests
              </NavLink>
              <NavLink
                href="about-us"
              >
               How It Works
              </NavLink>
              <NavLink
                href="about-us"
              >
               FAQ's
              </NavLink>
            </HStack>
            <Link
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              href={`${process.env.REACT_APP_API_CAT_URL}`}
              px={3}
            >
              <Show above="lg">
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                >
                  Get Tested
                </Button>
              </Show>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
