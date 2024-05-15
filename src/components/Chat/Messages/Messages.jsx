import { Box, Flex } from "@chakra-ui/react";
import Message from "./Message";
import useChatStore from "../../../store/chatStore";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useEffect, useState } from "react";
import  Picker  from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Messages = () => {
  const selectedUser = useChatStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  // console.log(selectedUser);
  // console.log("selected user from messages component: ")
  // console.log(selectedUser);

  useEffect(() => {
   const unSub = onSnapshot(doc(firestore, "chats", selectedUser.chatId), (doc) => {

    doc.exists() && setMessages(doc.data().messages);
    // console.log(messages);
   })

    return () => {
      unSub();
    };
  }, [selectedUser.chatId]);
  // console.log(messages);
  return (
    
    <>
    
    <Flex flexDir={"column"} gap={3} p={10} overflowY={"scroll"} h={"calc(100vh - 160px)"}  >
      {messages?.map((m) => (
      //  console.log(m) ,
       <Message message={m} key={m.id}/>
      ))}
     
      </Flex>
     {/* <Box z-index={990}>{renderEmojiPanel && 
          <Picker data={data} previewPostion="none"/>}
          </Box> */}
    </>
  );
};

export default Messages;
