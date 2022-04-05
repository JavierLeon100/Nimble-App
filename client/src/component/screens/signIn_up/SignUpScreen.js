import { Heading, Input, Text, VStack, Button, Pressable, Center } from "native-base"
import MainScreen from "../../view/MainScreen"
import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { StyleSheet, View, Image} from 'react-native';
import * as Google from 'expo-google-app-auth';
// import Index from "../TaskScreen";

export default function SignUpScreen({navigation}){

    const [signedUp, setSignedUp] = useState(false);

    const signInAsync = async() =>{
        console.log("GoogleLoginScreen.js | logged in");
        try {
          const {type, user} = await Google.logInAsync({
            iosClientId: "764958274720-1ujopa2nvpaqeop98buflf86avfjfipe.apps.googleusercontent.com",
            androidClientId: "764958274720-3606ifhd3e0vc0obvjnpadgqmer417jm.apps.googleusercontent.com",
          });
    
          if (type == "success") {
            //Then you can use Google REST API
            console.log("GoogleLoginScreen.js | log in success! navigating to home screen!");
            navigation.navigate("Index", { user })
          }
        } catch (error) {
          console.log("GoogleLoginScreen.js | error with login", error);
        }
      };
    
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
                   {/* <Text color="black" fontSize="md" mt={2}>Login</Text> */}
                   <Button title="Login with Google" onPress={signInAsync}>Log in with Google</Button>
               </Pressable>
           </VStack>
           </Center>
       ) : <MainScreen />
    )
}