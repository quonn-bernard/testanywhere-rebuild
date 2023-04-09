import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../features/categories/categoriesSlice";
import { Text } from "@chakra-ui/layout";
import CategoryLink from "../components/CategoryLink";
import { render } from "react-dom";

const Home = () => {
  const renderRef = useRef(null)
  const dispatch = useDispatch();
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if(renderRef.current !== null){
      dispatch(getAllCategories());
    }
    renderRef.current = 1
  }, []);

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
