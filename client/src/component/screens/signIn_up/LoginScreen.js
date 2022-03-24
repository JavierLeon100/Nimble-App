import { Heading, Input, Text, VStack, Button, Pressable, Center } from "native-base"
import MainScreen from "../../view/MainScreen"
import {useState} from "react" 

export default function(){
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        !loggedIn ? 
        <Center h={900} >
        <VStack alignItems="center" >
            <Heading fontSize={30}>Log In</Heading>
            <VStack w={300} space={9} mt={24}>
                <Input  placeholder="Email Address" variant="underlined"  isFullWidth="true" size="lg" borderColor="loginFormBlue"/>
                <Input  placeholder="Password" variant="underlined" type="password"  isFullWidth="true" size="lg" borderColor="loginFormBlue" border/>

                <Pressable>
                    <Text underline color="primary.blue">Forget Password?</Text>
                </Pressable>
            </VStack>
            <Button bg="primary.blue" colorScheme='indigo' _text={{color: "white", fontSize : 17}} borderRadius="30" w={300} py={5} mt={100} onPress={()=>setLoggedIn(true)}>
            Log In
            </Button>
            <Text color="loginFormBlue" fontSize="md" mt={8}>Need an account?</Text>
            <Pressable>
                <Text color="black" fontSize="md" mt={2}>Sign up!!!!!!!!</Text>
            </Pressable>
        </VStack>
        </Center>
        : <MainScreen />
    )
}