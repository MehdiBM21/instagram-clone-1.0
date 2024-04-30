import "./Post.css";
import Avatar from "@mui/material/Avatar";
import postImage from "../../images/post.jpg";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";
import bookmark from "../../images/save.svg";
import { useEffect, useState } from "react";


export default function Post(props) {
  const [commentsList, setCommentsList] = useState([]); 

  useEffect(() => {
    let data = [
      {
        "username": "Username1",
        "commentId": 1,
        "timeStamp": "2024-04-14T12:00:00Z",
        "description": "This is a comment!"
      },
      {
        "username": "Username2",
        "commentId": 2,
        "timeStamp": "2024-04-14T12:10:00Z",
        "description": "This is another comment!"
      },
      {
        "username": "Username3",
        "commentId": 3,
        "timeStamp": "2024-04-14T12:20:00Z",
        "description": "Yet another comment!"
      },
      {
        "username": "Username4",
        "commentId": 4,
        "timeStamp": "2024-04-14T12:30:00Z",
        "description": "One more comment!"
      }
    ];
    
    setCommentsList(data);
  }, []);
  return (
    <>
      <div className='post-container'>
        {/* Header */}
        <div className='post-header'>
          <Avatar className='post-header-image' />
          <p className='post-header-username'>{props.username} <span style={{color: "#8B8B8B"}}> • {props.timeStamp}</span></p>
          <a href='#'>...</a>
        </div>
        {/* Image */}
        <div>
          <img src={props.postImage} className='post-image' />
        </div>
        {/* Analytics */}
        <div>
          <div className="post-reactions">
            <div>
              <img src={love} className="post-reactimage"/>
              <img src={comment} className="post-reactimage"/>
              <img src={share} className="post-reactimage" />
            </div>
            <div>
              <img src={bookmark} className="post-reactimage" />
            </div>
          </div>
          <p className="post-likes">
            {props.likes} likes
          </p>
        </div>
        {/* Comments section */}
        <div className="post-comments">
          {commentsList.map((comment, index) => (
            <p key={index}><span>{comment.username}</span> {comment.description}</p>
          ))}
          <a href='#'>View all comments</a>
          <input type="text" placeholder="Add a comment..." className="post-commentbox"/>
        </div>
      </div>

    </>
  );
}
