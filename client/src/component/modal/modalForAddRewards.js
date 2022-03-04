import { Center, FormControl, Heading, HStack, Text, VStack, Input, Stack, Slider, Box, TextArea, ScrollView, Button, Image} from "native-base";
import { useRef, useState } from "react";
import { colors } from "../utilis/colors";
import * as ImagePicker from 'expo-image-picker';
import RecordVideo from "../layout/recordVideo";
import { Video } from "expo-av";
import { Camera } from "expo-camera";

export default function ModalForAddRewards({handleShowModal}){
    const [image, setImage] = useState();
    const [video, setVideo] = useState()
    const [onRecording, setOnRecording] = useState(false)
    const [stopRec, setStopRec] = useState(false)
    const videoRef = useRef(null)
    const [sliderValue, setSliderValue] = useState(0)

    const [cameraPermission, setCameraPermission] = useState()
    const [recordVideoPermission, setRecordVideoPermission] = useState()
    const [audioPermission, setAudioPermission] = useState()

    const sliderOnChange = (v)=>{
            setSliderValue(Math.floor(v))
    }

    const sliderOnChangeEnd = (v)=>{
        setSliderValue(Math.floor(v))
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        result ? setImage(result.uri) : null
    }

    const takePhoto = async ()=>{
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');

        // const {status} = await ImagePicker.getCameraPermissionsAsync()
        // setCameraPermission(status === 'granted');
        // const s = await ImagePicker.getCameraLibraryAsync().status
        // setRecordVideoPermission(s === "granted")
        const {uri} = await ImagePicker.launchCameraAsync()
        setImage(uri)
        const s = await Camera.requestCameraPermissionsAsync().status
        setRecordVideoPermission(s === "granted")
        const audio = await Camera.requestMicrophonePermissionsAsync().status
        setAudioPermission(audio === "granted")
    }

    const startRecordVideo = async ()=>{
        try {
            const {uri} = await videoRef.current.recordAsync({ quality: '1080p'})
            alert(uri)
            setVideo(uri)
        } catch (error) {
            alert(error)
        } 
    }
    const stopRecordVideo = ()=>{
       
        const stopRec = videoRef.current.stopRecording()
    }

    const closeVideoRecording = ()=>{
        setOnRecording(false)
    }


    return(
        <>
        { onRecording ? <RecordVideo start={startRecordVideo} videoRef={videoRef} stop={stopRecordVideo} close={closeVideoRecording}/> : 
        <ScrollView>
        <Center>
            <VStack w="100%">
            <HStack alignItems="center" justifyContent="space-around" mt="60" mb="30">
                <Text onPress={()=>handleShowModal(false)}>Cancel</Text>
                <Heading>Add Rewards</Heading>
                <Text>Save</Text>
            </HStack>

            <Center>
                <FormControl w="80%">
                    <Stack mb="5">
                        <FormControl.Label>Title</FormControl.Label>
                        <Input p={2} placeholder="Title" p="6" borderRadius="10"/>
                    </Stack>
                    <Stack mb="5">
                        <FormControl.Label>URL/Link</FormControl.Label>
                        <Input p={2} placeholder="URL/Link" p="6" borderRadius="10"/>
                    </Stack>

                    <VStack mb="5">
                        <Text>Points</Text>
                        <Box bg={colors.gray}  mt="3"  borderRadius="10" p="5">
                            <Slider size="lg" defaultValue={0} onChange={sliderOnChange} onChangeEnd={sliderOnChangeEnd} videoRef={videoRef}>
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
                    {image ?   <Image source={{ uri: image }} style={{ width: 200, height: 200 }} alt="image"/> : null}
                    {video ? <Video style={{ width: 200, height: 200 }}
                    source={{uri : video}} useNativeControls resizeMode="contain" 
                    /> : null}
                    <Button onPress={takePhoto} mb="2">take an  image</Button>
                    <Button onPress={()=>setOnRecording(true)} mb="2">record a video</Button>
                    <Button onPress={pickImage}>Pic image</Button>
                    <Button onPress={()=>alert(video)}>see url</Button>
                    </VStack>

                    <Stack mb="5">
                        <FormControl.Label>Notes</FormControl.Label>
                        <TextArea p={2} placeholder="Instruction, Guide, Help..." p="6" borderRadius="10" height="150"/>
                    </Stack>
                    
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
    }
    </>
    )
}