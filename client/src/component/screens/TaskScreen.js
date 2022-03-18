import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import Date from "../layout/Date";
import EachTask from "../listItems/tasks/EachTasks";
import {Modal, Platform, Pressable} from "react-native"
import ModalDetailForActivity from "../modal/modalDetailForActivity";
import { useEffect, useState, useRef } from "react";
import { Button, FlatList, HStack , Text, Center} from "native-base";
import ChildsProfileScreen from "./ChildsProfileScreeen";
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors } from "../utilis/colors";
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

export default function Index({navigation}){
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [editTask, setEditTask] = useState(false)
    const [selectedTaskID, setSelectedTaskID] = useState()
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    // const handleEditMode = ()=>{
    //     setEditTask(true)
    
    // }

    const [childsView, setChildsView] = useState(false);
    const openButton = <HStack justifyContent="flex-end"
                        bg={colors.black} py="9" px="5" borderRadius="16">
                        <Text color="white" >Open</Text>
                        </HStack>

    const taskToEdit = ()=> tasks.filter(task=> task.taskID == selectedTaskID)

    //notification
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(()=>{
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
            Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
            });
    
        return () => {
            Notifications.removeNotificationSubscription(
            notificationListener.current
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    },[])


    return(
        <>
        <AllOrSuggested />
        <Date />
        <Center>
            <SwipeListView 
                data={tasks} 
                renderItem={(data, rowMap)=>
                <Pressable>
                    <EachTask data={data.item} handleShowModal={handleShowModal} />
                </Pressable>}
                renderHiddenItem ={(data, rowMap)=>
                    openButton
                    }
                rightOpenValue={-75}
                onRowDidOpen={(data)=>{setEditTask(true),setShowModal(true), console.log(data)}}
            />
        </Center>
        <PlusButton handleShowModal={handleShowModal} setEditTask={setEditTask}/>

        <Modal visible={showModal} presentationStyle="formSheet" animationType="slide">
            <ModalDetailForActivity handleShowModal={handleShowModal} setTasks={setTasks} editTask={editTask} taskToEdit={taskToEdit[0]}/>
        </Modal>

        <Button 
        title="test notifications"
        position="absolute"
        onPress={async () => {
          try {
            await sendPushNotification(expoPushToken);
            alert(expoPushToken)
          } catch (error) {
            alert(error);
          }
        }}
        >test notification</Button>


        {Platform.OS === "android" ? 
        <Button onPress={()=>{setShowModal(true);}}>test modal view</Button> :
        null}
       
        </>
    )
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
          const { status } = await Notifications.requestPermissionsAsync();
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