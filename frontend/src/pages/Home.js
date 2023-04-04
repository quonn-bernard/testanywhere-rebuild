import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../features/categories/categoriesSlice";
import { Text } from "@chakra-ui/layout";
import { Link, Box } from "@chakra-ui/react";
import CategoryLink from "../components/CategoryLink";
import Search from "../components/Forms/Search";

const Home = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllCategories());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {categories.length ? (
        categories.map((cat) => {
          return <CategoryLink key={cat._id} category={cat} />;
        })
      ) : (
        <Text>No categories to display...</Text>
      )}
    </>
  );
};

export default Home;
