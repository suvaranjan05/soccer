import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { matchDetails } from "./matchDetails";
import MatchBasicDetails from "./MatchbasicDetails";
import Header from "../../header/Header";
import MatchJoinRequests from "./MatchJoinRequests";
import ConfirmTeams from "./ConfirmTeams";
import { useParams } from "react-router-dom";
import useLoginUser from "../../../hooks/useLoginUser";
import { getMatch } from "../../../api/api";
import ConfirmPlayers from "./ConfirmPlayers";

function Match() {
  const { loginUser } = useLoginUser();
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(true);

  useEffect(() => {
    if (!match) {
      fetchMatch();
    }
  }, [match]);

  const fetchMatch = async () => {
    if (match) {
      return;
    }
    try {
      setLoadingMatch(true);
      const res = await getMatch(loginUser.token, matchId);
      setMatch(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <Box minH="100vh">
      <Header heading="Match" />

      <Box width="95vw" mx="auto" mt="1rem">
        {!loadingMatch && (
          <>
            <MatchBasicDetails matchDetails={match} />
            {loginUser.userId === match.createdBy && (
              <>
                <MatchJoinRequests matchDetails={match} />
                <ConfirmTeams matchDetails={match} />
                <ConfirmPlayers matchDetails={match} />
              </>
            )}
          </>
        )}
        {loadingMatch && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            bgGradient="linear-gradient(to right, #005aa7, #fffde4)"
            borderRadius="md"
          >
            <Spinner size="xl" color="white" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Match;
