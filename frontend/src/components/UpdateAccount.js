import React from 'react'
import { Button, useDisclosure ,Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input,ModalFooter, MenuItem, Stack } from "@chakra-ui/react";
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASE_URL} from '../App';
import axios from 'axios';

const UpdateAccount = () => {
    const {isOpen,onOpen,onClose} = useDisclosure();
    const [isLoading,setLoading] = useState(false);
    const [inputs,setInputs] = useState({
        username: '',
        oldpassword: '',
        newpassword: '',
    }
    );
    const toast = useToast();
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
          const response = await axios.patch(`${BASE_URL}/user/update/`, inputs,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          onClose();
          toast({
            title: 'Account Updated',
            description: response.data.message || "Your account info was updated successfully.",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
          });
          setInputs({
            username: '',
            oldpassword: '',
            newpassword: '',
          }); // clear the input fields
      
        } catch (error) {
          console.error(error);
          toast({
            title: 'Update Failed',
            description: error.response?.data?.error || "Something went wrong.",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
        }finally{
            setLoading(false);
        }
      };
  return (
    <div>
      <MenuItem onClick={onOpen}>Update Account</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <form onSubmit={handleUpdate}>
         <ModalContent>
          <ModalHeader> Update your Username or Password 😙</ModalHeader>
          <ModalCloseButton/>

          <ModalBody pb={6}>
            <Stack spacing={4}>
                <Flex alignItems="center" gap={4}>
                <FormControl>
                    <FormLabel>Enter New Username</FormLabel>
                    <Input
                    placeholder="Username"
                    value={inputs.username}
                    onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    />
                </FormControl>
                </Flex>

                <Flex alignItems="center" gap={4}>
                <FormControl>
                    <FormLabel>Enter Old Password</FormLabel>
                    <Input
                    placeholder="Old"
                    value={inputs.oldpassword}
                    onChange={(e) => setInputs({ ...inputs, oldpassword: e.target.value })}
                    />
                </FormControl>
                </Flex>

                <Flex alignItems="center" gap={4}>
                <FormControl>
                    <FormLabel>Enter New Password</FormLabel>
                    <Input
                    placeholder="New"
                    value={inputs.newpassword}
                    onChange={(e) => setInputs({ ...inputs, newpassword: e.target.value })}
                    />
                </FormControl>
                </Flex>
            </Stack>
</ModalBody>


          <ModalFooter>
           <Button colorScheme='teal' mr ={3} type='submit' isLoading={isLoading}>Update</Button>
           <Button  onClick={onClose}>Cancel</Button>
          </ModalFooter>


         </ModalContent>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateAccount;
