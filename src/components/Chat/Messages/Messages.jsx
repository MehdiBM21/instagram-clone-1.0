import { Flex } from "@chakra-ui/react";
import Message from "./Message";
import useChatStore from "../../../store/chatStore";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { useEffect, useState } from "react";

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
    <Flex flexDir={"column"} gap={3} p={10} overflowY={"scroll"} h={"calc(100vh - 160px)"}>
      {messages?.map((m) => (
      //  console.log(m) ,
       <Message message={m} key={m.id}/>
      ))}
      {/* <Message isOwner={true}/>
      <Message />
      <Message imageUrl="https://picsum.photos/500/700"/>
      <Message isOwner={true}/>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message /> */}
      </Flex>
    </>
  );
};

export default Messages;
