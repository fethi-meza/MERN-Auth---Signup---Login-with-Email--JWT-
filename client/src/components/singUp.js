'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  showPassword
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const [data, setdata] = useState({
    firstName:"",
    lastName :"",
    email:"",
    password :""
  })

const [error ,setError] = useState("");

  const  Navigate = useNavigate();

  const handelChange=({currnetTarget : input})=>{

    setdata({...data ,[input.name]:input.value})

  }

const handelSubmit =async (e)=>{
    e.preventDefault()
try {
    const url ="http://localhost:3001/api/usres"
    const {data: res} = await axios.post(url ,data) ;
    Navigate("./login.js")
    console.log(res.message)
} catch (error) {
    if (error.response && error.response.status >= 400  && error.response.status <=500 ) {
        setError(error.response.data.message)
    }
}
}

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
           
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name='firstName'  placeholder='firstName' value={data.firstName} onChange={handelChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" name='lastName' placeholder='lastName'  value={data.lastName} onChange={handelChange}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"  name='email' placeholder='Email address' value={data.email} onChange={handelChange}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={setdata ? 'text' : 'password'}  name='password' placeholder='password'  value={data.password} onChange={handelChange}/>
                <InputRightElement h={'full'}>
                  

                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
              type='submit'
              onSubmit={handelSubmit}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to ="./login.js" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
