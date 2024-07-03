import React from "react";
import { Box, Text, Avatar, Image } from "@chakra-ui/react";
import { formatMatchDate } from "../../../helper/formatDate";

const MatchBasicDetails = ({ matchDetails }) => {
  return (
    <Box
      p={4}
      //   bg="rgba(255, 255, 255, 0.1)"
      //   background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
      bgGradient="linear-gradient(to right, #005aa7, #fffde4)"
      borderRadius="md"
      boxShadow="lg"
      backdropFilter="blur(10px)"
      fontSize="1rem"
      mb="1rem"
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="md"
        boxShadow="lg"
        backdropFilter="blur(10px)"
        p={4}
        mb={3}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Match Details
        </Text>
      </Box>

      <Box display={{ lg: "flex", base: "block" }}>
        {/* First Column */}
        <Box
          flex="1"
          mb={{ base: 4, lg: 0 }}
          p={4}
          bg="rgba(255, 255, 255, 0.25)"
          borderRadius="md"
          boxShadow="lg"
          backdropFilter="blur(10px)"
          mr={{ lg: 3, base: 0 }}
        >
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Date:
            </Text>{" "}
            {formatMatchDate(matchDetails.date)}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Location:
            </Text>{" "}
            {matchDetails.location}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Match Type:
            </Text>{" "}
            {matchDetails.type}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Status:
            </Text>{" "}
            {matchDetails.status}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Player Need:
            </Text>{" "}
            {matchDetails.playerNeed}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Description:
            </Text>{" "}
            {matchDetails.description}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Confirm Teams:
            </Text>{" "}
            {matchDetails.confirmedTeams.length}
          </Text>
          <Text mb={2}>
            <Text as="span" fontWeight="bold">
              Confirm Players:
            </Text>{" "}
            {matchDetails.confirmedPlayers.length}
          </Text>
        </Box>

        {/* Second Column */}
        <Box
          flex="1"
          flexDirection="column"
          gap={4}
          display={{ base: "block", lg: "flex" }}
        >
          <Box
            width="100%"
            height="200px"
            position="relative"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            flex={5}
            mb={{ base: 3, lg: 0 }}
          >
            <Box
              width="100%"
              height="100%"
              bgImage={`url(${matchDetails.field.photo})`}
              bgSize="cover"
              bgPosition="center"
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
              p="4"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="lg">
                {matchDetails.field.name}
              </Text>
              <Text fontSize="sm">Location: {matchDetails.field.location}</Text>
              <Text fontSize="sm">Fee: ${matchDetails.field.fee}</Text>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            p={4}
            bg="rgba(255, 255, 255, 0.25)"
            borderRadius="md"
            boxShadow="lg"
            backdropFilter="blur(10px)"
            flex={1}
          >
            <Avatar src={matchDetails.referee.avatar} size="md" mr={4} />
            <Box>
              <Text fontWeight="bold">
                {matchDetails.referee.user.userName}
              </Text>
              <Text>Fee: ${matchDetails.referee.fee}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchBasicDetails;
