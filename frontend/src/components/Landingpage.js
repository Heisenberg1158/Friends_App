import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Stack,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Landingpage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      minH="100vh"
      bgGradient={useColorModeValue(
        "linear(to-b, teal.50, green.50)",
        "linear(to-b, gray.900, gray.800)"
      )}
      px={4}
    >
      <Center h="100vh">
        <Box
          bg={cardBg}
          rounded="2xl"
          shadow={cardShadow}
          p={8}
          maxW="sm"
          textAlign="center"
        >
          <Heading size="lg" mb={2}>
            Welcome
          </Heading>
          <Text fontSize="md" color="gray.500" mb={6}>
            React + Flask Login & Register App
          </Text>
          <Stack spacing={4}>
            <Link to="/login">
              <Button
                w="full"
                colorScheme="teal"
                size="md"
                _hover={{ transform: "scale(1.02)" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                w="full"
                variant="outline"
                colorScheme="teal"
                size="md"
                _hover={{ transform: "scale(1.02)" }}
              >
                Register
              </Button>
            </Link>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
}
