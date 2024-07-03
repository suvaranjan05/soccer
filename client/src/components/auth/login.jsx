import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "./validate";
import axios from "axios";
import baseUrl from "../../hooks/baseUrl";
import useStore from "../../zustand/store";
import useLoginUser from "../../hooks/useLoginUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { setHeaderData, setNotificationCount } = useStore((state) => state);
  const { setLoggedInUser } = useLoginUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formValues = { email, password };
    const validationErrors = validateLogin(formValues);

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/login`, { email, password });

      let userData = {
        token: res.data.token,
        role: res.data.role,
      };

      if (res.data.role === "player") {
        userData = {
          ...userData,
          playerId: res.data._id,
          userId: res.data.user._id,
        };
      } else if (res.data.role === "team-manager") {
        userData = {
          ...userData,
          managerId: res.data._id,
          userId: res.data.user._id,
        };
      } else if (res.data.role === "referee") {
        userData = {
          ...userData,
          refereeId: res.data._id,
          userId: res.data.user._id,
        };
      }

      setLoggedInUser(userData);
      setHeaderData(res.data.user);
      setNotificationCount(res.data.unreadNotificationsCount);

      toast({
        title: res.data.msg,
        // description: res,
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: error.response.data.msg,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
        containerStyle: {
          fontSize: "1rem",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      backgroundImage="https://images.pexels.com/photos/2413089/pexels-photo-2413089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        w="100%"
        boxShadow="lg"
        display="flex"
        minH="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          id="formBox"
          p={{ base: "1rem", md: "1rem", lg: "2rem" }}
          width={{ base: "90vw", md: "80vw", lg: "40vw" }}
          borderRadius="md"
          boxShadow="lg"
          bg="rgba(173, 216, 230, 0.4)"
          backdropFilter="blur(10px)"
          maxW="500px"
        >
          <Box>
            <Heading fontSize="1.5rem" textAlign="center">
              Login
            </Heading>
            <Box mt={4} fontSize=".8rem" textAlign="center">
              <Text display="inline" mr={1}>
                Don't have an account?
              </Text>
              <Text
                color="red.500"
                cursor="pointer"
                display="inline"
                fontWeight="500"
                onClick={() => navigate("/choose")}
                textDecoration="underline"
              >
                Signup
              </Text>
            </Box>
          </Box>
          <Box mt={8} as="form" onSubmit={handleLogin}>
            <FormControl isInvalid={errors.email}>
              {/* <FormLabel>Email</FormLabel> */}
              <Input
                type="email"
                placeholder="Email"
                maxW="500px"
                bg="#FAFAFA"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              {/* <FormLabel>Password</FormLabel> */}
              <Input
                type="password"
                placeholder="Password"
                maxW="500px"
                bg="#FAFAFA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              mt="1rem"
              w="100%"
              background="linear-gradient(90deg, rgba(255,50,37,1) 0%, rgba(46,149,171,1) 65%, rgba(14,233,246,1) 100%)"
              _hover={{
                background:
                  "linear-gradient(90deg, rgba(205,0,0,1) 0%, rgba(36,129,151,1) 65%, rgba(4,213,226,1) 100%)",
              }}
              borderRadius="none"
              color="#FAFAFA"
              isLoading={loading}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
