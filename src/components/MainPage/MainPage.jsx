import { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./MainPage.css";

export default function MainPage() {
    
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    let data = [
    {
      postId: 1,
      username: 'UserTest',
      likes: '1000',
      postImageUrl: 'https://picsum.photos/2000',
      timeStamp: '1 d'
    },
    {
      postId: 2,
      username: 'UserTest2',
      likes: '100 123',
      postImageUrl: 'https://picsum.photos/2001',
      timeStamp: '8 h'
    }
  ];
  setPostList(data);
}, []); 
  return (
    <>
     
      {postList.map((post) => (
        <Post
          key={post.postId}
          username={post.username}
          likes={post.likes}
          postImage={post.postImageUrl}
          timeStamp={post.timeStamp}
        />
      ))}
    </>
  );
}
