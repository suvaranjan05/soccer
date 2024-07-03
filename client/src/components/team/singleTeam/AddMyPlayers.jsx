import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useLoginUser from "../../../hooks/useLoginUser";
import { addPlayerToTeam, getMyPlayers } from "../../../api/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddMyPlayers({ toggle, teamId }) {
  const { loginUser } = useLoginUser();
  const [keyword, setKeyword] = useState("");
  const [myPlayers, setMyPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPlayers, setFilteredPlayers] = useState(myPlayers);

  useEffect(() => {
    fetchMyPlayers();
    console.log("heelo");
  }, []);

  useEffect(() => {
    if (keyword) {
      const lowercasedKeyword = keyword.toLowerCase();
      const sortedFilteredPlayers = myPlayers
        .filter((player) =>
          player.fullName.toLowerCase().includes(lowercasedKeyword)
        )
        .sort((a, b) =>
          a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
        );
      setFilteredPlayers(sortedFilteredPlayers);
    } else {
      setFilteredPlayers(myPlayers);
    }
  }, [keyword, myPlayers]);

  const fetchMyPlayers = async () => {
    try {
      setLoading(true);
      const res = await getMyPlayers(loginUser.token);
      setMyPlayers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (playerId) => {
    try {
      const res = addPlayerToTeam(loginUser.token, teamId, playerId);

      toast.promise(res, {
        loading: `Adding...`,
        success: (res) => {
          console.log(res.data);
          return "Player Added";
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
      p="1rem"
      flex={{ base: "1", md: "0 0 60%" }}
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
    >
      <Box
        className="childBoxHeading"
        fontWeight="600"
        fontSize="1rem"
        position="relative"
        p="10px 20px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="600" fontSize="1rem">
          ADD YOUR PLAYERS
        </Text>
        <Box
          cursor="pointer"
          bg="rgba(255, 255, 255, 0.6)"
          color="#000"
          p="5px 10px"
          borderRadius="md"
          fontSize="1.1rem"
          onClick={toggle}
        >
          <i className="fa-solid fa-xmark"></i>
        </Box>
      </Box>

      <Box
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="10px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        // minH="380px"
        maxHeight="380px"
        // overflowY="scroll"
        // overflowX="hidden"
        p={3}
        mt={2}
        className="custom-scrollbar"
      >
        <Box display="flex" borderRadius="md" mb="1rem" p={1}>
          <InputGroup width="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Your Players"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              className="no-hover-search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              width="100%"
            />
          </InputGroup>
          {/* <Button
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            // onClick={handleSearch}
            // isLoading={searching}
          >
            Search
          </Button> */}
        </Box>

        <Box
          maxHeight="320px"
          minHeight="320px"
          overflowY="auto"
          className="custom-scrollbar"
          p={1}
        >
          {!loading &&
            filteredPlayers.length > 0 &&
            filteredPlayers.map((p, i) => {
              return (
                <PlayerCard
                  key={p._id}
                  player={p}
                  addPlayer={handleAddPlayer}
                />
              );
            })}
          {loading && (
            <Center>
              <Spinner size="xl" mt="3" />
            </Center>
          )}
          {!loading && filteredPlayers.length === 0 && (
            <Center>
              <Text fontSize=".9rem" mt="3">
                You have no players
              </Text>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const PlayerCard = ({ player, addPlayer }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderRadius="md"
      alignItems="center"
      fontSize="1rem"
      bg="rgba(255, 255, 255, 0.3)"
      mb={2}
      fontWeight="600"
    >
      <Box display="flex" gap={2} alignItems="center">
        <Avatar size="sm" src={player.avatar} />
        <Text>{player.fullName}</Text>
      </Box>
      {!player.alreadyInATeam && (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => addPlayer(player._id)}
        >
          Add
        </Button>
      )}
      {player.alreadyInATeam && (
        <Button size="sm" colorScheme="blue" isDisabled>
          In a Team
        </Button>
      )}
    </Box>
  );
};
