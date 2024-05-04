import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";
import useAuthStore from "./store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatPage from "./pages/ChatPage/ChatPage";
import HomePageV2 from "./pages/HomePageV2/HomePageV2";

function App() {
  const [authUser] = useAuthState(auth);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   // Cleanup function
  //   return () => unsubscribe();
  // }, []);

  return (
   
      <PageLayout>
        <Routes>
        <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={authUser ? <HomePageV2 /> : <Navigate to="/auth" />}
          />
          <Route path="/chat" element={authUser? <ChatPage />: <Navigate to="/auth" />} />
        </Routes>
      </PageLayout>
  );
}

export default App;