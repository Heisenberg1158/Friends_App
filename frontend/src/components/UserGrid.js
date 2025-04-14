import { Flex, Grid ,Spinner,Text} from "@chakra-ui/react";
import UserCard from "./UserCard";
//import { tr } from "framer-motion/client";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";


const UserGrid = ({users,setUsers}) => {
  const [isLoading,setIsLoading] = useState(true);
  useEffect(()=>{
     const getUsers = async()=>{
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(BASE_URL + "/api/friends/",{
          method: "GET",
          headers: {
            "Authorization": "Bearer " + token 
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();  //it converts the json response to javascript object .
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  },[setUsers]);

  useEffect(()=>{
    console.log(users);
  },[users]);

  return (
    <>
      {isLoading && (
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Spinner size="xl" />
        </Flex>
      )}

      {!isLoading && users.length === 0 && (

        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Text fontSize={"xl"}>
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Poor you! 🥺
						</Text>
						No friends found.Add some friends to see them here.
					</Text>
        </Flex>
      )}

      <Grid
      templateColumns={{
        base:"1fr",
        md:"repeat(2,1fr)",
        lg:"repeat(3,1fr)",
      }}  gap={4}>

      {users.map((user)=>(
          <UserCard key = {user.id} user = {user} setUsers = {setUsers}/>
      ))}

      </Grid >
    </>
  )
}

export default UserGrid;
