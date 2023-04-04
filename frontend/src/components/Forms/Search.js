import { useState } from "react";
import axios from "axios";
import { Input, Text, Box } from "@chakra-ui/react";

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
      axios
        .get("/services/search/" + value)
        .then((response) => {
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
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Type to search our lab services"
        size="sm"
      />
      <Box mb={"2em"}>
        {results.length > 0 ? (
          results.map((result, i) => {
            return <Text key={result._id}>{result.title}</Text>;
          })
        ) : value === "" ? null : (
          <Text>No resuts found for "{value}"</Text>
        )}
      </Box>
    </>
  );
};

export default Search;
