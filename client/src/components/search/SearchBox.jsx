import React from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBox = ({
  searchCategory,
  setSearchCategory,
  keyword,
  setKeyword,
  handleSearch,
  isLoading,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDir={{ base: "column", md: "row", lg: "row" }}
      gap={2}
    >
      <Select
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        mr={2}
        w="120px"
      >
        <option
          value="Player"
          style={{
            color: "#000",
          }}
        >
          Player
        </option>
        <option
          value="Team"
          style={{
            color: "#000",
          }}
        >
          Team
        </option>
        <option value="Coach" disabled>
          Coach
        </option>
        <option value="Referee" disabled>
          Referee
        </option>
        <option value="Fans" disabled>
          Fans
        </option>
      </Select>
      <InputGroup flex={1} mr={2}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          backgroundColor="rgba(255, 255, 255, 0.2)"
          borderRadius="md"
          _placeholder={{ color: "gray.400" }}
        />
      </InputGroup>
      <Button
        onClick={handleSearch}
        isLoading={isLoading}
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="md"
        _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
