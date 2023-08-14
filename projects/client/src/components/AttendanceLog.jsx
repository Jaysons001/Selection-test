import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/historyReducer";
import AttendanceLogItem from "./AttendanceLogItem";
import { Pagination } from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendanceLogSalaryBulan from "./AttendanceLogSalaryBulan";
import AttendanceLogSalaryTahun from "./AttendanceLogSalaryTahun";
import AttendanceLogSalary from "./AttendanceLogSalary";

const AttendanceLog = () => {
  const { history, page } = useSelector((state) => state.historyreducer);
  const { user } = useSelector((state) => state.authreducer);
  const [startDate, setStartDate] = useState(new Date(2023, 7, 10));
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const [index, setIndex] = useState(1);

  useEffect(() => {
    dispatch(getHistory({ index, startDate, endDate }));
  }, [index, startDate, endDate]);

  return (
    <Box>
      <AttendanceLogSalary />

      <Flex justifyContent={"space-evenly"} my={"10px"} width={"100%"}>
        <Box border={"1px solid black"} borderRadius={"md"}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Box>
        <Box border={"1px solid black"} borderRadius={"md"}>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </Box>
      </Flex>
      <Table width={"100%"}>
        <Thead>
          <Tr>
            <Th>Hari/Tanggal</Th>
            <Th>Clock In</Th>
            <Th>Clock Out</Th>
            <Th>Gaji Kamu</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history &&
            history.map((item) => {
              return <AttendanceLogItem key={item.id} item={item} />;
            })}
        </Tbody>
      </Table>
      <Pagination page={page} index={index} setIndex={setIndex} />
    </Box>
  );
};

export default AttendanceLog;
