import { Camera } from "expo-camera";
import { Button, Center } from "native-base";
import { useRef } from "react";


export default function RecordVideo({start, stop, close, videoRef}){

    return (
        <>
        <Center > 
        <Camera style={{width : "100%", height : "80%"}}
        ref={videoRef}/>
        <Button onPress={start}>start</Button>
        <Button onPress={stop}>Stop</Button>
        <Button onPress={close}>Close</Button>
        </Center>
        </>
    )
}