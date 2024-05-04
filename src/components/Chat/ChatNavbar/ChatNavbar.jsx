import { Avatar, Flex, Image, Text } from "@chakra-ui/react"
import i from "../../../images/i-white.svg"
import telephone from "../../../images/telephone-white.svg"
import video from "../../../images/video.svg"
import useChatStore from "../../../store/chatStore"


const ChatNavbar = () => {
  const selectedUser = useChatStore((state)=>state.user)
  return (
    <><Flex w={"full"}  justifyContent={"space-between"} alignItems={"center"} h={75} borderBottom={"1px solid"} borderColor={"whiteAlpha.400"} px={4}>
        <Flex gap={4} alignItems={"center"} cursor={"pointer"}>
        <Avatar size={"md"} src={selectedUser?.user.profilePicUrl}/>
        <Text fontSize={"lg"} fontWeight={500}>{selectedUser?.user.username}</Text>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
            
            <Image cursor={"pointer"} src={telephone}/>
            <Image cursor={"pointer"}  src={video}/>
            <Image cursor={"pointer"}  src={i} />
        </Flex>

        </Flex></>
  )
}

export default ChatNavbar