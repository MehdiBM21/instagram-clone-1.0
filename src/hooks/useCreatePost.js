import React, { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useLocation } from "react-router-dom";

const useCreatePost = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image!");

    setIsLoading(true);
    const newPost = {
      caption: caption,
      createdBy: authUser.uid,
      likes: [],
      comments: [],
      createdAt: Date.now(),
    };
    try {
      const postDocumentRef = await addDoc(
        collection(firestore, "posts"),
        newPost
      );
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocumentRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocumentRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocumentRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;
      if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocumentRef.id });
      if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocumentRef.id });

      showToast("Success", "Post created successfully!", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost, pathname };
};

export default useCreatePost;
