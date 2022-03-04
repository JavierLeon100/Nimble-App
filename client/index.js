import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Avatar, Pressable, Stack} from "native-base";
import { useState } from "react";
import { Modal } from "react-native";
import { Text, View } from 'react-native';
import EditParentProfile from "./src/component/modal/editParentProfile";
import ActivityScreen from "./src/component/screens/ActivityScreen";
import RewardScreen from "./src/component/screens/RewardScreen";
import TaskScreen from './src/component/screens/TaskScreen'
import EditChildProfile from "./src/component/modal/editChildProfile";




function SettingsScreen() {
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createBottomTabNavigator();
const uriForImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"


export default function(){
  const [editParent, setEditParent] = useState(true)

  const [showModal, setShowModal] = useState(false)


  const options = {
    headerStyle : {
        height : 110,
      },
      headerTitleStyle : {
        fontSize : 20
      },
      headerRight : ()=>{
        return (
          <Pressable onPress={()=>setShowModal(true)}>
            <Avatar source={{
              url : uriForImg
            }} mr='8' />
          </Pressable>
        )
}}

    return (
      <>
        <Tab.Navigator>
        <Tab.Screen name="Tasks" component={TaskScreen} 
        options={options}/>
        <Tab.Screen name="Activity" component={ActivityScreen} options={options}/>
        <Tab.Screen name="Rewards" component={RewardScreen} options={options}/>
        </Tab.Navigator>

        <Modal visible={showModal} presentationStyle="fullScreen" animationType="slide">
          {editParent ?  <EditParentProfile showModal={()=>setShowModal(false)} changeMode={()=>setEditParent(false)}/>
          :
          <EditChildProfile showModal={()=>setShowModal(false)} changeMode={()=>setEditParent(true)}/>}
        </Modal>
      </>
    )
}