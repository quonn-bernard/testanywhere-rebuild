import { Button } from "@chakra-ui/react";
import { Text, Box } from "@chakra-ui/layout";
const SingleService = (service) => {
    return ( 
        <>
            <Box>
              <Text>{service.service.title}</Text>
              <Text>{service.service.serviceDescription}</Text>
            </Box>
        </>
     );
}
 
export default SingleService;