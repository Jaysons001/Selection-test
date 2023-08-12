import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";

const AttendanceLogItem = ({ item }) => {
  const { ClockIn, ClockOut, isDone } = item;
  const [currentTime, setCurrentTime] = useState(new Date(ClockIn));
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(daysOfWeek[new Date(ClockIn).getDay()]);

  // console.log(currentTime, "ini", currentDayOfWeek);

  return (
    <Box>
      <Flex mb={"10px"}>
        <Text w={"10vw"}>{item?.id}</Text>
      </Flex>
      <Divider />
    </Box>
  );
};

export default AttendanceLogItem;
