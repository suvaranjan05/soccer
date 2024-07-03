import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import Header from "./header/Header";
import useLoginUser from "./../hooks/useLoginUser";
import { getNotifications, markSeenNotification } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";

function Notification() {
  const { loginUser } = useLoginUser();
  const [isLoading, setisLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const {
    notificationCount,
    setNotificationCount,
    decrementNotificationCount,
  } = useStore((state) => state);

  useEffect(() => {
    fetchNotifiactions();
  }, []);

  const fetchNotifiactions = async () => {
    try {
      setisLoading(true);
      const res = await getNotifications(loginUser.token);
      console.log(notifications);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleClick = async (notification) => {
    navigate(notification.redirectUrl);
    if (!notification.read) {
      try {
        const res = await markSeenNotification(
          loginUser.token,
          notification._id
        );
        decrementNotificationCount();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box minH="100vh" color="#FAFAFA" display="flex" flexDirection="column">
      <Header heading="Notifications" />
      <Box margin="1rem auto">
        <Box
          minW="85vw"
          bg="rgba(255, 255, 255, 0.2)"
          p="1rem"
          borderRadius="md"
          minH="90vh"
        >
          {!isLoading &&
            notifications.length > 0 &&
            notifications.map((n, i) => {
              return (
                <NotificationItem
                  notification={n}
                  handleClick={handleClick}
                  key={n._id}
                />
              );
            })}
          {isLoading && (
            <Center mt="2rem">
              <Spinner mt="1rem" size="xl" />
            </Center>
          )}
          {!isLoading && !notifications.length > 0 && (
            <Center mt="2rem">
              <Text fontSize="1rem" fontWeight="600">
                There is no notification for you.
              </Text>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Notification;

const NotificationItem = ({ notification, handleClick }) => {
  const isRead = notification.read;

  return (
    <Box
      bg={isRead ? "rgba(255, 255, 255, 1)" : "rgba(0, 255, 0, 1)"}
      color="#000"
      p={2}
      borderRadius="md"
      mb={2}
      boxShadow={
        isRead
          ? "0 0 10px rgba(255, 255, 255, 0.2)"
          : "0 0 10px rgba(0, 255, 0, 0.2)"
      }
      sx={{
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: isRead
            ? "0 0 20px rgba(255, 255, 255, 1)"
            : "0 0 20px rgba(0, 255, 0, 1)",
        },
      }}
      cursor="pointer"
    >
      <Text fontSize=".8rem" onClick={() => handleClick(notification)}>
        {notification.message}
      </Text>
    </Box>
  );
};
