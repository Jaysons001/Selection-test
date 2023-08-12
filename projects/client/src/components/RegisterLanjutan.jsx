import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { registerLanjutan } from "../redux/authReducer";

const RegisterLanjutan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const url = window.location.href.split("/");
    const token = url[url.length - 1];

    const values = {
      fullname: document.getElementById("fullname").value,
      birthday: startDate ? startDate.toISOString().split("T")[0] : null,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      token,
    };
    setIsLoading(true);
    await dispatch(registerLanjutan(values));
    setIsLoading(false);
  };

  return (
    <Center mt={"10vh"}>
      <Card boxSize={"2xl"} border={"1px solid black"} borderRadius={"md"}>
        <CardHeader>
          <Heading size="md">Registrasi Lanjutan</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Full Name
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input placeholder="Full Name" id="fullname" />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Birthday
              </Heading>
              <Text pt="2" fontSize="sm">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Username
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input placeholder="Username" id="username" />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Password
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input placeholder="Password" id="password" />
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Confirm Password
              </Heading>
              <Text pt="2" fontSize="sm">
                <Input placeholder="Password" id="Confirm Password" />
              </Text>
            </Box>
          </Stack>
          <Button
            variant="solid"
            colorScheme="facebook"
            width={"100%"}
            mt={"6"}
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Logging in...">
            Register
          </Button>
        </CardBody>
      </Card>
    </Center>
  );
};

export default RegisterLanjutan;
