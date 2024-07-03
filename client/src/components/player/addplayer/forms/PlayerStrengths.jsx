// PlayerStrengths.js
import React from "react";
import {
  Box,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

import { Field } from "formik";

function PlayerStrengths() {
  return (
    <Box
      p="1rem"
      flex="1"
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
        background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
        p="0.5rem"
        borderRadius="10px"
      >
        <Text fontWeight="600" fontSize="1.5rem">
          PLAYER STRENGTH
        </Text>
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

      <Box className="childBox" mt="1rem" bg="rgba(255, 255, 255, 0.3)">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          // mb=".5rem"
          width="100%"
        >
          <PlayerStrength label="Striker" name="striker" />
          <PlayerStrength label="Winger" name="wing" />
          <PlayerStrength label="Midfielder" name="midfielder" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <PlayerStrength label="Wing Defender" name="defender" />
          <PlayerStrength label="Central Back" name="centerBack" />
        </Box>
      </Box>
    </Box>
  );
}

export default PlayerStrengths;

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
