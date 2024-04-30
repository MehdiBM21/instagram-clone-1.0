import { Avatar } from "@mui/material";
import "./InfoSection.css";
import eye from "../../images/eye.jpg";


export default function InfoSection() {
  return (
    <>
      <div className='info-container'>
        <Avatar className='info-avatar' src={eye}/>
        <div className="info-text">
          <p className="info-username">Username</p>
          <p className="info-bio">bio</p>
        </div>
        <p className="info-switch">Switch</p>
      </div>
    </>
  );
}
