import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AttendanceLog from "./AttendanceLog";
import { useDispatch, useSelector } from "react-redux";
import { checkIn, checkOut, getHistory, getSalaryMonth, isWorking } from "../redux/historyReducer";
import { cekLogin } from "../redux/authReducer";
import AttendanceLogIsWorking from "./AttendanceLogIsWorking";

const LiveAttendance = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { userWork } = useSelector((state) => state.historyreducer);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(daysOfWeek[new Date().getDay()]);
  const [shift, setShift] = useState("");
  const [userShift, setUserShift] = useState("");
  const dispatch = useDispatch();
  const [isCheckIn, setIsCheckIn] = useState(false);

  const lagiKerja = async () => {
    await dispatch(isWorking());

    if (userWork === null) {
      setIsCheckIn(false);
    } else {
      if (userWork.isDone) {
        setIsCheckIn(false);
      } else {
        setIsCheckIn(true);
      }
    }
    await dispatch(getSalaryMonth({}));
  };

  useEffect(() => {
    if (user.roleName.split("-")[1] === "pagi") setUserShift("SH1");
    if (user.roleName.split("-")[1] === "malam") setUserShift("SH2");

    const currentHour = currentTime.getHours();
    const currentShift =
      currentHour >= 9 && currentHour < 17
        ? "SH1: 09:00 AM - 05:00 PM"
        : (currentHour >= 17 && currentHour <= 24) || (currentHour >= 0 && currentHour < 3)
        ? "SH2: 05:00 PM - 03:00 AM"
        : "Malam Tidur";
    setShift(currentShift);
    lagiKerja();
  }, [user, isCheckIn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentDayOfWeek(daysOfWeek[new Date().getDay()]);
      const currentHour = currentTime.getHours();

      const currentShift =
        currentHour >= 9 && currentHour < 17
          ? "SH1: 09:00AM - 05:00PM"
          : (currentHour >= 17 && currentHour <= 24) || (currentHour >= 0 && currentHour < 3)
          ? "SH2: 05:00PM - 03:00AM"
          : "Malam Tidur";
      setShift(currentShift);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCheckIn = async () => {
    if (shift === "Invalid Time") return alert("Bukan saatnya kamu bekerja");
    if (shift.split(":")[0] !== userShift) return alert("ini bukan shift +mu");

    await dispatch(checkIn());
    await dispatch(getHistory({ index: 1 }));
    await lagiKerja();
  };

  const handleCheckOut = async () => {
    await dispatch(checkOut());
    await dispatch(getHistory({ index: 1 }));
    await lagiKerja();
  };

  return (
    <>
      <Box align="center" mt={"5vh"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
        <Stack>
          <Text fontSize={"50px"}>
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text fontSize={"20px"} alignSelf={"center"}>
            {currentDayOfWeek}, {currentTime.toLocaleDateString()}
          </Text>
          <Divider my={"20px"} />
          <Text>
            Schedule,<strong> {userShift}</strong> for {currentDayOfWeek}, {currentTime.toLocaleDateString()}
          </Text>
          <Text>Now Shift: {shift}</Text>
        </Stack>
        <Divider my={"20px"} />
        <Flex justifyContent={"space-evenly"}>
          <Button colorScheme="green" mb={"20px"} width={"40%"} onClick={handleCheckIn}>
            Clock In
          </Button>
          <Button colorScheme="red" mb={"20px"} width={"40%"} onClick={handleCheckOut}>
            Clock Out
          </Button>
        </Flex>
      </Box>
      <Box align="center" mt={"15px"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
        <AttendanceLogIsWorking />
      </Box>
      <Box align="center" mt={"15px"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
        <AttendanceLog />
      </Box>
    </>
  );
};

export default LiveAttendance;
