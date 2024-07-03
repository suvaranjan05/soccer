import { Avatar, Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import useLoginUser from "../../../hooks/useLoginUser";
import {
  acceptInvitation,
  myTeamInvitations,
  rejectInvitation,
} from "../../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TeamInvitations() {
  const { loginUser } = useLoginUser();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const naviate = useNavigate();

  useEffect(() => {
    fetchTeamInvitations();
  }, []);

  useEffect(() => {
    if (loginUser.role !== "player") {
      naviate("/dashboard");
    }
  }, []);

  const fetchTeamInvitations = async () => {
    setLoading(true);
    try {
      const res = await myTeamInvitations(loginUser.token);
      setTeams(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (teamId) => {
    try {
      const res = rejectInvitation(loginUser.token, teamId);

      toast.promise(res, {
        loading: `Rejecting ...`,
        success: (res) => {
          return "Invitation Rejected";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (teamId) => {
    try {
      const res = acceptInvitation(loginUser.token, teamId);

      toast.promise(res, {
        loading: `Accepting ...`,
        success: (res) => {
          return "Invitation Accepted";
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
      <Header heading="Team Invitations" />
      <Box
        bg="rgba(255, 255, 255, 0.2)"
        w="85vw"
        m="1rem auto"
        borderRadius="md"
        p={2}
      >
        <Box bg="rgba(255, 255, 255, 0.2)" p={2} borderRadius="md">
          <Box className="invitationHeading">
            <Text fontWeight="600" fontSize="1.5rem">
              Team Invitations
            </Text>
          </Box>
          <Box
            maxHeight="320px"
            overflowY="auto"
            className="custom-scrollbar"
            minH="310px"
            p={2}
          >
            {!loading &&
              teams.length > 0 &&
              teams.map((t) => {
                return (
                  <InviteCard
                    team={t}
                    handleReject={handleReject}
                    handleAccept={handleAccept}
                  />
                );
              })}
            {loading && (
              <Center flex={1} mt={3}>
                <Spinner size="xl" />
              </Center>
            )}
            {!loading && !teams.length > 0 && (
              <Text fontSize="1rem">You have no team Invitations.</Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function InviteCard({ team, handleReject, handleAccept }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      bg="#FAFAFA"
      p={3}
      color="#000"
      borderRadius="md"
      maxW="400px"
      mb={2}
    >
      <Avatar bg="teal.500" size="md" src={team.avatar} />
      <Box display="flex" flexDir="column" gap={2}>
        <Text fontSize="1rem" fontWeight="600">
          {team.name}
        </Text>
        <Box display="flex" gap={2}>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => handleReject(team._id)}
          >
            Reject
          </Button>
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => handleAccept(team._id)}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TeamInvitations;
