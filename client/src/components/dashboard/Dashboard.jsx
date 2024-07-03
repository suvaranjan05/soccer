import { Box, Grid, Image } from "@chakra-ui/react";
import DMiddle from "./DMiddle";
import DFooter from "./DFooter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import PlayerHeader from "./dHeader/PlayerHeader";
import ManagerHeader from "./dHeader/ManagerHeader";
import NormalHeader from "./dHeader/NormalHeader";
import useLoginUser from "../../hooks/useLoginUser";
import HeaderSkeleton from "./dHeader/HeaderSkeleton";
import { getUserHeader } from "../../api/api";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();
  const { headerData, setHeaderData, notificationCount, setNotificationCount } =
    useStore((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    } else {
      console.log(loginUser.token);
    }
  }, []);

  useEffect(() => {
    if (!headerData) {
      fetchUserHeader();
    }
  }, []);

  const fetchUserHeader = async () => {
    setLoading(true);
    try {
      const res = await getUserHeader(loginUser.token);
      console.log(res.data);
      setHeaderData(res.data);
      setNotificationCount(res.data.unreadNotificationsCount);
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

  const handleCreateTeam = () => {
    if (loginUser.role === "team-manager") {
      navigate("/create-team");
    } else {
      return toast.error("You can't create a team");
    }
  };

  const handleAddPlayerTeam = () => {
    if (loginUser.role === "team-manager") {
      navigate("/add-player");
    } else {
      return toast.error("You can't add players");
    }
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      p="25px"
      // backgroundImage="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600"
      // backgroundSize="cover"
      // backgroundPosition="center"
    >
      <Box>
        {loginUser && headerData && loginUser.role === "player" && (
          <PlayerHeader headerData={headerData} />
        )}
        {loginUser && headerData && loginUser.role === "team-manager" && (
          <ManagerHeader headerData={headerData} />
        )}
        {loginUser &&
          headerData &&
          loginUser.role !== "team-manager" &&
          loginUser.role !== "player" && (
            <NormalHeader headerData={headerData} />
          )}
        {!headerData && <HeaderSkeleton />}

        <Box>
          <Box></Box>
        </Box>
        <Box
          // border="2px solid red"
          p={3}
          w="100%"
          display="flex"
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          alignItems={{ base: "center", md: "unset", lg: "unset" }}
          gap={{ base: "4rem", md: "null", lg: "null" }}
        >
          <Box maxW="350px">
            <DMiddle />
          </Box>
          <Box
            w="100%"
            // border="2px solid yellow"
            position="relative"
            display={{ base: "none", md: "block" }}
          >
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717651774/dashboard-player_nbsjew.png"
              position="absolute"
              height="550px"
              top="45%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          </Box>
          <Box display="flex">
            {/* <Box display={{ base: "block", md: "none" }}>
              <Image
                src="https://res.cloudinary.com/suvaranjan/image/upload/v1717651774/dashboard-player_nbsjew.png"
                height="350px"
              />
            </Box> */}
            <Grid templateColumns="repeat(1, 1fr)" gap={1}>
              <Image
                src="https://res.cloudinary.com/suvaranjan/image/upload/v1717653049/Add_teams_xeo9ut.png"
                onClick={handleCreateTeam}
              />
              <Image
                src="https://res.cloudinary.com/suvaranjan/image/upload/v1717652910/Add_players_a_raumyb.png"
                onClick={handleAddPlayerTeam}
              />
            </Grid>
          </Box>
        </Box>

        <Box mt="1.7rem">
          <DFooter />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
