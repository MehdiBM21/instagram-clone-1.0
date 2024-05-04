import { Box, Flex, Image, Input, Link, Text, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo } from "../../../assets/constants";
import SidebarItems from "../../SideBar/SidebarItems";
import newMessage from "../../../images/newMessage-white.svg";
import ChatItem from "../Chats/ChatItem";
import ChatItems from "../Chats/ChatItems";
import useAuthStore from "../../../store/authStore";


const ChatSidebar = (props) => {
    const authUser = useAuthStore(state => state.user);
  return (
    <>
      <Box
        w='full'
   
        // py={10}
        // position={"sticky"}
        top={0}
        left={0}
        px={{ base: 1}}
      >
        <Flex direction={"column"} gap={10} w='full' height='full'>
        <Box
        //   to={"/"}
        //   as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor='pointer'
        >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Text
                fontSize={"lg"}
                fontWeight={"bold"}>{authUser.username}</Text>
                <Tooltip
			hasArrow
			label={"New Message"}
			placement='right'
			ml={1}
			openDelay={500}
			display="block"
		>
			<Box
				display={"flex"}
				alignItems={"center"}
				
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={10}
				justifyContent="center"
			>
                <Image src={newMessage} w='full' alt="new Message" onClick={() => props.setShowSearch(true)} />
			</Box>
		</Tooltip>
            </Flex>
          
        </Box>
        <Box
        //   to={"/"}
          
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.300" }}
          w={{ base: 10 }}
          cursor='pointer'
        >
         <Image src={newMessage} w='full' alt="newMessage" onClick={() => props.setShowSearch(true)} />
        </Box>
        <Flex direction={"column"} gap={5} cursor={"pointer"} overflowY={"scroll"} h={"calc(100vh - 110px)"}>
          
       <ChatItems/>

        </Flex>
        
        </Flex>


      </Box>
    </>
  );
};

export default ChatSidebar;
