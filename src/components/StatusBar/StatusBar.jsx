import './StatusBar.css'
// import Avatar from "@";
import { useState, useEffect } from "react";
import pp1 from "../../images/pp1.png";
import pp2 from "../../images/pp2.png";
import uploadStatus from "../../images/statusadd.png";
import { Avatar, Flex, Text, VStack } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';



export default function StatusBar() {
  const [statusList, setStatusList] = useState([]);
  function getData() {
    let data = [
      {
        username: "Username",
        imageUrl: "",
      },
      {
        username: "second",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
      {
        username: "third",
        imageUrl: "",
      },
    ];

    setStatusList(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Flex
        key={uuidv4()}
        className='statusbar-container'
        alignItems={"center"}
        justifyContent={"space-around"}
        // marginLeft={20}
        // justifyContent={"center"}
        gap={2}
        overflow={"scroll"}
        maxW={{ sm:"350px", md:"500px", lg:"full"}}
        p={2}
        mb={10}
      >
        <img src={uploadStatus} className='statusbar-upload' />
        {statusList.map((status) => (
          // <div className='statusbar-status'>

          <VStack className='statusbar-status' key={uuidv4()}>
            <Avatar className='statusbar-img' size={"md"} />
            {/* <p className='statusbar-text' style={{maxWidth:"50px", overflow:"hidden"}}>{status.username}</p> */}
            <Text fontSize={12} overflow={"hidden"}>
              {status.username}
            </Text>
          </VStack>
          // </div>
        ))}
      </Flex>
    </>
  );
}
