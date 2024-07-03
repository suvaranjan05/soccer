import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SkeletonFieldCard = () => {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      p={5}
      borderRadius="md"
      boxShadow="md"
      width="100%"
      maxW="320px"
    >
      <Skeleton height="200px" />
      <SkeletonText mt="4" noOfLines={2} spacing="2" />
    </Box>
  );
};

export default SkeletonFieldCard;
