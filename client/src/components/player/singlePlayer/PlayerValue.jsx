import { Box, Code, Image, Text, Divider } from "@chakra-ui/react";

export default function PlayerValue() {
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      textAlign="center"
      color="#FAFAFA"
    >
      <Box fontSize="1rem">
        <Code mb={2} colorScheme="orange">
          Rank 24
        </Code>
        <Box>
          <Text>Total Value</Text>
          <Text fontWeight="700" color="#FFD700" fontSize="1.5rem">
            240000
          </Text>
        </Box>
      </Box>

      <Box display="flex" flexDir="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mb={2}
        >
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
              height="30px"
            />
            <Text fontSize="1.2rem" fontWeight="600">
              3200
            </Text>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
              height="35px"
            />
            <Text fontSize="1.2rem" fontWeight="600">
              50
            </Text>
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          fontSize="1.5rem"
          fontWeight="600"
        >
          <i className="fa-regular fa-thumbs-up"></i>
          <Text>Like</Text>
        </Box>
        <Text fontSize="1.5rem" fontWeight="600">
          2k
        </Text>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Box
          display="flex"
          gap={2}
          fontSize="1.5rem"
          fontWeight="600"
          alignItems="center"
        >
          <i className="fa-regular fa-star"></i>
          <Text>Rating</Text>
        </Box>
        <Text fontSize="1.5rem" fontWeight="600">
          3.6k
        </Text>
      </Box>
      <Divider />
      <Box>
        <Text fontWeight="500" fontSize="1.2rem" fontStyle="italic">
          Trophies
        </Text>
      </Box>
    </Box>
  );
}
