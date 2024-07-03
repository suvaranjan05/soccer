import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const PlayerCard = ({ player }) => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      p="4"
      bg="rgba(255, 255, 255, 0.2)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="md"
      mb=".5rem"
      w="100%"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      color="#FAFAFA"
    >
      <Avatar size="lg" src={player.avatar} />
      <Box flex={1} ml="4">
        <Text fontWeight="600" fontSize="1rem">
          {player.user ? player.user.userName : player.fullName}
        </Text>
        <Text>{player.team ? player.team.name : "No Teams Joined"}</Text>
      </Box>
      <Button onClick={() => navigate(`/player/${player._id}`)}>
        Profile <ExternalLinkIcon mx="2px" />
      </Button>
    </Box>
  );
};

export default PlayerCard;
