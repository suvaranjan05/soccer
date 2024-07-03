import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import { SearchIcon } from "@chakra-ui/icons";
import useLoginUser from "../../../hooks/useLoginUser";
import {
  SendJoinReqToTeam,
  getAllTeams,
  getTeamsBySearch,
} from "../../../api/api";
import TeamCard from "./TeamCard";
import SkeletonTeamCard from "./SkeletonTeamCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AllTeams() {
  const { loginUser } = useLoginUser();
  const [teams, setTeams] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, [currentPage]);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);

      const res = await getAllTeams(loginUser.token, currentPage, 3); // Fetch 3 teams per page
      console.log(res.data.teams);

      setTeams(res.data.teams);
      setPagination(res.data);
    } catch (error) {
      if (error?.response?.data?.error === "token-error") {
        localStorage.removeItem("loginUser");
        navigate("/login");
      }

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

  const handleSearch = async () => {
    if (keyword === "") return;
    try {
      setSearching(true);
      const res = await getTeamsBySearch(
        loginUser.token,
        currentPage,
        3,
        keyword
      );
      console.log(res.data);
      setTeams(res.data.teams);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const handleJoin = async (teamId) => {
    try {
      const res = SendJoinReqToTeam(loginUser.token, teamId);

      toast.promise(res, {
        loading: `Sending Req...`,
        success: "Join Request Sent",
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
      <Header heading="ALL TEAMS" />

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
        <Box display="flex" pr={3} borderRadius="md" mb="1rem">
          <InputGroup mr={2} flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Team"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="no-hover-search"
              borderRadius="md"
              _placeholder={{ color: "gray.400" }}
            />
          </InputGroup>
          <Button
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            onClick={handleSearch}
            isLoading={searching}
            borderRadius="md"
            _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
          >
            Search
          </Button>
        </Box>

        <Box
          bg="rgba(255, 255, 255, 0.15)"
          p={5}
          borderRadius="md"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        >
          <Box>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="2rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {!isLoading &&
                teams.length > 0 &&
                teams.map((team) => (
                  <TeamCard
                    key={team._id}
                    team={team}
                    handleJoin={handleJoin}
                    isLoginUserPlayer={
                      loginUser.role === "player" ? true : false
                    }
                  />
                ))}
              {isLoading && (
                <>
                  <SkeletonTeamCard />
                  <SkeletonTeamCard />
                  <SkeletonTeamCard />
                </>
              )}
            </SimpleGrid>
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
  );
}

export default AllTeams;
