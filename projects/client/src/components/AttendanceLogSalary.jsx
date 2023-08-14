import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import AttendanceLogSalaryBulan from "./AttendanceLogSalaryBulan";
import AttendanceLogSalaryTahun from "./AttendanceLogSalaryTahun";

const AttendanceLogSalary = () => {
  return (
    <Tabs isFitted variant="enclosed" isLazy>
      <TabList mb="1em">
        <Tab _selected={{ color: "white", bg: "blue.500" }}>Month</Tab>
        <Tab _selected={{ color: "white", bg: "blue.500" }}>Year</Tab>
      </TabList>
      <TabPanels>
        <TabPanel isLazy>
          <AttendanceLogSalaryBulan />
        </TabPanel>
        <TabPanel isLazy>
          <AttendanceLogSalaryTahun />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AttendanceLogSalary;
