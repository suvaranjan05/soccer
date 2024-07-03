import React, { useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Input,
  Button,
  VStack,
  Heading,
  Image,
  SimpleGrid,
  Select,
  IconButton,
  Center,
} from "@chakra-ui/react";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import {
  addTeamToMatch,
  getManagerTeams,
  removeTeamFromMatch,
  updateConfirmTeam,
} from "../../../api/api";

const ConfirmTeams = ({ matchDetails }) => {
  const { loginUser } = useLoginUser();
  const [teams, setTeams] = useState(matchDetails.confirmedTeams);
  const [myTeams, setMyTeams] = useState([]);
  const [fetchingMyTeams, setFetchingMyTeams] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showAddYourTeams, setShowAddYourTeams] = useState(false);

  const handleAssignDetails = (index, field, value) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = {
      ...updatedTeams[index],
      [field]: value,
    };
    setTeams(updatedTeams);
  };

  const handleSave = async (index) => {
    const formData = teams[index];

    // Validate if any field is empty
    if (!formData.color || !formData.jersey || !formData.number) {
      return toast.error("Please fill in all fields.");
    }

    // Check if data has changed
    const currentData = matchDetails.confirmedTeams[index];
    if (
      formData.color === currentData.color &&
      formData.jersey === currentData.jersey &&
      formData.number === currentData.number
    ) {
      return toast.error("No changes detected.");
    }

    const newData = {
      teamId: formData.team._id,
      color: formData.color,
      jersey: formData.jersey,
      number: formData.number,
    };

    try {
      const res = updateConfirmTeam(loginUser.token, newData, matchDetails._id);

      toast.promise(res, {
        loading: `Saving ...`,
        success: (res) => {
          setEditIndex(null);
          return "Saved";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyTeams = async () => {
    if (loginUser.role !== "team-manager") {
      return toast.error("You have no Teams");
    }

    setFetchingMyTeams(true);
    try {
      const res = await getManagerTeams(loginUser.token);
      setMyTeams(res.data.teams);
      setShowAddYourTeams(true);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingMyTeams(false);
    }
  };

  const handleAddTeam = async (teamId) => {
    try {
      const res = addTeamToMatch(loginUser.token, matchDetails._id, teamId);

      toast.promise(res, {
        loading: `Adding...`,
        success: (res) => {
          setShowAddYourTeams(false);
          return "Team Added";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTeam = async (teamId) => {
    try {
      const res = removeTeamFromMatch(
        loginUser.token,
        matchDetails._id,
        teamId
      );
      toast.promise(res, {
        loading: `Removing...`,
        success: (res) => {
          setTeams(teams.filter((t) => t.team._id !== teamId));
          return "Team Removed";
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
      p={5}
      rounded="md"
      shadow="md"
      backdropFilter="blur(10px)"
      fontSize="1rem"
      bgGradient="linear-gradient(to right, #fc00ff, #00dbde)"
      mb="1rem"
    >
      {!showAddYourTeams ? (
        <>
          <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
            Confirmed Teams : {matchDetails.confirmedTeams.length}
            <Box
              maxWidth="fit-content"
              margin="auto"
              mt={2}
              display="flex"
              gap={2}
            >
              <Text
                textAlign="center"
                fontSize=".7rem"
                bg="rgba(255, 255, 255, 0.4)"
                borderRadius="md"
                p={2}
                color="#000"
              >
                Max Teams : {matchDetails.maxTeams}
              </Text>
              <Button
                size="sm"
                onClick={fetchMyTeams}
                isLoading={fetchingMyTeams}
                loadingText="Checking.."
              >
                Add Your Team
              </Button>
            </Box>
          </Heading>
          <SimpleGrid columns={[1, null, 2]} spacing={4}>
            {teams.length > 0 &&
              teams.map((teamObj, index) => (
                <Box
                  key={teamObj.team._id}
                  p={4}
                  shadow="md"
                  rounded="md"
                  textAlign="center"
                  position="relative"
                  boxShadow="lg"
                  bg="rgba(255, 255, 255, 0.2)"
                  backdropFilter="blur(10px)"
                >
                  {editIndex === index ? (
                    <VStack spacing={2} position="relative">
                      <Avatar src={teamObj.team.avatar} size="lg" mx="auto" />
                      <Text fontWeight="bold">{teamObj.team.name}</Text>
                      <Input
                        placeholder="Enter color"
                        value={teamObj.color || ""}
                        onChange={(e) =>
                          handleAssignDetails(index, "color", e.target.value)
                        }
                        bg="#FAFAFA"
                      />
                      <Input
                        placeholder="Enter jersey URL"
                        value={teamObj.jersey || ""}
                        onChange={(e) =>
                          handleAssignDetails(index, "jersey", e.target.value)
                        }
                        bg="#FAFAFA"
                      />
                      <Select
                        placeholder="Select number"
                        value={teamObj.number || ""}
                        onChange={(e) =>
                          handleAssignDetails(index, "number", e.target.value)
                        }
                        bg="#FAFAFA"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </Select>
                      <Button onClick={() => handleSave(index)}>Save</Button>
                      <Box
                        position="absolute"
                        top="10px"
                        right="20px"
                        zIndex="1"
                        cursor="pointer"
                        bg="rgba(255, 255, 255, 0.6)"
                        color="#000"
                        p="5px 10px"
                        borderRadius="md"
                        fontSize=".9rem"
                        onClick={() => setEditIndex(null)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </Box>
                    </VStack>
                  ) : (
                    <>
                      <VStack spacing={2}>
                        <Avatar src={teamObj.team.avatar} size="lg" mx="auto" />
                        <Text fontWeight="bold">{teamObj.team.name}</Text>
                        <Text>
                          <Text as="span" fontWeight="600">
                            Color:
                          </Text>{" "}
                          {teamObj.color || (
                            <Text as="span" fontWeight="400">
                              Not assigned
                            </Text>
                          )}
                        </Text>
                        <Text>
                          <Text as="span" fontWeight="600">
                            Jersey:
                          </Text>{" "}
                          {teamObj.jersey ? (
                            <Image
                              src={teamObj.jersey}
                              boxSize="50px"
                              mx="auto"
                            />
                          ) : (
                            <Text as="span" fontWeight="400">
                              Not assigned
                            </Text>
                          )}
                        </Text>
                        <Text>
                          <Text as="span" fontWeight="600">
                            Number:
                          </Text>{" "}
                          {teamObj.number || (
                            <Text as="span" fontWeight="400">
                              Not assigned
                            </Text>
                          )}
                        </Text>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleRemoveTeam(teamObj.team._id)}
                        >
                          Remove Team
                        </Button>
                      </VStack>
                      <Box position="absolute" top="4" right="4">
                        <IconButton
                          icon={<i className="fa-solid fa-pen-to-square"></i>}
                          onClick={() => setEditIndex(index)}
                          aria-label="Edit team details"
                          variant="ghost"
                        />
                      </Box>
                    </>
                  )}
                </Box>
              ))}
          </SimpleGrid>
          {teams.length === 0 && (
            <Center>
              <Text
                mt="1rem"
                bg="rgba(255, 0, 0, 0.2)"
                p={2}
                borderRadius="md"
                color="#FAFAFA"
                fontWeight="600"
              >
                No Confirm Teams Found
              </Text>
            </Center>
          )}
        </>
      ) : (
        <AddYourTeams
          myTeams={myTeams}
          setShowAddYourTeams={setShowAddYourTeams}
          handleAddTeam={handleAddTeam}
        />
      )}
    </Box>
  );
};

export default ConfirmTeams;

const AddYourTeams = ({ myTeams, setShowAddYourTeams, handleAddTeam }) => {
  return (
    <Box
      p={5}
      rounded="md"
      shadow="md"
      backdropFilter="blur(10px)"
      fontSize="1rem"
      bgGradient="linear-gradient(to right, #fc00ff, #00dbde)"
      position="relative"
    >
      <Box
        position="absolute"
        top="10px"
        right="20px"
        zIndex="1"
        cursor="pointer"
        bg="rgba(255, 255, 255, 0.6)"
        color="#000"
        p="5px 10px"
        borderRadius="md"
        fontSize=".9rem"
        onClick={() => setShowAddYourTeams(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </Box>
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Add Your Teams
      </Heading>
      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        {myTeams.length > 0 &&
          myTeams.map((team) => (
            <Box
              key={team._id}
              p={4}
              shadow="md"
              rounded="md"
              textAlign="center"
              boxShadow="lg"
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
            >
              <VStack spacing={2}>
                <Avatar src={team.avatar} size="lg" mx="auto" />
                <Text fontWeight="bold">{team.name}</Text>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleAddTeam(team._id)}
                >
                  Add
                </Button>
              </VStack>
            </Box>
          ))}
      </SimpleGrid>
      {myTeams.length === 0 && (
        <Center>
          <Text
            mt="1rem"
            bg="rgba(255, 0, 0, 0.2)"
            p={2}
            borderRadius="md"
            color="#FAFAFA"
            fontWeight="600"
          >
            You have no teams.
          </Text>
        </Center>
      )}
    </Box>
  );
};
