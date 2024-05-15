import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import i from "../../../images/i-white.svg";
import telephone from "../../../images/telephone-white.svg";
import video from "../../../images/video.svg";
import useChatStore from "../../../store/chatStore";
import { Link } from "react-router-dom";

const ChatNavbar = () => {
  const selectedUser = useChatStore((state) => state.user);
  // console.log(selectedUser);
  return (
    <>
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={75}
        borderBottom={"1px solid"}
        borderColor={"whiteAlpha.400"}
        px={4}
      >
        <Link
          to={`/${selectedUser?.user.username}`}
          _hover={{ textDecoration: "none" }}
        >
          <Flex gap={4} alignItems={"center"} cursor={"pointer"}>
            <Avatar size={"md"} src={selectedUser?.user.profilePicUrl} />
            <Text fontSize={"lg"} fontWeight={500}>
              {selectedUser?.user.username}
            </Text>
          </Flex>
        </Link>
        <Flex gap={4} alignItems={"center"}>
          {/* <Image cursor={"pointer"} src={telephone} />
          <Image cursor={"pointer"} src={video} /> */}
          <Link
            to={`/${selectedUser?.user.username}`}
            _hover={{ textDecoration: "none" }}
          >
            <Image cursor={"pointer"} src={i} />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default ChatNavbar;
