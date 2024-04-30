import { Avatar } from "@mui/material";
import "./Suggestions.css";

export default function Suggestions() {
  return (
    <>
      <div className='suggestions-container'>
        <div className='suggestions-title'>
          <p className='suggestions-foryou'>Suggestions for you</p>
          <p className='suggestions-seeall'>See all</p>
        </div>
        <div className='suggestions-users-container'>
          <div className='suggestions-users'>
            <Avatar className='suggestions-user-avatar' />
            <div className="suggestions-user-text">
              <p className='suggestions-username'>Username</p>
              <p className='suggestions-bio'>Suggestions</p>
            </div>
            <p className='suggestions-follow'>Follow</p>
          </div>
          <div className='suggestions-users'>
            <Avatar className='suggestions-user-avatar' />
            <div className="suggestions-user-text">
              <p className='suggestions-username'>Username</p>
              <p className='suggestions-bio'>Suggestions</p>
            </div>
            <p className='suggestions-follow'>Follow</p>
          </div>
          <div className='suggestions-users'>
            <Avatar className='suggestions-user-avatar' />
            <div className="suggestions-user-text">
              <p className='suggestions-username'>Username</p>
              <p className='suggestions-bio'>Suggestions</p>
            </div>
            <p className='suggestions-follow'>Follow</p>
          </div>
          <div className='suggestions-users'>
            <Avatar className='suggestions-user-avatar' />
            <div className="suggestions-user-text">
              <p className='suggestions-username'>Username</p>
              <p className='suggestions-bio'>Suggestions</p>
            </div>
            <p className='suggestions-follow'>Follow</p>
          </div>
          <div className='suggestions-users'>
            <Avatar className='suggestions-user-avatar' />
            <div className="suggestions-user-text">
              <p className='suggestions-username'>Username</p>
              <p className='suggestions-bio'>Suggestions</p>
            </div>
            <p className='suggestions-follow'>Follow</p>
          </div>
        </div>
      </div>
    </>
  );
}
