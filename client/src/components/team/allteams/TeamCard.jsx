import {
  Text,
  Box,
  Stack,
  Heading,
  AspectRatio,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function TeamCard({ team, handleJoin, isLoginUserPlayer }) {
  const navigate = useNavigate();

  return (
    <Box
      maxW="sm"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      color="#FAFAFA"
    >
      <Image
        src={team.avatar}
        alt={team.name}
        borderTopRadius="lg"
        objectFit="cover"
      />
      <Box p="6">
        <Stack mt="4" spacing="3">
          <Heading size="md" color="#000">
            {team.name}
          </Heading>
          <Text fontSize=".9rem" color="#000">
            {team.description && truncateDescription(team.description, 10)}
          </Text>
        </Stack>
        <Flex alignItems="center" justifyContent="center" gap={2} mt={4}>
          <Button
            colorScheme="purple"
            type="submit"
            fontWeight="400"
            onClick={() => navigate(`/team/${team._id}`)}
            size="sm"
            flex="1"
          >
            View
          </Button>
          {isLoginUserPlayer && (
            <Button
              variant="outline"
              onClick={() => handleJoin(team._id)}
              colorScheme="purple"
              size="sm"
              flex="1"
            >
              Join
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default TeamCard;

const truncateDescription = (description, wordLimit) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};
