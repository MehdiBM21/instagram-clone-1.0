import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import emoji from "../../../images/emoji.svg";
import upImage from "../../../images/upImage.svg";
import micro from "../../../images/micro.svg";
import heart from "../../../images/heart.svg";
import useChatStore from "../../../store/chatStore";
import useAuthStore from "../../../store/authStore";
import { useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../../config/firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputPanel = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const authUser = useAuthStore((state) => state.user);
  const selectedUser = useChatStore((state) => state.user);
  const handleSend = async (e) => {
    if (e.key === "Enter" && text !== "") {
      if (image) {
        const storageRef = ref(storage, v4());
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at: ", downloadURL);

                await updateDoc(doc(firestore, "chats", selectedUser.chatId), {
                  messages: arrayUnion({
                    id: v4(),
                    text: text,
                    senderId: authUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(firestore, "chats", selectedUser.chatId), {
          messages: arrayUnion({
            id: v4(),
            text: text,
            senderId: authUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
      await updateDoc(doc(firestore, "userChats", authUser.uid), {
        [selectedUser.chatId + ".lastMessage"]: {
          text,
        },
        [selectedUser.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(firestore, "userChats", selectedUser.user.uid), {
        [selectedUser.chatId + ".lastMessage"]: {
          text,
        },
        [selectedUser.chatId + ".date"]: serverTimestamp(),
      });
      setText("");
      setImage(null);
    }
  };
  return (
    <>
      <InputGroup px={3} maxW={"full"}>
        <InputLeftElement mx={5}>
          <Image src={emoji} cursor={"pointer"} />
        </InputLeftElement>
        <Input
          placeholder='Type here...'
          ml={2}
          borderRadius={45}
          onKeyDown={handleSend}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <InputRightElement mx={5}>
          <input
            id='file'
            type='file'
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor='file'>
            <Image src={upImage} cursor={"pointer"} />
          </label>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default InputPanel;
