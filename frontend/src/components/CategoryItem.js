import { Text, Box } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const handleClick = (slug) => {
    navigate(`${process.env.REACT_APP_API_CAT_URL}${slug}`);
  };

  return (
    <>
      <Box key={category._id}>
        <Text
          _hover={{ textDecoration: "underline" }}
          cursor={"pointer"}
          onClick={() => handleClick(category.slug)}
        >
          {category.name}
        </Text>
      </Box>
    </>
  );
};

export default CategoryItem;
