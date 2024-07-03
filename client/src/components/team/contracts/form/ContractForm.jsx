import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import initialValues from "./initialValues";
import validation from "./validation";

const MyContractForm = ({ onSubmit, contractData }) => {
  const playerRoles = ["Striker", "Midfielder", "Defender", "Goalkeeper"];

  const name =
    contractData.player.user.userName || contractData.player.fullName;

  return (
    <Box>
      <Flex
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="10px"
        p="1rem"
        mb="2rem"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(10px)"
        alignItems="center"
      >
        <Avatar src={contractData.team.avatar} size="lg" mr="1rem" />
        <Box>
          <Heading size="md">{contractData.team.name}</Heading>
          <Text fontSize=".8rem" fontWeight="500">
            Assigning contract to {name}
          </Text>
        </Box>
        <Avatar src={contractData.player.avatar} size="lg" ml="auto" />
      </Flex>

      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="flex-start" color="#FAFAFA">
              <FormControl isInvalid={errors.role && touched.role}>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Field as={Select} name="role" placeholder="Select role">
                  {playerRoles.map((role) => (
                    <option key={role} value={role} style={{ color: "#000" }}>
                      {role}
                    </option>
                  ))}
                </Field>
                {errors.role && touched.role ? (
                  <Box className="error-box">{errors.role}</Box>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.period?.startDate && touched.period?.startDate
                }
              >
                <FormLabel htmlFor="period.startDate">Start Date</FormLabel>
                <Field as={Input} type="date" name="period.startDate" />
                {errors.period?.startDate && touched.period?.startDate ? (
                  <Box className="error-box">{errors.period.startDate}</Box>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={errors.period?.endDate && touched.period?.endDate}
              >
                <FormLabel htmlFor="period.endDate">End Date</FormLabel>
                <Field as={Input} type="date" name="period.endDate" />
                {errors.period?.endDate && touched.period?.endDate ? (
                  <Box className="error-box">{errors.period.endDate}</Box>
                ) : null}
              </FormControl>

              <FormControl isInvalid={errors.borrowFee && touched.borrowFee}>
                <FormLabel htmlFor="borrowFee">Borrow Fee</FormLabel>
                <Field as={Input} type="number" name="borrowFee" />
                {errors.borrowFee && touched.borrowFee ? (
                  <Box className="error-box">{errors.borrowFee}</Box>
                ) : null}
              </FormControl>

              <FormControl isInvalid={errors.sellingFee && touched.sellingFee}>
                <FormLabel htmlFor="sellingFee">Selling Fee</FormLabel>
                <Field as={Input} type="number" name="sellingFee" />
                {errors.sellingFee && touched.sellingFee ? (
                  <Box className="error-box">{errors.sellingFee}</Box>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.commissionOnRenting && touched.commissionOnRenting
                }
              >
                <FormLabel htmlFor="commissionOnRenting">
                  Commission on Renting
                </FormLabel>
                <Field as={Input} type="number" name="commissionOnRenting" />
                {errors.commissionOnRenting && touched.commissionOnRenting ? (
                  <Box className="error-box">{errors.commissionOnRenting}</Box>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.commissionOnWinning && touched.commissionOnWinning
                }
              >
                <FormLabel htmlFor="commissionOnWinning">
                  Commission on Winning
                </FormLabel>
                <Field as={Input} type="number" name="commissionOnWinning" />
                {errors.commissionOnWinning && touched.commissionOnWinning ? (
                  <Box className="error-box">{errors.commissionOnWinning}</Box>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={errors.jerseyNumber && touched.jerseyNumber}
              >
                <FormLabel htmlFor="jerseyNumber">Jersey Number</FormLabel>
                <Field as={Input} type="number" name="jerseyNumber" />
                {errors.jerseyNumber && touched.jerseyNumber ? (
                  <Box className="error-box">{errors.jerseyNumber}</Box>
                ) : null}
              </FormControl>

              <Flex justify="center" w="100%">
                <button
                  type="submit"
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  className="btn-grad"
                >
                  Submit
                </button>
              </Flex>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MyContractForm;
