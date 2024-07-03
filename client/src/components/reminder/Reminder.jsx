import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Header from "../header/Header";
import ReminderForm from "./createReminder/ReminderForm";
import {
  createReminder,
  deleteReminder,
  getManagerCreatedReminders,
  getManagerTeamsForReminder,
  getUserReminders,
  reminderMarkRead,
  resumeReminder,
  stopReminder,
} from "../../api/api";
import useLoginUser from "../../hooks/useLoginUser";
import toast from "react-hot-toast";
import { ArrowBackIcon, BellIcon } from "@chakra-ui/icons";
import ReminderCard from "./ReminderCard";

function Reminder() {
  const { loginUser } = useLoginUser();
  const [teams, setTeams] = useState([]);
  const [fetchingTeams, setFetchingTeams] = useState(false);
  const [fetchingReminders, setFetchingReminders] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (loginUser.role === "team-manager") {
      fetchManagerCreatedReminders();
    } else if (loginUser.role === "player") {
      fetchUserReminders();
    }
  }, []);

  const fetchUserTeams = async () => {
    try {
      setFetchingTeams(true);
      const res = await getManagerTeamsForReminder(loginUser.token);
      setTeams(res.data);
      if (res.data.length !== 0) {
        setShowForm(true);
      } else {
        return toast.error("You have no Teams");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingTeams(false);
    }
  };

  const handleSubmit = async (
    values,
    actions,
    selectedPlayers,
    startDateTime
  ) => {
    let selectedPlayerUserId = [];

    selectedPlayers.forEach((playerId) => {
      teams.forEach((team) => {
        team.players.forEach((player) => {
          if (player._id === playerId && player.user !== null) {
            selectedPlayerUserId = [...selectedPlayerUserId, player.user._id];
          }
        });
      });
    });

    const formData = {
      ...values,
      startDateTime: startDateTime.toISOString(),
      recipients: selectedPlayerUserId,
    };

    console.log(formData);

    try {
      const res = createReminder(loginUser.token, formData);

      toast.promise(res, {
        loading: `Creating..`,
        success: "Reminder Created",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const fetchManagerCreatedReminders = async () => {
    try {
      setFetchingReminders(true);
      const res = await getManagerCreatedReminders(loginUser.token);
      console.log(res.data);
      setReminders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingReminders(false);
    }
  };

  const fetchUserReminders = async () => {
    try {
      setFetchingReminders(true);
      const res = await getUserReminders(loginUser.token);
      console.log(res.data);
      setReminders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingReminders(false);
    }
  };

  const onMarkAsFinished = async (reminderId, userId) => {
    try {
      const res = reminderMarkRead(loginUser.token, reminderId, userId);

      toast.promise(res, {
        loading: `Processing...`,
        success: "Mark as Finshed",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteReminder = (reminderId) => {
    try {
      const res = deleteReminder(loginUser.token, reminderId);

      toast.promise(res, {
        loading: `Deleting...`,
        success: "Reminder Deleted",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stopReminderFunc = (reminderId) => {
    try {
      const res = stopReminder(loginUser.token, reminderId);

      toast.promise(res, {
        loading: `Processing...`,
        success: "Reminder Stopped",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resumeReminderFunc = (reminderId) => {
    try {
      const res = resumeReminder(loginUser.token, reminderId);

      toast.promise(res, {
        loading: `Processing...`,
        success: "Reminder Resumed",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh">
      <Header heading="Reminder" />
      <Box
        bgGradient="linear-gradient(to right, #fc4a1a, #f7b733)"
        width="95vw"
        mx="auto"
        p={2}
        mt="1rem"
        borderRadius="md"
      >
        {!showForm && loginUser.role === "team-manager" && (
          <Button
            leftIcon={<BellIcon boxSize={5} />}
            onClick={fetchUserTeams}
            isLoading={fetchingTeams}
            loadingText="Loading.."
            ml={2}
            mb="1rem"
          >
            Create Reminder
          </Button>
        )}
        {showForm && !fetchingTeams && teams.length > 0 && (
          <Box>
            <Button
              leftIcon={<ArrowBackIcon boxSize={5} />}
              onClick={() => setShowForm(false)}
              mb="1rem"
            >
              Go Back
            </Button>
            <Heading mb={4}>Create Reminder</Heading>
            <ReminderForm
              onSubmit={handleSubmit}
              teams={teams}
              setShowForm={setShowForm}
            />
          </Box>
        )}
        <Box p=".5rem">
          <Heading size="md" mb="1rem">
            Your Reminders
          </Heading>
          {!fetchingReminders && !showForm && reminders.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: "1rem", lg: "1rem" }}
              width="100%"
              justifyItems="center"
            >
              {reminders.map((reminder) => (
                <ReminderCard
                  key={reminder._id}
                  reminder={reminder}
                  onMarkAsFinished={onMarkAsFinished}
                  onDelete={onDeleteReminder}
                  onStop={stopReminderFunc}
                  onResume={resumeReminderFunc}
                />
              ))}
            </SimpleGrid>
          )}
          {fetchingReminders && <Spinner size="xl" mt="1rem" />}
          {!fetchingReminders && !showForm && reminders.length === 0 && (
            <Text mt="1rem" fontSize=".8rem">
              You have no reminders
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Reminder;
