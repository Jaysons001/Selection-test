import { Box, Td, Tr } from "@chakra-ui/react";
import React from "react";

const AdminUserSatu = ({ user }) => {
  return (
    <Tr>
      <Td>{user.fullName || "Belum Isi Email"}</Td>
      <Td>{user.email}</Td>
      <Td>{user.Role.role}</Td>
      <Td>Rp.{user.baseSalary},-</Td>
    </Tr>
  );
};

export default AdminUserSatu;
