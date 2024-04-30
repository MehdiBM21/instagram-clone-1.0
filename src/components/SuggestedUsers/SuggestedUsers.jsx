import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import { color } from "framer-motion";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>

        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See all
        </Text>
      </Flex>
      <SuggestedUser username="Mehdi_Baallal" followers={1503} avatar="https://picsum.photos/500"/>
      <SuggestedUser username="Nassim_Mita" followers={1600} avatar="https://picsum.photos/501"/>
      <SuggestedUser username="Ennouass_Mohammed" followers={1430} avatar="https://picsum.photos/502"/>

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2024 Built By{" "}
        <Link
          href='https://www.youtube.com/watch?v=Dx25qQoulLQ'
          target='_blank'
          color={"blue.500"}
          fontSize={14}
        >
          Mehdi BM
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
