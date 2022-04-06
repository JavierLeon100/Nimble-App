import {
    Heading,
    Input,
    Text,
    VStack,
    Button,
    Pressable,
    Center,
} from "native-base";
import MainScreen from "../../view/MainScreen";
import { useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import { GoogleIdentity } from "expo-google-sign-in";
import GoogleLoginScreen from "../GoogleLoginScreen";

export default function () {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        signInAsync();
    }, []);

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
            // navigation.navigate("TaskScreen", { user })
            setLoggedIn(true);
          }
        } catch (error) {
          console.log("GoogleLoginScreen.js | error with login", error);
        }
      };

    //   signInAsync();
      

    return (
        loggedIn ?  <MainScreen /> : null 
    )
}
