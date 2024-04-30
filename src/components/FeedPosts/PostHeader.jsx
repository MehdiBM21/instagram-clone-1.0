import { Avatar, Box, Flex, Text } from "@chakra-ui/react"


const PostHeader = (props) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={props.avatar} alt='profile pic' size={"sm"}/>
            <Flex fontSize={12} fontWeight={"bold"} gap="1.5" alignItems={"center"}>
                {props.username}
                <Flex color={"gray.500"} fontSize={12} alignItems={"center"}>
                    <Box fontSize={15} marginRight={1}>• </Box> 1w</Flex>
                
            </Flex>
        </Flex>
        <Box
        cursor={"pointer"}>
            <Text
            fontSize={12}
            color={"blue.500"}
            fontWeight={"bold"}
            _hover={{color:"white"}}
            transition={"all 0.2s ease-in-out"}>Unfollow</Text>
        </Box>
       
    </Flex>
  )
}

export default PostHeader