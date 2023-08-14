import { Box, Flex } from "@chakra-ui/react";
import Register from "../components/Register";
import React from "react";
import AdminUser from "./AdminUser";

const AdminBox = () => {
  return (
    <Box mt={"5vh"} width={"50vw"} mx={"auto"} border={"1px solid grey"} borderRadius={"10px"}>
      <Flex justifyContent={"flex-end"} mr={"20px"} mt={"20px"}>
        <Register />
      </Flex>

      <AdminUser />
    </Box>
  );
};

export default AdminBox;
