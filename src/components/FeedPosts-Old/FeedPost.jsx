// import { Box, Image } from "@chakra-ui/react";
// import PostHeader from "./PostHeader";
// import PostFooter from "./PostFooter";
// import useGetUserProfileById from "../../hooks/useGetUserProfileById";

// const FeedPost = ({post}) => {
//     const { userProfile } = useGetUserProfileById(post?.createdBy);
//   return (
//       <>
//           <PostHeader post={post} creatorProfile={userProfile} />
//           <Box my={2} borderRadius={4} overflow={"hidden"}>
//               <Image src={post.imageURL} alt={"FEED POST IMG"} />
//           </Box>
//           <PostFooter post={post} creatorProfile={userProfile} />
//       </>
//   );
// };

// export default FeedPost;

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