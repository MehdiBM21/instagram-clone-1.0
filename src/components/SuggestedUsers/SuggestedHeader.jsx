import { Avatar, Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useLogout from "../../hooks/useLogout";
const SuggestedHeader = () => {
  const {handleLogout, loading} = useLogout();
  const authUser = useAuthStore(state => state.user);
  if(!authUser) return null;
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar size={"md"} src={authUser?.profilePicURL}  />
        <Text fontSize={12} fontWeight={"bold"}>
        {authUser?.username}
        </Text>
      </Flex>
      <Button
      size={"xs"}
      background={"transparent"}
      _hover={{ background: "transparent", color: "white" }}
        fontSize={12}
        fontWeight={"medium"}
        color={"blue.400"}
        transition={"all 0.2s ease-in-out"}
        onClick={handleLogout}
        isLoading={loading}
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
