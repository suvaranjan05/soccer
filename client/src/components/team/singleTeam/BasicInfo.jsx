import { Avatar, Box, Text } from "@chakra-ui/react";
import { formatDate } from "../../../helper/formatDate";

export default function BasicInfo({ team, toogle, showToggle }) {
  return (
    <Box
      mr={{ base: 0, md: 2 }}
      mb={{ base: 2, md: 0 }}
      bg="rgba(255, 255, 255, 0.1)"
      p="1rem"
      flex={{ base: "1", md: "0 0 40%" }}
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="470px"
      minH="485px"
      overflowY="auto"
      className="custom-scrollbar"
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
        <Text p="10px 0">BASIC INFORMATION</Text>
        {showToggle && (
          <Box
            cursor="pointer"
            bg="rgba(255, 255, 255, 0.6)"
            color="#000"
            p="5px 10px"
            borderRadius="md"
            fontSize="1.1rem"
            onClick={toogle}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Box>
        )}
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          TEAM NAME
        </Text>
        <Text>{team.name}</Text>
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          AVATAR
        </Text>
        <Avatar size="md" src={team.avatar} />
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          DESCRIPTION
        </Text>
        <Text>{team.description}</Text>
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          Formation (Line-Up)
        </Text>
        <Text>{team.formation}</Text>
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          COACH INFO
        </Text>
        <Avatar size="md" src={team.coach.avatar} mb="0.5rem" />
        <Text>{team.coach.fullName}</Text>
        <Text>{team.coach.address}</Text>
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          TEAM BANK INFO
        </Text>
        <Text>PayNow Number: {team.bankInfo.paynowNumber}</Text>
        <Text>Bank Card Number: {team.bankInfo.bankCardNumber}</Text>
        <Text>Bank Number: {team.bankInfo.bankNumber}</Text>
      </Box>
      <Box className="childBox">
        <Text mb="1rem" fontWeight="600">
          SPONSOR INFO
        </Text>
        <Text>Name: {team.sponsor.name}</Text>
        <Text>Contact Information: {team.sponsor.contact}</Text>
        <Text>Amount: {team.sponsor.amount}</Text>

        <Text fontWeight="500">Period</Text>

        <Text>
          {formatDate(team.sponsor.period.startDate)} to{" "}
          {formatDate(team.sponsor.period.endDate)}
        </Text>
      </Box>
    </Box>
  );
}
