import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Avatar, Box, Icon, Pressable, Stack} from "native-base";
import { useState } from "react";
import { Modal } from "react-native";
import { Text, View } from 'react-native';
import EditParentProfile from "../modal/editParentProfile";
import ActivityScreen from "../screens/ActivityScreen";
import RewardScreen from "../screens/RewardScreen";
import TaskScreen from '../screens/TaskScreen'
import EditChildProfile from "../modal/editChildProfile";
import { colors } from "../utilis/colors";
import SvgUri from 'react-native-svg-uri-updated';





function SettingsScreen() {
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createBottomTabNavigator();
const uriForImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"


export default function({font}){
  const [editParent, setEditParent] = useState(true)

  const [showModal, setShowModal] = useState(false)


  const options = {
    headerStyle : {
        height : 130,
        backgroundColor : colors.primary.blue,
      },
      headerTitleStyle : {
        fontSize : 25,
        fontFamily : "Quicksand_600SemiBold",
        color : colors.white
      },    
      tabBarLabelStyle: { fontFamily: 'Quicksand_400Regular' },
      headerRight : ()=>{
        return (
          <Pressable onPress={()=>setShowModal(true)}>
            <Avatar source={{
              url : uriForImg
            }} mr='8' />
          </Pressable>
        )
}}



const optionsForNav = ({route})=> ({
  tabBarIcon : ({focused, color, size})=> {
      const {name} = route
      if (name === "Activity"){
        return (    
          <SvgUri source={require("../../../assets/tabBarIcons/ActivityIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
        )
      }
      else if (name === "Rewards") {
        return <SvgUri source={require("../../../assets/tabBarIcons/RewardIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
      }
     else if (name === "Tasks"){
       return <SvgUri source={require("../../../assets/tabBarIcons/TaskIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
     }
  },
  tabBarActiveTintColor : colors.secondary,
  tabBarInactiveTintColor : colors.primary.blue,
  tabBarStyle : {
    height : 100
  }
})

    return (
      <>
        <Tab.Navigator screenOptions={optionsForNav} sceneContainerStyle={{backgroundColor : colors.backGroundLightBlue}}>
        <Tab.Screen name="Activity" component={ActivityScreen} 
        options={options} />
        <Tab.Screen name="Tasks" component={TaskScreen} options={options}/>
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
