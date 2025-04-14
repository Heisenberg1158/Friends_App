import React, { useEffect } from 'react'
import {Container,Stack,Text} from '@chakra-ui/react'
import UserGrid from './UserGrid'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function Homepage({users, setUsers}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if no token
    }
  }, [navigate]);

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers}/>
      <Container maxW={"1200px"} my={4}>
        <Text
            fontSize={{ base: "3xl", md: "50" }}
            fontWeight={"bold"}
            letterSpacing={"2px"}
            textTransform={"uppercase"}
            textAlign={"center"}
            mb={8}
          >
					<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
						My Friends
					</Text>
					🚀
				</Text>
        <UserGrid users= {users} setUsers= {setUsers}/>
      </Container>
    </Stack>
  )
}

export default Homepage;
