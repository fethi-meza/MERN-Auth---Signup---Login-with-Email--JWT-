'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'

export default function Logincard() {
  const [data, setdata] = useState({
    firstName:"",
    lastName :"",
    email:"",
    password :""
  })

const [error ,setError] = useState("");

  

  const handelChange=({currnetTarget : input})=>{

    setdata({...data ,[input.name]:input.value})

  }

const handelSubmit =async (e)=>{
    e.preventDefault()
try {
    const url ="http://localhost:3001/api/usres"
    const {data: res} = await axios.post(url ,data) ;
    localStorage.setItem('token',res.data)
    window.location= '/'
    
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  name='email' placeholder='Email address' value={data.email} onChange={handelChange}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type={setdata ? 'text' : 'password'}  name='password' placeholder='password'  value={data.password} onChange={handelChange}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
              type='submit'
              onSubmit={handelSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

