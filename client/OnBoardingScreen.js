import Onboarding from 'react-native-onboarding-swiper'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildsView from "./src/component/view/ChildsView";
import { Button, Center, Heading, HStack, Image, Text, VStack, Pressable  } from 'native-base';
import { useState } from "react";
import Index from "./src/component/view/index";
import { colors } from './src/component/utilis/colors';
import AppIntroSlider from 'react-native-app-intro-slider';
import SvgUri from 'react-native-svg-uri-updated';

const Stack = createNativeStackNavigator();

export default function({fontsLoaded}){
    const [isParent, setIsParent] = useState(true)
    const [onSlide, setOnSlide] = useState(false)
    const bgColor = colors.primary.blue
    const doneComponent =  <NavigationContainer>
                            {isParent ? <Index font={fontsLoaded}/> :  <ChildsView />}
                            </NavigationContainer>
    

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
                                <Button bg={!item.heading ? "white" : "secondary"} colorScheme='indigo' _text={{color : !item.heading ? "primary.blue" : "white", fontSize : 17}} borderRadius="30" w={300} py={5} mt={200}>{!item.heading ? "Get Started" : "Sign Up"}</Button>
                                <Text color="white" fontSize="md" mt={8}>Have an account?</Text>
                                <Pressable>
                                    <Text color="accent" fontSize="md" mt={2}>Login</Text>
                                </Pressable>
                            </VStack>
                        </Center>
                        )
                        

    return (
        <NavigationContainer>
            <AppIntroSlider renderItem={renderItem} data={slides} showDoneButton={false} showNextButton={false}/> 
        </NavigationContainer>
    )
}