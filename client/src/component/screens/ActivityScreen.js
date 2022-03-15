import { Button, ScrollView, Text } from "native-base";
import { useState, useEffect } from "react";
import Date from "../layout/Date";
import DefaultForActivity from "../view/activity/defaultForActivity";
import TaskViewForActivity from "../view/activity/taskViewForActivity";
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager'


export default function ActivityScreen(){
    const [defaultScreen, setDefaultScreen] = useState(true)

    

    return (
        <>
        <Date  />
        {defaultScreen ? 
        <ScrollView>
            <DefaultForActivity />
        </ScrollView> 
        : 
        <TaskViewForActivity />}
        




        <Button onPress={()=>setDefaultScreen(prev=>!prev)}
        w="20%"
        >test other screen</Button>
        </>
    )
}