import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Landingpage() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={useColorModeValue(
        "linear(to-r, teal.50, green.100)",
        "linear(to-r, gray.900, gray.800)"
      )}
      px={6}
    >
      <Stack spacing={6} align="center" textAlign="center" maxW="lg">
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          color={useColorModeValue("teal.600", "teal.300")}
          lineHeight="shorter"
        >
          Welcome to <Text as="span" color="green.500">Friends App</Text>
        </Heading>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
          Connect, share, and explore — your friends are just one click away.
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
          <Link to="/login">
            <Button
              colorScheme="teal"
              size="lg"
              px={8}
              _hover={{ transform: "scale(1.05)" }}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              colorScheme="teal"
              size="lg"
              px={8}
              _hover={{ transform: "scale(1.05)" }}
            >
              Register
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Flex>
  );
}
