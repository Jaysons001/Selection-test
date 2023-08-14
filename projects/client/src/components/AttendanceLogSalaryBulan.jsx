import { Box, Select, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryMonth } from "../redux/historyReducer";

const AttendanceLogSalaryBulan = () => {
  const monthOptions = [
    { id: 1, name: "Januari" },
    { id: 2, name: "Februari" },
    { id: 3, name: "Maret" },
    { id: 4, name: "April" },
    { id: 5, name: "Mei" },
    { id: 6, name: "Juni" },
    { id: 7, name: "Juli" },
    { id: 8, name: "Agustus" },
    { id: 9, name: "September" },
    { id: 10, name: "Oktober" },
    { id: 11, name: "November" },
    { id: 12, name: "Desember" },
  ];
  const dispatch = useDispatch();
  const { salaryMonth } = useSelector((state) => state.historyreducer);
  const [month, setMonth] = useState(salaryMonth?.month);

  const handlemonthselect = (e) => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    dispatch(getSalaryMonth({ month }));
  }, [month]);

  if (!salaryMonth)
    return (
      <Box my={"16"}>
        Kamu tidak bekerja bulan ini
        <Select textAlign={"center"} width={"5vw"} colorScheme={"facebook"} onChange={handlemonthselect}>
          {monthOptions.map((month) => (
            <option key={month.id} value={month.id} selected={month.id === salaryMonth?.month}>
              {month.name}
            </option>
          ))}
        </Select>
      </Box>
    );

  return (
    <Box my={"16"}>
      <StatGroup>
        <Stat>
          <StatLabel>Bulan</StatLabel>
          <StatNumber>
            <Select textAlign={"center"} width={"5vw"} colorScheme={"facebook"} onChange={handlemonthselect}>
              {monthOptions.map((month) => (
                <option key={month.id} value={month.id - 1} selected={month.id === salaryMonth?.month}>
                  {month.name}
                </option>
              ))}
            </Select>
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Gaji</StatLabel>
          <StatNumber>Rp.{salaryMonth?.totalDaySalary},-</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Banyak Kerja</StatLabel>
          <StatNumber>{salaryMonth?.isDoneCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Banyak Gaji Terpotong</StatLabel>
          <StatNumber>{salaryMonth?.banyakGajiTerpotong}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Gaji yang Terpotong</StatLabel>
          <StatNumber>Rp.{salaryMonth?.GajiTerpotong},-</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default AttendanceLogSalaryBulan;
