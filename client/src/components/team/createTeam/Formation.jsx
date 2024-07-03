import { Box, Button, Text } from "@chakra-ui/react";

const formations = {
  "3-3-4": [3, 3, 4],
  "4-3-3": [4, 3, 3],
  "4-4-2": [4, 4, 2],
};

const FormationSelection = ({
  selectedFormation,
  handleFormationClick,
  handleAuto,
}) => {
  return (
    <Box
      fontSize="1.3rem"
      p="1rem"
      flex="1"
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        fontWeight="600"
        mb="2rem"
      >
        <Text>LINE UP</Text>
        <Button
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(10px)"
          onClick={handleAuto}
        >
          Auto
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        mb="2rem"
      >
        {Object.keys(formations).map((formation) => (
          <Text
            key={formation}
            cursor="pointer"
            onClick={() => handleFormationClick(formation)}
            border={
              selectedFormation === formation ? "2px solid #FAFAFA" : "none"
            }
            p="0.5rem"
            mb={{ base: "0.5rem", md: "0" }}
            borderRadius="5px"
            bg={
              selectedFormation === formation
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent"
            }
          >
            {formation}
          </Text>
        ))}
      </Box>

      <Box>
        {formations[selectedFormation].map((count, rowIndex) => (
          <Box key={rowIndex} display="flex" justifyContent="center" mb="1rem">
            {Array(count)
              .fill("")
              .map((_, colIndex) => (
                <Box
                  key={colIndex}
                  w="70px"
                  h="70px"
                  bg="rgba(255, 255, 255, 0.2)"
                  border="1px solid rgba(255, 255, 255, 0.18)"
                  m="0.2rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="10px"
                  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                >
                  {rowIndex + 1}-{colIndex + 1}
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FormationSelection;
