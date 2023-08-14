import { Box, Divider, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AttendanceLogItem = ({ item }) => {
  const { ClockIn, ClockOut, isDone, DaySalary } = item;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(daysOfWeek[new Date(ClockIn).getDay()]);

  return (
    <Tr mb={"10px"}>
      <Td w={"10vw"}>{new Date(ClockIn).toDateString().replace(/ /, ", ")}</Td>
      <Td w={"10vw"}>{new Date(ClockIn).toLocaleTimeString()}</Td>
      <Td w={"10vw"}>{ClockOut ? new Date(ClockOut).toLocaleTimeString() : ""}</Td>
      <Td w={"10vw"}>Rp.{DaySalary},-</Td>
    </Tr>
  );
};

export default AttendanceLogItem;
