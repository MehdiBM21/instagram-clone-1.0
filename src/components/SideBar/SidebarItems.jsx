// import CreatePost from "./CreatePost";
import { signOut } from "firebase/auth";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const SidebarItems = () => {
	const navigate = useNavigate();
	async function logOut() {
		//TODO:: remove this function from here
		try {
		  await signOut(auth);
		  navigate("/auth");
		//   console.log(userCredential);
		} catch (error) {
		  console.log(error);
		}
	  };
	return (
		<>
			<Home />
			<Search />
			<Notifications />
			{/* <CreatePost /> */}
			<ProfileLink />

			<button onClick={logOut}>Log out</button>
		</>
	);
};

export default SidebarItems;
