import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AttendanceLogIsWorking = () => {
  const userWork = useSelector((state) => state.historyreducer.userWork);
  const user = useSelector((state) => state.authreducer.user);
  const [bekerja, setBekerja] = useState();

  useEffect(() => {
    if (userWork) {
      setBekerja(<Text color={"green"}>Bekerja</Text>);
    } else setBekerja(<Text color={"red"}>Santai</Text>);
  }, [userWork]);

  return (
    <Box py={10}>
      <Stack>
        <Text>Hi, {user.fullName}</Text>
        <Text>Saat ini kamu sedang</Text>
        <Text>{bekerja}</Text>
      </Stack>
    </Box>
  );
};

export default AttendanceLogIsWorking;
