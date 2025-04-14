import React, { useState, useEffect } from 'react';
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

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Homepage');
    } else {
      // Clean up any stale data
      setUsername('');
      setPassword('');
    }
  }, [navigate]);
  
  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/login/`, { username, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        toast({
          title: 'Login Successful',
          description: response.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        navigate('/Homepage');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      toast({
        title: 'Login Failed',
        description: errorMessage,
        status: 'error',
        duration: 3000,
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
      bgGradient="linear(to-r, blue.600, blue.400)"
      p={6}
    >
      <Stack
        spacing={8}
        direction={{ base: 'column', md: 'row' }}
        maxW="4xl"
        w="full"
        align="center"
        justify="center"
      >
        <Flex flex={1} justify="center" display={{ base: 'none', md: 'flex' }}>
          <Image
            alt="Login illustration"
            objectFit="cover"
            boxSize="400px"
            borderRadius="md"
            src="https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
          />
        </Flex>

        <Box
          p={8}
          borderRadius="lg"
          boxShadow="2xl"
          bg="white"
          flex={1}
          minW={{ base: '100%', md: '400px' }}
        >
          <Stack spacing={4}>
            <Heading fontSize="2xl" textAlign="center" color="gray.700">
              Log Into Your Account
            </Heading>

            <form onSubmit={LoginUser}>
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


                <Flex justify="space-between" align="center">
                  <Checkbox colorScheme="blue">Remember me</Checkbox>
                  <Link color="blue.500" fontSize="sm">
                    Forgot password?
                  </Link>
                </Flex>

                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Login
                </Button>
              </Stack>
            </form>

            <Text fontSize="sm" textAlign="center" mt={4} color="gray.600">
              Don&apos;t have an account?{' '}
              <Link color="blue.500" href="/register">
                Register
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
