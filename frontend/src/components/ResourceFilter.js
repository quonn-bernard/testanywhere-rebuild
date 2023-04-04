import { Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const Filter = ({ resources, prefix }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`${prefix}${e}`);
  };
  const { slug } = useParams();

  return (
    <RadioGroup onChange={(e) => handleClick(e)} defaultValue={slug}>
      <VStack direction="row">
        {resources.map((resource) => {
          return (
            <Radio key={resource._id} value={resource.slug}>
              {resource.name}
            </Radio>
          );
        })}
      </VStack>
    </RadioGroup>
  );
};

export default Filter;

export const CategoryFilter = () => {
  return <Filter />;
};
