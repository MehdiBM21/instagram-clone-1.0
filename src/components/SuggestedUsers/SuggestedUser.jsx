import { Avatar, Button, Flex, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const SuggestedUser = (props) => {
    const [isFollowed, setIsFollowed] = useState(false)
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={props.avatar} name={props.username} size={"sm"}/>
            <VStack spacing={2} alignItems={"flex-start"}>
                <Text fontSize={12} fontWeight={"bold"}>{props.username}</Text>
                <Text fontSize={11} color={"gray.500"}>{props.followers} followers</Text>
            </VStack>
  
        </Flex>
        <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={"max-content"}
        fontWeight={"medium"}
        color={"blue.400"}
        _hover={{ color: "white" }}
        onClick={() => setIsFollowed((isFollowed) =>!isFollowed)}>
            {isFollowed ? "Unfollow" : "Follow"}
        </Button>
        
    
    </Flex>
  )
}

export default SuggestedUser