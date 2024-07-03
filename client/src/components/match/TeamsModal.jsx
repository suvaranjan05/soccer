import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  VStack,
  HStack,
  Avatar,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

export default function TeamModal({ isOpen, onClose, teams, onSubmit }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleRemoveSelectedTeam = () => {
    setSelectedTeam(null);
  };

  const handleSubmit = () => {
    if (selectedTeam) {
      onSubmit(selectedTeam._id);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
          bgGradient="linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
          backdropFilter="blur(10px)"
        >
          <ModalHeader>Select Your Team for Match</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} fontWeight="600" fontSize="sm">
              Selected Team:
            </Text>
            {selectedTeam ? (
              <Tag
                size="lg"
                borderRadius="full"
                variant="solid"
                colorScheme="green"
                mb={4}
                p={2}
                fontSize=".8rem"
              >
                <Avatar
                  src={selectedTeam.avatar}
                  size="sm"
                  name={selectedTeam.name}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{selectedTeam.name}</TagLabel>
                <TagCloseButton onClick={handleRemoveSelectedTeam} />
              </Tag>
            ) : (
              <Text mb={4}>No Team Selected</Text>
            )}
            <VStack
              spacing={4}
              p={1}
              maxHeight="200px"
              overflowY="auto"
              className="custom-scrollbar"
            >
              {teams.map((team) => (
                <Box
                  key={team._id}
                  p={4}
                  bg="rgba(255, 255, 255, 0.1)"
                  borderRadius="md"
                  boxShadow="md"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <HStack spacing={4}>
                    <Avatar
                      boxSize="50px"
                      src={team.avatar}
                      alt={team.name}
                      borderRadius="full"
                    />
                    <Text fontSize="1rem" fontWeight="400" color="white">
                      {team.name}
                    </Text>
                  </HStack>
                  <Button
                    colorScheme={
                      selectedTeam && selectedTeam._id === team._id
                        ? "green"
                        : "blue"
                    }
                    onClick={() => handleSelectTeam(team)}
                  >
                    {selectedTeam && selectedTeam._id === team._id
                      ? "Selected"
                      : "Select"}
                  </Button>
                </Box>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              isDisabled={!selectedTeam}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
