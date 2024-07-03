import React, { useEffect, useState } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import MatchForm from "./forms/MatchForm";
import initialValues from "./formik/initialValues";
import validation from "./formik/validation";
import Header from "../../header/Header";
// import { myFileds } from "./fields";
// import { myReferees } from "./referees";
import { createMatch, getAllFields, getAllReferees } from "../../../api/api";
import useLoginUser from "../../../hooks/useLoginUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateMatch() {
  const [fetchingReferees, setFetchingReferees] = useState(true);
  const [fetchingFields, setFetchingFields] = useState(true);
  const [myFields, setMyFields] = useState([]);
  const [myReferees, setMyReferees] = useState([]);

  const { loginUser } = useLoginUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReferees();
    fetchFields();
  }, []);

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      fees: {
        ...values.fees,
        titleFee: Number(values.fees.titleFee),
        joiningFee: Number(values.fees.joiningFee),
      },
      playerNeed: Number(values.playerNeed),
    };
    // console.log(updatedValues);
    try {
      const res = createMatch(loginUser.token, updatedValues);

      toast.promise(res, {
        loading: `Creating Match...`,
        success: (res) => {
          navigate(`/match/${res.data.matchId}`);
          return "Match Created";
        },
        error: (e) => {
          return e.response.data.msg;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReferees = async () => {
    try {
      setFetchingReferees(true);
      const res = await getAllReferees(loginUser.token);
      setMyReferees(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingReferees(false);
    }
  };

  const fetchFields = async () => {
    try {
      setFetchingFields(true);
      const res = await getAllFields(loginUser.token);
      setMyFields(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingFields(false);
    }
  };

  return (
    <Box minH="100vh">
      <Header heading="Create Match">Create Match</Header>
      <Box w="100%" p={3}>
        {!fetchingReferees && !fetchingFields && (
          <MatchForm
            initialValues={initialValues}
            validation={validation}
            onSubmit={handleSubmit}
            fields={myFields}
            referees={myReferees}
          />
        )}
        {(fetchingReferees || fetchingFields) && (
          <Box
            width="80vw"
            height="75vh"
            bg="rgba(255, 255, 255, 0.2)"
            mx="auto"
            mt="1rem"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Center>
              <Spinner size="xl" color="white" mt="2rem" />
            </Center>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CreateMatch;
