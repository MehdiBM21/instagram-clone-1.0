// import CreatePost from "./CreatePost";
import { signOut } from "firebase/auth";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const SidebarItems = () => {
	
	return (
		<>
			<Home />
			<Search />
			<Notifications />
			{/* <CreatePost /> */}
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
