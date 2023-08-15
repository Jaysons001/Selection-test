import { Box, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../redux/authReducer";
import AdminUserSatu from "./AdminUserSatu";

const AdminUser = () => {
  const { allUserAdmin } = useSelector((state) => state.authreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUser());
  }, []);

  return (
    <Box mt={"2vh"} mx={"2vw"}>
      <Table>
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Salary</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allUserAdmin.map((user) => (
            <AdminUserSatu key={user.id} user={user} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminUser;
