import {
  Box,
  Avatar,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Header from "../../header/Header";
import useLoginUser from "../../../hooks/useLoginUser";
import {
  acceptContract,
  getPlayerContractOffers,
  rejectContract,
} from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../helper/formatDate";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

function ContractsOffers() {
  const { loginUser } = useLoginUser();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser.role !== "player") {
      navigate("/dashboard");
    } else {
      fetchContracts();
    }
  }, []);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const res = await getPlayerContractOffers(loginUser.token);
      console.log(res.data.contractOffers);
      setOffers(res.data.contractOffers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (teamId) => {
    try {
      const res = acceptContract(loginUser.token, teamId, loginUser.playerId);

      toast.promise(res, {
        loading: `Accepting...`,
        success: "Contract Accepted",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (teamId) => {
    try {
      const res = rejectContract(loginUser.token, teamId, loginUser.playerId);

      toast.promise(res, {
        loading: `Rejecting...`,
        success: "Contract Rejected",
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Header heading="Contract Offers" />

      <Box
        bg="rgba(255, 255, 255, 0.2)"
        // width="95vw"
        maxW="550px"
        margin="0 auto"
        mt="1rem"
        borderRadius="10px"
        p={3}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
      >
        {offers.length > 0 &&
          !loading &&
          offers.map((o, i) => {
            return (
              <ShowContract
                contractData={o}
                key={i}
                handleAccept={handleAccept}
                handleReject={handleReject}
              />
            );
          })}
        {loading && (
          <Center minH="80vh">
            <Spinner size="xl" color="#FAFAFA" />
          </Center>
        )}
        {offers.length === 0 && !loading && (
          <Center minH="80vh">
            <Text fontSize="1rem" fontWeight="600" color="#FAFAFA">
              No Contract Offers Found
            </Text>
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default ContractsOffers;

const ShowContract = ({ contractData, handleReject, handleAccept }) => {
  const navigate = useNavigate();

  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="10px"
      p="1rem"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      backdropFilter="blur(10px)"
      color="#000"
      margin="0 auto"
      //   mt="2rem"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="10px"
        p="1rem"
        mb="2rem"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
        alignItems="center"
      >
        <Avatar src={contractData.team.avatar} size="lg" mr="1rem" />
        <Box>
          <Heading size="md">{contractData.team.name}</Heading>
          <Text
            textDecor="underline"
            fontWeight="500"
            color="blue.500"
            fontSize=".8rem"
            mt={1}
            onClick={() => navigate(`/team/${contractData.team._id}`)}
            cursor="pointer"
          >
            View Team <ExternalLinkIcon mx="2px" />
          </Text>
        </Box>
      </Flex>
      <VStack spacing="1rem" align="flex-start">
        <Heading size="sm">Contract Details</Heading>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Role:
          </Text>
          <Text display="inline">{contractData.role}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Start Date:
          </Text>
          <Text display="inline">
            {formatDate(contractData.period.startDate)}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            End Date:
          </Text>
          <Text display="inline">
            {formatDate(contractData.period.endDate)}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Borrow Fee:
          </Text>
          <Text display="inline">{contractData.borrowFee}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Selling Fee:
          </Text>
          <Text display="inline">{contractData.sellingFee}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Commission on Renting:
          </Text>
          <Text display="inline">{contractData.commissionOnRenting}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Commission on Winning:
          </Text>
          <Text display="inline">{contractData.commissionOnWinning}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Jersey Number:
          </Text>
          <Text display="inline">{contractData.jerseyNumber}</Text>
        </Box>
      </VStack>
      <Flex justifyContent="space-between" mt={2}>
        <button
          className="btn-grad"
          onClick={() => handleAccept(contractData.team._id)}
        >
          Reject
        </button>
        <button
          className="btn-grad"
          onClick={() => handleReject(contractData.team._id)}
        >
          Accept
        </button>
      </Flex>
    </Box>
  );
};
