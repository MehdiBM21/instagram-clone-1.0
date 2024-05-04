import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import useAuthStore from "../../../store/authStore";
import useChatStore from "../../../store/chatStore";
import { Box } from "@chakra-ui/react";
import { v4 } from "uuid";

const ChatItems = () => {
  const [chats, setChats] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const setSelectedUser = useChatStore((state) => state.setUser);
  // const {dispatch} = useContext(ChatContext);


  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "userChats", authUser.uid),
      (doc) => {
        setChats(doc.data());
      }
    );
    return () => {
      unsub();
    };
  }, [authUser.uid]);
  const handleSelect = (u)=>{
    const combinedId = authUser.uid > u.uid ? authUser.uid + u.uid : u.uid + authUser.uid;
    try{

    setSelectedUser({user:u, chatId: combinedId});
    localStorage.setItem("selected-user", JSON.stringify({user:u, chatId: combinedId}));
    }catch(err){
      console.log(err)
    }
  }
  
  
  return (
    <>
      { chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        // console.log("user info : "),
        // console.log(chat[1].userInfo),
        <Box onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]}>
        <ChatItem
          
          username={chat[1].userInfo.username}
          profilePicUrl={chat[1].userInfo.profilePicUrl}
          lastMessage={chat[1].lastMessage?.text}
         
        /></Box>
      ))}
    </>
  );
};

export default ChatItems;
