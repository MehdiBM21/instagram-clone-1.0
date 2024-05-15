import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";


const useGetPostById = (postId) => {
    const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState(null);
    const showToast = useShowToast();

    useEffect(() => {
		const getPost = async () => {
			setIsLoading(true);
			setPost(null);
			try {
				const postRef = await getDoc(doc(firestore, "posts", postId));
				if (postRef.exists()) {
					setPost(postRef.data());
				}
			} catch (error) {
				showToast("Error", error.message, "error");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		getPost();
	}, [setPost, postId]);

  return { isLoading, post, setPost }
  
}

export default useGetPostById