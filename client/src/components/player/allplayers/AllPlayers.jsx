import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import useLoginUser from "../../../hooks/useLoginUser";
import { getAllPlayers, getPlayersBySearch } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import PlayerCard from "./PlayerCard";

function AllPlayers() {
  const { loginUser } = useLoginUser();
  const [players, setPlayers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, [currentPage]);

  const fetchPlayers = async () => {
    try {
      setIsLoading(true);
      const res = await getAllPlayers(loginUser.token, currentPage, 3);
      setPlayers(res.data.players);
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

  const handleSearch = async () => {
    if (keyword === "") return;
    try {
      setSearching(true);
      const res = await getPlayersBySearch(
        loginUser.token,
        currentPage,
        3,
        keyword
      );
      setPlayers(res.data.players);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <Box minH="100vh" color="#FAFAFA">
      <Header heading="ALL PLAYERS" />

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
              type="text"
              placeholder="Search Player"
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
          <Box minH="300px">
            <Box>
              {!isLoading &&
                players.length > 0 &&
                players.map((player) => (
                  <PlayerCard key={player._id} player={player} />
                ))}
              {isLoading && (
                <Center minH="300px">
                  <Spinner size="xl" />
                </Center>
              )}
            </Box>
            <Flex justify="space-between" mt="2rem">
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
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AllPlayers;
