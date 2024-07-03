import { Box, Input, Text } from "@chakra-ui/react";
import { Field, ErrorMessage } from "formik";

const TeamBankInfo = ({ bankInfo, setBankInfo }) => {
  return (
    <Box className="childBox">
      <Text mb="1rem" fontWeight="600">
        TEAM BANK INFO
      </Text>

      <Field name="bankInfo.paynowNumber">
        {({ field }) => (
          <Input
            {...field}
            placeholder="PayNow Number"
            // mb="0.5rem"
            value={bankInfo.paynowNumber}
            onChange={setBankInfo}
          />
        )}
      </Field>
      <ErrorMessage
        name="bankInfo.paynowNumber"
        component="div"
        className="error-box"
      />

      <Field name="bankInfo.bankCardNumber">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Bank Card Number"
            mt="0.5rem"
            value={bankInfo.bankCardNumber}
            onChange={setBankInfo}
          />
        )}
      </Field>
      <ErrorMessage
        name="bankInfo.bankCardNumber"
        component="div"
        className="error-box"
      />

      <Field name="bankInfo.bankNumber">
        {({ field }) => (
          <Input
            {...field}
            mt="0.5rem"
            placeholder="Bank Number"
            value={bankInfo.bankNumber}
            onChange={setBankInfo}
          />
        )}
      </Field>
      <ErrorMessage
        name="bankInfo.bankNumber"
        component="div"
        className="error-box"
      />
    </Box>
  );
};

export default TeamBankInfo;
