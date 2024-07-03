import { useEffect, useState } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import Header from "../../header/Header";
import BasicInfo from "./BasicInfo";
import TeamValue from "./TeamValue";
import PlayersSection from "./PlayerSection";
import { useNavigate, useParams } from "react-router-dom";
import BasicInfoForm from "./form/BasicInfoForm";
import InvitePlayers from "./InvitePlayers";
import AddMyPlayers from "./AddMyPlayers";
import useLoginUser from "../../../hooks/useLoginUser";
import { addPlayerToTeam, checkManagerTeam, getTeam } from "../../../api/api";

export default function TeamPage() {
  const { loginUser } = useLoginUser();
  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");
  const [isBasicInfoEditing, setIsBasicInfoEditing] = useState(false);
  const [openInvitePlayer, setOpenInvitePlayer] = useState(false);
  const [openAddPlayers, setOpenAddPlayers] = useState(false);
  const [team, setTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [isLoginUserManagerOfTeam, setIsLoginUserManagerOfTeam] =
    useState(false);
  const navigate = useNavigate();

  const { teamId } = useParams();

  useEffect(() => {
    if (!team) {
      fetchTeam();
    }
  }, [team]);

  useEffect(() => {
    if (loginUser.role === "team-manager" && team) {
      checkLoginUserIsManagerOfThisTeam(loginUser.managerId);
    }
  }, [team]);

  const fetchTeam = async () => {
    if (team) {
      return;
    }
    try {
      setLoadingTeam(true);
      const res = await getTeam(loginUser.token, teamId);
      setTeam(res.data);
      console.log(res.data);
    } catch (error) {
      if (error?.response?.data?.error === "token-error") {
        localStorage.removeItem("loginUser");
        navigate("/login");
      }

      console.log(error);
    } finally {
      setLoadingTeam(false);
    }
  };

  const handleMenuClick = (action, playerName) => {
    if (action === "captain") {
      setCaptain(playerName);
    } else if (action === "viceCaptain") {
      setViceCaptain(playerName);
    }
  };

  const toggleBasicInfoEdit = () => {
    setIsBasicInfoEditing(!isBasicInfoEditing);
  };

  const toggleInvitePlayers = () => {
    setOpenInvitePlayer(!openInvitePlayer);
  };

  const toggleAddPlayers = () => {
    setOpenAddPlayers(!openAddPlayers);
  };

  const checkLoginUserIsManagerOfThisTeam = async (managerId) => {
    try {
      const res = await checkManagerTeam(loginUser.token, teamId, managerId);
      setIsLoginUserManagerOfTeam(res.data.belongsToManager);
    } catch (error) {
      console.log(error);
    }
  };

  const makeCaptain = async (playerId) => {
    console.log("Captain", playerId);
  };

  const AssignContract = async (playerId) => {
    navigate(`/team/contractForm/${playerId}/${teamId}`);
  };

  const makeViceCaptain = async (playerId) => {
    console.log("Making Vice-Captain", playerId);
  };

  const removePlayer = async (playerId) => {
    console.log("Removing Player", playerId);
  };

  return (
    <Box
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundSize="cover"
      // backgroundPosition="center"
      minH="100vh"
      color="#FAFAFA"
    >
      <Header heading="MY TEAM" />
      {!loadingTeam && team && (
        <Box
          display="flex"
          flexDir={{ base: "column", md: "row" }}
          mt="2rem"
          gap=".5rem"
          p="1rem"
        >
          <Box
            display={{ base: "block", md: "flex" }}
            flex={{ base: "1", md: "0 0 70%" }}
            mr={{ base: 0, md: ".5rem", lg: ".5rem" }}
          >
            {!isBasicInfoEditing && (
              <BasicInfo
                team={team}
                toogle={toggleBasicInfoEdit}
                showToggle={isLoginUserManagerOfTeam}
              />
            )}
            {isBasicInfoEditing && (
              <BasicInfoForm
                initialValues={team}
                toogleFunc={toggleBasicInfoEdit}
                setTeam={setTeam}
              />
            )}
            {!openInvitePlayer && !openAddPlayers && (
              <PlayersSection
                players={team.players}
                onMenuClick={handleMenuClick}
                toggleInvite={toggleInvitePlayers}
                toggleAdd={toggleAddPlayers}
                isLoginUserIsManager={isLoginUserManagerOfTeam}
                makeCaptain={makeCaptain}
                AssignContract={AssignContract}
                makeViceCaptain={makeViceCaptain}
                removePlayer={removePlayer}
              />
            )}
            {openInvitePlayer && (
              <InvitePlayers toggle={toggleInvitePlayers} teamId={teamId} />
            )}
            {openAddPlayers && (
              <AddMyPlayers toggle={toggleAddPlayers} teamId={teamId} />
            )}
          </Box>

          <Box
            flex={{ base: "1", md: "0 0 29%" }}
            background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
            borderRadius="10px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            p="1rem"
          >
            <TeamValue />
          </Box>
        </Box>
      )}
      {loadingTeam && (
        <Box
          bg="rgba(255, 255, 255, 0.3)"
          borderRadius="md"
          minH="80vh"
          w="90vw"
          margin="1rem auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      )}
    </Box>
  );
}
