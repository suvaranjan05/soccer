// import {
//   Box,
//   Center,
//   Image,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Link,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import Header from "./../header/Header";
// import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
// import { teams } from "./teams";
// import { useEffect, useState } from "react";
// import useLoginUser from "../../hooks/useLoginUser";
// import toast from "react-hot-toast";
// import { getManagerTeams } from "../../api/api";
// import { useNavigate } from "react-router-dom";

// function MyTeams() {
//   const { loginUser } = useLoginUser();
//   const [selectedTeam, setSelectedTeam] = useState({});
//   const [fetchingTeams, setFetchingTeams] = useState(true);
//   const [myTeams, setMyTeams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMyTeam();
//   }, []);

//   const fetchMyTeam = async () => {
//     setFetchingTeams(true);
//     try {
//       const res = await getManagerTeams(loginUser.token);
//       console.log(res.data);
//       setMyTeams(res.data.teams);
//       setSelectedTeam(res.data.teams[0]);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setFetchingTeams(false);
//     }
//   };

//   const handleSelectTeam = (team) => {
//     setSelectedTeam(team);
//   };

//   return (
//     <Box
//       backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
//       minH="100vh"
//       backgroundSize="cover"
//       backgroundPosition="center"
//       color="#FAFAFA"
//       pb="3rem"
//     >
//       <Header heading="MY TEAMS" />
//       <Box
//         width="85vw"
//         margin="0 auto"
//         padding="1rem"
//         bg="rgba(255, 255, 255, 0.1)"
//         boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
//         backdropFilter="blur(10px)"
//         mt={3}
//         borderRadius="md"
//       >
//         <Box borderRadius="md" display="flex" flexDir="column" minH="80vh">
//           {!fetchingTeams && myTeams.length > 0 && (
//             <>
//               <Box
//                 // border="2px solid green"
//                 display="grid"
//                 gridTemplateColumns={{
//                   base: "1fr",
//                   lg: "repeat(3, minmax(300px, 1fr))",
//                 }}
//                 justifyContent="center"
//                 gap="0.5rem"
//                 mb="1rem"
//               >
//                 <Box
//                   display="flex"
//                   flexDir="column"
//                   justifyContent="center"
//                   alignItems="center"
//                   p="1rem"
//                   gap="1rem"
//                   // bg="rgba(255, 255, 255, 0.3)"
//                   background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
//                   borderRadius="md"
//                 >
//                   <TeamInfo team={selectedTeam} />
//                 </Box>
//                 <Box>
//                   {Object.keys(selectedTeam).length > 0 && (
//                     <SelectedTeamComp team={selectedTeam} />
//                   )}
//                 </Box>
//                 <Box
//                   // bg="rgba(255, 255, 255, 0.3)"
//                   background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
//                   borderRadius="md"
//                   display="flex"
//                   flexDir="column"
//                   justifyContent="center"
//                   alignItems="center"
//                   p="1rem"
//                 >
//                   <Box
//                     fontSize="1rem"
//                     fontWeight="700"
//                     display="flex"
//                     flexDir="column"
//                     fontStyle="italic"
//                     textDecor="underline"
//                   >
//                     <Link>
//                       STATISTICS <ExternalLinkIcon />
//                     </Link>
//                     <Link href={`/team/${selectedTeam._id}`}>
//                       VIEW & EDIT TEAM <ExternalLinkIcon />
//                     </Link>
//                     <Link>
//                       RECORDS <ExternalLinkIcon />
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Image
//                       src="https://res.cloudinary.com/suvaranjan/image/upload/v1717864522/trophy_kxcpmw.png"
//                       height="150px"
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//               <Box
//                 display="flex"
//                 gap="2"
//                 overflowX="auto"
//                 className="custom-scrollbar"
//                 pb={3}
//                 mb={3}
//               >
//                 {myTeams.map((t, i) => {
//                   return (
//                     <TeamCard
//                       team={t}
//                       key={i}
//                       handleSelectTeam={handleSelectTeam}
//                     />
//                   );
//                 })}
//               </Box>{" "}
//               <Box
//                 display="flex"
//                 gap={2}
//                 p={2}
//                 alignItems="center"
//                 justifyContent="space-between"
//                 flexDir={{
//                   base: "column",
//                   lg: "row",
//                 }}
//               >
//                 <Box flex={1}>
//                   <InputGroup mr={2}>
//                     <InputLeftElement pointerEvents="none">
//                       <SearchIcon color="#FAFAFA" />
//                     </InputLeftElement>
//                     <Input
//                       type="tel"
//                       backgroundColor="rgba(255, 255, 255, 0.2)"
//                     />
//                   </InputGroup>
//                 </Box>
//                 <Box display="flex" gap={2}>
//                   <button className="btn-grad">Sale This Team</button>
//                   <button className="btn-grad">Rent This Team</button>
//                 </Box>
//               </Box>
//             </>
//           )}
//           {fetchingTeams && (
//             <Center flex={1}>
//               <Spinner size="xl" />
//             </Center>
//           )}
//           {!fetchingTeams && !myTeams.length > 0 && (
//             <Center flex={1} bg="rgba(255, 255, 255, 0.1)" borderRadius="md">
//               <Box
//                 display="flex"
//                 flexDir="column"
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 <Text fontSize="1rem" fontWeight="600" mb={2}>
//                   Looks like, You have No Teams.
//                 </Text>
//                 <Image
//                   src="https://res.cloudinary.com/suvaranjan/image/upload/v1717653049/Add_teams_xeo9ut.png"
//                   cursor="pointer"
//                   onClick={() => navigate("/create-team")}
//                 />
//               </Box>
//             </Center>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default MyTeams;

// function TeamCard({ team, handleSelectTeam }) {
//   return (
//     <Box
//       minW="250px"
//       height="160px"
//       //   p={1}
//       border="2px solid #FAFAFA"
//       borderRadius="md"
//       //   bg="rgba(255, 255, 255, 0.2)"
//       mb={{ base: "1rem", md: 0 }}
//       backdropFilter="blur(10px)"
//       bg={`url(${team.avatar})`}
//       backgroundSize="cover"
//       backgroundPosition="center"
//       className="box-hover-effect"
//       onClick={() => handleSelectTeam(team)}
//     >
//       <Text
//         textAlign="center"
//         fontSize="1.2rem"
//         fontWeight="700"
//         p={1}
//         bg="rgba(255, 255, 255, 10)"
//         color="#000"
//       >
//         {team.name}
//       </Text>
//     </Box>
//   );
// }

// function TeamInfo({ team }) {
//   return (
//     <>
//       <Box display="flex" gap={2} alignItems="center">
//         <Image
//           src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605347/Gold_bizhbs.png"
//           height="30px"
//         />
//         <Text fontSize="1.2rem" fontWeight="600">
//           {team.zgold}
//         </Text>
//       </Box>
//       <Box display="flex" gap={2} alignItems="center">
//         <Image
//           src="https://res.cloudinary.com/suvaranjan/image/upload/v1717605364/Diamond_ihmgtt.png"
//           height="35px"
//         />
//         <Text fontSize="1.2rem" fontWeight="600">
//           {team.diamond}
//         </Text>
//       </Box>
//       <Box display="flex" gap={2} alignItems="center">
//         <Text fontSize="1.2rem" fontWeight="600">
//           {team.wins}
//         </Text>
//         <Text fontSize="1.2rem" fontWeight="600">
//           wins
//         </Text>
//       </Box>
//       <Box display="flex" gap={2} alignItems="center">
//         <Text fontSize="1.2rem" fontWeight="600">
//           {team.matches}
//         </Text>
//         <Text fontSize="1.2rem" fontWeight="600">
//           Matches
//         </Text>
//       </Box>
//     </>
//   );
// }

// const SelectedTeamComp = ({ team }) => {
//   return (
//     <Box
//       minH="250px"
//       w="100%"
//       //   p={1}
//       border="2px solid #FAFAFA"
//       borderRadius="md"
//       //   bg="rgba(255, 255, 255, 0.2)"
//       mb={{ base: "1rem", md: 0 }}
//       backdropFilter="blur(10px)"
//       bg={`url(${team.avatar})`}
//       backgroundSize="cover"
//       backgroundPosition="center"
//     >
//       <Text
//         textAlign="center"
//         fontSize="1.2rem"
//         fontWeight="700"
//         p={1}
//         bg="rgba(255, 255, 255, 10)"
//         color="#000"
//       >
//         {team.name}
//       </Text>
//     </Box>
//   );
// };

import {
  Box,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  Button,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import Header from "./../header/Header";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import { getManagerTeams } from "../../api/api";
import { useNavigate } from "react-router-dom";

function MyTeams() {
  const { loginUser } = useLoginUser();
  const [selectedTeam, setSelectedTeam] = useState({});
  const [fetchingTeams, setFetchingTeams] = useState(true);
  const [myTeams, setMyTeams] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchMyTeam();
  }, []);

  const fetchMyTeam = async () => {
    setFetchingTeams(true);
    try {
      const res = await getManagerTeams(loginUser.token);
      setMyTeams(res.data.teams);
      setSelectedTeam(res.data.teams[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingTeams(false);
    }
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredTeams = myTeams.filter((team) =>
    team.name.toLowerCase().includes(searchKeyword)
  );

  return (
    <Box
      backgroundImage="url('https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb3RiYWxsJTIwc3RhZGl1bXxlbnwwfHwwfHx8MA%3D%3D')"
      minH="100vh"
      backgroundSize="cover"
      backgroundPosition="center"
      color="#FAFAFA"
      pb="3rem"
    >
      <Header heading="MY TEAMS" />
      <Box
        width="95vw"
        margin="0 auto"
        padding="1rem"
        bg="rgba(255, 255, 255, 0.1)"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        mt={3}
        borderRadius="md"
        minH="80vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <InputGroup width="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="#FAFAFA" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search teams"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>
        <Box bg="rgba(255, 255, 255, 0.1)" p={2} borderRadius="md">
          {!fetchingTeams && filteredTeams.length > 0 && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="1rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {filteredTeams.map((team) => (
                <TeamCard
                  key={team._id}
                  team={team}
                  handleSelectTeam={handleSelectTeam}
                />
              ))}
            </SimpleGrid>
          )}

          {fetchingTeams && (
            <Center flex={1} minH="70vh">
              <Spinner size="xl" />
            </Center>
          )}

          {!fetchingTeams && filteredTeams.length === 0 && (
            <Center
              flex={1}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="md"
              minH="70vh"
            >
              <Box
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="1rem" fontWeight="600" mb={2}>
                  Looks like, You have No Teams.
                </Text>
                <Image
                  src="https://res.cloudinary.com/suvaranjan/image/upload/v1717653049/Add_teams_xeo9ut.png"
                  cursor="pointer"
                  onClick={() => navigate("/create-team")}
                />
              </Box>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyTeams;

function TeamCard({ team, handleSelectTeam }) {
  const navigate = useNavigate();

  return (
    <Box
      minW="300px"
      height="400px"
      border="2px solid #FAFAFA"
      borderRadius="md"
      mb={{ base: "1rem", md: 0 }}
      backdropFilter="blur(10px)"
      overflow="hidden"
      cursor="pointer"
      display="flex"
      flexDir="column"
      onClick={() => handleSelectTeam(team)}
    >
      <Box
        flex={3}
        bg={`url(${team.avatar})`}
        backgroundSize="cover"
        backgroundPosition="center"
      />
      <Box
        flex={2}
        bg="white"
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderTop="2px solid #FAFAFA"
      >
        <Box color="#000">
          <Text fontSize="1.2rem" fontWeight="700">
            {team.name}
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            {team.wins} Wins
          </Text>
          <Text fontSize="1rem" fontWeight="600">
            {team.matches} Matches
          </Text>
        </Box>
        <Box
          mt={2}
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Flex gap={1}>
            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Statistics click
              }}
            >
              Statistics <ExternalLinkIcon mx="2px" />
            </Button>

            <Button
              size="xs"
              colorScheme="teal"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle Records click
              }}
            >
              Records <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
          <Flex justify="space-between">
            <Flex gap={1}>
              <Button
                size="sm"
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Sale click
                }}
              >
                Sale
              </Button>
              <Button
                size="sm"
                colorScheme="cyan"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle Rent click
                }}
              >
                Rent
              </Button>
            </Flex>

            <Button
              size="sm"
              colorScheme="green"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/team/${team._id}`);
              }}
            >
              View <ExternalLinkIcon mx="2px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
