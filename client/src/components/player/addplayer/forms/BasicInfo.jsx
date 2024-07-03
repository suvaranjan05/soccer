import React from "react";
import {
  Box,
  Text,
  Input,
  Avatar,
  Image,
  Flex,
  Radio,
  RadioGroup,
  Select, // Import Select from Chakra UI
} from "@chakra-ui/react";
import { Field, ErrorMessage } from "formik";

const BasicInfo = ({ myAvatar, handleFileChange }) => {
  return (
    <Box
      p="1rem"
      flex="1"
      borderRadius="10px"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      maxHeight="465px"
      overflowY="auto"
      className="custom-scrollbar"
      mb={{ base: ".5rem", md: 0 }}
    >
      <Box className="childBoxHeading">
        <Text fontWeight="600" fontSize="1.5rem">
          BASIC INFORMATION
        </Text>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          PLAYER NAME
        </Text>
        <Field as={Input} name="fullName" placeholder="Enter player name" />
        <ErrorMessage name="fullName" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          AVATAR
        </Text>
        <label htmlFor="avatar-upload">
          <Avatar size="md" src={myAvatar} mt=".5rem" cursor="pointer" />
          <Input
            id="avatar-upload"
            name="avatar"
            type="file"
            onChange={handleFileChange}
            display="none"
          />
        </label>
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Age
        </Text>
        <Field as={Input} name="age" placeholder="Enter player age" />
        <ErrorMessage name="age" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          DOB
        </Text>
        <Field
          as={Input}
          type="date"
          name="dateOfBirth"
          placeholder="Enter date of birth"
        />
        <ErrorMessage name="dateOfBirth" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Gender
        </Text>
        <Field as={Select} name="gender" placeholder="Select gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Field>
        <ErrorMessage name="gender" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Phone
        </Text>
        <Field as={Input} name="phone" placeholder="Enter phone number" />
        <ErrorMessage name="phone" component="div" className="error" />
      </Box>
      <Box className="childBox" mt="1rem">
        <Text mb="1rem" fontWeight="600">
          Preferred Wing
        </Text>
        <Field as={RadioGroup} name="preferredWing">
          <Flex gap="3rem">
            <Box>
              <Field as={Radio} name="preferredWing" value="LW">
                <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717828085/Foot_Left_thrajd.png" />
              </Field>
            </Box>
            <Box>
              <Field as={Radio} name="preferredWing" value="RW">
                <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717828561/Foot_Right_kg7lae.png" />
              </Field>
            </Box>
          </Flex>
        </Field>
        <ErrorMessage name="preferredWing" component="div" className="error" />
      </Box>
    </Box>
  );
};

export default BasicInfo;
