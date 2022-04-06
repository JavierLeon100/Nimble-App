import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import Date from "../layout/Date";
import EachTask from "../listItems/tasks/EachTasks";
import { Platform, Animated, Dimensions, Modal, View } from "react-native";
import ModalDetailForActivity from "../modal/modalDetailForActivity";
import { useEffect, useState, useRef, createContext } from "react";
import {
    Button,
    FlatList,
    HStack,
    Text,
    Center,
    Box,
    Pressable,
    Modal as ModalN,
    Icon,
    Select,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { colors } from "../utilis/colors";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import DeleteModal from "../modal/deleteModal";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_ALL_TASKS } from "../../GraphQL/Queries";
import { SuggestedTasksData } from "../utilis/SuggestedTaskData";
import EmptyActivityScreen from "./EmptyActivityScreen";
import LottieView from "lottie-react-native";

import { find } from "lodash";
import { DELETE_TASK } from "../../GraphQL/Mutations";
import ModalApproveTask from "../modal/ModalApproveTask";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const TaskToEditContext = createContext();

export default function({ props, route, navigation }) {
    //   const {user} = route.params
    //   console.log("User from Google", user);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);
    const [idToEdit, setIdToEdit] = useState();
    const [showSuggested, setShowSuggested] = useState(false);
    // const valueForIdContext = editTask
    const handleShowModal = (boo) => {
        boo ? setShowModal(true) : setShowModal(false);
    };
    //Complete tasks
    const [isCompleted, setIsCompleted] = useState(false);

    const openButton = (
        <Pressable onPress={() => setShowDeleteModal(true)}>
            <HStack
                bg="primary.blue"
                py="9"
                px="4"
                borderRadius="16"
                justifyContent="space-between"
            >
                <Text color="white">Delete</Text>
                <Text color="white" ml="100">
                    Open
                </Text>
            </HStack>
        </Pressable>
    );

    const contextValue = {
        selectedTask,
        setSelectedTask,
    };

    const onSwipeValueChange = (swipeData) => {
        const { key } = swipeData;
        if ((swipeData.direction = "left")) {
            if (showSuggested) {
                setSelectedTask(find(SuggestedTasksData, { _id: key }));
            } else {
                setSelectedTask(find(tasks, { _id: key }));

                if (selectedTask.status === "completed") {
                    setIsCompleted(true);
                }
            }
        }
    };

    const updateTask = (id, taskToUpdate) => {
        const index = tasks.findIndex((task) => task.key == id);
        const newTasks = [...tasks];
        newTasks[index] = taskToUpdate;
        console.log("new task", newTasks);
        setTasks(newTasks);
    };

    const [deleteTask] = useMutation(DELETE_TASK);

    const handleDeleteTask = (deleteTaskId) => {
        deleteTask({ variables: { deleteTaskId } });

        refetch();
        setShowDeleteModal(false);
    };

    //swipe to delete animation
    //   const animationIsRunning = useRef(false)
    //   const rowTranslateAnimatedValues = {};
    //   tasks?.forEach((task, i)=>{
    //     rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    //   })
    //   const onSwipeValueChangeDelete = ({key, value}) =>{
    //     if (
    //       value < -Dimensions.get('window').width &&
    //       !animationIsRunning.current
    //     ){
    //     animationIsRunning.current = true;
    //     Animated.timing(rowTranslateAnimatedValues[key], {
    //         toValue: 0,
    //         duration: 200,
    //         useNativeDriver: false,
    //     }).start(() => {
    //         const newData = [...tasks];
    //         const prevIndex = tasks.findIndex(item => item.key === key);
    //         newData.splice(prevIndex, 1);
    //         setTasks(newData);
    //         animationIsRunning.current = false;
    //     });
    // }
    //   }

    //notification
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    //Get Tasks from DB
    const { error, loading, data, refetch } = useQuery(GET_ALL_TASKS, {
        variables: {
            //replace with homeIdVariable from auth
            homeId: "622ab00bfe4e52d96b61a960",
        },
        // pollInterval: 500,
    });

    refetch();

    useEffect(() => {
        if (typeof data !== "undefined") {
            const newTasks = data.getAllTasks.filter(
                (task) => task.status !== "approved"
            );

            setTasks(newTasks);
        }
    }, [data]);

    // const [activityTaskArray, setActivityTaskArray] = useState([]);


    return (
        <>
      
{/* 
        {activityTaskArray ? ()=>navigation.navigate("Activity")
        : */}
{/* <> */}
            <TaskToEditContext.Provider value={contextValue}>
                <AllOrSuggested
                    setShowSuggested={setShowSuggested}
                    showSuggested={showSuggested}
                />
               
                <Date />
                <Center>
                    {showSuggested ? (
                        <SwipeListView
                            data={SuggestedTasksData}
                            keyExtractor={(item) => item._id}
                            renderItem={(data, rowMap) => (
                                <EachTask
                                    data={data.item}
                                    handleShowModal={handleShowModal}
                                    row={rowMap}
                                    noDate={true}
                                />
                            )}
                            renderHiddenItem={(data, rowMap) => openButton}
                            rightOpenValue={-Dimensions.get("window").width}
                            leftOpenValue={75}
                            rightActivationValue={100}
                            leftActionValue={100}
                            onRightAction={() => {
                                setEditTask(true), setShowModal(true);
                            }}
                            onSwipeValueChange={onSwipeValueChange}
                            style={{ marginBottom: 240 }}
                        />
                    ) : (
                        <SwipeListView
                            data={tasks}
                            keyExtractor={(item) => item._id}
                            renderItem={
                                (data, rowMap) => (
                                    <EachTask
                                        data={data.item}
                                        handleShowModal={handleShowModal}
                                        row={rowMap}
                                    />
                                )
                                // </Animated.View>
                            }
                            renderHiddenItem={(data, rowMap) => openButton}
                            rightOpenValue={-Dimensions.get("window").width}
                            leftOpenValue={75}
                            rightActivationValue={100}
                            leftActionValue={100}
                            onRightAction={() => {
                                setEditTask(true), setShowModal(true);
                            }}
                            // onLeftAction={()=>setShowModal(true)}
                            onSwipeValueChange={onSwipeValueChange}
                            style={{ marginBottom: 240 }}
                        />
                    )}
                </Center>
                <PlusButton
                    handleShowModal={handleShowModal}
                    setEditTask={setEditTask}
                />

                {/*modal for new and edit task */}
                <Modal
                    visible={showModal}
                    presentationStyle="formSheet"
                    animationType="slide"
                >
                    {isCompleted ? (
                        <ModalApproveTask
                            handleShowModal={handleShowModal}
                            refetch={refetch}
                            setShowModal={setShowModal}
                        />
                    ) : (
                        <ModalDetailForActivity
                            handleShowModal={handleShowModal}
                            setTasks={setTasks}
                            editTask={editTask}
                            updateTask={updateTask}
                            refetch={refetch}
                        />
                    )}
                </Modal>
            </TaskToEditContext.Provider>

            {/*modal for deleting task */}
            <ModalN isOpen={showDeleteModal} size="lg">
                <DeleteModal
                    setShowDeleteModal={setShowDeleteModal}
                    deleteTask={() => handleDeleteTask(selectedTask._id)}
                />
            </ModalN>

    {/* </>
} */}
        </>
                    
    );
                    
}


async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "Notification working",
        body: " but I'm not sure why",
        data: { someData: "goes here" },
    };

    try {
        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
    } catch (error) {
        console.log(error);
    }
}

async function registerForPushNotificationsAsync() {
    let token;

    try {
        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            // alert(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
    } catch (error) {
        console.log(error);
    }

    return token;
}
