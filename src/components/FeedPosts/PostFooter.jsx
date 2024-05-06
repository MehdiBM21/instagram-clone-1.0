import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import {GoHeart, GoHeartFill} from "react-icons/go";
import { RiChat3Line } from "react-icons/ri";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";

const PostFooter = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handleLike = () => {
    setLiked((liked) => !liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
  };
  return (
    <Box mb={10}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt ={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? <GoHeart size={25} strokeWidth={0.5} /> : <GoHeartFill size={25} strokeWidth={1} color="red"/>}
        </Box>

        <Box cursor={"pointer"} fontSize={18}>
          <RiChat3Line size={25}  />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"} mb={1}>
        {likes} likes
      </Text>
      <Text fontSize={"sm"} fontWeight={700}>
        {props.username}{" "}
        <Text as='span' fontWeight={400} >
          Kayn chwya dial caractère dial asad
        </Text>
      </Text>
      <Text fontSize={"sm"} color={"gray"} mt={1} cursor={"pointer"}>
        View all 1,000 comments
      </Text>

      <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
      w={"full"}>
        <InputGroup>
        <Input  variant={"flushed"} placeholder={"Add a comment..."} fontSize={14}/>
        <InputRightElement>
        <Button
        fontSize={14}
        color={"blue.500"}
        fontWeight={600}
        cursor={"pointer"}
        _hover={{color:"white"}}
        bg={"transparent"}>Post</Button>
        </InputRightElement>

        
        </InputGroup>

      </Flex>
    </Box>
  );
};

export default PostFooter;
