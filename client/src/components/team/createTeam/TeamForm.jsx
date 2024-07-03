import { useEffect, useState } from "react";
import { Box, Flex, Input, Text, Textarea, Avatar } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import initialValues from "./formik/initialValues";
import validationSchema from "./formik/validate";
import Header from "../../header/Header";
import CoachInfo from "./forms/CoachInfo";
import TeamBankInfo from "./forms/TeamBankInfo";
import SponsorInfo from "./forms/SponsorInfo";
import FormationSelection from "./Formation";
import PlayerList from "./PlayerList";
import { imageUpload } from "../../../helper/imageUpload";
import { createTeam, getMyPlayers } from "../../../api/api";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function TeamForm() {
  const { loginUser } = useLoginUser();
  const [addedPlayers, setAddedPlayers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState("3-3-4");
  const [teamAvatar, setTeamAvatar] = useState("");
  const [coachAvatar, setCoachAvatar] = useState("");
  const [fetchingPlayers, setFetchingPlayers] = useState(true);
  const [myPlayers, setMyPlayers] = useState([]);
  const [addingPlayer, setAddingPlayer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAuto = () => {
    const formations = {
      "3-3-4": [3, 3, 4],
      "4-3-3": [4, 3, 3],
      "4-4-2": [4, 4, 2],
    };
    const formationKeys = Object.keys(formations);
    const randomKey =
      formationKeys[Math.floor(Math.random() * formationKeys.length)];
    setSelectedFormation(randomKey);
  };

  const handleFormationClick = (formation) => {
    setSelectedFormation(formation);
  };

  const handleAddPlayer = async (playerId) => {
    if (addedPlayers.includes(playerId)) {
      const updatedArr = addedPlayers.filter((item) => item !== playerId);
      setAddedPlayers(updatedArr);
      return;
    } else {
      setAddedPlayers((prevAddedPlayers) => [...prevAddedPlayers, playerId]);
    }
  };

  const handleFormSubmit = async (values) => {
    if (!addedPlayers.length > 0) {
      return toast.error("No Players Added");
    }

    const formData = {
      ...values,
      avatar: teamAvatar,
      coachInfo: {
        ...values.coach,
        avatar: coachAvatar,
      },
      addedPlayers,
      formation: selectedFormation,
    };
    // console.log(formData);
    try {
      const res = createTeam(loginUser.token, formData);
      toast.promise(res, {
        loading: `Creating Team..`,
        success: (res) => {
          navigate(`/team/${res.data.teamId}`);
          return "Team Created";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setTeamAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlayers = async () => {
    try {
      setFetchingPlayers(true);
      const res = await getMyPlayers(loginUser.token);
      setMyPlayers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingPlayers(false);
    }
  };

  return (
    <Box
      // backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      // backgroundSize="cover"
      // backgroundPosition="center"
      minH="100vh"
      color="#FAFAFA"
      display="flex"
      flexDirection="column"
    >
      <Header heading="ADD NEW TEAM" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          // handleBlur,
          // handleSubmit,
          // setFieldValue,
        }) => (
          <Form>
            <Box
              display="flex"
              flexDir={{ base: "column", md: "row" }}
              mt="2rem"
              gap=".5rem"
              p="1rem"
              flex="1"
            >
              <Box
                display={{ base: "block", md: "flex" }}
                flex={{ base: "1", md: "0 0 60%" }}
              >
                <Box
                  mr={{ base: 0, md: 2 }}
                  mb={{ base: 2, md: 0 }}
                  bg="rgba(255, 255, 255, 0.1)"
                  p="1rem"
                  flex="1"
                  borderRadius="10px"
                  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                  backdropFilter="blur(10px)"
                  maxHeight="465px"
                  overflowY="auto"
                  className="custom-scrollbar"
                >
                  <Box className="childBox">
                    <Text mb="1rem" fontWeight="600">
                      TEAM NAME
                    </Text>
                    <Field name="name">
                      {({ field }) => <Input {...field} id="name" />}
                    </Field>
                    {errors.name && touched.name ? (
                      <Box className="error-box">{errors.name}</Box>
                    ) : null}
                  </Box>
                  <Box className="childBox">
                    <Text mb="1rem" fontWeight="600">
                      TEAM AVATAR
                    </Text>
                    <label htmlFor="avatar-upload">
                      <Avatar
                        size="md"
                        src={teamAvatar}
                        mt=".5rem"
                        cursor="pointer"
                      />
                      <Input
                        id="avatar-upload"
                        type="file"
                        onChange={(event) => handleFileChange(event)}
                        display="none"
                      />
                    </label>
                    {errors.avatar && touched.avatar ? (
                      <Box className="error-box">{errors.avatar}</Box>
                    ) : null}
                  </Box>
                  <Box className="childBox">
                    <Text mb="1rem" fontWeight="600">
                      ADD DESCRIPTION
                    </Text>
                    <Field name="description">
                      {({ field }) => <Textarea {...field} id="description" />}
                    </Field>
                    {errors.description && touched.description ? (
                      <Box className="error-box">{errors.description}</Box>
                    ) : null}
                  </Box>

                  <CoachInfo
                    coach={values.coach}
                    setCoach={handleChange}
                    onUpload={setCoachAvatar}
                  />

                  <TeamBankInfo
                    bankInfo={values.bankInfo}
                    setBankInfo={handleChange}
                  />

                  <SponsorInfo
                    sponsor={values.sponsor}
                    setSponsor={handleChange}
                  />
                </Box>

                <FormationSelection
                  handleAuto={handleAuto}
                  handleFormationClick={handleFormationClick}
                  selectedFormation={selectedFormation}
                />
              </Box>

              <PlayerList
                addedPlayers={addedPlayers}
                handleAddPlayer={handleAddPlayer}
                players={myPlayers}
                loading={fetchingPlayers}
                isAdding={addingPlayer}
              />
            </Box>
            <Flex
              alignContent="center"
              textAlign="center"
              mt="1rem"
              mb="1rem"
              justifyContent="center"
            >
              <button type="submit" className="btn-grad">
                Create New Team
              </button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default TeamForm;
