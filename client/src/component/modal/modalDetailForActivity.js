import { Center, FormControl, Heading, HStack, Text, VStack, Input, Stack, Slider, Box, TextArea, ScrollView, Switch, Checkbox, Button, Image, InputGroup } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useRef, useState, useContext, useEffect } from "react";
import { colors } from "../utilis/colors";
import { useForm, Controller } from "react-hook-form";
import { pickImage, takePhoto } from "../utilis/camera/pickAndTakePic";
import { Pressable } from "react-native";
import {TaskToEditContext } from "../screens/TaskScreen";
import { EvilIcons } from '@expo/vector-icons';

export default function ModalDetailForActivity({handleShowModal, setTasks, editTask,  updateTask}){

    const [image, setImage] = useState();
    const [video, setVideo] = useState()
    const [onRecording, setOnRecording] = useState(false)
    const videoRef = useRef(null)

    const [cameraPermission, setCameraPermission] = useState()
    const [recordVideoPermission, setRecordVideoPermission] = useState()
    const [audioPermission, setAudioPermission] = useState()

    const [sliderValue, setSliderValue] = useState(0)
    const [focus, setFocus] = useState(false)
    const [timer, setTimer] = useState(false)
    const [urgent, setUrgent] = useState(false)
    const [childArray, setChildArray] = useState([])
    const childRef = useRef(null)

    useEffect(()=>{
        if(editTask){
            setChildArray(child)
            setSliderValue(rewardPoints)
            setTimer(TimerToEdit)
            setUrgent(urgentToEdit)
            setFocus(focusToEdit)
        }
    },[])

    const { handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues : {
            title : ""
        }
    });

    const {selectedTask, setSelectedTask} = useContext(TaskToEditContext)
    // const selectedTask = selectedTaskArry[0]
    const {
        title, 
        child, 
        date, 
        rewardPoints, 
        notes,
        timer : TimerToEdit, 
        urgent : urgentToEdit,
        focus : focusToEdit} = selectedTask|| ""


    const setPlaceholderForEdit = (editPlaceholder, defaultPlaceholder)=>editTask ? editPlaceholder : defaultPlaceholder

    const generateTaskID = (myStrong)=>{
        let strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
       }


    const onSubmit = data => {
        data.rewardPoints = sliderValue
        data.timer = timer
        data.urgent = urgent
        data.focus = focus
        data.child = childArray
        
        if(editTask){
            data.key = selectedTask.key
            // setSelectedTask(data)
            updateTask(selectedTask.key, data)
            console.log("edittask")
            console.log("form", data)
        } else {
            data.key = generateTaskID()
            console.log(date)
            setTasks((prev)=>[
                ...prev,
                data
            ])          
        }
        handleShowModal(false)
    }

    const sliderOnChange = (v)=>{
            setSliderValue(Math.floor(v))
    }

    const sliderOnChangeEnd = (v)=>{
        setSliderValue(Math.floor(v))
    }

    const handleChildArray = ()=>{
        const {value} = childRef.current
        setChildArray((prev)=>[
            ...prev,
            value
        ])
    }

    return (
    <ScrollView style={{backgroundColor : colors.backGroundModal}}>
        <Center>
            <VStack w="100%">
            <HStack alignItems="center" justifyContent="space-around" mt="60" mb="30">
                <Text onPress={()=>handleShowModal(false)} color="cancelBtnGray">Cancel</Text>
                <Heading size="sm">{editTask ? "Task Detail" : "New Task"}</Heading>
                <Pressable>
                    <Text onPress={handleSubmit(onSubmit)}>Save</Text>
                </Pressable>
            </HStack>

            <Center>
                <FormControl w="80%">
                    <Stack mb="5">
                        <FormControl.Label>
                            <Text fontSize="16" opacity="0.7">Title</Text>
                        </FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <Input p={4} placeholder={setPlaceholderForEdit(title, "Title")} borderRadius="10" 
                            onChangeText={onChange} value={value} bg="white"/>
                        )}
                        name = "title"
                        />
                    </Stack>

                    <VStack mb="5">
                        <Text fontSize="16" opacity="0.7">Assign To</Text>
                        <HStack space="2" mt="2">
                            <Input w="260" ref={childRef}/>
                            <Button onPress={handleChildArray}>Assign</Button>
                        </HStack>
                        {childArray.map((c,i)=><Text key={i} color="black">{c}</Text>)}
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>
                        <Text fontSize="16" opacity="0.7">Date/time</Text>
                        </FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <Input p={4} placeholder={setPlaceholderForEdit(date, "Date/time")}  borderRadius="10" 
                            onChangeText={onChange} value={value} bg="white"/>
                        )}
                        name = "date"
                        />
                    </Stack>

                    <VStack mb="5">
                    <Text fontSize="17" opacity="0.7">Reward Points</Text>
                        <Box mt="3"  borderRadius="10" p="5" bg="white">
                            <Slider size="lg" defaultValue={setPlaceholderForEdit(sliderValue, 0)} onChange={sliderOnChange} onChangeEnd={sliderOnChangeEnd} maxValue={100} >
                            <Slider.Track bg={colors.shades.lightBlueS}>
                                <Slider.FilledTrack bg={colors.secondary} opacity="1"/>
                            </Slider.Track>
                            <Slider.Thumb bg={colors.primary.blue}/>
                            </Slider>
                            <Text textAlign="center">{sliderValue}</Text>
                        </Box>
                        <Text color="cancelBtnGray" opacity="0.4" fontSize="11" mt="2">Required Points</Text>
                    </VStack>

                    <VStack  mb="5">
                    <Text fontSize="17" opacity="0.7">Image</Text>
                    <Center>
                    {image ?   <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="image" borderRadius="10"/> : null}
                    </Center>
                    <HStack justifyContent="space-around" mt="3">
                        {/* <AntDesign name="picture" size={70} color="black" onPress={pickImage}/>
                        <AntDesign name="camera" size={70} color="black" onPress={()=>takePhoto(setAudioPermission,setCameraPermission,setRecordVideoPermission, setImage)}/> */}
                        {/* <SvgUri source={require("../../../assets/picIcons/GalleryIcon.svg")} />
                        <SvgUri source={require("../../../assets/picIcons/CaptureIcon.svg")}/> */}
                        {/* <Image source={require("../../../assets/picIcons/GalleryPng.png")} alt="Gallery" size="sm"/> */}
                        
                            <VStack alignItems="center" bg="white" px="50" py="5" borderRadius="15" >
                                <EvilIcons name="image" size={40} color={colors.primary.blue} onPress={()=>pickImage(setImage)}/>
                                <Text color="primary.blue">Gallery</Text>
                            </VStack>
                        

                        
                            <VStack alignItems="center" bg="white" px="50" py="5"  borderRadius="15">
                                <EvilIcons name="camera" size={40} color={colors.primary.blue}  onPress={()=>takePhoto(setAudioPermission,setCameraPermission,setRecordVideoPermission, setImage)}/>
                                <Text color="primary.blue">Capture</Text>
                            </VStack>
                        
                    </HStack>
                    <Text  color="cancelBtnGray" opacity="0.4" fontSize="11" mt="2">Add an image related to the task</Text>
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>
                            <Text fontSize="17" opacity="0.7">Notes</Text>
                            </FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <TextArea p={2} placeholder={setPlaceholderForEdit(notes, null)} borderRadius="10" height="150" onChangeText={onChange} value={value} bg="white" borderWidth="0"/>
                            
                        )}
                        name = "notes"
                        />
                        <Text color="cancelBtnGray" opacity="0.4" fontSize="11" mt="2">Add instruction, notes or aditional description</Text>
                    </Stack>

                    <VStack mb="5">
                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                            <Text fontSize="16" opacity="0.7">Timer</Text>
                        <Switch  size="lg" onToggle={()=>setTimer(prev=>!prev)} isChecked={timer} onTrackColor="primary.blue" offTrackColor="shades.lightBlueS" onThumbColor="shades.lightBlueS" offThumbColor="shades.lightBlueS"/>
                        </HStack>

                        <HStack  justifyContent="space-between" alignContent="center" mb="4">
                            <Text fontSize="16" opacity="0.7">Urgent</Text>
                        <Switch  size="lg" onToggle={()=>setUrgent(prev=>!prev)} isChecked={urgent} onTrackColor="primary.blue" offTrackColor="shades.lightBlueS" onThumbColor="shades.lightBlueS" offThumbColor="shades.lightBlueS"/>
                        </HStack>

                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                        <Text fontSize="16" opacity="0.7">Focus Mode</Text>
                        <Switch size="lg" onToggle={()=>setFocus(prev=>!prev)} isChecked={focus} onTrackColor="primary.blue" offTrackColor="shades.lightBlueS" onThumbColor="shades.lightBlueS" offThumbColor="shades.lightBlueS"/>
                        </HStack>
                    </VStack>
                    
                    <Center>
                    <Button size="lg" mt="4" mb="60" w="350" borderRadius="90" title="submit" onPress={handleSubmit(onSubmit)} bg="secondary" py="9" _text={
                        {
                            color : "white",
                        }
                    }>
                            Save
                        </Button>
                        </Center>
                </FormControl>
            </Center>
            </VStack>
        </Center>
    </ScrollView>
    )
}