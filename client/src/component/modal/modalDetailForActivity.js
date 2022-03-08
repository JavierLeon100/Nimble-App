import { Center, FormControl, Heading, HStack, Text, VStack, Input, Stack, Slider, Box, TextArea, ScrollView, Switch, Checkbox, Button } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from "react";
import { colors } from "../utilis/colors";
import { Gyroscope } from 'expo-sensors';


export default function ModalDetailForActivity({handleShowModal}){
    const [sliderValue, setSliderValue] = useState(0)
    const [gyroValue, setGyroValue] = useState({
        x : 0,
        y : 0,
        z : 0,
    })
    const {x, y, z} = gyroValue
    const [startGyro, setStartGyro] = useState(false)

    const sliderOnChange = (v)=>{
            setSliderValue(Math.floor(v))
    }

    const sliderOnChangeEnd = (v)=>{
        setSliderValue(Math.floor(v))
    }

    const handleGyro = async()=>{
        // await Gyroscope.isAvailableAsync()
        if(!startGyro){
            Gyroscope.addListener(data=>setGyroValue(data))
        } else {
            Gyroscope.removeAllListeners()
        }
        setStartGyro(prev=>!prev)

    }

    return (
    <ScrollView>
        <Center>
            <VStack w="100%">
            <HStack alignItems="center" justifyContent="space-around" mt="60" mb="30">
                <Text onPress={()=>handleShowModal(false)}>Cancel</Text>
                <Heading>New Task</Heading>
                <Text>Save</Text>
            </HStack>

            <Center>
                <FormControl w="80%">
                    <Stack mb="5">
                        <FormControl.Label>Title</FormControl.Label>
                        <Input p={2} placeholder="Title" borderRadius="10"/>
                    </Stack>

                    <VStack mb="5">
                        <Text>assign to</Text>
                        <HStack space="2">
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        </HStack>
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>Data/time</FormControl.Label>
                        <Input p={2} placeholder="Data/time"  borderRadius="10"/>
                    </Stack>

                    <VStack mb="5">
                        <Text>Assigned Points</Text>
                        <Box bg={colors.gray}  mt="3"  borderRadius="10" p="5">
                            <Slider size="lg" defaultValue={0} onChange={sliderOnChange} onChangeEnd={sliderOnChangeEnd}>
                            <Slider.Track>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb />
                            </Slider>
                            <Text textAlign="center"> {sliderValue}</Text>
                        </Box>
                        <Text mt="2" fontSize="10">Required Points</Text>
                    </VStack>

                    <VStack  mb="5">
                    <Text>Attached Photos/Video</Text>
                    <HStack justifyContent="space-around" mt="3">
                        <AntDesign name="picture" size={70} color="black" />
                        <AntDesign name="picture" size={70} color="black" />
                        <AntDesign name="picture" size={70} color="black" />
                    </HStack>
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>Notes</FormControl.Label>
                        <TextArea p={2} placeholder="Data/time" borderRadius="10" height="150"/>
                    </Stack>

                    <VStack mb="5">
                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                            <Text>Timer</Text>
                        <Switch  size="lg"/>
                        </HStack>

                        <HStack  justifyContent="space-between" alignContent="center" mb="4">
                            <Text>Timer</Text>
                        <Switch  size="lg"/>
                        </HStack>
                    </VStack>

                    <VStack mb="5">
                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                        <Text>Focus Mode</Text>
                        <Switch size="lg" onToggle={handleGyro} isChecked={startGyro} />
                        <Text>{`${x}, ${y}, ${z}`}</Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                        <Text>Recorded Brightness </Text>
                        <Checkbox size="lg" />
                        </HStack>

                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                        <Text>Recorded Device Motion </Text>
                        <Checkbox size="lg" />
                        </HStack>
                    </VStack>

                    <VStack space="6" mb="70">                    
                    <Button p="5" borderRadius="10">Save</Button>
                    <Center>
                    <Button w="80%" p="4" borderRadius="10" onPress={()=>handleShowModal(false)}>Cancel/Delete</Button>
                    </Center>
                    </VStack>
                </FormControl>
            </Center>
            </VStack>
        </Center>
    </ScrollView>
    )
}