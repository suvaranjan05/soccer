import { Avatar, Box, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../zustand/store";

function NormalHeader({ headerData }) {
  const navigate = useNavigate();
  const { notificationCount } = useStore((state) => state);

  return (
    <Box color="#FAFAFA" fontWeight="500" p={2} borderRadius="md" mb="3rem">
      <Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Avatar
              size="md"
              name="John Doe"
              src={headerData.avatar}
              borderRadius="md"
              onClick={() => navigate("/profile")}
              cursor="pointer"
            />
          </Box>
          <Box display="flex" gap="1.5rem">
            <Box fontSize="1.2rem">{headerData.userName}</Box>

            <List display="flex" gap="1rem" pt="1rem">
              <ListItem>
                <i
                  className="fa-solid fa-gear icon"
                  onClick={() => navigate("/setting")}
                ></i>
              </ListItem>
              <ListItem position="relative">
                <i
                  className="fa-solid fa-bell icon"
                  onClick={() => navigate("/notifications")}
                ></i>
                {notificationCount > 0 && (
                  <Box
                    position="absolute"
                    top="-10px"
                    right="-10px"
                    backgroundColor="red"
                    color="white"
                    borderRadius="50%"
                    width="20px"
                    height="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.75rem"
                    fontWeight="bold"
                  >
                    {notificationCount}
                  </Box>
                )}
              </ListItem>
              <ListItem>
                <i className="fa-solid fa-user-group icon"></i>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NormalHeader;
