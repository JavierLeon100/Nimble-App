import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";


export const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    result ? setImage(result.uri) : null
}


export const takePhoto = async (setRecordVideoPermission, setAudioPermission, setCameraPermission, setImage)=>{
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');

    const {uri} = await ImagePicker.launchCameraAsync()
    setImage(uri)
    const s = await Camera.requestCameraPermissionsAsync().status
    setRecordVideoPermission(s === "granted")
    const audio = await Camera.requestMicrophonePermissionsAsync().status
    setAudioPermission(audio === "granted")
}