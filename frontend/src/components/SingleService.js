import {
  Text,
  Box,
  Heading,
  Badge,
  ListItem,
  UnorderedList,
} from "@chakra-ui/layout";
import CategoryLink from "./CategoryLink";

const SingleService = (service) => {
  service = service.service;
  return (
    <>
      <Box>
        <Heading>{service.title}</Heading>
        <Text>{service.serviceDescription}</Text>
        <Text fontWeight="bold">Tests For: </Text>
        <UnorderedList>
          {service.serviceBulletpoints.map((point) => {
            return <ListItem key={point._id}>{point.bulletpoint}</ListItem>;
          })}
        </UnorderedList>

        {service.categories.map((cat) => {
          return (
            <Badge key={cat._id} mr={3}>
              <CategoryLink category={cat} />
            </Badge>
          );
        })}
        {service.faqs.map((faq) => {
          return (
            <Box key={faq._id}>
              <Text fontSize="md" fontWeight="bold">
                {faq.question}
              </Text>
              <Text>{faq.answer}</Text>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default SingleService;
