
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../App';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL + '/user/signup/', {
        username,
        password,
      });

      toast({
        title: 'User registered successfully',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });

      navigate('/login');
    } catch (error) {
      toast({
        title: 'Failed to register user',
        description: error.response?.data?.error || 'An error occurred.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.100"
      px={4}
    >
      <Stack
        spacing={8}
        direction={{ base: 'column', md: 'row' }}
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="6xl"
        w="100%"
      >
        <Flex flex={1} align="center" justify="center">
          <Image
            alt="Register Illustration"
            objectFit="cover"
            boxSize="100%"
            maxW="400px"
            src="https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg"
          />
        </Flex>

        <Box flex={1}>
          <Heading fontSize="2xl" mb={6} textAlign="center" color="gray.700">
            Create Your Account
          </Heading>
          <form onSubmit={handleRegister}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="gray.600">Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                  color="black"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.600">Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  color="black"
                />
              </FormControl>

              <Checkbox colorScheme="blue">Remember me</Checkbox>

              <Button colorScheme="blue" type="submit" size="lg" mt={4}>
                Register
              </Button>

              <Text textAlign="center" fontSize="sm" color="gray.600">
                Already have an account?{' '}
                <Link color="blue.500" href="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterPage;

