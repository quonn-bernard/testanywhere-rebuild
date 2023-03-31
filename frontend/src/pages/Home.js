import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories} from "../features/categories/categoriesSlice";
import { Text } from "@chakra-ui/layout";
import { Link, Box } from "@chakra-ui/react";
import CategoryItem from "../components/CategoryItem";
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
      <Text>Home</Text>
      <Search />
        {categories.length ? (
          categories.map((cat) => {
            return (
                <Box key={cat._id}>
              <CategoryItem category={cat} />
              </Box>
            );
          })
        ) : (
          <Text>No categories to display...</Text>
        )}
      </>
  );
};

export default Home;
