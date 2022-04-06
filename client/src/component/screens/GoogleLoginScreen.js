// expo install expo-web-browser expo-auth-session expo-random
import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { Heading } from 'native-base';
import TaskScreen from './TaskScreen';

const GoogleLoginScreen = ({ navigation }) => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleLogin, setGoogleLogin] = useState(false);


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
        setGoogleLogin(true);
      }
    } catch (error) {
      console.log("GoogleLoginScreen.js | error with login", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Heading>NIMBLE</Heading>
      <Button title="Login with Google" onPress={signInAsync} />
      { googleLogin ? < TaskScreen />  : null }
    </View>
  );
};

//   return (
//     <KeyboardAvoidingView
//     style={styles.container}
//     behavior="padding">

//       <View style={styles.inputContainer}>
//           <TextInput  placeholder='Email'
//           value={email}
//           onChangeText={text => setEmail(text)}
//           style={styles.input}
//             />

//         <TextInput  placeholder='Password'
//           value={password}
//           onChangeText={text => setPassword(text)}
//           style={styles.input}
//           secureTextEntry
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//         onPress={handleGoogleSignin}
//         style={styles.button} >

//           <Text style={styles.button}>Log in</Text>

//         </TouchableOpacity>

//         <TouchableOpacity
//          onPress={handleSignUp}
//         style={[styles.button, styles.buttonOutline]} >

//           <Text style={styles.buttonOutlineText}>Register</Text>

//         </TouchableOpacity>
//         </View>
//     </KeyboardAvoidingView>
//   )
// }

export default GoogleLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
});
