import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../features/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllCategories())
    
  }, [dispatch, isError, message]);
  return { categories, isLoading, isError, message };
};

export default useCategories;
