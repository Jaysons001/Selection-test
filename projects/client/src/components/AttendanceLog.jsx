import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/historyReducer";
import AttendanceLogItem from "./AttendanceLogItem";

const AttendanceLog = () => {

  const { history } = useSelector((state) => state.historyreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <Box>
      {history &&
        history.map((item) => {
          return <AttendanceLogItem key={item.id} item={item} />;
        })}
    </Box>
  );
};

export default AttendanceLog;
