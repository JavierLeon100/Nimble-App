import {
    Center,
    FormControl,
    Heading,
    HStack,
    Text,
    VStack,
    Input,
    Stack,
    Slider,
    Box,
    TextArea,
    ScrollView,
    Button,
    Image,
} from "native-base";
import { useContext, useRef, useState } from "react";
import { colors } from "../utilis/colors";
import * as ImagePicker from "expo-image-picker";
import RecordVideo from "../layout/recordVideo";
import { Video } from "expo-av";
import { Camera } from "expo-camera";
import { pickImage, takePhoto } from "../utilis/camera/pickAndTakePic";
import {
    startRecordVideo,
    stopRecordVideo,
} from "../utilis/camera/recordVideo";
import { useForm, Controller } from "react-hook-form";
import { EvilIcons } from "@expo/vector-icons";
import generateID from "../utilis/generate";
import { childRewardContext } from "../screens/RewardScreen";
import { IP_ADDRESS } from "@env";

export default function ModalForAddRewards({ handleShowModal, setRewards }) {
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [onRecording, setOnRecording] = useState(false);
    const videoRef = useRef(null);

    const [cameraPermission, setCameraPermission] = useState();
    const [recordVideoPermission, setRecordVideoPermission] = useState();
    const [audioPermission, setAudioPermission] = useState();

    const [sliderValue, setSliderValue] = useState(0);
    const [focus, setFocus] = useState(false);
    const [timer, setTimer] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [dateTaken, setDateTaken] = useState();

    const {
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            title: "",
        },
    });

    const { editReward, selectedReward } = useContext(childRewardContext);

    const onSubmit = async (data) => {
        data.cost = sliderValue;
        data.key = generateID();

        const { url } = await fetch(`http://${IP_ADDRESS}:4000/s3Url`).then(
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
        console.log(image);
        console.log(imageUrl);
        data.img = imageUrl;
        setRewards((prev) => [...prev, data]);
        handleShowModal(false);
    };

    const sliderOnChange = (v) => {
        setSliderValue(Math.floor(v));
    };

    const sliderOnChangeEnd = (v) => {
        setSliderValue(Math.floor(v));
    };

    return (
        <>
            {onRecording ? (
                <RecordVideo
                    start={() => startRecordVideo(videoRef, setVideo)}
                    videoRef={videoRef}
                    stop={() => stopRecordVideo(videoRef)}
                    close={() => setOnRecording(false)}
                />
            ) : (
                <ScrollView bg="backGroundModal">
                    <Center>
                        <VStack w="100%">
                            <HStack
                                alignItems="center"
                                justifyContent="space-around"
                                mt="60"
                                mb="30"
                            >
                                <Text
                                    onPress={() => handleShowModal(false)}
                                    color="cancelBtnGray"
                                >
                                    Cancel
                                </Text>
                                <Heading size="sm">Add Rewards</Heading>
                                <Text onPress={handleSubmit(onSubmit)}>
                                    Save
                                </Text>
                            </HStack>

                            <Center>
                                <FormControl w="80%">
                                    <Stack mb="5">
                                        <FormControl.Label
                                            fontSize="16"
                                            opacity="0.7"
                                        >
                                            Title
                                        </FormControl.Label>
                                        <Controller
                                            control={control}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <Input
                                                    p={4}
                                                    placeholder="title"
                                                    borderRadius="10"
                                                    onChangeText={onChange}
                                                    value={value}
                                                    bg="white"
                                                />
                                            )}
                                            name="title"
                                        />
                                    </Stack>

                                    <VStack mb="5">
                                        <Text fontSize="16" opacity="0.7">
                                            Points
                                        </Text>
                                        <Box
                                            mt="3"
                                            borderRadius="10"
                                            p="5"
                                            bg="white"
                                        >
                                            <Slider
                                                size="lg"
                                                defaultValue={0}
                                                onChange={sliderOnChange}
                                                onChangeEnd={sliderOnChangeEnd}
                                                videoRef={videoRef}
                                                maxValue={100}
                                            >
                                                <Slider.Track bg="shades.lightBlueS">
                                                    <Slider.FilledTrack
                                                        bg="secondary"
                                                        opacity="1"
                                                    />
                                                </Slider.Track>
                                                <Slider.Thumb bg="primary.blue" />
                                            </Slider>
                                            <Text textAlign="center">
                                                {" "}
                                                {sliderValue}
                                            </Text>
                                        </Box>
                                        <Text
                                            mt="2"
                                            color="cancelBtnGray"
                                            opacity="0.4"
                                            fontSize="11"
                                        >
                                            Required Points
                                        </Text>
                                    </VStack>

                                    <VStack mb="5">
                                        <Text fontSize="16" opacity="0.7">
                                            Attached Photos/Video
                                        </Text>
                                        <Center>
                                            {image ? (
                                                <Image
                                                    source={{ uri: image.uri }}
                                                    style={{
                                                        width: 200,
                                                        height: 200,
                                                    }}
                                                    alt="image"
                                                    borderRadius="10"
                                                />
                                            ) : null}
                                        </Center>
                                        <HStack
                                            justifyContent="space-around"
                                            mt="3"
                                        >
                                            <VStack
                                                alignItems="center"
                                                bg="white"
                                                px="50"
                                                py="5"
                                                borderRadius="15"
                                            >
                                                <EvilIcons
                                                    name="image"
                                                    size={40}
                                                    color={colors.primary.blue}
                                                    onPress={() =>
                                                        pickImage(setImage)
                                                    }
                                                />
                                                <Text color="primary.blue">
                                                    Gallery
                                                </Text>
                                            </VStack>

                                            <VStack
                                                alignItems="center"
                                                bg="white"
                                                px="50"
                                                py="5"
                                                borderRadius="15"
                                            >
                                                <EvilIcons
                                                    name="camera"
                                                    size={40}
                                                    color={colors.primary.blue}
                                                    onPress={() =>
                                                        takePhoto(
                                                            setAudioPermission,
                                                            setCameraPermission,
                                                            setRecordVideoPermission,
                                                            setImage,
                                                            setDateTaken
                                                        )
                                                    }
                                                />
                                                <Text color="primary.blue">
                                                    Capture
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </VStack>

                                    <Stack mb="5">
                                        <FormControl.Label
                                            fontSize="16"
                                            opacity="0.7"
                                        >
                                            URL/Link
                                        </FormControl.Label>
                                        <Controller
                                            control={control}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <Input
                                                    p={4}
                                                    placeholder={"URL/Link"}
                                                    borderRadius="10"
                                                    onChangeText={onChange}
                                                    value={value}
                                                    bg="white"
                                                />
                                            )}
                                            name="url"
                                        />
                                    </Stack>

                                    <Stack mb="5">
                                        <FormControl.Label>
                                            <Text fontSize="17" opacity="0.7">
                                                Notes
                                            </Text>
                                        </FormControl.Label>
                                        <Controller
                                            control={control}
                                            render={({
                                                field: {
                                                    onChange,
                                                    onBlur,
                                                    value,
                                                },
                                            }) => (
                                                <TextArea
                                                    p={2}
                                                    placeholder="notes"
                                                    borderRadius="10"
                                                    height="150"
                                                    onChangeText={onChange}
                                                    value={value}
                                                    bg="white"
                                                    borderWidth="0"
                                                />
                                            )}
                                            name="notes"
                                        />
                                        <Text
                                            color="cancelBtnGray"
                                            opacity="0.4"
                                            fontSize="11"
                                            mt="2"
                                        >
                                            Add instruction, notes or aditional
                                            description
                                        </Text>
                                    </Stack>

                                    <Center>
                                        <Button
                                            size="lg"
                                            mt="3"
                                            mb="60"
                                            w="350"
                                            borderRadius="90"
                                            title="submit"
                                            onPress={handleSubmit(onSubmit)}
                                            bg="secondary"
                                            py="5"
                                            _text={{
                                                color: "white",
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Center>
                                </FormControl>
                            </Center>
                        </VStack>
                    </Center>
                </ScrollView>
            )}
        </>
    );
}
