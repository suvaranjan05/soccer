import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { SearchIcon } from "@chakra-ui/icons";
import useLoginUser from "../../hooks/useLoginUser";
import { addField, getFields, getFieldsBySearch } from "../../api/api";
import FieldCard from "./FieldCard";
import SkeletonFieldCard from "./FieldSkeleton";
import FieldForm from "./forms/FieldForm";
import toast from "react-hot-toast";

function Fields() {
  const { loginUser } = useLoginUser();
  const [fields, setFields] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [addingField, setAddingField] = useState(false);
  const [fieldImage, setFieldImage] = useState("");

  useEffect(() => {
    fetchFields();
  }, [currentPage]);

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const res = await getFields(loginUser.token, currentPage, 6); // Fetch 6 fields per page
      setFields(res.data.fields);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = async () => {
    if (keyword === "") return;
    try {
      setSearching(true);
      const res = await getFieldsBySearch(
        loginUser.token,
        currentPage,
        6,
        keyword
      );
      setFields(res.data.fields);
      setPagination(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearching(false);
    }
  };

  const toogleForm = () => {
    setAddingField(!addingField);
  };

  const handleSubmit = async (values) => {
    try {
      let newValues = values;

      if (fieldImage === "") {
        return toast.error("Field Photo is required");
      } else {
        newValues = { ...values, photo: fieldImage };
      }

      // console.log(newValues);

      const res = addField(loginUser.token, newValues);

      toast.promise(res, {
        loading: `Adding Field..`,
        success: (res) => {
          return "New Field Added";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh">
      <Header heading="Fields">Create Match</Header>
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        w="90vw"
        mt="1rem"
        mx="auto"
        borderRadius="md"
        p="1rem"
        minH="80vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {!addingField && (
          <Box>
            <Box display="flex" borderRadius="md" mb="1.3rem">
              <InputGroup mr={2} flex={1}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.500" />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="Search Field"
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="no-hover-search"
                  borderRadius="md"
                  _placeholder={{ color: "gray.400" }}
                />
              </InputGroup>
              <Button
                bg="rgba(255, 255, 255, 0.2)"
                backdropFilter="blur(10px)"
                onClick={handleSearch}
                isLoading={searching}
                borderRadius="md"
                _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
              >
                Search
              </Button>
            </Box>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing="2rem"
              width="100%"
              justifyItems="center"
              mb="2rem"
            >
              {!isLoading &&
                fields.length > 0 &&
                fields.map((field) => (
                  <FieldCard key={field._id} field={field} />
                ))}
              {isLoading && (
                <>
                  <SkeletonFieldCard />
                  <SkeletonFieldCard />
                  <SkeletonFieldCard />
                </>
              )}
            </SimpleGrid>
          </Box>
        )}

        {!addingField && (
          <Box w="100%" display="flex" justifyContent="space-between" mt="auto">
            <Button
              colorScheme="cyan"
              fontWeight="400"
              onClick={handlePrevPage}
              isDisabled={!pagination || !pagination.previous}
              borderRadius="md"
            >
              Prev
            </Button>
            <Button onClick={toogleForm}>Add Field</Button>
            <Button
              colorScheme="cyan"
              fontWeight="400"
              color="#000"
              onClick={handleNextPage}
              isDisabled={!pagination || !pagination.next}
              borderRadius="md"
            >
              Next
            </Button>
          </Box>
        )}

        {addingField && (
          <FieldForm
            handleSubmit={handleSubmit}
            toggle={toogleForm}
            fieldImage={fieldImage}
            setFieldImage={setFieldImage}
          />
        )}
      </Box>
    </Box>
  );
}

export default Fields;
