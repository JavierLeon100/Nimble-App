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
import EditChildProfile from "../../modal/editChildProfile";

export default function () {
    const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState("");

    useEffect(()=>{
        signInAsync();
    }, []);

    const signInAsync = async() => {
        console.log("GoogleLoginScreen.js | logged in");
        try {
          const {type, user, accessToken} = await Google.logInAsync({
            iosClientId: "764958274720-1ujopa2nvpaqeop98buflf86avfjfipe.apps.googleusercontent.com",
            androidClientId: "764958274720-3606ifhd3e0vc0obvjnpadgqmer417jm.apps.googleusercontent.com",
          });
    
          if (type == "success") {
            console.log("GoogleLoginScreen.js | log in success! navigating to home screen!");
            setLoggedIn(true);
            setUser(user);

              fetch(`${IP_ADDRESS}/verify`)
              .then((result)=>{
                
                if (result.data.status === 'SUCCESS') {
                  const jwtToken = result.data.userToken.split('.');

                  const userDetail = JSON.parse(atob(jwtToken[1]));
                  
                  localStorage.setItem('token', result.data.userToken);
              }
            })

            .catch((error) => {
              let message = error?.response?.data?.message || error.message;
            }) 
        
         .catch(error=>{
          console.log("GoogleLoginScreen.js | error with login", error);
        
      });
    }


    return (
        loggedIn ?  
        <>
        <MainScreen user={user}/>
     
        </>
        : null 
        
    )
}
