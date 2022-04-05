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
import { UPDATE_TASK } from "../../../GraphQL/Mutations";

export default function (selectedTask, refetch, taskId) {
    const [cameraPermission, setCameraPermission] = useState();
    const [recordVideoPermission, setRecordVideoPermission] = useState();
    const [audioPermission, setAudioPermission] = useState();
    const [image, setImage] = useState();
    const [photoUploadMode, setPhotoUploadMode] = useState(false);

    // useEffect(()=>{
    //     setPhotoUploadMode(true)
    // }, image)
    const { setShowModal } = useContext(ChildTaskToEditContext);

    const takePhotoFunction = () => {
        takePhoto(
            setAudioPermission,
            setCameraPermission,
            setRecordVideoPermission,
            setImage
        );
    };

    const [updateTask, { data }] = useMutation(UPDATE_TASK);

    const handleCompleteTask = () => {
        updateTask({
            variables: {
                task: {
                    status: "completed",
                    img: "image",
                },
                id: taskId,
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
                        source={{ uri: image }}
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
