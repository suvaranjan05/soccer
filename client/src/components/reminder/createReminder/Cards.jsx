// TeamCard.jsx
import React from "react";
import { Box, Flex, Avatar, Text, Checkbox } from "@chakra-ui/react";

const TeamCard = ({ team, isSelected, onToggleSelect }) => (
  <Box p={4} mb={2} borderRadius="md" bg="rgba(255, 255, 255, 0.3)">
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Checkbox
          isChecked={isSelected}
          onChange={() => onToggleSelect(team._id)}
          size="md"
          mr={4}
        />
        <Avatar src={team.avatar} name={team.name} size="md" mr={4} />
        <Text fontSize="1rem">{team.name}</Text>
      </Flex>
    </Flex>
  </Box>
);

const PlayerCard = ({ player, isSelected, onToggleSelect }) => (
  <Box borderRadius="md" p={4} mb={2} bg="rgba(255, 255, 255, 0.3)">
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Checkbox
          isChecked={isSelected}
          onChange={() => onToggleSelect(player._id)}
          size="md"
          mr={4}
        />
        <Avatar
          src={player.avatar}
          name={player.user ? player.user.userName : player.fullName}
          size="md"
          mr={4}
        />
        <Text fontSize="1rem">
          {player.user ? player.user.userName : player.fullName}
        </Text>
      </Flex>
    </Flex>
  </Box>
);

export default TeamCard;

export { TeamCard, PlayerCard };
