import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Text, Box } from "@chakra-ui/layout";
import { getLabServiceBySlug } from "../features/services/servicesSlice";
import SingleService from "../components/SingleService";

const Service = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentService, isLoading, isError, message } = useSelector(
    (state) => state.services
  );
  const { slug } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      dispatch(getLabServiceBySlug(slug));
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, isError, message, slug]);

//   const handleClick = () => {
//     localStorage.setItem("serviceID", JSON.stringify(currentService["0"]._id));
//     navigate("/services/appointment1");
//   };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {currentService.length ? (
        currentService.map((svc) => {
          return (
            <SingleService key={svc._id} service={svc} />
          );
        })
      ) : (
        <Text>No services found to display!...</Text>
      )}

      {/* <Button
        variant={"solid"}
        colorScheme={"teal"}
        size={"sm"}
        mr={4}
        onClick={() => handleClick()}
      >
        Schedule Lab Test
      </Button> */}
    </>
  );
};

export default Service;