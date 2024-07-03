import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { searchPlayers, sendTeamInvitation } from "../../../api/api";
import { useState } from "react";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";

export default function InvitePlayers({ toggle, teamId }) {
  const { loginUser } = useLoginUser();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (keyword === "") return;
    try {
      setSearching(true);
      const res = await searchPlayers(loginUser.token, { keyword });
      if (res.data.length > 0) {
        console.log(res.data);
        setSearchResults(res.data);
      } else {
        return toast.error("No Players Found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const sendInvitation = async (playerId) => {
    try {
      const res = sendTeamInvitation(loginUser.token, playerId, teamId);

      toast.promise(res, {
        loading: `Sending Invitation ...`,
        success: (res) => {
          return "Invitation Sent";
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
          INVITE PLAYERS
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
        <Box display="flex" pr={3} borderRadius="md" mb="1rem">
          <InputGroup mr={2} flex={1}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search Player"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="no-hover-search"
            />
          </InputGroup>
          <Button
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            onClick={handleSearch}
            isLoading={searching}
          >
            Search
          </Button>
        </Box>

        <Box
          maxHeight="320px"
          minHeight="320px"
          overflowY="auto"
          className="custom-scrollbar"
          p={1}
        >
          {searchResults.length > 0 &&
            !searching &&
            searchResults.map((p) => {
              return (
                <PlayerCard
                  key={p._id}
                  player={p}
                  sendInvitation={sendInvitation}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

const PlayerCard = ({ player, sendInvitation }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderRadius="md"
      alignItems="center"
      fontSize="1rem"
      bg="rgba(255, 255, 255, 0.2)"
      mb={2}
      fontWeight="600"
    >
      <Box display="flex" gap={2} alignItems="center">
        <Avatar size="sm" src={player.avatar} />
        <Text>{player.user.userName}</Text>
      </Box>
      <Button
        size="sm"
        colorScheme="blue"
        isDisabled={player.alreadyInATeam}
        onClick={() => sendInvitation(player._id)}
      >
        {player.alreadyInATeam ? "In a Team" : "Invite"}
      </Button>
    </Box>
  );
};
