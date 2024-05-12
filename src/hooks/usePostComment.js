import {useState} from 'react';
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {firestore} from "../config/firebase";
import useShowToast from './useShowToast';
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
const usePostComment=() => {
const [isCommenting,setIsCommenting]=useState(false);
    const showToast=useShowToast();
    const authUser = useAuthStore(state => state.user)
    const addComment=usePostStore(state => state.addComment); //pour afficher le commentaire
    const handlePostComment=async (postId,comment) => {
    if(isCommenting) return;
        if(!authUser) return showToast("Erreur","You must be online to comment","error")
        setIsCommenting(true)
        const newComment =
            {
                comment,
                createdAt: Date.now(),
                createdBy: authUser.uid,
                postId
            }
        try {
      //Insertion dans la base de donnee firebase

            await updateDoc(doc(firestore,"posts",postId),{
            comments: arrayUnion(newComment)
        });
            addComment(postId,newComment);

        } catch (error) {
            showToast("Error",error.message,"error");
        }finally {
            setIsCommenting(false);

        }
    }
    return {isCommenting,handlePostComment};
}
export default usePostComment;


