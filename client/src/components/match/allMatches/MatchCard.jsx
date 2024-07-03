import {
  Text,
  Box,
  Stack,
  Heading,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { formatMatchDate } from "../../../helper/formatDate";
import useLoginUser from "../../../hooks/useLoginUser";

function MatchCard({ match, handleJoin, isLoading }) {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

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
        src={match.photo}
        alt={match.description}
        borderTopRadius="lg"
        objectFit="cover"
        height="200px"
        w="100%"
      />
      <Box p="6">
        <Stack mt={1} spacing="2">
          <Heading size="md" color="#000" textAlign="center">
            Match
          </Heading>
          <Box>
            <Text
              fontSize="1rem"
              fontWeight="600"
              color="#000"
              display="inline"
            >
              Date -
            </Text>
            <Text
              fontSize="1rem"
              fontWeight="400"
              color="#000"
              display="inline"
              ml={1}
            >
              {formatMatchDate(match.date)}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="1rem"
              fontWeight="600"
              color="#000"
              display="inline"
            >
              Type :
            </Text>
            <Text
              fontSize="1rem"
              fontWeight="400"
              color="#000"
              display="inline"
              ml={1}
            >
              {match.type}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="1rem"
              fontWeight="600"
              color="#000"
              display="inline"
            >
              Status :
            </Text>
            <Text
              fontSize="1rem"
              fontWeight="400"
              color="#000"
              display="inline"
              ml={1}
            >
              {match.status}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="1rem"
              fontWeight="600"
              color="#000"
              display="inline"
            >
              Description :
            </Text>
            <Text
              fontSize="1rem"
              fontWeight="400"
              color="#000"
              display="inline"
              ml={1}
            >
              {truncateDescription(match.description, 15)}
            </Text>
          </Box>
        </Stack>
        <Flex alignItems="center" justifyContent="space-between" gap={2} mt={4}>
          <Button
            colorScheme="purple"
            type="submit"
            fontWeight="400"
            onClick={() => navigate(`/match/${match._id}`)}
            size="sm"
            flex="1"
          >
            View
          </Button>
          {loginUser.userId !== match.createdBy &&
            loginUser.role !== "referee" && (
              <Button
                colorScheme="purple"
                type="submit"
                fontWeight="400"
                onClick={() => handleJoin(match._id)}
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

export default MatchCard;

function truncateDescription(description, wordLimit) {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(" ") + " ...";
}
