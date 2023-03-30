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
  useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../features/categories/categoriesSlice";

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

  const ISLoading = () => {
    if (isLoading) {
      return <p></p>;
    }
  }
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  return (
    <>
     {ISLoading()}
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"/"}
              >
                Logo
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {categories.map((category) => (
                <NavLink
                  key={category._id}
                  href={`${process.env.REACT_APP_API_CAT_URL}${category.slug}`}
                >
                  {category.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <Link
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={`${process.env.REACT_APP_API_CAT_URL}`}
              >
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                >
                  Schedule Lab Test
                </Button>
              </Link>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
