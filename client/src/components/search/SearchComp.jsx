import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text, Flex, Button, Spinner } from "@chakra-ui/react";
import Header from "../header/Header";
import SearchBox from "./SearchBox";
import {
  getAllPlayers,
  getPlayersBySearch,
  getAllTeams,
  getTeamsBySearch,
  SendJoinReqToTeam,
} from "../../api/api";
import TeamCard from "../team/allteams/TeamCard";
import PlayerCard from "../player/allplayers/PlayerCard";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";

function SearchComp() {
  const { loginUser } = useLoginUser();
  const [searchCategory, setSearchCategory] = useState("Team");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchCategory, currentPage]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res;
      if (searchCategory === "Player") {
        res = await getAllPlayers(loginUser.token, currentPage, 3);
      } else if (searchCategory === "Team") {
        res = await getAllTeams(loginUser.token, currentPage, 3);
      }
      console.log(res.data);
      if (searchCategory === "Player") {
        setResults(res.data.players);
      } else if (searchCategory === "Team") {
        setResults(res.data.teams);
      }
      setPagination(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (keyword === "") return;
    setSearching(true);
    try {
      let res;
      if (searchCategory === "Player") {
        res = await getPlayersBySearch(
          loginUser.token,
          currentPage,
          3,
          keyword
        );
      } else if (searchCategory === "Team") {
        res = await getTeamsBySearch(loginUser.token, currentPage, 3, keyword);
      }
      if (searchCategory === "Player") {
        setResults(res.data.players);
      } else if (searchCategory === "Team") {
        setResults(res.data.teams);
      }
      setPagination(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const handleJoin = async (teamId) => {
    try {
      const res = SendJoinReqToTeam(loginUser.token, teamId);

      toast.promise(res, {
        loading: "Sending Join Request...",
        success: "Join Request Sent",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.error("Error joining team:", error);
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

  return (
    <Box w="100%" minH="100vh">
      <Header heading="Search" />

      <Box
        bg="rgba(255, 255, 255, 0.2)"
        minH="100vh"
        mt="1.5rem"
        p="1rem"
        borderRadius="md"
        w="95vw"
        ml="auto"
        mr="auto"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      >
        <Box
          background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
          color="#FAFAFA"
          p="20px"
          borderRadius="md"
        >
          <Text fontSize="1rem" fontWeight="600" mb={4}>
            You can choose a category for searching.
          </Text>

          <SearchBox
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleSearch}
            isLoading={searching}
          />
        </Box>

        <Box mt="2rem">
          {isLoading ? (
            <Flex justify="center" align="center" py="20">
              <Spinner size="xl" color="#FAFAFA" />
            </Flex>
          ) : searchCategory === "Team" ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="2rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {results.length > 0 &&
                results.map((item) => (
                  <TeamCard
                    key={item._id}
                    team={item}
                    handleJoin={handleJoin}
                    isLoginUserPlayer={loginUser.role === "player"}
                  />
                ))}
            </SimpleGrid>
          ) : (
            <Flex direction="column" align="center" gap="1rem">
              {results.length > 0 &&
                results.map((item) => (
                  <PlayerCard key={item._id} player={item} />
                ))}
            </Flex>
          )}

          {/* Pagination Buttons */}
          <Flex justify="space-between" mt="2rem">
            <Button
              colorScheme="purple"
              fontWeight="400"
              variant="outline"
              onClick={handlePrevPage}
              isDisabled={!pagination || !pagination.previous}
              borderRadius="md"
              mr="1rem"
            >
              Prev
            </Button>
            <Button
              colorScheme="purple"
              fontWeight="400"
              onClick={handleNextPage}
              isDisabled={!pagination || !pagination.next}
              borderRadius="md"
              ml="1rem"
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchComp;
