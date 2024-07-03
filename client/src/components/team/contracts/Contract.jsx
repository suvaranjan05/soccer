import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLoginUser from "../../../hooks/useLoginUser";
import { checkTeamContract, sendContractOffer } from "../../../api/api";
import Header from "../../header/Header";
import ContractForm from "./form/ContractForm"; // Adjust the import path as needed
import ShowContract from "./ShowContract";
// import { playerContract } from "./playerContract";
import toast from "react-hot-toast";

function Contract() {
  const { loginUser } = useLoginUser();
  const { playerId, teamId } = useParams();
  const [checking, setChecking] = useState(true);
  const [contractData, setContractData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser.role !== "team-manager" && !playerId && !teamId) {
      navigate("/dashboard");
    } else {
      checkPlayerContract(loginUser.token, teamId, playerId);
    }
  }, []);

  const checkPlayerContract = async (token, teamId, playerId) => {
    setChecking(true);
    try {
      const res = await checkTeamContract(token, teamId, playerId);
      // console.log(res.data);
      setContractData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setChecking(false);
    }
  };

  async function handleFormSubmit(values) {
    const data = {
      ...values,
      team: contractData.team._id,
    };

    try {
      const res = sendContractOffer(loginUser.token, data, playerId);

      toast.promise(res, {
        loading: `Sending...`,
        success: (res) => {
          // you can write logic for reset initial Values.
          return "Contract Offer Sent";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  return (
    <Box minH="100vh">
      <Header heading="Player Contract" />

      <Box
        // bg="rgba(255, 255, 255, 0.2)"
        background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
        // width="95vw"
        maxW="550px"
        margin="0 auto"
        mt="1rem"
        borderRadius="10px"
        p={3}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
      >
        {!checking && !contractData.isContract && (
          <ContractForm
            onSubmit={handleFormSubmit}
            contractData={contractData}
          />
        )}
        {!checking && contractData.isContract && (
          <ShowContract contractData={contractData.player} />
        )}

        {checking && (
          <Center minH="80vh">
            <Spinner size="xl" color="#FAFAFA" />
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default Contract;
