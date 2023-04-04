import { Box } from "@chakra-ui/layout";
import { Link } from '@chakra-ui/react'


const CategoryLink = ({ category }) => {

  return (
    <>
      <Box key={category._id}>
        <Link
          href={process.env.REACT_APP_API_CAT_URL + category.slug}
          color='teal.500'
        >
          {category.name}
        </Link>
      </Box>
    </>
  );
};

export default CategoryLink;
