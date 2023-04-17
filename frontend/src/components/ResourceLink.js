import { Box } from "@chakra-ui/layout";
import { Link } from '@chakra-ui/react'


const ResourceLink = ({ resource, type="cat" }) => {

  return (
    <>
      <Box key={resource._id}>
        <Link
          href={type === "svc" ? process.env.REACT_APP_API_CAT_URL + resource.slug : process.env.REACT_APP_API_SVC_URL + resource.slug}
          color='teal.500'
        >
          {resource.name}
          {resource.title}
        </Link>
      </Box>
    </>
  );
};

export default ResourceLink;
