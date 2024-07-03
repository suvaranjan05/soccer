import { Box, Input, Text } from "@chakra-ui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

const SponsorInfo = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Box className="childBox">
      <Text mb="1rem" fontWeight="600">
        SPONSOR INFO
      </Text>

      <Field name="sponsor.name">
        {({ field }) => <Input {...field} placeholder="Sponsor Name" />}
      </Field>
      <ErrorMessage name="sponsor.name" component="div" className="error-box" />

      <Field name="sponsor.contact">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Sponsor Contact Information"
            mt="0.5rem"
          />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.contact"
        component="div"
        className="error-box"
      />

      <Field name="sponsor.amount">
        {({ field }) => (
          <Input {...field} placeholder="Sponsorship Amount" mt="0.5rem" />
        )}
      </Field>
      <ErrorMessage
        name="sponsor.amount"
        component="div"
        className="error-box"
      />

      <Box
        display="flex"
        flexDirection="column"
        mt="0.5rem"
        bg="rgba(255, 255, 255, 0.4)"
        w="100%"
        p={2}
        borderRadius="md"
      >
        <Text mb="0.5rem" color="#718096" ml={2}>
          Sponsorship Period
        </Text>
        <Field name="sponsor.period.startDate">
          {({ field }) => (
            <Input
              type="date"
              // mt="0.5rem"
              {...field}
              onChange={(e) =>
                setFieldValue("sponsor.period.startDate", e.target.value)
              }
            />
          )}
        </Field>
        <ErrorMessage
          name="sponsor.period.startDate"
          component="div"
          className="error-box"
        />

        <Field name="sponsor.period.endDate">
          {({ field }) => (
            <Input
              mt="0.5rem"
              type="date"
              {...field}
              onChange={(e) =>
                setFieldValue("sponsor.period.endDate", e.target.value)
              }
            />
          )}
        </Field>
        <ErrorMessage
          name="sponsor.period.endDate"
          component="div"
          className="error-box"
        />
      </Box>
    </Box>
  );
};

export default SponsorInfo;
