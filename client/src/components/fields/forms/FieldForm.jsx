import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Select,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import initialValues from "./initialValues";
import validationSchema from "./validate";
import { imageUpload } from "../../../helper/imageUpload";
// import './FieldForm.css'; // Assuming you have a FieldForm.css file for custom CSS

function FieldForm({ handleSubmit, toggle, fieldImage, setFieldImage }) {
  const [uploading, setUploading] = useState();

  const handleFieldImage = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, setFieldImage, setUploading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="100vh">
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        mt="1rem"
        mx="auto"
        p="2rem"
        borderRadius="md"
        boxShadow="md"
        backdropFilter="blur(10px)"
        color="#FAFAFA"
        maxWidth="600px"
      >
        <Box
          className="childBoxHeading"
          background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
          p="0.5rem"
          borderRadius="10px"
          justifyContent="space-between"
          fontSize="1rem"
          display="flex"
        >
          <Text fontWeight="600" fontSize="1.5rem" ml={2}>
            Add Field Form
          </Text>
          <Box
            cursor="pointer"
            bg="rgba(255, 255, 255, 0.6)"
            color="#000"
            p="7px 10px"
            borderRadius="md"
            fontSize=".9rem"
            onClick={toggle}
            mr={2}
          >
            <i className="fa-solid fa-xmark"></i>
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.name && touched.name)}
              >
                <FormLabel htmlFor="name">Field Name</FormLabel>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  bg="white"
                  color="black"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.location && touched.location)}
              >
                <FormLabel htmlFor="location">Location</FormLabel>
                <Field
                  as={Input}
                  id="location"
                  name="location"
                  bg="white"
                  color="black"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.postalCode && touched.postalCode)}
              >
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Field
                  as={Input}
                  id="postalCode"
                  name="postalCode"
                  bg="white"
                  color="black"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.photo && touched.photo)}
              >
                <Box>
                  <FormLabel htmlFor="photo">Photo</FormLabel>
                  {fieldImage !== "" && (
                    <Button
                      size="sm"
                      colorScheme="cyan"
                      onClick={() => setFieldImage("")}
                    >
                      Change photo
                    </Button>
                  )}
                </Box>
                {fieldImage == "" && (
                  <Field
                    as={Input}
                    type="file"
                    onChange={handleFieldImage}
                    id="photo"
                    name="photo"
                    bg="white"
                    color="black"
                  />
                )}
              </FormControl>
              {fieldImage !== "" && (
                <Image src={fieldImage} maxW="350px" borderRadius="md" mb={2} />
              )}
              <FormControl mb="1rem" isInvalid={!!(errors.fee && touched.fee)}>
                <FormLabel htmlFor="fee">Fee</FormLabel>
                <Field
                  as={Input}
                  id="fee"
                  name="fee"
                  type="number"
                  bg="white"
                  color="black"
                />
                <ErrorMessage
                  name="fee"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.shower && touched.shower)}
              >
                <FormLabel htmlFor="shower">Shower</FormLabel>
                <Field
                  as={Select}
                  id="shower"
                  name="shower"
                  bg="white"
                  color="black"
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
                <ErrorMessage
                  name="shower"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={!!(errors.toilet && touched.toilet)}
              >
                <FormLabel htmlFor="toilet">Toilet</FormLabel>
                <Field
                  as={Select}
                  id="toilet"
                  name="toilet"
                  bg="white"
                  color="black"
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
                <ErrorMessage
                  name="toilet"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.childrenPlayground && touched.childrenPlayground)
                }
              >
                <FormLabel htmlFor="childrenPlayground">
                  Children Playground
                </FormLabel>
                <Field
                  as={Select}
                  id="childrenPlayground"
                  name="childrenPlayground"
                  bg="white"
                  color="black"
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
                <ErrorMessage
                  name="childrenPlayground"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <FormControl
                mb="1rem"
                isInvalid={
                  !!(errors.foodCourtNearby && touched.foodCourtNearby)
                }
              >
                <FormLabel htmlFor="foodCourtNearby">
                  Food Court Nearby
                </FormLabel>
                <Field
                  as={Select}
                  id="foodCourtNearby"
                  name="foodCourtNearby"
                  bg="white"
                  color="black"
                >
                  <option value="">Select</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
                <ErrorMessage
                  name="foodCourtNearby"
                  component="div"
                  className="error-box"
                />
              </FormControl>
              <Flex justify="center">
                <button
                  type="submit"
                  isLoading={isSubmitting}
                  className="btn-grad"
                >
                  Submit
                </button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default FieldForm;
