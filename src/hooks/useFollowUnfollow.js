import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

const useFollowUnfollow = (userId) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useShowToast();
  // const {userProfile, setUserProfile} =
  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", user.uid);
      const userToFollowUnfollowRef = doc(firestore, "users", userId);
      await updateDoc(currentUserRef, {
        //if we are following the user, we remove it from the following array, otherwise we add it
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowUnfollowRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        //TODO:: after you get the profile component, do this 5:19:30
      } else {
        //TODO: same thing
      }
    } catch (e) {
      showToast("Error", e.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFollow = async () => {};

  useEffect(() => {
    if (user) {
      const isFollowing = props.following.includes(user.uid);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  return { isUpdating, isFollowing, handleFollow };
};

export default useFollowUnfollow;
