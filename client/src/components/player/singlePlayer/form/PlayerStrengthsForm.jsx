import React from "react";
import {
  Box,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateManagerPlayer } from "../../../../api/api";
import toast from "react-hot-toast";
import useLoginUser from "../../../../hooks/useLoginUser";

const PlayerStrengthsForm = ({ initialValues, toggle, setPlayer }) => {
  const { loginUser } = useLoginUser();

  const validationSchema = Yup.object({
    selfRating: Yup.object({
      striker: Yup.number().required("Required").min(0).max(100),
      winger: Yup.number().required("Required").min(0).max(100),
      midfielder: Yup.number().required("Required").min(0).max(100),
      wingDefender: Yup.number().required("Required").min(0).max(100),
      centralBack: Yup.number().required("Required").min(0).max(100),
    }),
  });

  const sanitizedInitialValues = {
    selfRating: {
      striker: initialValues?.selfRating?.striker || 0,
      winger: initialValues?.selfRating?.winger || 0,
      midfielder: initialValues?.selfRating?.midfielder || 0,
      wingDefender: initialValues?.selfRating?.wingDefender || 0,
      centralBack: initialValues?.selfRating?.centralBack || 0,
    },
  };

  const handleUpdate = async (values) => {
    try {
      const res = updateManagerPlayer(
        loginUser.token,
        initialValues._id,
        values
      );

      toast.promise(res, {
        loading: `Updating ...`,
        success: (res) => {
          setPlayer((prev) => ({ ...prev, ...values }));
          toggle();
          return "Player Updated";
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
    <Box flex={1}>
      <Formik
        initialValues={sanitizedInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleUpdate(values);
        }}
      >
        {({ values }) => (
          <Form>
            <Box
              p="1rem"
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="10px"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              backdropFilter="blur(10px)"
              maxHeight="465px"
              overflowY="auto"
              className="custom-scrollbar"
            >
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
                <Text color="#FAFAFA">UPDATE STRENGTH</Text>
                <Box
                  cursor="pointer"
                  bg="rgba(255, 255, 255, 0.6)"
                  color="#000"
                  p="5px 10px"
                  borderRadius="md"
                  fontSize="1.1rem"
                  onClick={toggle}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Box>
              </Box>
              <Box className="childBox" mt="1rem" bg="rgba(255, 255, 255, 0.1)">
                <Box display="flex" alignItems="center" mb="1rem">
                  <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717812928/Shooting_afspxs.png" />
                  <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717812949/Speed_nht357.png" />
                  <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717812904/Passing_dxph1q.png" />
                </Box>
                <Box display="flex" alignItems="center">
                  <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717812960/Defend_zaq45x.png" />
                  <Image src="https://res.cloudinary.com/suvaranjan/image/upload/v1717812979/Catch_yyplwq.png" />
                </Box>
              </Box>
              <Box className="childBox mt-1rem">
                <PlayerStrength label="Striker" name="selfRating.striker" />
                <PlayerStrength label="Winger" name="selfRating.winger" />
                <PlayerStrength
                  label="Midfielder"
                  name="selfRating.midfielder"
                />
                <PlayerStrength
                  label="Wing Defender"
                  name="selfRating.wingDefender"
                />
                <PlayerStrength
                  label="Central Back"
                  name="selfRating.centralBack"
                />
              </Box>
              <Flex align="center" justify="center" mt="1rem">
                <button className="btn-grad" type="submit">
                  Save
                </button>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PlayerStrengthsForm;

function PlayerStrength({ label, name }) {
  return (
    <Box mt="1rem" width="100%">
      <Text fontWeight="600" fontSize="1rem" mb="0.5rem">
        {label}
      </Text>
      <Field name={name}>
        {({ field, form }) => (
          <Slider
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
            min={0}
            max={100}
            colorScheme="teal"
          >
            <SliderTrack bg="rgba(255,255,255,0.4)">
              <SliderFilledTrack bg="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)" />
            </SliderTrack>
            <SliderThumb boxSize={6} color="#000" fontWeight="600">
              {field.value}
            </SliderThumb>
          </Slider>
        )}
      </Field>
    </Box>
  );
}
