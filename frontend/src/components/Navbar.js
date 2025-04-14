import { Box, Button, Container, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../App";
import UpdateAccount from "./UpdateAccount";
function Navbar({setUsers}){
    // the setusers,users from usestate is for friend of respective user 
    // below removeItem(user) is for removing the user(not friend) info from local storage
    const {colorMode ,toggleColorMode} = useColorMode();
    const navigate = useNavigate();
    const toast = useToast();
    const token = localStorage.getItem('token');
    const handleLogout = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/user/logout/`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(token){
        localStorage.removeItem('token'); // Remove JWT token
        localStorage.removeItem('user');  // Remove user info
        axios.defaults.headers.common['Authorization'] = null; // Remove Authorization header
        toast({
            title: 'Logout Successful',
            description: response.data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
        }

        navigate('/login'); // Redirect to login page
      }
      catch (error) {
        console.error(error);
        toast({
          title: 'Logout Failed',
          description: error.response?.data?.error || 'Something went wrong.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    };
    
      
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
        if (!confirmed) return;
      
        try {
          const response = await axios.delete(`${BASE_URL}/user/delete/`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            axios.defaults.headers.common['Authorization'] = null;
          }
      
          toast({
            title: 'Account Deleted',
            description: response.data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
      
          navigate('/login');
        } catch (error) {
          toast({
            title: 'Error',
            description: error.response?.data?.error || 'Failed to delete account.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }
      };
      
  return (
    <Container maxW={"900px"}>
       <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
        <Flex h='16' alignItems={"center"} justifyContent={"space-between"}>
            {/* left side */}
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
                display={{ base: "none", sm: "flex" }}
            >
                <img src='/react.png' alt='React logo' width={50} height={50} />
				<Text fontSize={"40px"}>+</Text>
				<img src='/python.png' alt='Python logo' width={50} height={40} />
				<Text fontSize={"40px"}>=</Text>
                <img src='/explode.png' alt='Explode head' width={45} height={45} />

            </Flex>
            {/* right side */}
            <Flex  gap={3} alignItems={"center"}>
                <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
                                BFFship 🔥
                </Text>
                <Button onClick={toggleColorMode} >
                    {colorMode === "light" ? <IoMoon/> :<LuSun size = {20}/>}
                </Button>
                <CreateUser setUsers={setUsers}/>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical/>}
                        variant="outline"
                        colorScheme="gray"
                    />
                    <MenuList>

                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        <UpdateAccount/>
                        <MenuItem onClick={handleDelete} color="red.500">
                         Delete Account
                        </MenuItem> 
                        
                    </MenuList>
                </Menu>
            </Flex>

        </Flex>
       </Box>
    </Container>
  );

}
export default  Navbar;