import { useState } from 'react';
import useShowToast from "./useShowToast.js";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import useAuthStore from '../store/authStore.js';

const useSavePost = (post) => {
    const authUser = useAuthStore((state) => state.user);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSaved, setIsSaved] = useState(post.savedBy.includes(authUser?.uid));

    const showToast = useShowToast();

    const handleSavePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast('Error', 'You must be logged in to save this post', 'error');
        setIsUpdating(true);
        try {
            const userRef = doc(firestore, 'users', authUser.uid);
            await updateDoc(userRef, {
                savedPosts: isSaved ? arrayRemove(post.id) : arrayUnion(post.id)
            });
            setIsSaved(!isSaved);
        } catch (error) {
            showToast('Error', error.message, 'error');
        } finally {
            setIsUpdating(false);
        }
    };

    return { isSaved, handleSavePost, isUpdating };
};

export default useSavePost;
