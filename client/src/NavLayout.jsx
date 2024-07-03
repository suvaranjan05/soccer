import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
// import Header from "./Header";
import { Box } from "@chakra-ui/react";
import useLoginUser from "./hooks/useLoginUser";
import { useEffect } from "react";

export default function NavLayout() {
  const { loginUser } = useLoginUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Box
        w="100%"
        backgroundImage="https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600"
        backgroundSize="cover"
        backgroundPosition="center"
        pb="2rem"
      >
        <Toaster
          toastOptions={{
            style: {
              fontSize: "1.1rem",
            },
          }}
        />
        {/* <Header /> */}
        <Outlet />
      </Box>
    </>
  );
}
