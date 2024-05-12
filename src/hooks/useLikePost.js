import React, { useState } from 'react'
import useShowToast from "./useShowToast.js";
import {arrayRemove, arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuthStore from '../store/authStore.js';
const useLikePost=(post)=>{
    const authUser = useAuthStore((state) => state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const [likes, setLikes] =useState(post.likes.length);
    const [isLiked,setIsliked]=useState(post.likes.includes(authUser?.uid));
   
    const showToast=useShowToast();
    const handleLikePost = async () => {
        if(isUpdating) return;
        if(!authUser) return showToast('Error','You must be logged in to like this post','error');
        setIsUpdating(true);
        try
        {
            const postRef=doc(firestore, 'posts',post.id);
            await updateDoc(postRef,{
                likes:isLiked ? arrayRemove(authUser.uid):arrayUnion(authUser.uid)
            })
            setIsliked(!isLiked);
            isLiked ? setLikes(likes-1) : setLikes(likes+1);

        }catch (error){
            showToast('Error',error.message,'error');
        }finally {
            setIsUpdating(false);

        }
    }
    return {isLiked,likes,handleLikePost,isUpdating};

}
export default useLikePost