import { Avatar, Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";
import {
  playerJoinReqAccept,
  playerJoinReqReject,
  playerTeamJoinRequests,
} from "../../api/api";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function PlayerJoinRequests() {
  const { loginUser } = useLoginUser();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviate = useNavigate();

  useEffect(() => {
    if (loginUser.role !== "team-manager") {
      naviate("/dashboard");
    }
  }, []);

  useEffect(() => {
    fetchPlayerReqs();
  }, []);

  const fetchPlayerReqs = async () => {
    setLoading(true);
    try {
      const res = await playerTeamJoinRequests(loginUser.token);
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching player join requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (teamId, playerId) => {
    try {
      const res = await playerJoinReqReject(loginUser.token, teamId, playerId);

      toast.promise(res, {
        loading: `Rejecting`,
        success: (res) => {
          fetchPlayerReqs();
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

  const handleAccept = async (teamId, playerId) => {
    try {
      const res = await playerJoinReqAccept(loginUser.token, teamId, playerId);

      toast.promise(res, {
        loading: `Accepting`,
        success: (res) => {
          fetchPlayerReqs();
          return "Accepted";
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
    <Box minH="100vh" color="#FAFAFA">
      <Header heading="Team Join Requests" />
      <Box w="85vw" m="1rem auto" borderRadius="md" p={2}>
        <Box bg="rgba(255, 255, 255, 0.2)" p={2} borderRadius="md">
          <Box className="invitationHeading">
            <Text fontWeight="600" fontSize="1.5rem">
              Player Requests
            </Text>
          </Box>
          <Box maxHeight="320px" overflowY="auto" minH="310px" p={2}>
            {!loading ? (
              requests.length > 0 ? (
                requests.map((request, index) => (
                  <InviteCard
                    key={index}
                    team={request.team}
                    joinRequest={request.joinRequests[0]}
                    handleReject={handleReject}
                    handleAccept={handleAccept}
                  />
                ))
              ) : (
                <Text fontSize="1rem">There are currently no requests.</Text>
              )
            ) : (
              <Center mt={3}>
                <Spinner size="xl" />
              </Center>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function InviteCard({ team, joinRequest, handleReject, handleAccept }) {
  const { player } = joinRequest;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg="rgba(255, 255, 255, .5)"
      p={3}
      color="#000"
      borderRadius="md"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(6px)"
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      }}
      maxW="400px"
      mb={2}
      gap={2}
    >
      <Avatar bg="teal.500" size="xl" src={player.avatar} />
      <Box mt={3} textAlign="center">
        <Text fontSize="1rem" fontWeight="600">
          {player.user.userName} <ExternalLinkIcon mx="2px" />
        </Text>
        <Text
          fontSize="0.9rem"
          color="gray.600"
        >{`Requests to join ${team.name}`}</Text>
      </Box>
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          size="sm"
          colorScheme="red"
          variant="outline"
          _hover={{ bg: "red.500", color: "white" }}
          onClick={() => handleReject(team._id, player._id)}
        >
          Reject
        </Button>
        <Button
          size="sm"
          colorScheme="green"
          variant="outline"
          _hover={{ bg: "green.500", color: "white" }}
          onClick={() => handleAccept(team._id, player._id)}
        >
          Accept
        </Button>
      </Box>
    </Box>
  );
}

export default PlayerJoinRequests;
