import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import { imageUpload } from "../../../../helper/imageUpload";

const BasicInfoForm = ({
  initialValues,
  formikProps,
  fields,
  setSelectedField,
  avatar,
  setAvatar,
}) => {
  const [uploading, setUploading] = useState(false);
  const handleFieldChange = (e) => {
    const fieldId = e.target.value;
    const selectedField = fields.find((field) => field._id === fieldId); // Use '_id' instead of 'id' based on your fields array structure
    if (selectedField) {
      setSelectedField(selectedField); // Set the selected field in the parent component
      formikProps.setFieldValue("field", selectedField._id); // Update Formik field value for 'field' with '_id'
      formikProps.setFieldValue("fees.fieldFee", selectedField.fee); // Assuming 'fee' is the field fee property in your data structure
    } else {
      setSelectedField(null); // Clear selected field if not found (optional)
      formikProps.setFieldValue("field", ""); // Clear field value in Formik
      formikProps.setFieldValue("fees.fieldFee", ""); // Clear field fee in Formik (optional)
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setAvatar, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      mb={8}
      flex={1}
      maxH="380px"
      overflowY="auto"
      className="custom-scrollbar"
      p={2}
      bg="rgba(255, 255, 255, 0.1)"
      color="#FAFAFA"
      borderRadius="md"
      mr={{ base: "0", md: "10px" }}
    >
      <Box className="childBoxHeading">
        <Text fontWeight="600" fontSize="1.5rem">
          BASIC INFORMATION
        </Text>
      </Box>

      {/* Match Date */}
      <Box mb={4}>
        <FormLabel htmlFor="date">Match Date & Time</FormLabel>
        <Field name="date">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.date && form.touched.date}>
              <Input {...field} id="date" type="datetime-local" />
              <FormErrorMessage className="error-box">
                {form.errors.date}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Match Location */}
      <Box mb={4}>
        <FormLabel htmlFor="location">Match Location</FormLabel>
        <Field name="location">
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.location && form.touched.location}
            >
              <Input {...field} id="location" />
              <FormErrorMessage className="error-box">
                {form.errors.location}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Match Description */}
      <Box mb={4}>
        <FormLabel htmlFor="description">Match Description</FormLabel>
        <Field name="description">
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.description && form.touched.description}
            >
              <Textarea {...field} id="description" />
              <FormErrorMessage className="error-box">
                {form.errors.description}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Match Type */}
      <Box mb={4}>
        <FormLabel htmlFor="type">Match Type</FormLabel>
        <Field name="type">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.type && form.touched.type}>
              <Select
                {...field}
                id="type"
                onChange={(e) => {
                  form.handleChange(e);
                }}
                placeholder="Select option"
                color="#FAFAFA"
              >
                <option value="Free" style={{ color: "#000" }}>
                  Free
                </option>
                <option value="Share" style={{ color: "#000" }}>
                  Share
                </option>
                <option value="WinnerPayLess" style={{ color: "#000" }}>
                  WinnerPayLess
                </option>
              </Select>
              <FormErrorMessage className="error-box">
                {form.errors.type}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Field (Select Field) */}
      <Box mb={4}>
        <FormLabel htmlFor="field">Select Field</FormLabel>
        <Field name="field">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.field && form.touched.field}>
              <Select
                {...field}
                id="field"
                placeholder="Select Field"
                onChange={handleFieldChange}
              >
                {fields.map((field) => (
                  <option
                    key={field._id}
                    value={field._id}
                    style={{ color: "#000" }}
                  >
                    {field.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage className="error-box">
                {form.errors.field}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Match Photo */}
      <Box mb={4}>
        <FormLabel htmlFor="photo">Match Photo</FormLabel>
        <Field name="photo">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.photo && form.touched.photo}>
              <Input
                {...field}
                id="photo"
                type="file"
                onChange={handleFileChange}
              />
              <FormErrorMessage className="error-box">
                {form.errors.photo}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {avatar !== "" && (
        <Image
          boxSize="200px"
          objectFit="cover"
          src={avatar}
          alt="Team Poster"
          borderRadius="md"
          mb={3}
        />
      )}

      {/* Player Need */}
      <Box mb={4}>
        <FormLabel htmlFor="playerNeed">Player Need</FormLabel>
        <Field name="playerNeed">
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.playerNeed && form.touched.playerNeed}
            >
              <Input {...field} id="playerNeed" />
              <FormErrorMessage className="error-box">
                {form.errors.playerNeed}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Title Fee */}
      <Box mb={4}>
        <FormLabel htmlFor="titleFee">Title Fee</FormLabel>
        <Field name="fees.titleFee">
          {({ field, form }) => (
            <FormControl
              isInvalid={
                form.errors.fees?.titleFee && form.touched.fees?.titleFee
              }
            >
              <Input {...field} id="titleFee" />
              <FormErrorMessage className="error-box">
                {form.errors.fees?.titleFee}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>

      {/* Joining Fee */}
      <Box mb={4}>
        <FormLabel htmlFor="joiningFee">Joining Fee</FormLabel>
        <Field name="fees.joiningFee">
          {({ field, form }) => (
            <FormControl
              isInvalid={
                form.errors.fees?.joiningFee && form.touched.fees?.joiningFee
              }
            >
              <Input {...field} id="joiningFee" />
              <FormErrorMessage className="error-box">
                {form.errors.fees?.joiningFee}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Box>
    </Box>
  );
};

export default BasicInfoForm;
