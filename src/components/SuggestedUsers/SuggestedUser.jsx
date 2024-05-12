import { Avatar, Button, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";

const SuggestedUser = ({ user, setUser }) => {
  if (!user) return;
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollow = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower !== authUser.uid)
        : [...user.followers, authUser.uid],
    });
  };
  return (
    user && (
      <Flex
        p={2}
        borderRadius={6}
        _hover={{ bg: "whiteAlpha.400" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"full"}
      >
        <Link
        to={`/${user.username}`}
        as={RouterLink}
        _hover={{ textDecoration: "none" }}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={user.profilePicURL} name={user.fullName} size={"sm"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            <Text fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Text>
            <Text fontSize={11} color={"gray.500"}>
              {user.followers?.length} followers
            </Text>
          </VStack>
        </Flex>
        </Link>
        {authUser.uid !== user.uid && (
          <Button
            fontSize={13}
            bg={"transparent"}
            p={0}
            h={"max-content"}
            fontWeight={"medium"}
            color={"blue.400"}
            _hover={{ color: "white" }}
            onClick={onFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Flex>
    )
  );
};

export default SuggestedUser;
