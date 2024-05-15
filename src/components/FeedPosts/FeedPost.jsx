import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from '../../hooks/useGetUserProfileById';

const FeedPost = ({post}) => {
  const {userProfile} = useGetUserProfileById(post.createdBy);
  // console.log(post);
  console.log(userProfile);
  return (
    <>
    
      <PostHeader post={post} creatorProfile = {userProfile}/>
      <Box my={2}>
        <Image
          src={post.imageURL}
          alt='post image'
          borderRadius={4}
          overflow={"hidden"}
        />
      </Box>
      <PostFooter post={post} creatorProfile = {userProfile} />
    </>
  );
};

export default FeedPost;
