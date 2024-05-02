import {  useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../config/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

    const usersRef = collection(firestore, "users");
    const emailQuery = query(usersRef, where("email", "==", inputs.email));
    const emailQuerySnapshot = await getDocs(emailQuery);
    if(!emailQuerySnapshot.empty){
      showToast("Error", "Email already taken!", "error");
      return;
    }

    const usernameQuery = query(usersRef, where("username", "==", inputs.username));
    const usernameQuerySnapshot = await getDocs(usernameQuery);
    if(!usernameQuerySnapshot.empty){
      showToast("Error", "Username already taken!", "error");
      return;
    }

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;

// ------------API LOGIC--------------
  // let payload = {
        //     userId: newUser.user.uid,
        //     username: inputs.username,
        //     fullName: inputs.fullName,
        //     email: inputs.email,
        //     password: inputs.password,
        //     bio: "",
        //     profileImage: "https://picsum.photos/500",

        //   };
        //   const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(payload),
        //   };
        //   await fetch("http://localhost:8181/users", requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log(data);
        //     })
        //     .catch((error) => console.error("Api error: " + error));