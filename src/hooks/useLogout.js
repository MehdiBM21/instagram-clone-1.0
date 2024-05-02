import { useSignOut } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth } from "../config/firebase";
import useAuthStore from "../store/authStore";

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore(state => state.logout);

    const handleLogout = async () => {
        try{
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
            showToast("Success", "User logged out successfully!", "success");

        }catch(e){
            showToast("Error", e.message, "error");
    }
}
  return {
    handleLogout,
    loading,
    error,
  };
};

export default useLogout;
