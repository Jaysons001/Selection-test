import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AttendanceLog from "./AttendanceLog";
import { useDispatch, useSelector } from "react-redux";
import { checkIn, checkOut, getHistory, isWorking } from "../redux/historyReducer";

const LiveAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useSelector((state) => state.authreducer);
  const { userWork } = useSelector((state) => state.historyreducer);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(daysOfWeek[new Date().getDay()]);
  const [shift, setShift] = useState("");
  const [userShift, setUserShift] = useState("");
  const dispatch = useDispatch();
  const [isCheckIn, setIsCheckIn] = useState(false);

  const lagiKerja = () => {
    dispatch(isWorking());
    if (userWork === null) {
      setIsCheckIn(false);
    } else {
      if (userWork.isDone) {
        setIsCheckIn(true);
      } else {
        setIsCheckIn(false);
      }
    }
  };

  useEffect(() => {
    if (user.roleName.split("-")[1] === "pagi") setUserShift("SH1");
    const currentHour = currentTime.getHours();
    const currentShift =
      currentHour >= 9 && currentHour < 17
        ? "SH1: 09:00 AM - 05:00 PM"
        : (currentHour >= 17 && currentHour <= 24) || (currentHour >= 0 && currentHour < 3)
        ? "SH2: 05:00 PM - 03:00 AM"
        : "Invalid Time";
    setShift(currentShift);
    lagiKerja();
  }, []);

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
          : "Invalid Time";
      console.log(currentShift);
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
    await dispatch(getHistory());
    await lagiKerja();
  };

  const handleCheckOut = async () => {
    await dispatch(checkOut());
    await dispatch(getHistory());
    await lagiKerja();
  };

  return (
    <>
      <Box align="center" mt={"10vh"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
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
          {isCheckIn ? (
            <Button colorScheme="facebook" mb={"20px"} width={"80%"} onClick={handleCheckOut}>
              Clock Out
            </Button>
          ) : (
            <Button colorScheme="facebook" mb={"20px"} width={"80%"} onClick={handleCheckIn}>
              Clock In
            </Button>
          )}
        </Flex>
      </Box>
      <Box align="center" mt={"15px"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
        isWorking
      </Box>
      <Box align="center" mt={"15px"} width={"50vw"} mx={"auto"} border={"1px solid grey"}>
        <AttendanceLog />
      </Box>
    </>
  );
};

export default LiveAttendance;
