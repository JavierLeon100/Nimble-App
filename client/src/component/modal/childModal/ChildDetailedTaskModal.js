import { Button, Center, Heading, HStack, ScrollView, Text, VStack } from "native-base"
import { useContext, useState } from "react"
import { ImageBackground } from "react-native"
import SvgUri from "react-native-svg-uri-updated"
import { ChildTaskToEditContext } from "../../screens/childScreens/ChildTaskScreen"
import { colors } from "../../utilis/colors"
import TakePicScreen from "./TakePicScreen"


export default function(){

    const [doingTask, setDoingTask]= useState(false)
    const [takePicScreen, setTakePicScreen] = useState(false)
    const {setShowModal, selectedTask, setChildTasks} = useContext(ChildTaskToEditContext)
    const {title, date, point, focus} = selectedTask

    const btnRightIcon = (textColor)=>(
    <HStack alignItems="center" space={0.5} >
         <Text color={textColor}>+50</Text>
                <SvgUri source={require("../../../../assets/rewardIcons/Egg.svg")} fill={colors.eggYellow}/>
    </HStack>
    )

    


    return(
        takePicScreen ? <TakePicScreen /> : 

            <ScrollView>
            <ImageBackground resizeMode="cover" source={require("../../../../assets/imageForTasks/CleanUpRoom.png")} style={{
                flex: 1,
                justifyContent: "center",
                height : 400,
                width : "100%",
            }}>
                        <HStack alignItems="center" justifyContent="space-between" px={9} pt={330}>
                            <HStack alignItems="center" space={2}>
                                <Heading  color="white">{title}</Heading>
                                {focus ? <SvgUri source={require("../../../../assets/imageForTasks/FocusModeIcon.svg")}/> : null}
                            </HStack>
                            <Text  color="white" fontSize="lg">{point}</Text>
                        </HStack>
            </ImageBackground>

            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                <HStack  alignItems="center" space={2} p={4}>
                    <SvgUri source={require("../../../../assets/profileIcons/ProfileIcon.svg")}/>
                    <Text fontSize="20">Dad</Text>
                </HStack>
                <Text fontSize={17} color="black" opacity={0.5}>{date} </Text>
            </HStack>

            <VStack pl={5} space={1}>
                <Text fontSize={15}>Step 1: Take Out Trash.</Text>
                <Text fontSize={15}>Step 2: Pick Up Dirty Clothes.</Text>
                <Text fontSize={15}>Step 3: Put Away Clean Clothes.</Text>
            </VStack>

                <Center h={160} justifyContent="space-around" mt={20}>
                        <Button _text={{color : "white", fontSize : 17}} rightIcon={doingTask ? null: btnRightIcon("white")} bg="secondary" colorScheme="indigo" w="80%" borderRadius={40} h="16" onPress={()=>
                                doingTask ? 
                                setTakePicScreen(true)
                                : 
                                setDoingTask(true)
                            }>
                            {doingTask ? "Finish" : "Do It Right Now"}
                        </Button>

                        {doingTask ? null : 
                        <Button _text={{color : "secondary", fontSize : 17}} colorScheme="indigo" w="80%" borderRadius={40} h="16" variant="outline" borderColor="secondary" onPress={()=>setShowModal(false)}>
                        Later Today
                        </Button>
                        
                        }
                </Center>
            </ScrollView>
    
    )
}