import { useParams } from "react-router-dom";
import useServices from "../components/Hooks/useServicesList.js";
import useCategories from "../components/Hooks/useCategoriesList.js";
import { ServicesList } from "../components/ResourceLists.js";
import ResourceFilter from "../components/ResourceFilter.js";

const ServicesByCategoryTemplate = () => {
  const { slug } = useParams();
  const { services, isLoading } = useServices(slug);
  const {categories } = useCategories()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <><ResourceFilter prefix='/categories/' resources={categories}/><ServicesList payload={services} /></>;
};

export default ServicesByCategoryTemplate;
