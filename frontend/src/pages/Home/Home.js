import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../features/categories/categoriesSlice";
import {
  Box,
  Grid,
  Text,
  GridItem,
  Container,
  Flex,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/layout";
import ResourceLink from "../../components/ResourceLink";
import Banner from "../../components/sections/Banner";
import { customTheme } from "../../theme";
import { Card, CardBody, Hide, Show } from "@chakra-ui/react";
import { FaDisease } from "react-icons/fa";
import { RiWomenLine, RiHeartAddFill, RiWalkLine } from "react-icons/ri";
import { FaRegHandPointer } from "react-icons/fa";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { BsCapsulePill } from "react-icons/bs";
import { GiKidneys, GiTripleNeedle } from "react-icons/gi";
import { GrScheduleNew } from "react-icons/gr";
import {
  MdOutlineDocumentScanner,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PageSection from "../../components/sections/PageSection";
import Footer from "../../components/Footer";

const Home = () => {
  const renderRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );
  const headerText = "Affordable Lab Testing With 24hr Turnaround!";
  const subtext =
    "No doctor's referral necessary or insurance necessary! We are a CLIA certified lab and typically provide lab results in 24hrs or less! We also make house calls. Inquire about our mobile lab testing service!";
  const button1Text = "Schedule Covid Test";
  const bgImage = [
    "linear-gradient(to right, rgba(0, 170, 166, .9), rgba(0, 170, 166, .75)),url(https://res.cloudinary.com/dowmtolou/image/upload/e_grayscale/v1660362823/trust-tru-katsande-6q5QG8iIgRo-unsplash_basuey.jpg)",
    "linear-gradient(to right, rgba(0, 170, 166, .9), rgba(0, 170, 166, .75)),url(https://res.cloudinary.com/dowmtolou/image/upload/e_grayscale/v1660362823/trust-tru-katsande-6q5QG8iIgRo-unsplash_basuey.jpg)",
    "linear-gradient(to left, rgba(255, 255, 255, .35), rgba(0, 170, 166, .7), rgba(0, 170, 166, 1)),url(https://res.cloudinary.com/dowmtolou/image/upload/e_grayscale/v1660362823/trust-tru-katsande-6q5QG8iIgRo-unsplash_basuey.jpg)",
  ];

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (renderRef.current !== null) {
      dispatch(getAllCategories());
    }
    renderRef.current = 1;
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleClick = (slug) => {
    navigate(slug);
  };

  return (
    <>
      <Banner
        img={bgImage}
        headerText={headerText}
        subtext={subtext}
        ctaText={button1Text}
        ctaLink={"categories/covid-services"}
        bgPosition={{ base: "center", md: "top center" }}
        color={customTheme.colors.secondary}
        textShadow={`.5px .5px ${customTheme.colors.secondary}`}
      ></Banner>
      {/* <Box>
        {categories.length ? (
          categories.map((cat) => {
            return <ResourceLink key={cat._id} type="svc" resource={cat} />;
          })
        ) : (
          <Text>No categories to display...</Text>
        )}
      </Box> */}
      {/* <Box backgroundColor={customTheme.colors.lightAccent} py={4}>
        <Flex justifyContent="center" alignItems="center" wrap="wrap">
          <RiWalkLine fontSize={"2rem"} />
          <Text
            mx={3}
            fontSize={customTheme.sections.content.text.sectionHeader.fontSize}
            fontWeight={
              customTheme.sections.content.text.sectionHeader.fontWeight
            }
          >
            Walk-ins Welcome!!
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            Call Us - (901) 860-4973
          </Text>
        </Flex>
      </Box> */}
      <Container py={{ base: 5, lg: 10 }} maxW={{ base: "auto", md: "90%" }}>
        <Grid
          templateColumns={{ base: "50% 50%", lg: "33.333% 33.333% 33.333%" }}
        >
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/routine-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
                textAlign="center"
              >
                <MdOutlineHealthAndSafety
                  fontSize={customTheme.icons.fontSize.default}
                />
                <Text
                  fontSize={"lg"}
                  fontWeight={
                    customTheme.sections.content.text.sectionHeader.fontWeight
                  }
                >
                  Routine Tests
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/heart-health-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
              >
                <RiHeartAddFill fontSize="3.25rem" />
                <Text fontSize={"lg"} fontWeight="bolder">
                  Heart Health
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/blood-based-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
              >
                <BiDonateBlood fontSize="3.25rem" />
                <Text fontSize={"lg"} fontWeight="bolder">
                  Blood Tests
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/urine-based-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
              >
                <BsCapsulePill fontSize="3.25rem" />
                <Text fontSize={"lg"} fontWeight="bolder">
                  Drug Tests
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/kidney-function-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
              >
                <GiKidneys fontSize="3.25rem" />
                <Text fontSize={"lg"} fontWeight="bolder">
                  Kidney Health
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/covid-services")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
              >
                <FaDisease fontSize="3.25rem" />
                <Text fontSize={"lg"} fontWeight="bolder">
                  Covid-19
                </Text>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem
            cursor="pointer"
            onClick={() => handleClick("categories/womens-health-panels")}
          >
            <Card
              _hover={{
                background: "rgba(0,156,171, .1)",
              }}
              borderRadius={0}
              minH="12rem"
              boxShadow="none"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap={6}
                textAlign="center"
              >
                <RiWomenLine fontSize={customTheme.icons.fontSize.default} />
                <Text
                  fontSize={"lg"}
                  fontWeight={
                    customTheme.sections.content.text.sectionHeader.fontWeight
                  }
                >
                  Women's Health
                </Text>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
      {/* <Box bgImage="linear-gradient(to left bottom, rgb(26, 32, 44), rgb(6, 158, 156))">
        <Box color={customTheme.colors.primary} pt={8}>
          
        </Box>
      </Box> */}
      {/* <Box borderTop="1px solid">
        <Text>How It Works</Text>
      </Box>
      <PageSection>
        <Card
          bgSize="cover"
          bgPosition={{ base: "center", md: "top center" }}
          bgImage="linear-gradient(to right, rgba(26, 32, 44, .75), rgba(6, 158, 156, .75)),url(https://res.cloudinary.com/dowmtolou/image/upload/v1681355677/nick-hillier-yD5rv8_WzxA-unsplash_g1rcaz.jpg)"
          h="auto"
          border={"1px solid black"}
        >
          <CardBody color="white" w={{ base: "100%", lg: "20vw" }}>
            <VStack>
              <Text fontSize="1.75rem" fontWeight="bolder">
                1.
              </Text>
              <Text>
                <FaRegHandPointer
                  fontSize={customTheme.icons.fontSize.default}
                />
              </Text>
              <Text fontSize="1.25rem" fontWeight="bolder">
                SCHEDULE A TEST
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <Show below={"lg"} color="white">
            <TbArrowBigRightLinesFilled
              transform="rotate(90)"
              fontSize={customTheme.icons.fontSize.default}
            />
          </Show>
          <Show above={"lg"}>
            <TbArrowBigRightLinesFilled
              transform="rotate(0)"
              fontSize={customTheme.icons.fontSize.default}
            />
          </Show>
        </Box>
        <Card
          bgSize="cover"
          bgPosition={{ base: "center", md: "top center" }}
          bgImage="linear-gradient(to right, rgba(26, 32, 44, .75), rgba(6, 158, 156, .75)),url(https://res.cloudinary.com/dowmtolou/image/upload/v1681356135/hush-naidoo-jade-photography-Zp7ebyti3MU-unsplash_bkbugq.jpg)"
          h="auto"
          border={"1px solid black"}
        >
          <CardBody color="white" w={{ base: "100%", lg: "20vw" }}>
            <VStack>
              <Text fontSize="1.75rem" fontWeight="bolder">
                2.
              </Text>
              <Text>
                <GiTripleNeedle fontSize={customTheme.icons.fontSize.default} />
              </Text>
              <Text fontSize="1.25rem" fontWeight="bolder">
                SUBMIT A SPECIMEN
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Box display="flex" justifyContent="center" alignItems="center" py={6}>
          <Show below={"lg"}>
            <TbArrowBigRightLinesFilled
              transform="rotate(90)"
              fontSize={customTheme.icons.fontSize.default}
            />
          </Show>
          <Show above={"lg"}>
            <TbArrowBigRightLinesFilled
              transform="rotate(0)"
              fontSize={customTheme.icons.fontSize.default}
            />
          </Show>
        </Box>
        <Card
          bgSize="cover"
          bgPosition={{ base: "center", md: "top center" }}
          bgImage="linear-gradient(to right, rgba(26, 32, 44, .75), rgba(6, 158, 156, .75)),url(https://res.cloudinary.com/dowmtolou/image/upload/v1681356337/national-cancer-institute-L8tWZT4CcVQ-unsplash_pq0udr.jpg)"
          h="auto"
          border={"1px solid black"}
        >
          <CardBody color="white" w={{ base: "100%", lg: "20vw" }}>
            <VStack>
              <Text fontSize="1.75rem" fontWeight="bolder">
                3.
              </Text>
              <Text>
                <MdOutlineDocumentScanner
                  fontSize={customTheme.icons.fontSize.default}
                />
              </Text>
              <Text fontSize="1.25rem" fontWeight="bolder">
                GET YOUR RESULTS
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </PageSection> */}
      <Footer />
    </>
  );
};

export default Home;
