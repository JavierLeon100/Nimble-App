import { Button, ScrollView, Text } from "native-base";
import { useState } from "react";
import Date from "../layout/Date";
import DefaultForActivity from "../view/activity/defaultForActivity";
import TaskViewForActivity from "../view/activity/taskViewForActivity";


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