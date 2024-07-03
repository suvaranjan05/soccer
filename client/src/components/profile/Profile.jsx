import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import useLoginUser from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";
import {
  getManagerProfile,
  getPlayerProfile,
  getRefereeProfile,
} from "../../api/api";
import RenderProfile from "./RenderProfile";
import useStore from "../../zustand/store";

function Profile() {
  // const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();
  const { profileData, setProfileData } = useStore((state) => state);

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
    fetchUserProfile();
  }, [loginUser]);

  const fetchUserProfile = async () => {
    let fetchProfile;
    if (loginUser.role === "player") {
      fetchProfile = getPlayerProfile;
    } else if (loginUser.role === "team-manager") {
      fetchProfile = getManagerProfile;
    } else {
      fetchProfile = getRefereeProfile;
    }
    setLoading(true);
    try {
      const res = await fetchProfile(loginUser.token);
      setProfileData(res.data);
    } catch (error) {
      if (error?.response?.data?.error === "token-error") {
        localStorage.removeItem("loginUser");
        navigate("/login");
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundSize="cover"
      // backgroundPosition="center"
      minH="100vh"
      display="flex"
      flexDirection="column"
      color="#FAFAFA"
    >
      <Header heading="Profile" />

      <Box
        w="95vw"
        minH="100vh"
        margin="1rem auto"
        background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        borderRadius="md"
        p="1rem"
      >
        {!loading && (
          <>
            <RenderProfile profileData={profileData} role={loginUser.role} />
          </>
        )}
        {loading && (
          <Center>
            <Spinner size="lg" mt="1rem" />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Profile;
