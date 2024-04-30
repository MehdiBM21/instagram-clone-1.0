import { Box, Container, Flex } from '@chakra-ui/react'
import FeedPosts from '../FeedPosts/FeedPosts'
import SuggestedUsers from '../SuggestedUsers/SuggestedUsers'
import StatusBar from '../StatusBar/StatusBar'

const HomePageV2 = () => {
  return (
    <>
    <Container maxW={"container.lg"}>
        <Flex gap={20} >
            <Box flex={2} py={10} >
                <FeedPosts/>
            </Box>
            <Box flex={3} mr={20}
            display={{base:"none",md:"none", lg:"block"}}
            maxW={"300px"}
            >
                <SuggestedUsers/>
            </Box>
        </Flex>
    </Container>
    </>
  )
}

export default HomePageV2