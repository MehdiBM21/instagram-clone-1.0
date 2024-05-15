import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const ChatItem = (props) => {
  return (
    <>
      <Flex
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={{ base: 1, md: 2 }}
        w={{ base: 10, md: "full" }}
      >
    
        <Avatar size={{ base: "sm", md: "md" }} src={props.profilePicUrl} />
        <Box display={{ base: "none", md: "block" }}>
          <Text>{props.username}</Text>
          <Text color={"gray.400"} fontSize={"sm"} paddingTop={1} maxW={"150px"} overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
            {props.lastMessage}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default ChatItem;
