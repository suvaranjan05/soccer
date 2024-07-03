import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/useLoginUser";
import { checkPlayerTeam } from "../../api/api";
import toast from "react-hot-toast";

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.6;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

function Setting() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  const managerSetting = [
    { label: "My Teams", onClick: () => navigate("/my-teams") },
    { label: "My Players", onClick: () => navigate("/my-players") },
    { label: "Reminders", onClick: () => navigate("/reminder") },
    { label: "Sponsors", onClick: () => {} },
    { label: "Profile", onClick: () => navigate("/profile") },
  ];

  const playerSetting = [
    { label: "My Team", onClick: () => fetchPlayerTeam() },
    { label: "Reminders", onClick: () => navigate("/reminder") },
    { label: "Profile", onClick: () => navigate("/profile") },
  ];

  const normalSetting = [
    { label: "Profile", onClick: () => navigate("/profile") },
    { label: "Notifications", onClick: () => navigate("/notifications") },
  ];

  const fetchPlayerTeam = async () => {
    try {
      const toastId = toast.loading("Loading");
      const res = await checkPlayerTeam(loginUser.token, {
        playerId: loginUser.playerId,
      });
      toast.dismiss(toastId);
      if (res.data.playerInATeam) {
        navigate(`/team/${res.data.teamId}`);
      } else {
        return toast.error("You have not joined any team.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss();
    }
  };

  const renderSettings = () => {
    if (loginUser.role === "player") return playerSetting;
    if (loginUser.role === "team-manager") return managerSetting;
    return normalSetting;
  };

  return (
    <Box minH="100vh" color="#000">
      <Header heading="Setting" />
      <Box
        width="85vw"
        margin="auto"
        p="1rem"
        mt="2rem"
        borderRadius="md"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          {renderSettings().map((item) => (
            <GridItem
              key={item.label}
              minH="130px"
              border="2px solid #FAFAFA"
              borderRadius="md"
              bg={generateRandomColor()}
              backdropFilter="blur(10px)"
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
              onClick={item.onClick}
            >
              <Text
                fontWeight="700"
                fontSize="2rem"
                textAlign="center"
                color="#FAFAFA"
              >
                {item.label}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Setting;
