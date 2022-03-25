import { Heading, Input, Text, VStack, Button, Pressable, Center } from "native-base"
import { useState } from "react"
import MainScreen from "../../view/MainScreen"


export default function(){

    const [signedUp, setSignedUp] = useState(false)

    return (
       !signedUp ? (
           <Center h={900} >
           <VStack alignItems="center" >
               <Heading fontSize={30}>Sign Up</Heading>
               <VStack w={300} space={9} mt={24}>
                   <Input placeholder="Name" variant="underlined" isFullWidth="true" size="xl" borderColor="loginFormBlue"/>
                   <Input  placeholder="Email Address" variant="underlined"  isFullWidth="true" size="lg" borderColor="loginFormBlue"/>
                   <Input  placeholder="Password" variant="underlined" type="password"  isFullWidth="true" size="lg" borderColor="loginFormBlue" border/>
               </VStack>
               <Button bg="primary.blue" colorScheme='indigo' _text={{color: "white", fontSize : 17}} borderRadius="30" w={300} py={5} mt={100} onPress={()=>setSignedUp(true)}>
               Sign Up
               </Button>
               <Text color="loginFormBlue" fontSize="md" mt={8}>Have an account?</Text>
               <Pressable>
                   <Text color="black" fontSize="md" mt={2}>Login</Text>
               </Pressable>
           </VStack>
           </Center>
       ) : <MainScreen />
    )
}