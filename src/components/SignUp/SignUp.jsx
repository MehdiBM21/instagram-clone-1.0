import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const {loading, error, signup} = useSignUpWithEmailAndPassword();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  // async function signUp() {
    // if (!form.email || !form.password) {
    //   alert("Please Fill all the fields!");
    //   return;
    // }
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     form.email,
    //     form.password
    //   );

    //   console.log(userCredential);
    //   let payload = {
    //     userId: userCredential.user.uid,
    //     userName: form.username,
    //     name: form.fullName,
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
    // } catch (error) {
    //   console.log(error);
    // }

    // navigate("/home");
  // }

  return (
    <>
     {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4} mb={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Input
        type='text'
        placeholder='Phone number or email'
        // className='login-input'
        w={260}
        h={35}
        size={"sm"}
        borderRadius={4}
        name='email'
        onChange={handleChange}
        fontSize={14}
        mb={2}
      />

      <Input
        type='text'
        placeholder='Full Name'
        // className='login-input'
        size={"sm"}
        borderRadius={4}
        w={260}
        h={35}
        name='fullName'
        onChange={handleChange}
        fontSize={14}
        mb={2}
      />

      <Input
        type='text'
        placeholder='Username'
        // className='login-input'
        size={"sm"}
        borderRadius={4}
        w={260}
        h={35}
        name='username'
        onChange={handleChange}
        fontSize={14}
        mb={2}
      />

      <InputGroup w={260} h={35}>
        <Input
          placeholder='Password'
          // className='login-input'
          type={showPassword ? "text" : "password"}
          size={"sm"}
          borderRadius={4}
          border={"1px solid #dbdbdb"}
          name='password'
          onChange={handleChange}
          fontSize={14}
          mb={1}
        />
        <InputRightElement h='full'>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* <button className='login-submit' onClick={signUp}>
        Sign Up
      </button> */}
     
      <Button
        mt={4}
        w={275}
        h={35}
        borderRadius={10}
        backgroundColor={"#4cb5f9"}
        color='white'
        colorScheme='blue'
        size={"sm"}
        fontSize={14}
        onClick={() => signup(form)}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </>
  );
}
