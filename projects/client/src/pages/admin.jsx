import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminBox from "../components/Admin";

export const Admin = () => {
  const { user } = useSelector((state) => state.authreducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.roleID > 1) {
      alert("anda tidak memiliki akses kesini");
      navigate("/home");
    }
  }, [user]);

  return (
    <Box>
      <Navbar />
      <AdminBox />
    </Box>
  );
};

export default Admin;
