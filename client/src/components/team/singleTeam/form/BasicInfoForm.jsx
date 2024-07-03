import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { imageUpload } from "../../../../helper/imageUpload";
import { updateTeamBasicInfo } from "../../../../api/api";
import useLoginUser from "../../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import validation from "./validation";
import getInitialValues from "./getInitialValues";

export default function BasicInfoForm({ initialValues, toogleFunc, setTeam }) {
  const { loginUser } = useLoginUser();
  const [teamAvatar, setTeamAvatar] = useState(initialValues.avatar || "");
  const [coachAvatar, setCoachAvatar] = useState(
    initialValues.coach.avatar || ""
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setTeamAvatar(initialValues.avatar);
    setCoachAvatar(initialValues.coach.avatar);
  }, [initialValues]);

  const handleTeamAvatar = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setTeamAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoachAvatar = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setCoachAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      console.log(values);

      const res = updateTeamBasicInfo(loginUser.token, {
        ...values,
        coachId: initialValues.coach._id,
        teamId: initialValues._id,
      });
      toast.promise(res, {
        loading: `Updating ...`,
        success: (res) => {
          setTeam((prev) => ({
            ...prev,
            ...values,
            avatar: teamAvatar,
            coach: { ...prev.coach, avatar: coachAvatar },
          }));
          toogleFunc();
          return "Team Updated";
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
    <Box
      mr={{ base: 0, md: 2 }}
      mb={{ base: 2, md: 0 }}
      bg="rgba(255, 255, 255, 0.1)"
      p="1rem"
      flex={{ base: "1", md: "0 0 40%" }}
      borderRadius="10px"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="465px"
      overflowY="auto"
      className="custom-scrollbar"
    >
      <Formik
        initialValues={getInitialValues(initialValues)}
        validationSchema={validation}
        onSubmit={(values) => {
          const updatedData = {
            ...values,
            avatar: teamAvatar,
            coach: { ...values.coach, avatar: coachAvatar },
          };

          handleUpdate(updatedData);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Box
              className="childBoxHeading"
              fontWeight="600"
              fontSize="1rem"
              position="relative"
              p="10px 20px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>BASIC INFORMATION</Text>
              <Box
                cursor="pointer"
                bg="rgba(255, 255, 255, 0.6)"
                color="#000"
                p="5px 10px"
                borderRadius="md"
                fontSize="1.1rem"
                onClick={toogleFunc}
              >
                <i className="fa-solid fa-xmark"></i>
              </Box>
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                TEAM NAME
              </Text>
              <Field name="name">{({ field }) => <Input {...field} />}</Field>
              <ErrorMessage name="name" component={Text} color="red.500" />
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                AVATAR
              </Text>
              <FormLabel htmlFor="team-avatar" mb=".5rem">
                <Avatar
                  size="md"
                  src={teamAvatar}
                  mt=".5rem"
                  cursor="pointer"
                />
                <Input
                  id="team-avatar"
                  type="file"
                  onChange={handleTeamAvatar}
                  display="none"
                />
              </FormLabel>
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                DESCRIPTION
              </Text>
              <Field name="description">
                {({ field }) => <Textarea {...field} />}
              </Field>
              <ErrorMessage
                name="description"
                component={Text}
                color="red.500"
              />
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                FORMATION
              </Text>
              <Field name="formation">
                {({ field }) => (
                  <Box>
                    <RadioGroup
                      onChange={(val) => setFieldValue("formation", val)}
                      value={values.formation}
                    >
                      <Stack direction="column" spacing={3}>
                        <Radio value="3-3-4">3-3-4</Radio>
                        <Radio value="4-3-3">4-3-3</Radio>
                        <Radio value="4-4-2">4-4-2</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                )}
              </Field>
              <ErrorMessage name="formation" component={Text} color="red.500" />
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                COACH INFO
              </Text>
              <FormLabel htmlFor="coach-avatar" mb=".5rem">
                <Avatar
                  size="md"
                  src={coachAvatar}
                  mt=".5rem"
                  cursor="pointer"
                />
                <Input
                  id="coach-avatar"
                  type="file"
                  onChange={handleCoachAvatar}
                  display="none"
                />
              </FormLabel>
              <Field name="coach.fullName">
                {({ field }) => (
                  <Input {...field} placeholder="Coach Name" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="coach.fullName"
                component={Text}
                color="red.500"
              />
              <Field name="coach.address">
                {({ field }) => (
                  <Input {...field} placeholder="Coach Address" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="coach.address"
                component={Text}
                color="red.500"
              />
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                TEAM BANK INFO
              </Text>
              <Field name="bankInfo.paynowNumber">
                {({ field }) => (
                  <Input {...field} placeholder="PayNow Number" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="bankInfo.paynowNumber"
                component={Text}
                color="red.500"
              />
              <Field name="bankInfo.bankCardNumber">
                {({ field }) => (
                  <Input {...field} placeholder="Bank Card Number" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="bankInfo.bankCardNumber"
                component={Text}
                color="red.500"
              />
              <Field name="bankInfo.bankNumber">
                {({ field }) => (
                  <Input {...field} placeholder="Bank Number" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="bankInfo.bankNumber"
                component={Text}
                color="red.500"
              />
            </Box>

            <Box className="childBox">
              <Text mb="1rem" fontWeight="600">
                SPONSOR INFO
              </Text>
              <Field name="sponsor.name">
                {({ field }) => (
                  <Input {...field} placeholder="Sponsor Name" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="sponsor.name"
                component={Text}
                color="red.500"
              />
              <Field name="sponsor.contact">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Contact Information"
                    mb=".5rem"
                  />
                )}
              </Field>
              <ErrorMessage
                name="sponsor.contact"
                component={Text}
                color="red.500"
              />
              <Field name="sponsor.amount">
                {({ field }) => (
                  <Input {...field} placeholder="Amount" mb=".5rem" />
                )}
              </Field>
              <ErrorMessage
                name="sponsor.amount"
                component={Text}
                color="red.500"
              />
              <Flex
                direction="column"
                w="100%"
                bg="rgba(255, 255, 255, 0.4)"
                p={2}
                borderRadius="md"
              >
                <Text p={1} fontWeight="600">
                  Period
                </Text>
                <Field name="sponsor.period.startDate">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      placeholder="Start Date"
                      mb=".5rem"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="sponsor.period.startDate"
                  component={Text}
                  color="red.500"
                />

                <Field name="sponsor.period.endDate">
                  {({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      placeholder="End Date"
                      mb=".5rem"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="sponsor.period.endDate"
                  component={Text}
                  color="red.500"
                />
              </Flex>
            </Box>

            <Flex mt={3} justify="center" align="center">
              <button type="submit" className="btn-grad">
                Save
              </button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
