import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth, firestore } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore';
const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async (inputs)=>{
        if(!inputs.email || !inputs.password || !inputs.fullName){
            alert('Please Fill all the fields!')
            return;
        }
        try{
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!newUser && error) return;
            if(newUser){
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
                const userDoc = {
                  uid: newUser.user.uid,
                  username: inputs.username,
                  fullName: inputs.fullName,
                  email: inputs.email,
                  password: inputs.password,
                  bio: "",
                  profileImage: "https://picsum.photos/500",
                  followers:[],
                  following:[],
                  posts:[],
                  createdAt: Date.now()
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            }

        }catch(error){
            console.log(error)
        }
    }
  return {loading, error, signup}
}

export default useSignUpWithEmailAndPassword