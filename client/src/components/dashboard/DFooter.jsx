import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/useLoginUser";

function DFooter() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUser();

  // console.log(loginUser);

  const handleTeamsClick = () => {
    if (loginUser.role === "team-manager") {
      navigate("/my-teams");
    } else {
      navigate("/all-teams");
    }
  };

  const handlePlayersClick = () => {
    if (loginUser.role === "team-manager") {
      navigate("/my-players");
    } else {
      navigate("/all-players");
    }
  };

  return (
    <Box w="100%">
      <Flex
        gap={{ base: 3, md: 3, lg: 1 }}
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        p={2}
        bg="rgba(173, 216, 230, 0.3)"
        backdropFilter="blur(5px)"
        borderRadius="md"
      >
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654680/Looking_for_zzpfrr.png"
          height="40px"
          onClick={() => navigate("/search")}
        />
        <Box display="flex">
          <Image
            src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654622/Teams_jddbky.png"
            height="40px"
            onClick={handleTeamsClick}
          />
          <Image
            src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654554/Players_wqxly2.png"
            height="40px"
            onClick={handlePlayersClick}
          />
          <Image
            src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654565/Posts_h1gqfx.png"
            height="40px"
          />
        </Box>
        <Box display="flex">
          <Box
            // as="button"
            className="btn-grad-match"
            onClick={() => navigate("/all-matches")}
            display="flex"
            gap={1}
            cursor="pointer"
          >
            {/* <Icon
              as={<i className="fa-solid fa-football"></i>}
              boxSize={4}
              mr={2}
            /> */}
            <i
              className="fa-solid fa-football"
              style={{ fontSize: "1rem" }}
            ></i>
            <Text>Matches</Text>
          </Box>
          <Image
            src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654597/Field_bgfjv5.png"
            height="40px"
            onClick={() => navigate("/fields")}
          />
        </Box>

        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717654574/Refs_qs10wf.png"
          height="40px"
        />
      </Flex>
    </Box>
  );
}

export default DFooter;
