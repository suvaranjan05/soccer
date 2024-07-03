import { Box, Text } from "@chakra-ui/react";
import React from "react";

function FieldCard({ field }) {
  return (
    <Box
      width="300px"
      height="200px"
      position="relative"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    >
      <Box
        width="100%"
        height="100%"
        bgImage={`url(${field.photo})`}
        bgSize="cover"
        bgPosition="center"
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.1)" }}
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        bg="rgba(0, 0, 0, 0.5)"
        color="white"
        p="4"
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="lg">
          {field.name}
        </Text>
        <Text fontSize="sm">{field.location}</Text>
      </Box>
    </Box>
  );
}

export default FieldCard;
