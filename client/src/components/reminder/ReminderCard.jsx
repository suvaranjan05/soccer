import React, { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Text,
  VStack,
  HStack,
  Input,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import useLoginUser from "../../hooks/useLoginUser";
import { formatMatchDate } from "../../helper/formatDate";
import { generateRepeatText } from "../../helper/reminderStatus";

const ReminderCard = ({
  reminder,
  onDelete,
  onMarkAsFinished,
  onResume,
  onStop,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loginUser } = useLoginUser();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipients = reminder.recipients.filter((recipient) =>
    recipient.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isRecipientFinished = (recipientId) => {
    return reminder.finishedFor.some(
      (finishedRecipient) => finishedRecipient._id === recipientId
    );
  };

  return (
    <Card
      borderRadius="lg"
      bg="rgba(255, 255, 255, 0.1)"
      width="100%"
      height="100%"
      maxW="400px"
      minW="300px"
      mx="auto"
      mb={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <CardBody>
        <HStack justifyContent="space-between" mb={3}>
          <Heading size="md">Reminder</Heading>

          {loginUser.userId === reminder.sender._id && (
            <Box display="flex" gap={1}>
              <Button
                colorScheme="red"
                onClick={() => onDelete(reminder._id)}
                size="sm"
              >
                Delete
              </Button>
              {!reminder.stop && (
                <Button size="sm" onClick={() => onStop(reminder._id)}>
                  Stop
                </Button>
              )}
              {reminder.stop && (
                <Button
                  size="sm"
                  colorScheme="cyan"
                  onClick={() => onResume(reminder._id)}
                >
                  Resume
                </Button>
              )}
            </Box>
          )}
        </HStack>

        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md" mt={2}>
          <Text fontWeight="bold" mb={2}>
            Status
          </Text>
          <Text fontSize=".8rem">
            {reminder.stop
              ? "Reminder is Stop"
              : generateRepeatText(reminder.repeat, reminder.startDateTime)}
          </Text>
        </Box>

        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md" mt={2}>
          <Text fontWeight="bold" mb={2}>
            Sender {loginUser.userId === reminder.sender._id ? " (you)" : null}
          </Text>

          <HStack justifyContent="space-between">
            <HStack>
              <Avatar src={reminder.sender.avatar} size="sm" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize=".8rem" mb={1}>
                  {reminder.sender.userName}
                </Text>
                {/* <Text fontSize=".7rem">
                  {formatMatchDate(reminder.startDateTime)}
                </Text> */}
              </VStack>
            </HStack>
          </HStack>
        </Box>
        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md" mt={2}>
          <Text fontWeight="bold" mb={2}>
            Message
          </Text>
          <Text fontSize=".8rem">{reminder.message}</Text>
        </Box>
        <Box mt={2} bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md">
          <Input
            placeholder="Search recipients"
            value={searchTerm}
            onChange={handleSearchChange}
            bg="white"
            size="sm"
            borderRadius="md"
          />

          <Box mt={2} maxHeight="200px" overflowY="auto" borderRadius="md">
            <Text fontWeight="bold">Recipients</Text>
            {filteredRecipients.map((recipient) => (
              <HStack
                key={recipient._id}
                justifyContent="space-between"
                mt={2}
                p={2}
                borderRadius="md"
                bg="rgba(255, 255, 255, 0.1)"
              >
                <HStack>
                  <Avatar src={recipient.avatar} size="sm" />
                  <Text fontSize=".8rem" fontWeight="500">
                    {recipient.userName}
                  </Text>
                </HStack>
                {loginUser.userId === reminder.sender._id && (
                  <Button
                    colorScheme={
                      isRecipientFinished(recipient._id) ? "green" : "blue"
                    }
                    onClick={() =>
                      onMarkAsFinished(reminder._id, recipient._id)
                    }
                    isDisabled={isRecipientFinished(recipient._id)}
                    size="xs"
                  >
                    {isRecipientFinished(recipient._id)
                      ? "Finished"
                      : "Mark as Finished"}
                  </Button>
                )}
              </HStack>
            ))}
          </Box>
        </Box>
        {/* <Box
          mt={4}
          maxHeight="200px"
          overflowY="auto"
          bg="rgba(255, 255, 255, 0.1)"
          p={2}
          borderRadius="md"
        >
          <Text fontWeight="bold">Finished For</Text>
          {reminder.finishedFor.map((finishedRecipient) => (
            <HStack
              key={finishedRecipient._id}
              mt={2}
              p={2}
              borderRadius="md"
              bg="rgba(255, 255, 255, 0.1)"
            >
              <Avatar src={finishedRecipient.avatar} size="sm" />
              <Text fontSize=".8rem">{finishedRecipient.userName}</Text>
            </HStack>
          ))}
        </Box> */}
      </CardBody>
    </Card>
  );
};

export default ReminderCard;
