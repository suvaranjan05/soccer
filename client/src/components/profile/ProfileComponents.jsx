import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Code, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function FirstCard({ playerData, toggleFirstCard, logoutUser }) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      mb=".5rem"
      position="relative"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar size="lg" src={playerData.avatar} />
        <Box>
          <Text fontSize="1.2rem" fontWeight="600">
            {playerData.userName}
          </Text>
          <Text
            bgColor="#38A169"
            textTransform="uppercase"
            p={1}
            borderRadius="md"
            fontSize=".8rem"
            // border="2px solid red"
            display="inline-block"
          >
            {playerData.role}
          </Text>
        </Box>
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={toggleFirstCard}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Box>
    </Box>
  );
}

export function Balance({ playerData }) {
  const navigate = useNavigate();
  return (
    <Box bg="rgba(255, 255, 255, 0.2)" p="1rem" borderRadius="md" mb=".5rem">
      <Text fontSize="1.2rem" fontWeight="bold" mb={2}>
        Balance
      </Text>
      <Box fontSize="1rem">
        <Box display="flex" alignItems="center">
          <Text mr={2} fontWeight="600">
            zGold
          </Text>
          <Box display="flex" alignItems="center">
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
              height="25px"
            />
            <Text fontWeight="600">{playerData.zGold}</Text>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Text mr={2} fontWeight="600">
            Diamond
          </Text>
          <Box display="flex" alignItems="center">
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
              height="25px"
            />
            <Text fontWeight="600">{playerData.diamond}</Text>
          </Box>
        </Box>
      </Box>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        mt={3}
        size="sm"
        onClick={() => navigate("/add-funds")}
      >
        Add Funds
      </Button>
    </Box>
  );
}

export function BasicInfo({ playerData, toggleBasicInfo }) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      fontSize="1rem"
      mb=".5rem"
      position="relative"
    >
      <Text fontSize="1.2rem" fontWeight="bold" mb={2}>
        Basic Information
      </Text>
      <Text fontWeight="600">
        Name:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.fullName}
        </Text>
      </Text>
      <Text fontWeight="600">
        Age:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.age}
        </Text>
      </Text>
      <Text fontWeight="600">
        Date of Birth:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.dateOfBirth}
        </Text>
      </Text>
      <Text fontWeight="600">
        Gender:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.gender}
        </Text>
      </Text>
      <Text fontWeight="600">
        Email:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.email}
        </Text>
      </Text>
      <Text fontWeight="600">
        Phone:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.phone}
        </Text>
      </Text>
      <Text fontWeight="600">
        Address:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.address}
        </Text>
      </Text>
      <Text fontWeight="600">
        Occupation:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.occupation}
        </Text>
      </Text>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={toggleBasicInfo}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Box>
    </Box>
  );
}

export function PlayerStrength({ playerData, togglePlayerStrength }) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      fontSize="1rem"
      position="relative"
      mb=".5rem"
    >
      <Text fontSize="1.2rem" fontWeight="bold" mb={2}>
        Player Strength
      </Text>
      <Text fontWeight="600">
        Striker:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.selfRating.striker}
        </Text>
      </Text>
      <Text fontWeight="600">
        Wing:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.selfRating.winger}
        </Text>
      </Text>
      <Text fontWeight="600">
        Midfielder:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.selfRating.midfielder}
        </Text>
      </Text>
      <Text fontWeight="600">
        Defender:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.selfRating.wingDefender}
        </Text>
      </Text>
      <Text fontWeight="600">
        Center Back:{" "}
        <Text as="span" fontWeight="normal">
          {playerData.selfRating.centralBack}
        </Text>
      </Text>
      <Box
        position="absolute"
        top="15px"
        right="25px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize="1rem"
        onClick={togglePlayerStrength}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </Box>
    </Box>
  );
}

export function Logout({ logoutUser }) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p="1rem"
      borderRadius="md"
      fontSize="1rem"
      position="relative"
      mb=".5rem"
    >
      <Button colorScheme="red" onClick={logoutUser}>
        Logout
      </Button>
    </Box>
  );
}
