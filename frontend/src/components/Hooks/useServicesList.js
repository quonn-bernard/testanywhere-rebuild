import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServicesByCategoryWSlug } from "../../features/services/servicesSlice.js";

const useServices = (slug) => {
  const dispatch = useDispatch();
  const { services, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (slug !== undefined) {
      dispatch(getServicesByCategoryWSlug(slug));
    }
  }, [dispatch, isError, message, slug]);
  return { services, isLoading, isError, message };
};

export default useServices;
