import {
  Box,
  Skeleton,
  SkeletonText,
  AspectRatio,
  Stack,
  Flex,
} from "@chakra-ui/react";

function SkeletonTeamCard() {
  return (
    <Box
      minW="300px"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
      color="#FAFAFA"
    >
      <Skeleton height="170px" />
      <Box p="6">
        <Stack mt="4" spacing="3">
          <Skeleton height="20px" width="70%" />
          <SkeletonText mt="4" noOfLines={3} spacing="4" />
        </Stack>
        <Flex alignItems="center" justifyContent="center" gap={2} mt={4}>
          <Skeleton height="32px" width="100px" borderRadius="md" />
          <Skeleton height="32px" width="100px" borderRadius="md" />
        </Flex>
      </Box>
    </Box>
  );
}

export default SkeletonTeamCard;
