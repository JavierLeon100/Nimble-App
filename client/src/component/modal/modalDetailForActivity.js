import { Center, FormControl, Heading, HStack, Text, VStack, Input, Stack, Slider, Box, TextArea, ScrollView, Switch, Checkbox, Button, Image, InputGroup } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useRef, useState, useContext, useEffect } from "react";
import { colors } from "../utilis/colors";
import { useForm, Controller } from "react-hook-form";
import { pickImage, takePhoto } from "../utilis/camera/pickAndTakePic";
import { Pressable } from "react-native";
import {TaskToEditContext } from "../screens/TaskScreen";


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
    <ScrollView>
        <Center>
            <VStack w="100%">
            <HStack alignItems="center" justifyContent="space-around" mt="60" mb="30">
                <Text onPress={()=>handleShowModal(false)}>Cancel</Text>
                <Heading>{editTask ? "Task Detail" : "New Task"}</Heading>
                <Pressable>
                    <Text onPress={handleSubmit(onSubmit)}>Save</Text>
                </Pressable>
            </HStack>

            <Center>
                <FormControl w="80%">
                    <Stack mb="5">
                        <FormControl.Label>Title</FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <Input p={2} placeholder={setPlaceholderForEdit(title, "Title")} borderRadius="10" 
                            onChangeText={onChange} value={value}/>
                        )}
                        name = "title"
                        />
                    </Stack>

                    <VStack mb="5">
                        <Text>assign to</Text>
                        <HStack space="2">
                            <Input w="260" ref={childRef}/>
                            <Button onPress={handleChildArray}>Assign</Button>
                        </HStack>
                        {childArray.map((c,i)=><Text key={i} color={colors.black}>{c}</Text>)}
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>Data/time</FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <Input p={2} placeholder={setPlaceholderForEdit(date, "Date/time")}  borderRadius="10" 
                            onChangeText={onChange} value={value}/>
                        )}
                        name = "date"
                        />
                    </Stack>

                    <VStack mb="5">
                        <Text>Assigned Points</Text>
                        <Box bg={colors.gray}  mt="3"  borderRadius="10" p="5">
                            <Slider size="lg" defaultValue={setPlaceholderForEdit(sliderValue, 0)} onChange={sliderOnChange} onChangeEnd={sliderOnChangeEnd} maxValue={100} >
                            <Slider.Track>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb />
                            </Slider>
                            <Text textAlign="center">{sliderValue}</Text>
                        </Box>
                        <Text mt="2" fontSize="10">Required Points</Text>
                    </VStack>

                    <VStack  mb="5">
                    <Text>Image</Text>
                    {image ?   <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="image"/> : null}
                    <HStack justifyContent="space-around" mt="3">
                        <AntDesign name="picture" size={70} color="black" onPress={pickImage}/>
                        <AntDesign name="camera" size={70} color="black" onPress={()=>takePhoto(setAudioPermission,setCameraPermission,setRecordVideoPermission, setImage)}/>
                    </HStack>
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>Notes</FormControl.Label>
                        <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } })=>(
                            <TextArea p={2} placeholder={setPlaceholderForEdit(notes, "Notes")} borderRadius="10" height="150" onChangeText={onChange} value={value}/>
                            
                        )}
                        name = "notes"
                        />
                    </Stack>

                    <VStack mb="5">
                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                            <Text>Timer</Text>
                        <Switch  size="lg" onToggle={()=>setTimer(prev=>!prev)} isChecked={timer} />
                        </HStack>

                        <HStack  justifyContent="space-between" alignContent="center" mb="4">
                            <Text>Urgent</Text>
                        <Switch  size="lg" onToggle={()=>setUrgent(prev=>!prev)} isChecked={urgent}/>
                        </HStack>

                        <HStack justifyContent="space-between" alignContent="center" mb="4">
                        <Text>Focus Mode</Text>
                        <Switch size="lg" onToggle={()=>setFocus(prev=>!prev)} isChecked={focus} />
                        </HStack>
                    </VStack>

                   
                    

                    <VStack space="6" mb="70">                    
                    <Button p="5" borderRadius="10" title="submit" onPress={handleSubmit(onSubmit)}>Save</Button>
                    <Center>
                    <Button w="80%" p="4" borderRadius="10" onPress={()=>handleShowModal(false)} >Cancel/Delete</Button>
                    </Center>
                    </VStack>
                </FormControl>
            </Center>
            </VStack>
        </Center>
    </ScrollView>
    )
}