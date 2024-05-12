import {
  Container,
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import StatusBar from "../StatusBar/StatusBar";
import  useGetFeedPosts  from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const { isLoading, posts } = useGetFeedPosts();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
      <Flex justifyContent={"center"}>
        <StatusBar />
      </Flex>
      <Container maxW={"container.sm"} py={0} px={2}>
        {isLoading &&
          [0, 1, 2, 3].map((_, idx) => (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
              <Flex gap='2'>
                <SkeletonCircle size='10' />
                <VStack gap={2} alignItems={"flex-start"}>
                  <Skeleton height='10px' w={"200px"} />
                  <Skeleton height='10px' w={"200px"} />
                </VStack>
              </Flex>
              <Skeleton w={"full"}>
                <Box h={"500px"}>content</Box>
              </Skeleton>
            </VStack>
          ))}
        {!isLoading &&
          posts.length > 0 &&
          posts.map((post) => <FeedPost post={post} key={post.id} />)}
        {!isLoading && posts.length === 0 && 
        (
          <>
          <Text fontSize={"md"} color={"red.400"} textAlign={"center"}>
            No friends? You look lonely, I can fix that.
          </Text>
          <Text textAlign={"center"} color={"red.400"}>Follow some users from the suggested ones on your right.</Text>
          </>
        )
        }
      </Container>
    </>
  );
};

export default FeedPosts;
