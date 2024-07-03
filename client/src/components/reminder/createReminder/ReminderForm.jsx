import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  SimpleGrid,
  Checkbox,
  FormErrorMessage,
  Input,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TeamCard, PlayerCard } from "./Cards";
import Calendar from "./Calendar";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
  eventType: Yup.string().required("Event type is required"),
  startDateTime: Yup.date().required("Start date and time are required"),
  repeat: Yup.lazy((value) => {
    if (!value || !value.type) {
      return Yup.object().nullable();
    }

    switch (value.type) {
      case "minute":
        return Yup.object().shape({
          type: Yup.string().required("Repeat type is required"),
          every: Yup.number().required("Interval is required"),
        });
      case "hourly":
      case "daily":
      case "weekly":
      case "weekdays":
        return Yup.object().shape({
          type: Yup.string().required("Repeat type is required"),
        });
      case "monthly":
      case "yearly":
        return Yup.object().shape({
          type: Yup.string().required("Repeat type is required"),
          every: Yup.number().nullable(),
        });
      default:
        return Yup.object().nullable();
    }
  }),
});

function ReminderForm({ onSubmit, teams }) {
  const [selectedTeams, setSelectedTeams] = useState(
    teams.map((team) => team._id)
  ); // Default to all teams selected
  const [selectedPlayers, setSelectedPlayers] = useState(
    teams.flatMap((team) => team.players.map((player) => player._id))
  ); // Default to all players selected
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [repeatType, setRepeatType] = useState("minute"); // Default repeat type

  const handleTeamSelection = (teamId) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
      setSelectedPlayers(
        selectedPlayers.filter(
          (playerId) =>
            !teams
              .find((team) => team._id === teamId)
              ?.players.map((player) => player._id)
              .includes(playerId)
        )
      );
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  const handlePlayerSelection = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const initialValues = {
    message: "",
    eventType: "",
    startDateTime: new Date(),
    repeat: {
      type: "minute",
      every: 1, // Default interval
      weekdays: [],
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) =>
        onSubmit(values, actions, selectedPlayers, startDateTime)
      }
    >
      {({ isSubmitting, setFieldValue, errors, touched, values }) => (
        <Form>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <FormControl
                mb={4}
                isInvalid={touched.message && !!errors.message}
              >
                <FormLabel htmlFor="message">Message</FormLabel>
                <Field
                  name="message"
                  as={Textarea}
                  bg="rgba(255, 255, 255, 0.2)"
                />
                <FormErrorMessage className="error-box">
                  {errors.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={touched.eventType && !!errors.eventType}
              >
                <FormLabel htmlFor="eventType">Event Type</FormLabel>
                <Field
                  as={Select}
                  name="eventType"
                  placeholder="Select Event Type"
                >
                  <option value="for-match">For Match</option>
                  <option value="for-training">Training Session</option>
                  <option value="others">Others</option>
                </Field>
                <FormErrorMessage className="error-box">
                  {errors.eventType}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={touched.startDateTime && !!errors.startDateTime}
              >
                <FormLabel htmlFor="startDateTime">
                  Start Date and Time
                </FormLabel>
                <Calendar onChange={(date) => setStartDateTime(date)} />
                <FormErrorMessage className="error-box">
                  {errors.startDateTime}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={touched.repeat?.type && !!errors.repeat?.type}
              >
                <FormLabel htmlFor="repeat.type">Repeat Type</FormLabel>
                <Field
                  as={Select}
                  name="repeat.type"
                  onChange={(e) => {
                    setRepeatType(e.target.value);
                    setFieldValue("repeat.type", e.target.value); // Update Formik's internal state
                  }}
                >
                  <option value="minute">Every Minute</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                <FormErrorMessage className="error-box">
                  {errors.repeat?.type}
                </FormErrorMessage>
              </FormControl>

              {repeatType === "minute" || repeatType === "hourly" ? (
                <FormControl
                  mb={4}
                  isInvalid={touched.repeat?.every && !!errors.repeat?.every}
                >
                  <FormLabel htmlFor="repeat.every">
                    Every{" "}
                    <Field
                      name="repeat.every"
                      type="number"
                      as={Input}
                      display="inline"
                      width="auto"
                      bg="rgba(255, 255, 255, 0.2)"
                      mr={2}
                    />
                    {repeatType === "minute" ? "minute(s)" : "hour(s)"}
                  </FormLabel>
                  <FormErrorMessage className="error-box">
                    {errors.repeat?.every}
                  </FormErrorMessage>
                </FormControl>
              ) : null}

              {repeatType === "weekdays" ? (
                <Box>
                  <FormLabel>Weekdays</FormLabel>
                  <CheckboxGroup
                    colorScheme="blue"
                    onChange={(selectedWeekdays) =>
                      setFieldValue("repeat.weekdays", selectedWeekdays)
                    }
                    value={values.repeat.weekdays}
                  >
                    <SimpleGrid columns={3} spacing={4}>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <Checkbox key={day} value={day}>
                          {day}
                        </Checkbox>
                      ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                  <FormErrorMessage className="error-box">
                    {errors.repeat?.weekdays}
                  </FormErrorMessage>
                </Box>
              ) : null}
            </Box>

            <Box>
              <Box bg="rgba(255, 255, 255, 0.1)" borderRadius="md">
                <Box p="12px 0 0 12px">
                  <Heading size="sm" mb={2}>
                    Select Teams
                  </Heading>
                  <Checkbox
                    isChecked={selectedTeams.length === teams.length}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedTeams(teams.map((team) => team._id))
                        : setSelectedTeams([])
                    }
                    size="lg" // Increase size for modern look
                    colorScheme="blue" // Custom color scheme
                    mb={2} // Margin bottom for spacing
                  >
                    Select All Teams
                  </Checkbox>
                </Box>
                <Box
                  p={3}
                  h="200px"
                  overflowY="auto"
                  className="custom-scrollbar"
                >
                  {teams.map((team) => (
                    <TeamCard
                      key={team._id}
                      team={team}
                      isSelected={selectedTeams.includes(team._id)}
                      onToggleSelect={handleTeamSelection}
                    />
                  ))}
                </Box>
              </Box>

              {selectedTeams.length > 0 && (
                <Box bg="rgba(255, 255, 255, 0.1)" borderRadius="md" mt="1rem">
                  <Box p="12px 0 0 12px">
                    <Heading size="sm" mb={2}>
                      Select Players
                    </Heading>
                    <Checkbox
                      isChecked={
                        selectedPlayers.length ===
                        teams.flatMap((team) =>
                          team.players.map((player) => player._id)
                        ).length
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? setSelectedPlayers(
                              teams
                                .flatMap((team) =>
                                  selectedTeams.includes(team._id)
                                )
                                .flatMap((team) =>
                                  team.players.map((player) => player._id)
                                )
                            )
                          : setSelectedPlayers([])
                      }
                      size="lg" // Increase size for modern look
                      colorScheme="blue" // Custom color scheme
                      mb={2} // Margin bottom for spacing
                    >
                      Select All Players
                    </Checkbox>
                  </Box>
                  <Box p={3} h="200px" overflowY="auto">
                    {teams
                      .flatMap((team) =>
                        selectedTeams.includes(team._id) ? team.players : []
                      )
                      .map((player) => (
                        <PlayerCard
                          key={player._id}
                          player={player}
                          isSelected={selectedPlayers.includes(player._id)}
                          onToggleSelect={handlePlayerSelection}
                        />
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
          </SimpleGrid>

          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
            mt={4}
          >
            Create Reminder
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ReminderForm;
