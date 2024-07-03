import {
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import Header from "./../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getMyPlayers } from "../../api/api";
import useLoginUser from "../../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";

function MyPlayers() {
  const { loginUser } = useLoginUser();
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [fetchingPlayers, setFetchingPlayers] = useState(true);
  const [myPlayers, setMyPlayers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyPlayers();
  }, []);

  const fetchMyPlayers = async () => {
    setFetchingPlayers(true);
    try {
      const res = await getMyPlayers(loginUser.token);
      console.log(res.data);
      setMyPlayers(res.data);
      setSelectedPlayer(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingPlayers(false);
    }
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredPlayers = myPlayers.filter((player) =>
    player.fullName.toLowerCase().includes(searchKeyword)
  );

  return (
    <Box
      backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      minH="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      color="#FAFAFA"
      pb="3rem"
    >
      <Header heading="MY PLAYERS" />
      <Box
        width="95vw"
        margin="0 auto"
        padding="1rem"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        mt={3}
        borderRadius="md"
        minH="80vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <InputGroup width="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="#FAFAFA" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search players"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>
        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md">
          {!fetchingPlayers && filteredPlayers.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="1rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player._id}
                  player={player}
                  handleSelectPlayer={handleSelectPlayer}
                />
              ))}
            </SimpleGrid>
          )}

          {fetchingPlayers && (
            <Center flex={1} minH="70vh">
              <Spinner size="xl" />
            </Center>
          )}

          {!fetchingPlayers && filteredPlayers.length === 0 && (
            <Center
              flex={1}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="md"
              minH="70vh"
            >
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="1rem" fontWeight="600" mb={2}>
                  Looks like, You have No Players.
                </Text>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717652910/Add_players_a_raumyb.png"
                  cursor="pointer"
                  onClick={() => navigate("/add-player")}
                />
              </Box>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyPlayers;

function PlayerCard({ player, handleSelectPlayer }) {
  const navigate = useNavigate();

  return (
    <Box
      minW="300px"
      height="400px"
      border="2px solid #FAFAFA"
      borderRadius="md"
      mb={{ base: "1rem", md: 0 }}
      backdropFilter="blur(10px)"
      overflow="hidden"
      cursor="pointer"
      display="flex"
      flexDir="column"
      onClick={() => handleSelectPlayer(player)}
    >
      <Box
        flex={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(255, 255, 255, 0.2)"
      >
        <Avatar size="2xl" src={player.avatar} />
      </Box>
      <Box
        flex={2}
        bg="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderTop="2px solid #FAFAFA"
      >
        <Box color="#000">
          <Text fontSize="1.2rem" fontWeight="700">
            {player.fullName}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            Level: {player.level}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            zGold: {player.zGold}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            Diamond: {player.diamond}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            Matches: {player.matches}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            Team: {player.alreadyInATeam ? player.team.name : "Not In a Team"}
          </Text>
        </Box>
        <Box
          mt={2}
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Flex gap={1}>
            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Statistics click
              }}
            >
              Statistics <ExternalLinkIcon mx="2px" />
            </Button>

            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Records click
              }}
            >
              Records <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
          <Flex justify="space-between">
            <Flex gap={1}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Sale click
                }}
              >
                Sale
              </Button>
              <Button
                size="sm"
                colorScheme="cyan"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Rent click
                }}
              >
                Rent
              </Button>
            </Flex>

            <Button
              size="sm"
              colorScheme="green"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/player/${player._id}`);
              }}
            >
              View <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
