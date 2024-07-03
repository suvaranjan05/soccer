import {
  Avatar,
  Box,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { imageUpload } from "../../../../helper/imageUpload";

const CoachInfo = ({ coach, setCoach, onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      await imageUpload(file, settingAvatar, setLoading);
    } catch (error) {
      console.log(error);
    }
  };

  const settingAvatar = (image) => {
    setAvatar(image);
    onUpload(image);
  };

  return (
    <Box className="childBox">
      <Text mb="1rem" fontWeight="600">
        COACH INFO
      </Text>
      <FormLabel htmlFor="coach-avatar-upload" mb=".5rem">
        <Avatar size="md" src={avatar} mt=".5rem" cursor="pointer" />
        <Input
          id="coach-avatar-upload"
          type="file"
          onChange={(event) => handleFileChange(event)}
          display="none"
        />
      </FormLabel>
      <Field name="coach.name">
        {({ field }) => (
          <Input
            {...field}
            placeholder="Coach Name"
            // mb="0.5rem"
            value={coach.name}
            onChange={setCoach}
          />
        )}
      </Field>
      <ErrorMessage name="coach.name" component="div" className="error-box" />

      <Field name="coach.address">
        {({ field }) => (
          <Textarea
            {...field}
            mt=".5rem"
            placeholder="Coach Address"
            value={coach.address}
            onChange={setCoach}
          />
        )}
      </Field>
      <ErrorMessage
        name="coach.address"
        component="div"
        className="error-box"
      />
    </Box>
  );
};

export default CoachInfo;
