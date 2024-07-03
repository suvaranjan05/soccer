// MatchForm.jsx
import React, { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import BasicInfoForm from "./BasicInfoForm";
import TeamInfoForm from "./TeamInfoForm";
import AddReferee from "./AddReferee";

const MatchForm = ({
  initialValues,
  validation,
  onSubmit,
  fields,
  referees,
}) => {
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [matchPhoto, setMatchPhoto] = useState("");

  const handleSubmit = (values, actions) => {
    const myValues = {
      ...values,
      photos: [...values.photos, matchPhoto],
    };
    onSubmit(myValues, actions);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <Box
              mx="auto"
              p={4}
              background="linear-gradient(90deg, rgba(255,50,37,0.6) 0%, rgba(46,149,171,0.6) 65%, rgba(14,233,246,0.6) 100%)"
              boxShadow="lg"
              borderRadius="md"
              backdropFilter="blur(4px)"
              display={{ base: "block", md: "flex" }}
            >
              <BasicInfoForm
                initialValues={initialValues}
                formikProps={formikProps}
                setSelectedField={setSelectedField}
                fields={fields}
                avatar={matchPhoto}
                setAvatar={setMatchPhoto}
              />
              <AddReferee
                referees={referees}
                selectedReferee={selectedReferee}
                setSelectedReferee={setSelectedReferee}
                formikProps={formikProps}
              />
            </Box>

            <Flex justify="center" mt={4}>
              <button type="submit" className="btn-grad">
                Create Match
              </button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MatchForm;
