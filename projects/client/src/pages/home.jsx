import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../components/Navbar";
import LiveAttendance from "../components/liveAttendance";
import { useSelector } from "react-redux";

export const Home = () => {
  const user = useSelector((state) => state.authreducer.user);
  return (
    <Box>
      <Navbar />
      <LiveAttendance user={user} />
    </Box>
  );
};

export default Home;
