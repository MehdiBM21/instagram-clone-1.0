import { Box, Flex, Spinner } from "@chakra-ui/react";
import SideBar from "../../components/SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import NavBarV2 from "../../components/NavBarV2/NavBarV2";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading, error] = useAuthState(auth);
  const renderSidebar = pathname !== "/auth" && user;
  const renderNavbar = !user && pathname !== "/auth" && !loading ;
  
//  check if user is logged
if(!user && loading){
  return <PageLayoutSpinner/>;

 }
  return (
    <Flex flexDir={renderNavbar ? "column" : "row"}>
      {/* sidebar -> left */}
      {renderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <SideBar />
        </Box>
      ) : null}
      {/* navbar: top */}
      {renderNavbar && <NavBarV2/>}
      {/* content -> right */}
      <Box flex={1} w={{base:"calc(100% -70px)", md: "calc(100% -70px)" }} mx={"auto"}>
        {children}
        </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = ()=>{
  return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
}