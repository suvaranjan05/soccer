import { Box, Text, Avatar, Button, Flex, Center } from "@chakra-ui/react";
import React from "react";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import {
  addPlayerToMatch,
  addTeamToMatch,
  rejectPlayerJoinReqForMatch,
  rejectTeamJoinReqForMatch,
} from "../../../api/api";

function MatchJoinRequests({ matchDetails }) {
  const { loginUser } = useLoginUser();

  const rejectTeamRequest = async (teamId) => {
    try {
      const res = rejectTeamJoinReqForMatch(
        loginUser.token,
        matchDetails._id,
        teamId
      );

      toast.promise(res, {
        loading: `Rejecting..`,
        success: (res) => {
          return "Rejected";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptTeamRequest = async (teamId) => {
    try {
      const res = addTeamToMatch(loginUser.token, matchDetails._id, teamId);

      toast.promise(res, {
        loading: `Confirming...`,
        success: (res) => {
          return "Team Confirmed";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectPlayerRequest = async (playerId) => {
    try {
      const res = rejectPlayerJoinReqForMatch(
        loginUser.token,
        matchDetails._id,
        playerId
      );

      toast.promise(res, {
        loading: `Rejecting..`,
        success: (res) => {
          return "Rejected";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const acceptPlayerRequest = async (playerId) => {
    try {
      const res = addPlayerToMatch(loginUser.token, matchDetails._id, playerId);
      toast.promise(res, {
        loading: `Confirming...`,
        success: (res) => {
          return "Player Confirmed";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      //   bg="rgba(255, 255, 255, 0.2)"
      bgGradient="linear(to-r, #ff416c, #ff4b2b)"
      borderRadius="md"
      boxShadow="lg"
      backdropFilter="blur(10px)"
      p={4}
      mb="1rem"
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="md"
        boxShadow="lg"
        backdropFilter="blur(10px)"
        p={4}
        mb={3}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Match Join Requests
        </Text>
      </Box>
      <Flex direction={{ base: "column", lg: "row" }} gap={4}>
        <Box
          flex={1}
          maxHeight="400px"
          overflowY="auto"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(10px)"
          className="custom-scrollbar"
        >
          {/* <Box display="flex" gap={2} alignItems="center" mb={4}> */}
          <Text fontSize="md" fontWeight="bold">
            Teams
          </Text>
          {/* <Button size="sm">Invite Teams</Button> */}
          {/* </Box> */}

          {matchDetails.pendingTeams.length > 0 &&
            matchDetails.pendingTeams.map((team) => (
              <Box
                key={team._id}
                p={4}
                mb={4}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.2)"
                boxShadow="md"
                backdropFilter="blur(10px)"
              >
                <Flex
                  align="center"
                  mb={2}
                  justify="space-between"
                  direction={{ base: "column", lg: "row" }}
                  gap={{ base: 2, lg: 0 }}
                >
                  <Flex
                    align="center"
                    direction={{ base: "column", lg: "row" }}
                    gap={{ base: 1, lg: 0 }}
                  >
                    <Avatar src={team.avatar} size="md" mr={4} />
                    <Text fontSize="md" fontWeight="bold">
                      {team.name}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Button
                      colorScheme="green"
                      mr={2}
                      onClick={() => acceptTeamRequest(team._id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => rejectTeamRequest(team._id)}
                    >
                      Reject
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}

          {matchDetails.pendingTeams.length === 0 && (
            <Text
              mt="1rem"
              // bg="rgba(255, 0, 0, 0.5)"
              p={2}
              borderRadius="md"
              color="#FAFAFA"
              fontWeight="600"
              fontSize="1rem"
            >
              No Requests Found
            </Text>
          )}
        </Box>
        <Box
          flex={1}
          maxHeight="400px"
          overflowY="auto"
          p={4}
          bg="rgba(255, 255, 255, 0.2)"
          borderRadius="md"
          boxShadow="lg"
          backdropFilter="blur(10px)"
          className="custom-scrollbar"
        >
          <Text fontSize="md" fontWeight="bold" mb={4}>
            Players
          </Text>
          {matchDetails.pendingPlayers.length > 0 &&
            matchDetails.pendingPlayers.map((player) => (
              <Box
                key={player._id}
                p={4}
                mb={4}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.2)"
                boxShadow="md"
                backdropFilter="blur(10px)"
              >
                <Flex
                  align="center"
                  mb={2}
                  justify="space-between"
                  direction={{ base: "column", lg: "row" }}
                  gap={{ base: 2, lg: 0 }}
                >
                  <Flex
                    align="center"
                    direction={{ base: "column", lg: "row" }}
                    gap={{ base: 1, lg: 0 }}
                  >
                    <Avatar src={player.avatar} size="md" mr={4} />
                    <Text fontSize="md" fontWeight="bold">
                      {player.user.userName}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Button
                      colorScheme="green"
                      mr={2}
                      onClick={() => acceptPlayerRequest(player._id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => rejectPlayerRequest(player._id)}
                    >
                      Reject
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          {matchDetails.pendingPlayers.length === 0 && (
            <Text
              mt="1rem"
              // bg="rgba(255, 0, 0, 0.5)"
              p={2}
              borderRadius="md"
              color="#FAFAFA"
              fontWeight="600"
              fontSize="1rem"
            >
              No Requests Found
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default MatchJoinRequests;
