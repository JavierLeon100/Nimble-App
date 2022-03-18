import { HStack, Text, Center, Button, VStack} from "native-base"
import {colors} from "../../utilis/colors"
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons';
import { Dimensions, Platform} from 'react-native';
import Animated, { event, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function EachTask ({data, handleShowModal, i,}) {
        // const openButton =  <Center bg={colors.black} borderRadius="15" position="absolute" top="0" w="80%"
        //                     px="6" py="9" alignItems="flex-end">
        //                     <Text color="white">Open</Text>
        //                     </Center> 

        // const translateX = useSharedValue(0)
        // const {width : screenWidth} = Dimensions.get("window")
        // const XThreshold = screenWidth * .3

        // const panGesture = useAnimatedGestureHandler({
        //     onActive : event=>{
        //         if(event.translationX > 0){
        //             event.translationX = 0
        //         } else {
        //             translateX.value = event.translationX
        //         }
        //     },
        //     onEnd : event=>{
        //         if(event.translationX > 0){
        //             null
        //         } else if(translateX.value < XThreshold){
        //             runOnJS(handleShowModal)(true)
        //         }
        //         translateX.value = withTiming(0)
        //     }
        // })

        // const animatedStyle = useAnimatedStyle(()=>(
        //     {
        //         transform : [{
        //             translateX : translateX.value
        //         }]
        //     }
        // ))
        console.log(data)

    const mainTaskView = 
                        <HStack bg={colors.gray}  px="6" py="5" borderRadius="15">   
                            <VStack>           
                                <Text fontSize="19">{data.title}</Text> 
                                <Text fontSize="11" mt="2">Due: Wed Jan 26 2022 | 12:00 PM  | 1 Hour</Text>
                            </VStack> 
                            <HStack space="3" maxW="2">
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />   
                            </HStack>                
                        </HStack>


    return (
        
        <Center mb={3} key={i} position="relative">
            {mainTaskView}
        </Center>
    
        
    )
}

