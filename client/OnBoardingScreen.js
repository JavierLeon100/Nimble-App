import Onboarding from 'react-native-onboarding-swiper'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ChildsView from "./src/component/view/eachViews/ChildsView";
import { Button, Center, Heading, HStack, Image, Text, VStack, Pressable  } from 'native-base';
import { useState } from "react";
// import Index from "./src/component/view/index";
import { colors } from './src/component/utilis/colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import SvgUri from 'react-native-svg-uri-updated';
import SignUpScreen from './src/component/screens/signIn_up/SignUpScreen';
import GoogleLoginScreen from './src/component/screens/GoogleLoginScreen';
import LoginScreen from './src/component/screens/signIn_up/LoginScreen';

const Stack = createNativeStackNavigator();

export default function({fontsLoaded}){
    const [onSlide, setOnSlide] = useState(true)
    const [isSignUp, setIsSignUp] = useState(true)

    const slides = [
        {
            key: 'one',
            title: 'Nimble',
            image: require("./assets/logo/logo_Smile.svg"),
            },
        {
            key: 'two',
            heading : 'Assign a Task',
            image: require('./assets/logo/logo_Cringe.svg'),
            text : "Assign chores to your kids, to make them responsible and commitment"
        },
        {
            key: 'three',
            heading: 'Define a Reward',
            text: 'Create or find a perfect reward to encourage your kids',
            image: require("./assets/logo/logo_normal.svg"),
        },
        {
            key: 'four',
            heading: 'Make Kids Happy',
            text: 'Motivate your kids to collect more eggs and make them so happy with amazing rewards.',
            image: require("./assets/logo/logo_Smile.svg"),
        }
      ];

      const renderItem = ({item})=>(
                        <Center bg="primary.blue" h={900}>
                            <VStack alignItems="center">
                                <SvgUri source={item.image} height={250} width={250}/>
                                <Heading color="white">{item.heading}</Heading>
                                <Text color="white" w={300} textAlign="center" mt={8}>{item.text}</Text>
                                <Button bg={!item.heading ? "white" : "secondary"} colorScheme='indigo' _text={{color : !item.heading ? "primary.blue" : "white", fontSize : 17}} borderRadius="30" w={300} py={5} mt={200} onPress={()=> {setOnSlide(false)}}>
                                    Login with Google                                </Button>
                                <Text color="white" fontSize="md" mt={8}>Have an account?</Text>
                                
                            </VStack>
                        </Center>
                        )
                        

    return (
        
            onSlide ? <AppIntroSlider renderItem={renderItem} data={slides} showDoneButton={false} showNextButton={false}/> 
            :
          <LoginScreen />
            
            
       
    )
}