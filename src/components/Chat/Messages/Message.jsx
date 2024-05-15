import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import useAuthStore from "../../../store/authStore";
import useChatStore from "../../../store/chatStore";
import {timeAgo} from "../../../utils/timeAgo";

const Message = (props) => {
  const authUser = useAuthStore((state) => state.user);
  const selectedUser = useChatStore((state) => state.user);
  const isOwner = props.message.senderId === authUser.uid;
  const ref = useRef();
// console.log(selectedUser);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  return (
    <>
      <Flex
        gap={2}
        alignItems={"center"}
        flexDir={isOwner ? "row-reverse" : "row"}
        ref={ref}
      >
        <Avatar
          size={"sm"}
          src={
            isOwner ? authUser?.profilePicURL : selectedUser?.user.profilePicUrl
          }
        />
        <Flex flexDir={"column"} gap={1}>
          <Box
            background={isOwner ? "blue.300" : "#262626"}
            p={2}
            borderRadius={
              isOwner ? "20px 5px 20px  20px" : "5px 20px 20px 20px"
            }
            w={"max-content"}
            maxW={{ base: "200px", md: "300px" }}
          >
            {props.message.text}
            <Image
              src={props.message.img}
              maxW={{ base: "100px", md: "200px" }}
              overflow={"hidden"}
              alt='image'
              display={props.message.img ? "block" : "none"}
            />
          </Box>
          <Text color={"gray.400"} fontSize={"xs"} alignSelf={isOwner && "end"}>
            {timeAgo(props.message.date)}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Message;
