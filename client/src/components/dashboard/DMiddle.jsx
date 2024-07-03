import { Box, Grid, Image } from "@chakra-ui/react";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

function DMiddle() {
  const navigate = useNavigate();
  return (
    <Box w="100%" display="flex" flexDir="column">
      <NewsCard />
      <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2}>
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650120/Create_Match_ufk4iv.png"
          onClick={() => navigate("/create-match")}
          borderRadius="md"
        />
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650105/Create_League_puo46n.png"
          mr={1}
        />
        <Image
          src="https://res.cloudinary.com/suvaranjan/image/upload/v1717650105/Create_League_puo46n.png"
          borderRightRadius="10px"
        />
      </Grid>
    </Box>
  );
}

export default DMiddle;
