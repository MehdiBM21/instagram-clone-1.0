import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { RiChat3Line } from "react-icons/ri";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useLikePost from "../../hooks/useLikePost";
import useAuthStore from "../../store/authStore";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentModal";
const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  // const [liked, setLiked] = useState(false);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const { isLiked, likes, handleLikePost } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  const commentRef = useRef(null);
  return (
    <Box mb={10}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? (
            // <GoHeart size={25} strokeWidth={0.5} />
            <NotificationsLogo />
          ) : (
            // <GoHeartFill size={25} strokeWidth={1} color='red' />
            <UnlikeLogo />
          )}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          {/* <RiChat3Line size={25} /> */}
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"} mb={1}>
        {likes} likes
      </Text>
      {isProfilePage && (
        <Text fontSize='12' color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize={"sm"}
              color={"gray"}
              mt={1}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {/* what is below is only rendered if we are in the home page */}
          {isOpen && (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          )}
        </>
      )}

      {authUser && (
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
