import {
  Avatar,
  Box,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import X from "../../../images/X-white.svg";
import ChatItems from "../Chats/ChatItems";
import { useState } from "react";
import { collection, doc, getDoc,getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import useAuthStore from "../../../store/authStore";
import useChatStore from "../../../store/chatStore";

const SearchUser = (props) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const authUser = useAuthStore(state => state.user);
  const setSelectedUser = useChatStore(state => state.setUser)
  // const [err, setErr] = useState(false)

  const handleSearch = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", ">=", username),
        where("username", "<=", username + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const tempUsers = [];

      querySnapshot.forEach((doc) => {
        tempUsers.push(doc.data());
      });
      setUsers(tempUsers);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    props.setShowSearch(false)
    setUsername("")
    setUsers([])
  }

  const handleSelect = async (userData) => {
    // console.log("user clicked uid: " + userData.uid);
    // console.log("user logged in: " + authUser.uid);
    

   
    const combinedId = authUser.uid > userData.uid ? authUser.uid + userData.uid : userData.uid + authUser.uid;
    
    try {
    const res = await getDoc(doc(firestore, "chats", combinedId));
    
    if (!res.exists()) {
      await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
      await updateDoc(doc(firestore, "userChats", authUser.uid), {
   
        [combinedId + ".userInfo"]: {
          uid: userData.uid,
          username: userData.username,
          profilePicUrl: userData.profilePicURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      console.log("user added in authUser chat");
      
      
    
      await updateDoc(doc(firestore, "userChats", userData.uid), {
        [combinedId+".userInfo"]: {
          uid: authUser.uid,
          username: authUser.username,
          profilePicUrl: authUser.profilePicURL,
        },
        [combinedId+".date"]: serverTimestamp(),
      }); 
      console.log("user added in selected user chat");
      

    }
    handleClose();
    setSelectedUser({user:userData,chatId:combinedId});
    localStorage.setItem("selected-user", JSON.stringify({user:userData,chatId:combinedId}));
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        zIndex={999}
        position='absolute'
        top={0}
        left={0}
        right={0}
        backgroundColor='rgba(0, 0, 0, 0.5)'
        h={"100vh"}
        display={props.showSearch ? "flex" : "none"}

        // backgroundColor={"rgba(0, 0, 0, 0.1);"}
      >
        <Flex flexDir={"column"} background={"#262626"} borderRadius={10}>
          <Flex w={"full"}>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              textAlign={"center"}
              px={200}
              py={3}
            >
              Search User
            </Text>
            <Image
              src={X}
              cursor={"pointer"}
              pr={4}
              onClick={handleClose}
            />
          </Flex>
          <Input
            placeholder='Search User...'
            borderRadius={2}
            borderBottom={"1px solid"}
            borderTop={"1px solid"}
            borderColor={"whiteAlpha.300"}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyDown={handleSearch}
          />
          <Box overflowY={username.length === 0 ? "hidden" : "scroll"} h={"calc(100vh - 400px)"} pt={2}>
            {/* //TODO:: replace this */}
            {users.length!=0 ?
              users.map((userData, index) => (
               
                <Flex
                  key={index}
                  gap={4}
                  _hover={{ bg: "whiteAlpha.400" }}
                  borderRadius={6}
                  p={{ base: 1, md: 2 }}
                 alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() => handleSelect(userData)}
                >
                  {/* //TODO:: add user avatar */}
                  <Avatar
                    size={{ base: "sm", md: "md" }}
                    src={userData?.profilePicURL}
                  />
                  <Box>
                    <Text>{userData?.username}</Text>
                    <Text color={"gray.400"} fontSize={"sm"} paddingTop={1}>
                      {userData?.fullName}
                    </Text>
                  </Box>
                </Flex>
              )):
              <Text pt={5} pl={7} color={"#959595"}>No user found.</Text>}
          </Box>
          {/* <Button my={3} w={"90%"} alignSelf={"center"} background={"blue.300"}>
            Discussion
          </Button> */}
        </Flex>
      </Flex>
    </>
  );
};

export default SearchUser;
