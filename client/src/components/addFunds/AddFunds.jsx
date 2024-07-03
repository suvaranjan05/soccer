import {
  Box,
  Text,
  Select,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import useLoginUser from "../../hooks/useLoginUser";
import { addFunds } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useStore from "../../zustand/store";

function AddFunds() {
  const [currency, setCurrency] = useState("zgold");
  const [amount, setAmount] = useState("");
  const [cost, setCost] = useState(0);
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();
  const { headerData, setHeaderData } = useStore((state) => state);

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
    if (loginUser.role !== "player" && loginUser.role !== "team-manager") {
      navigate("/dashboard");
    }
  }, []);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    calculateCost(e.target.value, amount);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    calculateCost(currency, value);
  };

  const calculateCost = (currency, amount) => {
    const amountInt = parseInt(amount, 10);
    if (isNaN(amountInt)) {
      setCost(0);
      return;
    }
    const price = currency === "zgold" ? 1 : 5;
    setCost(amountInt * price);
  };

  const handleBuy = async () => {
    try {
      const data = {
        currencyType: currency,
        quantity: parseInt(amount),
        userRole: loginUser.role,
      };
      const res = addFunds(loginUser.token, data);
      toast.promise(res, {
        loading: `Adding ${currency}...`,
        success: (res) => {
          let newData;
          if (currency === "zgold") {
            newData = {
              ...headerData,
              zGold: headerData.zGold + parseInt(amount),
            };
            setHeaderData(newData);
          } else {
            newData = {
              ...headerData,
              diamond: headerData.diamond + parseInt(amount),
            };
            setHeaderData(newData);
          }

          return "Funds Added";
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
    <Box
      // backgroundImage="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600"
      // backgroundSize="cover"
      // backgroundPosition="center"
      minH="100vh"
      color="#FAFAFA"
    >
      <Header heading="Add Funds" />
      <Box
        maxW="700px"
        margin="0 auto"
        mt="1rem"
        bg="rgba(255, 255, 255, 0.1)"
        p="1rem"
        borderRadius="md"
      >
        <Box
          bgGradient="linear(to-r, teal.500, green.500, blue.500)"
          p="2rem"
          borderRadius="md"
          color="#FFF"
        >
          <Text fontSize="1.5rem" fontWeight="700">
            Add Funds
          </Text>

          <Box mt="1rem">
            <FormControl>
              <FormLabel>Select Currency</FormLabel>
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                bg="white"
                color="black"
              >
                <option value="zgold">ZGOLD</option>
                <option value="diamond">DIAMOND</option>
              </Select>
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                bg="white"
                color="black"
              />
              <Text fontSize="0.9rem" color="gray.300" mt={1} fontWeight="600">
                {currency === "Diamond"
                  ? "Diamond is premium and costs more than zGold"
                  : "zGold is less expensive compared to Diamond"}
              </Text>
            </FormControl>
            <Text mt="1rem" fontSize="1rem" fontWeight="500">
              Total Cost: ${cost}
            </Text>
            <Button mt="1rem" colorScheme="blue" onClick={handleBuy}>
              Buy
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AddFunds;
