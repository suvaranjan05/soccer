// TeamInfoForm.jsx
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import { SearchIcon } from "@chakra-ui/icons";

const TeamInfoForm = ({ initialValues, formikProps }) => {
  return (
    <Box
      mx="auto"
      p={4}
      background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
      boxShadow="lg"
      borderRadius="md"
      backdropFilter="blur(4px)"
      mt={8}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
      >
        {/* Team 1 */}
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          p={2}
          color="#FAFAFA"
          borderRadius="md"
        >
          <Box className="childBoxHeading">
            <Text fontWeight="600" fontSize="1.5rem">
              TEAM 1
            </Text>
          </Box>
          <Box display="flex" pr={3} borderRadius="md" mb="1rem">
            <InputGroup mr={2} flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search Teams"
                backgroundColor="rgba(255, 255, 255, 0.2)"
                // value={keyword}
                // onChange={(e) => setKeyword(e.target.value)}
                className="no-hover-search"
              />
            </InputGroup>
            <Button
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              // onClick={handleSearch}
              // isLoading={searching}
            >
              Search
            </Button>
          </Box>

          <Field name="team1.color">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team1?.color && form.touched.team1?.color
                }
              >
                <FormLabel>Team1 Color</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team1?.color}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="team1.jersey">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team1?.jersey && form.touched.team1?.jersey
                }
              >
                <FormLabel>Team1 Jersey</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team1?.jersey}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="team1.number">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team1?.number && form.touched.team1?.number
                }
              >
                <FormLabel>Team1 Number</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team1?.number}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Box>

        {/* Team 2 */}
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          p={2}
          color="#FAFAFA"
          borderRadius="md"
        >
          <Box className="childBoxHeading">
            <Text fontWeight="600" fontSize="1.5rem">
              TEAM 2
            </Text>
          </Box>

          <Box display="flex" pr={3} borderRadius="md" mb="1rem">
            <InputGroup mr={2} flex={1}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search Teams"
                backgroundColor="rgba(255, 255, 255, 0.2)"
                // value={keyword}
                // onChange={(e) => setKeyword(e.target.value)}
                className="no-hover-search"
              />
            </InputGroup>
            <Button
              bg="rgba(255, 255, 255, 0.2)"
              backdropFilter="blur(10px)"
              // onClick={handleSearch}
              // isLoading={searching}
            >
              Search
            </Button>
          </Box>

          <Field name="team2.color">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team2?.color && form.touched.team2?.color
                }
              >
                <FormLabel>Team2 Color</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team2?.color}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="team2.jersey">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team2?.jersey && form.touched.team2?.jersey
                }
              >
                <FormLabel>Team2 Jersey</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team2?.jersey}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="team2.number">
            {({ field, form }) => (
              <FormControl
                isInvalid={
                  form.errors.team2?.number && form.touched.team2?.number
                }
              >
                <FormLabel>Team2 Number</FormLabel>
                <Input {...field} />
                <FormErrorMessage className="error-box">
                  {form.errors.team2?.number}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamInfoForm;
