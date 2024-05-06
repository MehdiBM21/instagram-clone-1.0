import React from 'react'
import useShowToast from "./useShowToast.js";
import {arrayRemove, arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import { firestore } from "../config/firebase";
const useLikePost=(post)=>{
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] =useState(post.likes.length);
    const [isLiked,setIsliked]=useState(post.likes.includes(authUser?.uid));
    const authUser = useAuthStore((state) => state.user);
    const showToast=useShowToast();
    const handleLikePost = async () => {
        if(isUpdating) return;
        if(!authUser) return showToast('Error','You must be logged in to like this post','error');
        setIsUpdating(true);
        try
        {
            const postRef=doc(firestore, 'post',post.id);
            await updateDoc(postRef,{
                likes:isLiked ? arrayRemove(authUser.uid):arrayUnion(authUser.uid)
            })
            setIsliked(!isLiked);
            isLiked ? setIsliked(likes-1) : setIsliked(likes+1);

        }catch (error){
            showToast('Error',error.message,'error');
        }finally {
            setIsUpdating(false);
        }
    }
    return {isLiked,likes,handleLikePost,isUpdating};

}
export default useLikePost