import {
    Button,
    Center,
    Heading,
    HStack,
    ScrollView,
    Text,
    View,
    VStack,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import SvgUri from "react-native-svg-uri-updated";
import { ChildTaskToEditContext } from "../../screens/childScreens/ChildTaskScreen";
import { colors } from "../../utilis/colors";
import { handleGyro } from "../../utilis/gyrocope/setGyroscope";
import TakePicScreen from "./TakePicScreen";
import moment from "moment";

export default function () {
    const [doingTask, setDoingTask] = useState(false);
    const [takePicScreen, setTakePicScreen] = useState(false);
    const { setShowModal, selectedTask, setChildTasks } = useContext(
        ChildTaskToEditContext
    );

    const [taskStartDate, setTaskStartDate] = useState();
    const [taskEndDate, setTaskEndDate] = useState();
    const [renderWarning, setRenderWarning] = useState(false);

    const taskTitle = selectedTask.title;
    const taskDate = selectedTask.date;
    const taskPoints = selectedTask.rewardPoints;
    const taskFocus = selectedTask.focusMode;
    const taskId = selectedTask._id;
    const taskNotes = selectedTask.notes;
    const taskImgUrl = selectedTask.img;

    //gyro
    const [gyroValue, setGyroValue] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const { x, y, z } = gyroValue;
    const [startGyro, setStartGyro] = useState(false);

    const startDoingTask = () => {
        // if(taskFocus){
        //     handleGyro(setStartGyro, startGyro, setGyroValue)
        // }

        setTaskStartDate(moment());

        if (taskFocus) {
            handleGyro(setStartGyro, startGyro, setGyroValue);
        }

        setDoingTask(true);
    };

    useEffect(() => {
        if (gyroValue.y * 100 < -70) {
            setRenderWarning(true);
            // alert("a")
        } else {
            setRenderWarning(false);
        }
    }, [gyroValue]);

    const btnRightIcon = (textColor) => (
        <HStack alignItems="center" space={0.5}>
            <Text color={textColor}>+{taskPoints}</Text>
            <SvgUri
                source={require("../../../../assets/rewardIcons/Egg.svg")}
                fill={colors.eggYellow}
            />
        </HStack>
    );

    return takePicScreen ? (
        <TakePicScreen
            selectedTask={selectedTask}
            taskId={taskId}
            taskStartDate={taskStartDate}
            taskEndDate={taskEndDate}
        />
    ) : (
        <ScrollView>
            <ImageBackground
                resizeMode="cover"
                source={{ uri: taskImgUrl }}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    height: 400,
                    width: "100%",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.shades.tintBlue,
                        opacity: 0.7,
                    }}
                >
                    <HStack
                        alignItems="center"
                        justifyContent="space-between"
                        px={9}
                        pt={330}
                    >
                        <HStack alignItems="center" space={2} flex={1}>
                            <Heading color="white">{taskTitle}</Heading>
                            {taskFocus ? (
                                <SvgUri
                                    source={require("../../../../assets/imageForTasks/FocusModeIcon.svg")}
                                />
                            ) : null}
                        </HStack>
                        <Text color="white" fontSize="lg" ml={2}>
                            {taskPoints}
                        </Text>
                        <SvgUri
                            source={require("../../../../assets/rewardIcons/Egg.svg")}
                            fill={colors.eggYellow}
                        />
                    </HStack>
                </View>
            </ImageBackground>

            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                <HStack alignItems="center" space={2} p={4}>
                    <SvgUri
                        source={require("../../../../assets/profileIcons/ProfileIcon.svg")}
                    />
                    <Text fontSize="20">Dad</Text>
                </HStack>
                <Text fontSize={17} color="black" opacity={0.5}>
                    {taskDate}
                </Text>
            </HStack>

            <VStack pl={5} space={1}>
                <Text fontSize={15}>{taskNotes}</Text>
            </VStack>

            {renderWarning ? (
                <Center mt={3}>
                    <Text fontSize={30} color="red">
                        You moved your phone!!
                    </Text>
                </Center>
            ) : null}

            <Center h={160} justifyContent="space-around" mt={20}>
                <Button
                    _text={{ color: "white", fontSize: 17 }}
                    rightIcon={doingTask ? null : btnRightIcon("white")}
                    bg="secondary"
                    colorScheme="indigo"
                    w="80%"
                    borderRadius={40}
                    h="16"
                    onPress={() =>
                        doingTask
                            ? (setTakePicScreen(true), setTaskEndDate(moment()))
                            : startDoingTask()
                    }
                >
                    {doingTask ? "Finish" : "Do It Right Now"}
                </Button>
                <Text> x : {gyroValue.x * 100}</Text>
                <Text> y : {gyroValue.y * 100}</Text>
                <Text> z : {gyroValue.z * 100}</Text>
                {doingTask ? null : (
                    <Button
                        _text={{ color: "secondary", fontSize: 17 }}
                        colorScheme="indigo"
                        w="80%"
                        borderRadius={40}
                        h="16"
                        variant="outline"
                        borderColor="secondary"
                        onPress={() => setShowModal(false)}
                    >
                        Later Today
                    </Button>
                )}
            </Center>
        </ScrollView>
    );
}
