import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
	const [isLoading, setIsLoading] = useState(true);
	const showToast = useShowToast();
	const { userProfile, setUserProfile } = useUserProfileStore();





	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const q = query(collection(firestore, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

				setUserProfile(userDoc);

				// console.log(isLoading);
			} catch (error) {
				showToast("Error", error.message, "error");
				// console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		getUserProfile();
	}, [username]);

	return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
