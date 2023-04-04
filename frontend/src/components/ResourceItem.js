import { Text, Container } from "@chakra-ui/layout";
import { Stack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ResourceItem = (props) => {
  const navigate = useNavigate();
  const handleClick = (route) => {
    navigate(route);
  };
  return (
    <Container>
      <Stack mb="10">
        <Flex flexDirection={"column"} borderBottom={"1px solid"} pb="3">
          <Text
            curser="pointer"
            _hover={{ textDecoration: "" }}
            color="teal.500"
            onClick={() => handleClick(props.slug)}
          >
            {props.resource.title}
          </Text>
          <Text noOfLines={[1, 2]}>{props.resource.serviceDescription}</Text>
        </Flex>
      </Stack>
    </Container>
  );
};

export default ResourceItem;

export const ServiceItem = (props) => {
  return <ResourceItem resource={props.resource} slug={`/services/${props.slug}`} />;
};

export const CategoryItem = (props) => {
    return <ResourceItem resource={props.resource} slug={`/categories/${props.slug}`} />;
  };