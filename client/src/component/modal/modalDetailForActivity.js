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
    Switch,
    Checkbox,
    Button,
    Image,
    InputGroup,
    Select,
    CheckIcon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState, useContext, useEffect } from "react";
import { colors } from "../utilis/colors";
import { useForm, Controller } from "react-hook-form";
import { pickImage, takePhoto } from "../utilis/camera/pickAndTakePic";
import { Platform, Pressable } from "react-native";
import { TaskToEditContext } from "../screens/TaskScreen";
import { EvilIcons } from "@expo/vector-icons";
import generateID from "../utilis/generate";
import { GET_ALL_TASKS, GET_CHILDREN } from "../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { FlatGrid } from "react-native-super-grid";
import SvgUri from "react-native-svg-uri-updated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CREATE_TASK } from "../../GraphQL/Mutations";
import dayjs from "dayjs";
import { monthName } from "../utilis/dateFormat";
import SelectBox from "react-native-multi-selectbox";
import RNPickerSelect from "react-native-picker-select";
import { IP_ADDRESS } from "@env";

export default function ModalDetailForActivity({
    handleShowModal,
    setTasks,
    editTask,
    updateTask,
    refetch,
}) {
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    const [onRecording, setOnRecording] = useState(false);
    const videoRef = useRef(null);

    const [cameraPermission, setCameraPermission] = useState();
    const [recordVideoPermission, setRecordVideoPermission] = useState();
    const [audioPermission, setAudioPermission] = useState();
    const [childId, setChildId] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [focus, setFocus] = useState(false);
    const [timer, setTimer] = useState(false);
    const [urgent, setUrgent] = useState(false);
    const [childArray, setChildArray] = useState([]);
    const [selectedChildArray, setselectedChildArray] = useState([]);
    const childRef = useRef(null);
    const [dateTaken, setDateTaken] = useState();

    //Date Picker
    const [datePicker, setDatePicker] = useState(new Date());
    const [timePicker, setTimePicker] = useState(new Date());
    const [dateShow, setDateShow] = useState(false);
    const [userDate, setUserDate] = useState();
    const [timeShow, setTimeShow] = useState(false);
    const [userTime, setUserTime] = useState();

    useEffect(() => {
        if (editTask) {
            setChildArray(child);
            setSliderValue(rewardPoints);
            setTimer(TimerToEdit);
            setUrgent(urgentToEdit);
            setFocus(focusToEdit);
        }
    }, []);

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

    const { selectedTask, setSelectedTask } = useContext(TaskToEditContext);
    // const selectedTask = selectedTaskArry[0]
    const {
        title,
        child,
        date,
        rewardPoints,
        notes,
        timer: TimerToEdit,
        urgent: urgentToEdit,
        focus: focusToEdit,
    } = selectedTask || "";

    const setPlaceholderForEdit = (editPlaceholder, defaultPlaceholder) =>
        editTask ? editPlaceholder : defaultPlaceholder;

    //Add Task to BD
    const [createTask, { data }] = useMutation(CREATE_TASK);

    const onSubmit = async (data) => {
        const { title } = data;
        const { notes } = data;

        const taskDate = moment(
            userDate + " " + userTime,
            "DD/MM/YYYY HH:mm:ss"
        );

        const task = {};
        task.title = title;
        task.notes = notes;
        task.homeId = "622ab00bfe4e52d96b61a960";
        task.childId = childId;
        task.status = "new";
        task.focusMode = focus;
        task.urgent = urgent;
        task.rewardPoints = sliderValue;
        task.date = taskDate.format("dd MM YYYY [|] HH:mm");
        // alert(task.date)

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
        task.img = imageUrl;
        createTask({
            variables: { task },
        });

        // if (editTask) {
        //     data.key = selectedTask.key;
        //     // setSelectedTask(data)
        //     updateTask(selectedTask.key, data);
        //     console.log("edittask");
        //     console.log("form", data);
        // } else {
        //     data.key = generateID();
        //     console.log(date);
        //     setTasks((prev) => [...prev, data]);
        // }

        refetch();
        handleShowModal(false);
    };

    const sliderOnChange = (v) => {
        setSliderValue(Math.floor(v));
    };

    const sliderOnChangeEnd = (v) => {
        setSliderValue(Math.floor(v));
    };

    const handleChildArray = () => {
        const { value } = childRef.current;
        setChildArray((prev) => [...prev, { name: value, _id: value }]);
    };

    const {
        error: childError,
        loading: childLoading,
        data: childData,
    } = useQuery(GET_CHILDREN, {
        variables: {
            //replace with homeIdVariable from auth
            homeId: "622ab00bfe4e52d96b61a960",
        },
    });

    useEffect(() => {
        childData ? setChildArray(childData.getChildren) : null;
    }, [childData]);

    // const handleOnPressChild = (childId) => {
    //     console.log("change kid to", childId);
    //     setChildId(childId);
    //     console.log("change kid to", childId);
    // };

    const onDateChange = (event, date) => {
        const newDate =
            date.getDate() +
            " " +
            monthName[date.getMonth()] +
            " " +
            date.getFullYear();

        setUserDate(newDate);
        setDatePicker(date);
        setDateShow(false);
        // console.log(userDate);
    };

    const onTimeChange = (e, selectedTime) => {
        const newTime =
            selectedTime.getHours() + ":" + selectedTime.getMinutes() + " ";
        // alert(newTime)
        setUserTime(newTime);
        setTimePicker(selectedTime);
    };

    const showDateMode = () => {
        setDateShow(true);
        // setDateMode(currentMode);
    };

    const showTimeMode = () => {
        setTimeShow(true);
        // setDateMode(currentMode);
    };

    return (
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
                        <Heading size="sm">
                            {editTask ? "Task Detail" : "New Task"}
                        </Heading>
                        <Pressable>
                            <Text onPress={handleSubmit(onSubmit)}>Save</Text>
                        </Pressable>
                    </HStack>

                    <Center>
                        <FormControl w="80%">
                            <Stack mb="5">
                                <FormControl.Label>
                                    <Text fontSize="16" opacity="0.7">
                                        Title
                                    </Text>
                                </FormControl.Label>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <Input
                                            p={4}
                                            placeholder={setPlaceholderForEdit(
                                                title,
                                                "Title"
                                            )}
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
                                    Assign To:
                                </Text>
                                <HStack
                                    space={5}
                                    flexWrap="wrap"
                                    ml={8}
                                    justifyContent="space-between"
                                >
                                    {childArray
                                        ? childArray.map((child) => (
                                              <Pressable
                                                  onPress={() =>
                                                      setChildId(child._id)
                                                  }
                                              >
                                                  <HStack
                                                      alignItems="center"
                                                      space={2}
                                                      mt={3}
                                                  >
                                                      <SvgUri
                                                          source={require("../../../assets/slothFacesSvg/sloth10.svg")}
                                                          width={40}
                                                          height={40}
                                                      />
                                                      <Text
                                                          underline={
                                                              child._id ==
                                                              childId
                                                          }
                                                      >
                                                          {child.name}
                                                      </Text>
                                                  </HStack>
                                              </Pressable>
                                          ))
                                        : null}
                                </HStack>
                            </VStack>
                            <Stack mb="5">
                                <Text fontSize="16" opacity="0.7">
                                    Date
                                </Text>
                                {dateShow ? (
                                    <Center>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={datePicker}
                                            onChange={onDateChange}
                                            style={{
                                                width: 100,
                                            }}
                                        />
                                    </Center>
                                ) : (
                                    <Button
                                        mt={2}
                                        p={4}
                                        borderRadius="10"
                                        bg="white"
                                        onPress={() => showDateMode()}
                                    >
                                        <Text color="gray.500" opacity="0.7">
                                            {!userDate ? "Date" : userDate}
                                        </Text>
                                    </Button>
                                )}

                                <Text mt={3} fontSize="16" opacity="0.7">
                                    Time
                                </Text>

                                {timeShow ? (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={timePicker}
                                        mode="time"
                                        is24Hour={true}
                                        onChange={onTimeChange}
                                        style={{
                                            width: 200,
                                        }}
                                    />
                                ) : (
                                    <Button
                                        mt={2}
                                        p={4}
                                        borderRadius="10"
                                        bg="white"
                                        onPress={() => showTimeMode()}
                                    >
                                        <Text color="gray.500" opacity="0.7">
                                            Time
                                        </Text>
                                    </Button>
                                )}
                            </Stack>

                            <VStack mb="5">
                                <Text fontSize="17" opacity="0.7">
                                    Reward Points
                                </Text>
                                <Box mt="3" borderRadius="10" p="5" bg="white">
                                    <Slider
                                        size="lg"
                                        defaultValue={setPlaceholderForEdit(
                                            sliderValue,
                                            0
                                        )}
                                        onChange={sliderOnChange}
                                        onChangeEnd={sliderOnChangeEnd}
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
                                        {sliderValue}
                                    </Text>
                                </Box>
                                <Text
                                    color="cancelBtnGray"
                                    opacity="0.4"
                                    fontSize="11"
                                    mt="2"
                                >
                                    Required Points
                                </Text>
                            </VStack>

                            <VStack mb="5">
                                <Text fontSize="17" opacity="0.7">
                                    Image
                                </Text>
                                <Center>
                                    {image ? (
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={{ width: 200, height: 200 }}
                                            alt="image"
                                            borderRadius="10"
                                        />
                                    ) : null}
                                </Center>
                                <HStack justifyContent="space-around" mt="3">
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
                                            onPress={() => pickImage(setImage)}
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
                                <Text
                                    color="cancelBtnGray"
                                    opacity="0.4"
                                    fontSize="11"
                                    mt="2"
                                >
                                    Add an image related to the task
                                </Text>
                            </VStack>

                            <Stack mb="5">
                                <FormControl.Label>
                                    <Text fontSize="17" opacity="0.7">
                                        Notes
                                    </Text>
                                </FormControl.Label>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, onBlur, value },
                                    }) => (
                                        <TextArea
                                            p={2}
                                            placeholder={setPlaceholderForEdit(
                                                notes,
                                                null
                                            )}
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
                                    Add instruction, notes or additional
                                    description
                                </Text>
                            </Stack>

                            <VStack mb="5">
                                <HStack
                                    justifyContent="space-between"
                                    alignContent="center"
                                    mb="4"
                                >
                                    <Text fontSize="16" opacity="0.7">
                                        Timer
                                    </Text>
                                    <Switch
                                        size="lg"
                                        onToggle={() =>
                                            setTimer((prev) => !prev)
                                        }
                                        isChecked={timer}
                                        onTrackColor="primary.blue"
                                        offTrackColor="shades.lightBlueS"
                                        onThumbColor="shades.lightBlueS"
                                        offThumbColor="shades.lightBlueS"
                                    />
                                </HStack>

                                <HStack
                                    justifyContent="space-between"
                                    alignContent="center"
                                    mb="4"
                                >
                                    <Text fontSize="16" opacity="0.7">
                                        Urgent
                                    </Text>
                                    <Switch
                                        size="lg"
                                        onToggle={() =>
                                            setUrgent((prev) => !prev)
                                        }
                                        isChecked={urgent}
                                        onTrackColor="primary.blue"
                                        offTrackColor="shades.lightBlueS"
                                        onThumbColor="shades.lightBlueS"
                                        offThumbColor="shades.lightBlueS"
                                    />
                                </HStack>

                                <HStack
                                    justifyContent="space-between"
                                    alignContent="center"
                                    mb="4"
                                >
                                    <Text fontSize="16" opacity="0.7">
                                        Focus Mode
                                    </Text>
                                    <Switch
                                        size="lg"
                                        onToggle={() =>
                                            setFocus((prev) => !prev)
                                        }
                                        isChecked={focus}
                                        onTrackColor="primary.blue"
                                        offTrackColor="shades.lightBlueS"
                                        onThumbColor="shades.lightBlueS"
                                        offThumbColor="shades.lightBlueS"
                                    />
                                </HStack>
                            </VStack>

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
    );
}
