import {
  Box,
  Button,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import useLoginUser from "../../../hooks/useLoginUser";
import {
  getAllMatches,
  getManagerTeams,
  sendPlayerJoinReqForMatch,
  sendTeamJoinReqForMatch,
} from "../../../api/api";
import MatchCard from "./MatchCard";
import toast from "react-hot-toast";
import TeamModal from "../TeamsModal";

function AllMatches() {
  const { loginUser } = useLoginUser();
  const [matches, setMatches] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [managerTeams, setManagerTeams] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchMatches();
  }, [currentPage]);

  const fetchMatches = async () => {
    try {
      setIsLoading(true);

      const res = await getAllMatches(loginUser.token, currentPage, 3); // Fetch 3 matches per page
      console.log(res.data);

      setMatches(res.data.matches);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleJoin = async (matchId) => {
    setSelectedMatchId(matchId);
    if (loginUser.role === "team-manager") {
      const toastId = toast.loading("Checking...");
      try {
        const res = await getManagerTeams(loginUser.token);
        setManagerTeams(res.data.teams);
        onOpen();
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    } else if (loginUser.role === "player") {
      try {
        const res = sendPlayerJoinReqForMatch(
          loginUser.token,
          matchId,
          loginUser.playerId
        );

        toast.promise(res, {
          loading: `Sending Join Request..`,
          success: (res) => {
            onClose();
            return "Join Request Sent";
          },
          error: (e) => {
            return e.response.data.msg;
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return toast.error("You can't join");
    }
  };

  const sendTeamJoinReq = async (teamId) => {
    try {
      const res = sendTeamJoinReqForMatch(
        loginUser.token,
        selectedMatchId,
        teamId
      );

      toast.promise(res, {
        loading: `Sending Join Request..`,
        success: (res) => {
          onClose();
          return "Join Request Sent";
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
    <>
      <Box minH="100vh" color="#FAFAFA">
        <Header heading="MATCHES" />

        <Box
          p="1rem"
          bg="rgba(255, 255, 255, 0.1)"
          width="95vw"
          margin="1rem auto 0 auto"
          borderRadius="md"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.3)"
        >
          <Box
            bg="rgba(255, 255, 255, 0.15)"
            p={5}
            borderRadius="md"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          >
            <Box>
              {isLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="200px"
                >
                  <Spinner size="xl" color="white" />
                </Box>
              ) : (
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="2rem"
                  width="100%"
                  justifyItems="center"
                  mb="2rem"
                >
                  {matches.length > 0 &&
                    matches.map((match) => (
                      <MatchCard
                        key={match._id}
                        match={match}
                        handleJoin={handleJoin}
                      />
                    ))}
                </SimpleGrid>
              )}
              <Box display="flex" justifyContent="space-between" mt="2rem">
                <Button
                  colorScheme="purple"
                  fontWeight="400"
                  variant="outline"
                  onClick={handlePrevPage}
                  isDisabled={!pagination || !pagination.previous}
                  borderRadius="md"
                >
                  Prev
                </Button>
                <Button
                  colorScheme="purple"
                  fontWeight="400"
                  color="#000"
                  onClick={handleNextPage}
                  isDisabled={!pagination || !pagination.next}
                  borderRadius="md"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <TeamModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        teams={managerTeams}
        onSubmit={sendTeamJoinReq}
      />
    </>
  );
}

export default AllMatches;
