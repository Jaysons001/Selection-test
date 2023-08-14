import { Box, Select, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalaryYear } from "../redux/historyReducer";

const AttendanceLogSalaryTahun = () => {
  const dispatch = useDispatch();
  const { salaryYear } = useSelector((state) => state.historyreducer);
  const [year, setYear] = useState(salaryYear?.year);

  useEffect(() => {
    dispatch(getSalaryYear({ year }));
  }, [year]);

  if (!salaryYear) return <Box my={"16"}>Kamu tidak bekerja Tahun ini</Box>;

  return (
    <Box my={"16"}>
      <StatGroup>
        <Stat>
          <StatLabel>Tahun</StatLabel>
          <StatNumber>{salaryYear?.year}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Gaji</StatLabel>
          <StatNumber>Rp.{salaryYear?.totalDaySalary},-</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Banyak Kerja</StatLabel>
          <StatNumber>{salaryYear?.isDoneCount}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Banyak Gaji Terpotong</StatLabel>
          <StatNumber>{salaryYear?.banyakGajiTerpotong}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Gaji yang Terpotong</StatLabel>
          <StatNumber>Rp.{salaryYear?.GajiTerpotong},-</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default AttendanceLogSalaryTahun;
