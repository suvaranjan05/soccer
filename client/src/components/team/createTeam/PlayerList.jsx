import {
  Box,
  Image,
  Grid,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Avatar,
  Code,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlayerList = ({
  addedPlayers,
  handleAddPlayer,
  players,
  loading,
  isAdding,
}) => {
  const [keyword, setKeyword] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const navigate = useNavigate();

  useEffect(() => {
    if (keyword) {
      const lowercasedKeyword = keyword.toLowerCase();
      const sortedFilteredPlayers = players
        .filter((player) =>
          player.fullName.toLowerCase().includes(lowercasedKeyword)
        )
        .sort((a, b) =>
          a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
        );
      setFilteredPlayers(sortedFilteredPlayers);
    } else {
      setFilteredPlayers(players);
    }
  }, [keyword, players]);

  return (
    <Box
      flex={{ base: "1", md: "0 0 40%" }}
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      p="1rem"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flex={1}
        flexDir="column"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box ml={2}>
            <Text fontSize="1.3rem" fontWeight="600">
              MY PLAYERS
            </Text>
            <Text
              bg="#2F855A"
              display="inline-block"
              p={2}
              borderRadius="md"
              fontSize=".8rem"
            >
              {` ${addedPlayers.length} `}Players Added
            </Text>
          </Box>
          <Box>
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717733456/Add_players_gk3la2.png"
              w="150px"
              onClick={() => navigate("/add-player")}
            />
          </Box>
        </Box>
        <Box display="flex" borderRadius="md" p={2}>
          <InputGroup mr={2} flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Your Player"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="no-hover-search"
            />
          </InputGroup>
        </Box>
      </Box>

      <Box
        maxHeight="290px"
        overflowY="auto"
        className="custom-scrollbar"
        p={2}
      >
        {!loading && filteredPlayers.length > 0 && (
          <Grid templateColumns="repeat(auto-fill, minmax(130px, 1fr))" gap={4}>
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player._id}
                player={player}
                isAdded={addedPlayers.includes(player._id)}
                handleAddPlayer={handleAddPlayer}
                isAdding={isAdding}
              />
            ))}
          </Grid>
        )}
        {loading && <Spinner size="xl" />}
        {!loading && filteredPlayers.length === 0 && (
          <Text fontSize=".8rem" mt={3}>
            You have no Players
          </Text>
        )}
      </Box>
    </Box>
  );
};

const PlayerCard = ({ player, isAdded, handleAddPlayer, isAdding }) => {
  return (
    <Box
      position="relative"
      borderRadius="md"
      backgroundColor="rgba(255, 255, 255, 0.2)"
      height="150px"
      w="120px"
      display="flex"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
        gap={2}
      >
        <Avatar src={player.avatar} size="lg" mt={2} />
        {/* <Code colorScheme="green">xyz</Code> */}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        p="0.4rem"
        textAlign="center"
        display="flex"
        flexDirection="column"
        fontWeight="500"
        backgroundColor="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(10px)"
        borderBottomRadius="md"
      >
        <Text color="#000" fontSize=".8rem" mb={1}>
          {player.fullName}
        </Text>
        <Button
          size="xs"
          colorScheme="cyan"
          onClick={() => handleAddPlayer(player._id)}
          isDisabled={player.alreadyInATeam}
        >
          {!player.alreadyInATeam && isAdded && "Added"}
          {!player.alreadyInATeam && !isAdded && "Add to Team"}
          {player.alreadyInATeam && "In a Team"}
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerList;
