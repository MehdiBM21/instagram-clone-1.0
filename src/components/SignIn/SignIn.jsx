import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useLogin from "../../hooks/useLogin";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const { loading, error, login } = useLogin();

  return (
    <>
     {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4} mb={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <input
        type='text'
        placeholder='Phone number, username, or email'
        name='email'
        className='login-input'
        onChange={handleChange}
      />

      <input
        type='password'
        placeholder='Password'
        name='password'
        className='login-input'
        onChange={handleChange}
      />

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
        onClick={() => login(form)}
        isLoading={loading}
      >
        Log in
      </Button>
    </>
  );
}
