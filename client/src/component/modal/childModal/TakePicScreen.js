import {
    Center,
    Heading,
    Text,
    Button,
    Image,
    HStack,
    Pressable,
} from "native-base";
import SvgUri from "react-native-svg-uri-updated";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "../../utilis/colors";
import { useContext, useEffect, useState } from "react";
import { takePhoto } from "../../utilis/camera/pickAndTakePic";
import { AntDesign } from "@expo/vector-icons";
import { ChildTaskToEditContext } from "../../screens/childScreens/ChildTaskScreen";
import { useMutation } from "@apollo/client";
import { CREATE_ACTIVITY, UPDATE_TASK } from "../../../GraphQL/Mutations";
import { IP_ADDRESS } from "@env";

export default function () {
    const [cameraPermission, setCameraPermission] = useState();
    const [recordVideoPermission, setRecordVideoPermission] = useState();
    const [audioPermission, setAudioPermission] = useState();
    const [image, setImage] = useState();
    const [photoUploadMode, setPhotoUploadMode] = useState(false);
    const [dateTaken, setDateTaken] = useState();

    // useEffect(()=>{
    //     setPhotoUploadMode(true)
    // }, image)
    const { selectedTask, setShowModal } = useContext(ChildTaskToEditContext);

    const takePhotoFunction = () => {
        takePhoto(
            setAudioPermission,
            setCameraPermission,
            setRecordVideoPermission,
            setImage,
            setDateTaken
        );
    };

    const [updateTask, { data }, error] = useMutation(UPDATE_TASK);
    const [createActivity] = useMutation(CREATE_ACTIVITY);

    const handleCompleteTask = async () => {
        //S3 bucket for img
        //CHANGE IP

        const { url } = await fetch(`http://34.229.169.165:4000/s3Url`).then(
            (res) => res.json()
        );

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpg",
            },
            body: image,
        });

        const imageUrl = url.split("?")[0];

        updateTask({
            variables: {
                updateTaskId: selectedTask._id,
                task: {
                    date: dateTaken,
                    status: "completed",
                    img: imageUrl,
                },
            },
        });

        createActivity({
            variables: {
                activity: {
                    activity: `Task '${selectedTask.title}' needs your Approval `,
                    homeId: selectedTask.homeId,
                },
            },
        });

        setShowModal(false);
    };

    return (
        <Center bg="childBackGround">
            <Heading mt="40" mb="30">
                {image ? "Photo Upload" : "Take a photo"}
            </Heading>

            {image ? (
                <>
                    <Image
                        source={{ uri: image.uri }}
                        style={{ width: 200, height: 200 }}
                        alt="image"
                        borderRadius="10"
                    />
                    <Text mt="10" fontSize={16}>
                        The image uploaded successfully!
                    </Text>
                    <Pressable onPress={() => takePhotoFunction()}>
                        <HStack space={2} mt="10" mb="7">
                            <AntDesign
                                name="reload1"
                                size={24}
                                color={colors.primary.blue}
                            />
                            <Text color="primary.blue" fontSize={16}>
                                Retake
                            </Text>
                        </HStack>
                    </Pressable>
                </>
            ) : (
                <>
                    <EvilIcons
                        name="camera"
                        size={130}
                        color={colors.primary.blue}
                        onPress={() => takePhotoFunction()}
                    />
                    <Text mt="20" fontSize={16}>
                        Don’t need to take a photo?
                    </Text>
                </>
            )}

            <Button
                _text={{ color: "white", fontSize: 17 }}
                colorScheme="indigo"
                w="80%"
                borderRadius={40}
                h="16"
                bg="secondary"
                mt="5"
                onPress={handleCompleteTask}
            >
                Send
            </Button>
        </Center>
    );
}
