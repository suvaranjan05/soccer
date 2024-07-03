import { Box, List, ListItem, Skeleton } from "@chakra-ui/react";

// function HeaderSkeleton() {
//   return (
//     <Box color="#FAFAFA" fontWeight="500" p={6} borderRadius="md">
//       <Box>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Box>
//             <Skeleton height="50px" width="45px" borderRadius="md" />
//           </Box>
//           <Box display="flex" gap="1.5rem">
//             <Box display="flex" flexDir="column" gap={2}>
//               <Skeleton height="1.2rem" width="150px" />
//               <Box display="flex" gap={2}>
//                 <Box>
//                   <Skeleton height="2rem" width="2rem" />
//                 </Box>

//                 <Box display="flex" flexDir="column" gap={3}>
//                   <Skeleton height="10px" width="5rem" />
//                   <Skeleton height="10px" width="5rem" />
//                 </Box>
//               </Box>
//             </Box>

//             <List display="flex" gap="1rem" pt="1rem">
//               <ListItem>
//                 <Skeleton height="2rem" width="2rem" />
//               </ListItem>
//               <ListItem>
//                 <Skeleton height="2rem" width="2rem" />
//               </ListItem>
//               <ListItem>
//                 <Skeleton height="2rem" width="2rem" />
//               </ListItem>
//             </List>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

function HeaderSkeleton() {
  return (
    <Box color="#FAFAFA" fontWeight="500" p={6} borderRadius="md">
      <Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Skeleton
              height="50px"
              width="45px"
              borderRadius="md"
              startColor="pink.500"
              endColor="orange.500"
            />
          </Box>
          <Box display="flex" gap="1.5rem">
            <Box display="flex" flexDir="column" gap={2}>
              <Skeleton
                height="1.2rem"
                width="150px"
                startColor="blue.400"
                endColor="green.400"
              />
              <Box display="flex" gap={2}>
                <Box>
                  <Skeleton
                    height="2rem"
                    width="2rem"
                    startColor="purple.400"
                    endColor="yellow.400"
                  />
                </Box>

                <Box display="flex" flexDir="column" gap={3}>
                  <Skeleton
                    height="10px"
                    width="5rem"
                    startColor="teal.400"
                    endColor="cyan.400"
                  />
                  <Skeleton
                    height="10px"
                    width="5rem"
                    startColor="red.400"
                    endColor="pink.400"
                  />
                </Box>
              </Box>
            </Box>

            <List display="flex" gap="1rem" pt="1rem">
              <ListItem>
                <i className="fa-solid fa-gear icon"></i>
              </ListItem>
              <ListItem>
                <i className="fa-solid fa-bell icon"></i>
              </ListItem>
              <ListItem>
                <i className="fa-solid fa-user-group icon"></i>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeaderSkeleton;
