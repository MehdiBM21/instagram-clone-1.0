import { Box,  Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import ChatSidebar from "../../components/Chat/ChatSidebar/ChatSidebar";
import Messages from "../../components/Chat/Messages/Messages";
import InputPanel from "../../components/Chat/InputPanel/InputPanel";
import ChatNavbar from "../../components/Chat/ChatNavbar/ChatNavbar";
import SearchUser from "../../components/Chat/SearchUser/SearchUser";
import useChatStore from "../../store/chatStore";

const ChatPage = () => {
    const [showSearch, setShowSearch] = React.useState(false)
    const selectedUser = useChatStore((state) => state.user);
    
  return (
    <>
    <SearchUser showSearch={showSearch} setShowSearch={setShowSearch}/>
      <Flex height={"100vh"}>
        {/* left side */}
        <Box  w={{ base: "67px", md: "297px" }} borderRight={"1px solid"} borderColor={"whiteAlpha.300"}
        >
          <Box w={{ base: "70px", md: "300px" }} h='full' paddingTop={7}>
            <ChatSidebar showSearch={showSearch} setShowSearch={setShowSearch} />
          </Box>
        </Box>
        {/* right side */}
        <Box flex={3} >
            
            <Flex direction={"column"} h='full' justifyContent={"space-between"} pb={5}>
            <ChatNavbar />
          {selectedUser && <Messages/>}
          <InputPanel/>
          </Flex>
        </Box>
      </Flex>
      </>
  );
};

export default ChatPage;
