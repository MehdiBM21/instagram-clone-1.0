import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = (props) => {
  return (
    <>
      <PostHeader username={props.username} avatar={props.avatar} />
      <Box my={2}>
        <Image
          src={props.img}
          alt='post image'
          borderRadius={4}
          overflow={"hidden"}
        />
      </Box>
      <PostFooter username={props.username} />
    </>
  );
};

export default FeedPost;
