import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header({ heading }) {
  const navigate = useNavigate();
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        sx={{
          background:
            "linear-gradient(to right, rgba(21, 0, 255, 0.2), rgba(21, 0, 255, 0.2) 50%, rgba(21, 0, 255, 0.1) 75%, rgba(21, 0, 255, 0.0) 90%, rgba(21, 0, 255, 0) 100%)",
          backdropFilter: "blur(3px)", // Glass effect
          color: "white",
          p: "15px",
        }}
      >
        <Text fontSize="1.7rem" mr="2rem" fontWeight="600" pr="2rem">
          {heading}
        </Text>
      </Box>
      <Box
        display="flex"
        gap="3rem"
        color="#FAFAFA"
        fontSize="1.5rem"
        mr="2rem"
      >
        <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
        <i
          className="fa-solid fa-house"
          onClick={() => navigate("/dashboard")}
        ></i>
      </Box>
    </Box>
  );
}

export default Header;
