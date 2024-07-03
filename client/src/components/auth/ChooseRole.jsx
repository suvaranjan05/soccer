import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const toast = useToast();
  const { setMyRole } = useStore((state) => state);
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setSelectedRole(role);
    setMyRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "No Role Selected",
        description: "Please select a role to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
      return;
    }
    navigate("/register");
  };

  return (
    <Box
      backgroundImage="url('https://res.cloudinary.com/suvaranjan/image/upload/v1717559612/stadium-1_th5hkh.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      py="4rem"
    >
      <Box
        bg="rgba(173, 216, 230, 0.05)"
        backdropFilter="blur(2px)"
        width="80vw"
        margin="0 auto"
      >
        <Heading
          fontSize="4xl"
          textAlign="start"
          mb="20px"
          p={2}
          pl={5}
          color="#FAFAFA"
          background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        >
          YOU ARE A ....
        </Heading>

        <Flex
          direction="column"
          align="center"
          justify="center"
          py="4rem"
          borderRadius="md"
          p={2}
        >
          <SimpleGrid columns={[1, 2, 3]} spacing="20px" margin="0 auto">
            <RoleBox
              role="player"
              imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717570715/sven-kucinic-Z0KjmjxUsKs-unsplash-min_uakdwc.jpg"
              handleSelect={handleSelect}
              selected={selectedRole === "player"}
            />
            <RoleBox
              role="team-manager"
              imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717570389/chhose-team_g4azpn.jpg"
              handleSelect={handleSelect}
              selected={selectedRole === "team-manager"}
            />
            <RoleBox
              role="referee"
              imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717571552/gene-gallin-ruNiMsdI5IQ-unsplash-min_vvxw84.jpg"
              handleSelect={handleSelect}
              selected={selectedRole === "referee"}
            />
            <RoleBox
              role="coach"
              imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717584940/alliance-football-club-dHXegHI3Jlc-unsplash-min_axhypx.jpg"
              handleSelect={handleSelect}
              selected={selectedRole === "coach"}
            />
            <RoleBox
              role="fan"
              imageUrl="https://res.cloudinary.com/suvaranjan/image/upload/v1717572095/joshua-hanson-8JRhpMIu13c-unsplash-min_1_zrtuwz.jpg"
              handleSelect={handleSelect}
              selected={selectedRole === "fan"}
            />
          </SimpleGrid>

          <Button
            onClick={handleContinue}
            mt="1rem"
            w="300px"
            colorScheme="teal"
            background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
            _hover={{
              background:
                "linear-gradient(90deg, rgba(205,0,0,1) 0%, rgba(36,129,151,1) 65%, rgba(4,213,226,1) 100%)",
            }}
            borderRadius="none"
          >
            Continue
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const RoleBox = ({ role, imageUrl, handleSelect, selected }) => {
  return (
    <Box
      onClick={() => handleSelect(role)}
      width="200px"
      height="240px"
      mb={{ base: "1rem", md: "2rem" }}
      borderRadius="md"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      transition="border 0.3s"
      boxShadow={selected ? "0px 0px 20px 0px rgba(0,0,0,0.5)" : "none"}
      border={selected ? "4px solid green" : "4px solid white"}
    >
      <Image
        src={imageUrl}
        alt={role}
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="center"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        bg="rgba(0, 0, 0, 0.5)"
        p="0.5rem"
        textAlign="center"
        borderRadius="md"
      >
        <Text
          fontSize="xl"
          color="white"
          zIndex="1"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {role === "team-manager" ? "TEAM MANAGER" : role}
        </Text>
      </Box>
    </Box>
  );
};

export default ChooseRole;
