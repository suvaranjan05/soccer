import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const AddReferee = ({
  referees,
  selectedReferee,
  setSelectedReferee,
  formikProps,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddReferee = (referee) => {
    formikProps.setFieldValue("referee", referee._id);
    formikProps.setFieldValue("fees.refFee", referee.fee);
    setSelectedReferee(referee);
  };

  const handleRemoveReferee = () => {
    setSelectedReferee(null);
  };

  return (
    <Box
      flex={1}
      mb={8}
      maxH="380px"
      overflowY="auto"
      className="custom-scrollbar"
      p={2}
      bg="rgba(255, 255, 255, 0.1)"
      color="#FAFAFA"
      borderRadius="md"
      mr={{ base: "0", md: "10px" }}
    >
      <Box className="childBoxHeading">
        <Text fontWeight="600" fontSize="1.5rem">
          REFEREE INFORMATION
        </Text>
      </Box>
      {/* {!showSearch && !selectedReferee && (
        <Button colorScheme="blue" onClick={handleToggleSearch} mb={4}>
          Add Referee
        </Button>
      )} */}

      {!selectedReferee && (
        <Box>
          {/* Search Input */}
          <FormControl mb={4}>
            <Input
              placeholder="Search for referee"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>

          {/* List of Referees */}
          <Stack spacing={4}>
            {referees
              .filter((referee) =>
                referee.user.userName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((referee) => (
                <Box
                  key={referee.user._id}
                  p={4}
                  bg="#f0f0f0"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" gap={2} alignItems="center">
                    <Avatar src={referee.avatar} />
                    <Text color="#000" fontSize="1rem" fontWeight="600">
                      {referee.user.userName}
                    </Text>
                  </Box>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAddReferee(referee)}
                  >
                    Add
                  </Button>
                </Box>
              ))}
          </Stack>
        </Box>
      )}

      {selectedReferee && (
        <Box
          key={selectedReferee.user._id}
          p={2}
          mb={2}
          bg="#f0f0f0"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap={2} alignItems="center">
            <Avatar src={selectedReferee.avatar} />
            <Text color="#000" fontSize="1rem" fontWeight="600">
              {selectedReferee.user.userName}
            </Text>
          </Box>

          <Button colorScheme="red" size="sm" onClick={handleRemoveReferee}>
            Remove
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddReferee;
