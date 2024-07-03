import React, { useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Button,
  VStack,
  Heading,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import {
  removePlayerFromMatch,
  getMyPlayers,
  addPlayerToMatch,
} from "../../../api/api";

const ConfirmPlayers = ({ matchDetails }) => {
  const { loginUser } = useLoginUser();
  const [players, setPlayers] = useState(matchDetails.confirmedPlayers);
  const [myPlayers, setMyPlayers] = useState([]);
  const [fetchingMyPlayers, setFetchingMyPlayers] = useState(false);
  const [showAddYourPlayers, setShowAddYourPlayers] = useState(false);

  const handleRemovePlayer = async (playerId) => {
    try {
      const res = removePlayerFromMatch(
        loginUser.token,
        matchDetails._id,
        playerId
      );
      toast.promise(res, {
        loading: `Removing...`,
        success: (res) => {
          setPlayers(players.filter((p) => p.player._id !== playerId));
          return "Player Removed";
        },
        error: (e) => {
          console.log(error);
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyPlayers = async () => {
    if (loginUser.role !== "team-manager") {
      return toast.error("You have no Players");
    }

    setFetchingMyPlayers(true);
    try {
      const res = await getMyPlayers(loginUser.token);
      console.log(res.data);
      setMyPlayers(res.data);
      setShowAddYourPlayers(true);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingMyPlayers(false);
    }
  };

  const handleAddPlayer = async (playerId) => {
    try {
      const res = addPlayerToMatch(loginUser.token, matchDetails._id, playerId);
      toast.promise(res, {
        loading: `Adding...`,
        success: (res) => {
          //   setPlayers((p) => [...p, res.data.addedPlayer]);
          setShowAddYourPlayers(false);
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
      p={5}
      rounded="md"
      shadow="md"
      backdropFilter="blur(10px)"
      fontSize="1rem"
      bgGradient="linear-gradient(to right, #fc00ff, #00dbde)"
    >
      {!showAddYourPlayers ? (
        <>
          <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
            Confirmed Players : {matchDetails.confirmedPlayers.length}
            <Box
              maxWidth="fit-content"
              margin="auto"
              mt={2}
              display="flex"
              gap={2}
            >
              <Button
                size="sm"
                onClick={fetchMyPlayers}
                isLoading={fetchingMyPlayers}
                loadingText="Checking.."
              >
                Add Your Player
              </Button>
            </Box>
          </Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            {players.length > 0 &&
              players.map((p) => (
                <Box
                  key={p.player._id}
                  p={4}
                  shadow="md"
                  rounded="md"
                  textAlign="center"
                  boxShadow="lg"
                  bg="rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(10px)"
                >
                  <VStack spacing={2}>
                    <Avatar src={p.player.avatar} size="lg" mx="auto" />
                    <Text fontWeight="bold">
                      {p.player.user
                        ? p.player.user.userName
                        : p.player.fullName}
                    </Text>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemovePlayer(p.player._id)}
                    >
                      Remove Player
                    </Button>
                  </VStack>
                </Box>
              ))}
          </SimpleGrid>

          {players.length === 0 && (
            <Center>
              <Text
                mt="1rem"
                bg="rgba(255, 0, 0, 0.2)"
                p={2}
                borderRadius="md"
                color="#FAFAFA"
                fontWeight="600"
              >
                No Confirmed Players Found
              </Text>
            </Center>
          )}
        </>
      ) : (
        <AddYourPlayers
          myPlayers={myPlayers}
          setShowAddYourPlayers={setShowAddYourPlayers}
          handleAddPlayer={handleAddPlayer}
        />
      )}
    </Box>
  );
};

export default ConfirmPlayers;

const AddYourPlayers = ({
  myPlayers,
  setShowAddYourPlayers,
  handleAddPlayer,
}) => {
  return (
    <Box
      p={5}
      rounded="md"
      shadow="md"
      backdropFilter="blur(10px)"
      fontSize="1rem"
      bgGradient="linear-gradient(to right, #fc00ff, #00dbde)"
      position="relative"
    >
      <Box
        position="absolute"
        top="10px"
        right="20px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize=".9rem"
        onClick={() => setShowAddYourPlayers(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Add Your Players
      </Heading>
      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        {myPlayers.length > 0 ? (
          myPlayers.map((player) => (
            <Box
              key={player._id}
              p={4}
              shadow="md"
              rounded="md"
              textAlign="center"
              boxShadow="lg"
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
            >
              <VStack spacing={2}>
                <Avatar src={player.avatar} size="lg" mx="auto" />
                <Text fontWeight="bold">{player.fullName}</Text>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleAddPlayer(player._id)}
                >
                  Add
                </Button>
              </VStack>
            </Box>
          ))
        ) : (
          <Center>
            <Text
              mt="1rem"
              bg="rgba(255, 0, 0, 0.2)"
              p={2}
              borderRadius="md"
              color="#FAFAFA"
              fontWeight="600"
            >
              You have no players.
            </Text>
          </Center>
        )}
      </SimpleGrid>
    </Box>
  );
};
