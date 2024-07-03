import { Box, Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function TotalValue({ balance, requiredBalance, loading }) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        borderRadius="md"
        p={2}
        border="2px solid #FAFAFA"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        className="childBox"
      >
        <Box textAlign="center" mb="1rem">
          <Text fontSize="1rem" fontWeight="500">
            Your Balance
          </Text>
        </Box>
        <Box width="60%" margin="0 auto">
          {!loading && (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={2}
              >
                <Box display="flex" gap={4} alignItems="center">
                  <Image
                    src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
                    height="30px"
                  />
                  <Text fontSize="1.2rem" fontWeight="600">
                    {balance.zgold}
                  </Text>
                </Box>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717815154/Add_icon_jq9qsj.png"
                  height="25px"
                  onClick={() => navigate("/add-funds")}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box display="flex" gap={2} alignItems="center">
                  <Image
                    src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
                    height="35px"
                  />
                  <Text fontSize="1.2rem" fontWeight="600">
                    {balance.diamond}
                  </Text>
                </Box>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717815154/Add_icon_jq9qsj.png"
                  height="25px"
                  onClick={() => navigate("/add-funds")}
                />
              </Box>
            </>
          )}
          {loading && (
            <Center>
              <Spinner size="xl" mt={1} />
            </Center>
          )}
        </Box>
      </Box>
      <Box
        borderRadius="md"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        className="childBox"
      >
        <Text textAlign="center" mb="1.5rem" fontSize="1rem" fontWeight="500">
          Balance need to add player
        </Text>
        <Box width="60%" margin="0 auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={2}
          >
            <Box display="flex" gap={2} alignItems="center">
              <Image
                src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
                height="30px"
              />
              <Text fontSize="1.2rem" fontWeight="600">
                {requiredBalance.zgold}
              </Text>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" gap={2} alignItems="center">
              <Image
                src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
                height="35px"
              />
              <Text fontSize="1.2rem" fontWeight="600">
                {requiredBalance.diamond}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
