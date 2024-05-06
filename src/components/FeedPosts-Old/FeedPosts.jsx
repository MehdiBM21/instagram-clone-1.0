import { Container, Box, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import StatusBar from "../StatusBar/StatusBar";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
  <Flex justifyContent={"center"} >
      <StatusBar/>
      </Flex>
    <Container maxW={"container.sm"} py={0} px={2}>
      
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>content</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && (
        <>
          <FeedPost username="Fahad" img="./img-post-4.jpg" avatar="./img2.png" />
          <FeedPost username="LJ" img="./img1.png" avatar="./img-post.jpg" />
          <FeedPost username="safa" img="./img3.png" avatar="./img2.png" />
          <FeedPost username="bliss" img="./img-post-3.jpg" avatar="./img1.png" />
        </>
      )}
    </Container>
    </>
  );
};

export default FeedPosts;