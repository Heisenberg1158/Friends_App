import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";

export default function Landingpage() {
  console.log("Rendering Landingpage");
  return (
    <Center h="70vh">
      <Stack spacing={6} align="center">
        <Text fontSize="2xl" fontWeight="semibold">
        React and Python Flask Login Register
        </Text>
        <Box>
          <Link to="/login">
            <Button size="sm" colorScheme="green" mr={2}>
              Login
            </Button>
          </Link>
          <Text as="span" mx={1} fontSize="lg">|</Text>
          <Link to="/register">
            <Button size="sm" colorScheme="green" ml={2}>
              register
            </Button>
          </Link>
        </Box>
      </Stack>
    </Center>
  );
}
