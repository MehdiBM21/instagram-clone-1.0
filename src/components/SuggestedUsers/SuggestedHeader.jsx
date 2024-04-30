import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src='./img2.png'  />
        <Text fontSize={12} fontWeight={"bold"}>
          Username
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={12}
        fontWeight={"medium"}
        color={"blue.400"}
        _hover={{ color: "white" }}
        transition={"all 0.2s ease-in-out"}
      >
        Log out
      </Link>
    </Flex>
  );
};

export default SuggestedHeader;
