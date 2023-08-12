import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../components/Navbar";
import LiveAttendance from "../components/liveAttendance";

export const Home = () => {
  return (
    <Box>
      <Navbar />
      <LiveAttendance />
    </Box>
  );
};

export default Home;
