import React from "react";
import { Box, Text, Avatar, Image, Code } from "@chakra-ui/react";
import { formatDate } from "../../../helper/formatDate";

const BasicInfo = ({ player, toggle, showToggle }) => {
  // console.log(player);
  return (
    <Box
      p="1rem"
      flex="1"
      borderRadius="10px"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="465px"
      overflowY="auto"
      className="custom-scrollbar"
      mb={{ base: ".5rem", md: 0 }}
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
        <Text color="#FAFAFA">BASIC INFORMATION</Text>

        {showToggle && (
          <Box
            cursor="pointer"
            bg="rgba(255, 255, 255, 0.6)"
            color="#000"
            p="5px 10px"
            borderRadius="md"
            fontSize="1.1rem"
            onClick={toggle}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Box>
        )}
      </Box>
      {!player.fullName && (
        <Code
          colorScheme="red"
          children="Player hasn't updated their profile yet."
        />
      )}

      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          PLAYER NAME
        </Text>
        <Text>{player.fullName}</Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          AVATAR
        </Text>
        <Avatar size="md" src={player.avatar} mt=".5rem" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Age
        </Text>
        <Text>{player.age}</Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          DOB
        </Text>
        <Text>{formatDate(player.dateOfBirth)}</Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Gender
        </Text>
        <Text>{player.gender}</Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Phone
        </Text>
        <Text>{player.phone}</Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Preferred Wing
        </Text>
        <Text>{player.preferredWing}</Text>
      </Box>
    </Box>
  );
};

export default BasicInfo;
