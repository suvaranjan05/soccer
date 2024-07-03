// Player.jsx
import React, { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import BasicInfo from "./BasicInfo";
import PlayerStrengths from "./PlayerStrengths";
import PlayerValue from "./PlayerValue";
// import { playerData } from "./player";
import Header from "../../header/Header";
import BasicInfoForm from "./form/BasicInfoForm";
import PlayerStrengthsForm from "./form/PlayerStrengthsForm";
import { useParams } from "react-router-dom";
import { checkPlayerManager, getPlayer } from "../../../api/api";
import useLoginUser from "../../../hooks/useLoginUser";

const Player = () => {
  const { loginUser } = useLoginUser();
  const [player, setPlayer] = useState(null);
  const [updatingBasicInfo, setUpdatingBasicInfo] = useState(false);
  const [updatingStrength, setUpdatingStrength] = useState(false);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);
  const [isLoginUserManagerOfPlayer, setIsLoginUserManagerOfPlayer] =
    useState(false);
  const { playerId } = useParams();

  useEffect(() => {
    fetchPlayer();
  }, []);

  useEffect(() => {
    if (loginUser.role === "team-manager" && player) {
      checkLoginUserIsManagerOfThisPlayer(loginUser.managerId);
    }
  }, [player]);

  const toogleBasicInfo = () => {
    setUpdatingBasicInfo(!updatingBasicInfo);
  };

  const toogleStrengthInfo = () => {
    setUpdatingStrength(!updatingStrength);
  };

  const fetchPlayer = async () => {
    try {
      setIsPlayerLoading(true);
      const res = await getPlayer(loginUser.token, playerId);
      console.log(res);
      setPlayer(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPlayerLoading(false);
    }
  };

  const checkLoginUserIsManagerOfThisPlayer = async (managerId) => {
    try {
      const res = await checkPlayerManager(
        loginUser.token,
        playerId,
        managerId
      );
      setIsLoginUserManagerOfPlayer(res.data.belongsToManager);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Header heading="YOUR PLAYER" />
      {!isPlayerLoading && player && (
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
            gap=".5rem"
          >
            {!updatingBasicInfo && (
              <BasicInfo
                player={player}
                toggle={toogleBasicInfo}
                showToggle={isLoginUserManagerOfPlayer}
              />
            )}
            {updatingBasicInfo && (
              <BasicInfoForm
                initialValues={player}
                toggle={toogleBasicInfo}
                setPlayer={setPlayer}
              />
            )}
            {updatingStrength && (
              <PlayerStrengthsForm
                initialValues={player}
                toggle={toogleStrengthInfo}
                setPlayer={setPlayer}
              />
            )}
            {!updatingStrength && (
              <PlayerStrengths
                player={player}
                toggle={toogleStrengthInfo}
                showToggle={isLoginUserManagerOfPlayer}
              />
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
            <PlayerValue player={player} />
          </Box>
        </Box>
      )}
      {isPlayerLoading && (
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
};

export default Player;
