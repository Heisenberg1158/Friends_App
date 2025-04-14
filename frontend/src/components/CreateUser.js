import React from 'react'
import { Button, useDisclosure ,Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Flex, FormControl, FormLabel, Input, Textarea, Radio, RadioGroup, ModalFooter } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {BASE_URL} from '../App';
const CreateUser = ({setUsers}) => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [isLoading,setLoading] = useState(false);
  const [inputs,setInputs] = useState({
    name: '',
    role: '',
    description: '',
    gender: '',
  });
  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(BASE_URL+"/api/friends/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token, 
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (!response.ok) {
				throw new Error(data.error);
			}

      onClose();
      setUsers((prev) => [...prev, data]);
      toast({
        status: "success",
				title: "Yayy! 🎉",
				description: "Friend created successfully.",
        duration: 2000,
        isClosable: true,
      });
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      }); // clear the input fields

    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      
    }finally{
    setLoading(false);
  }
  };

  return (
    <div>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20}/>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <form onSubmit={handleCreateUser}>
         <ModalContent>
          <ModalHeader> My new Friend 🤦‍♂️</ModalHeader>
          <ModalCloseButton/>

          <ModalBody pb ={6}>
            <Flex alignItems={"center"} gap ={4}>
              {/* left */}
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <Input placeholder='Abhisekh'
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
              </FormControl>
              {/* right */}
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input placeholder='Software Engineer'
                value={inputs.role} 
                onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                />
              </FormControl>
            </Flex>

            <FormControl mt = {4}>
              <FormLabel>Description</FormLabel>
              <Textarea resize={"none"} overflowY={"hidden"} placeholder="I am a software engineer who loves to code and develop things."
              value={inputs.description}
              onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              />
            </FormControl>
            
            <RadioGroup mt={4}>
              <Flex gap={5}>
                <Radio
                 value='male'
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                >Male</Radio>
                <Radio
                 value='female'
                 onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                 >Female</Radio>
              </Flex> 
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
           <Button colorScheme='teal' mr ={3} type='submit' isLoading={isLoading}>Add</Button>
           <Button  onClick={onClose}>Cancel</Button>
          </ModalFooter>


         </ModalContent>
        </form>
      </Modal>
    </div>
  )
}

export default CreateUser
