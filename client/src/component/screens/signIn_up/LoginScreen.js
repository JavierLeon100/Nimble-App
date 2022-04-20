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
// import * as Google from "expo-google-app-auth";
import { GoogleIdentity } from "expo-google-sign-in";
import GoogleLoginScreen from "../GoogleLoginScreen";
import EditChildProfile from "../../modal/editChildProfile";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();


export default function () {
    const [loggedIn, setLoggedIn] = useState(false);

    const [userName, setUserName] = useState("");

    const client_id='764958274720-1ujopa2nvpaqeop98buflf86avfjfipe.apps.googleusercontent.com';
    const server = `http://${IP_ADDRESS}:4000/graphql`;

    // let login_url=[`https://accounts.google.com/o/oauth2/v2/auth?`
    // `client_id=${client_id}`,
    // `redirect_uri=${server}`,
    // `response_type=code`,
    // `scope=https://www.googleapis.com/auth/userinfo.profile`].join('&');

    useEffect(()=>{
        signInAsync();
    }, []);


    const signInAsync = async() => {
        console.log("GoogleLoginScreen.js | logged in");
        try {
          const {request, response, promptAsync} = Google.useAuthRequest({
            iosClientId: "764958274720-1ujopa2nvpaqeop98buflf86avfjfipe.apps.googleusercontent.com",
            androidClientId: "764958274720-3606ifhd3e0vc0obvjnpadgqmer417jm.apps.googleusercontent.com",
          });

         
            if (response?.type === 'success') {
              const { authentication } = response;
         
            console.log("GoogleLoginScreen.js | log in success! navigating to home screen!");
            setLoggedIn(true);
            

             fetch(`http://${IP_ADDRESS}:4000/graphql/verify`)
              .then((result)=>{
                
                if (result.data.status === 'SUCCESS') {
                  const jwtToken = result.data.userToken.split('.');

                  const userDetail = JSON.parse(atob(jwtToken[1]));

                  setUserName(userDetail.username);

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
