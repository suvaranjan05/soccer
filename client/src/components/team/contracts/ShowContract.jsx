import React from "react";
import { Box, Avatar, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { formatDate } from "../../../helper/formatDate";

const ShowContract = ({ contractData }) => {
  const playerName = contractData.fullName || contractData.user.userName;

  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="10px"
      p="1rem"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      color="#FAFAFA"
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
        <Avatar src={contractData.contract.team.avatar} size="lg" mr="1rem" />
        <Box>
          <Heading size="md" color="#000">
            {contractData.contract.team.name}
          </Heading>
          <Text fontSize=".8rem" fontWeight="500" color="#000">
            {playerName}
          </Text>
        </Box>
        <Avatar src={contractData.avatar} size="lg" ml="auto" />
      </Flex>

      <VStack spacing="1rem" align="flex-start">
        <Heading size="sm">Contract Details</Heading>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Role:
          </Text>
          <Text display="inline">{contractData.contract.role}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Start Date:
          </Text>
          <Text display="inline">
            {formatDate(contractData.contract.period.startDate)}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            End Date:
          </Text>
          <Text display="inline">
            {formatDate(contractData.contract.period.endDate)}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Borrow Fee:
          </Text>
          <Text display="inline">{contractData.contract.borrowFee}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Selling Fee:
          </Text>
          <Text display="inline">{contractData.contract.sellingFee}</Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Commission on Renting:
          </Text>
          <Text display="inline">
            {contractData.contract.commissionOnRenting}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Commission on Winning:
          </Text>
          <Text display="inline">
            {contractData.contract.commissionOnWinning}
          </Text>
        </Box>

        <Box display="flex" fontSize="1rem">
          <Text display="inline" fontWeight="600" mr="1rem">
            Jersey Number:
          </Text>
          <Text display="inline">{contractData.contract.jerseyNumber}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ShowContract;
