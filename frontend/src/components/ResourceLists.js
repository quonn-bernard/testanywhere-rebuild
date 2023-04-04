import { Text } from "@chakra-ui/layout";
import { ServiceItem, CategoryItem } from "./ResourceItem";

export const ServicesList = ({ payload }) => {
  
    return (
      <>
        {payload.length ? (
          payload.map((resource) => {
            return (
              <ServiceItem
                key={resource._id}
                resource={resource}
                slug={resource.slug}
              />
            );
          })
        ) : (
          <Text>Nothing to display...</Text>
        )}
      </>
    );
  };

  export const CategoriesList = ({ payload }) => {
    return (
      <>
        {payload.length ? (
          payload.map((resource) => {
            return (
              <CategoryItem
                key={resource._id}
                resource={resource}
                slug={resource.slug}
              />
            );
          })
        ) : (
          <Text>Nothing to display...</Text>
        )}
      </>
    );
  };