import { useState } from "react";
import axios from "axios";
import {
  Input,
  Text,
  Box,
  Container,
  HStack,
  InputGroup,
  InputAddon,
  InputLeftAddon,
  color,
} from "@chakra-ui/react";
import { customTheme } from "../../theme";
import { GrSearch } from "react-icons/gr";
import ResourceLink from "../ResourceLink";

import "./style.css";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim() !== "") {
      queryServices(event.target.value);
    } else {
      setResults((prev) => (prev = []));
    }
  };

  const queryServices = (value) => {
    try {
      axios.get("/services/search/" + value).then((response) => {
        let searchResults = response.data.map((item) => {
          return item;
        });
        setResults((prev) => (prev = searchResults));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      backgroundColor={customTheme.colors.accent}
      borderBottom="1.5px solid black"
      borderTop="1px solid black"
    >
      <Box w={customTheme.sections.content.width}>
        <Container maxW={{ base: customTheme.sections.content.width }}>
          <HStack>
            <InputGroup color="whiteAlpha.100">
              <InputLeftAddon bgColor="transparent" border="none">
                <BsSearch color="white" />
              </InputLeftAddon>
              <Input
                padding={0}
                value={value}
                onChange={handleChange}
                placeholder="Type to search our lab services"
                size="md"
                border="none"
                borderRadius={0}
                position="relative"
                _focus={{ outline: "0px solid transparent" }}
                _focusVisible={{
                  outlineOffset: "0px",
                  border: "none",
                  boxShadow: "none",
                }}
                color="white"
              />
            </InputGroup>
          </HStack>
        </Container>
      </Box>
      <Box
        position="absolute"
        borderBottom={`.25px solid ${customTheme.colors.accent}`}
        bgImage={[
          "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, .9))",
          "linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, .5))",
        ]}
        w="100%"
      >
        {results.length > 0 ? (
          results.map((result, i) => {
            console.log(result);
            return <ResourceLink resource={result} key={result._id} />;
          })
        ) : value === "" ? null : (
          <Text>No resuts found for "{value}"</Text>
        )}
      </Box>
    </Box>
  );
};

export default Search;
