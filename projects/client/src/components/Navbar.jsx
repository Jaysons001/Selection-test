import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authReducer";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };
  return (
    <Box bgColor={"white"} borderBottom={"3px solid #E0E0E0"}>
      <Flex p={3} mx={"15vw"} justifyContent={"space-between"}>
        <Flex>
          <Image boxSize={"60px"} ml={2} src=""></Image>
          <Text ml={"10px"} fontSize={"40px"} fontWeight={"bold"}>
            LOELOS
          </Text>
        </Flex>
        <Menu>
          <Avatar as={MenuButton} />
          <MenuList>
            <MenuItem minH="48px" onClick={handleLogout}>
              <span>Log Out</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
