import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

export const pickImage = async (setImage) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    result ? setImage(result.uri) : null;
};

export const takePhoto = async (
    setRecordVideoPermission,
    setAudioPermission,
    setCameraPermission,
    setImage,
    setDateTaken
) => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");

    const result = await ImagePicker.launchCameraAsync({
        base64: true,
        quality: 0,
        exif: true,
    });

    const date = result.exif.DateTimeOriginal;
    const base64 = result.base64;
    setDateTaken(date);
    setImage(base64);
    const s = await Camera.requestCameraPermissionsAsync().status;
    setRecordVideoPermission(s === "granted");
    const audio = await Camera.requestMicrophonePermissionsAsync().status;
    setAudioPermission(audio === "granted");
};
