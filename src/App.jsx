import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePageV2 from "./pages/HomePageV2/HomePageV2";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfilePage from "./components/Profile/ProfilePage.jsx";
import React, { Suspense } from "react";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";

const LazyLoginPage = React.lazy(() => {
  import("./pages/LoginPage/LoginPage.jsx");
});
const LazyHomePageV2 = React.lazy(() => {
  import("./pages/HomePageV2/HomePageV2");
});
const LazyProfilePage = React.lazy(() => {
  import("./components/Profile/ProfilePage.jsx");
});

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path='/auth'
          element={
            authUser ? (
              <Navigate to='/' />
            ) : (
              <Suspense>
                <LoginPage />
              </Suspense>
            )
          }
        />
        <Route
          path='/'
          element={
            authUser ? (
              <Suspense>
                {" "}
                <HomePageV2 />
              </Suspense>
            ) : (
              <Navigate to='/auth' />
            )
          }
        />
        <Route
          path='/:username'
          element={
            authUser ? (
              <Suspense>
                <ProfilePage />{" "}
              </Suspense>
            ) : (
              <Navigate to='/auth' />
            )
          }
        />
        <Route
          path='/chat'
          element={authUser ?  <ChatPage/> : <Navigate to='/auth' />}
        />
      </Routes>
    </PageLayout>
  );
}

export default App;
