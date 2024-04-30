import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn(){
    const navigate=useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setForm({
          ...form,
          [name]: value,
        });
      }

      async function signIn() {
        if(!form.email || !form.password) {alert('Please Fill all the fields!'); return;}
        try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              form.email,
              form.password
            )
            var user = userCredential.user;
            console.log("User signed in:", user);
            navigate("/home");
          } catch (error) {
            console.error(error);
          }
        
      };
    return(
        <>
            <input type="text"
                placeholder="Phone number, username, or email" 
                name="email"
                className='login-input'
                onChange={handleChange}/>

            <input type="password" 
                placeholder="Password"
                name="password"
                className='login-input' 
                onChange={handleChange}/>
            
            <button className='login-submit' onClick={signIn}>Log in</button>
        </>
    )
}