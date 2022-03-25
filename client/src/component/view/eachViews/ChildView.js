import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RewardScreen from "../../screens/RewardScreen";
import {Avatar, Pressable, Stack} from "native-base";
import { colors } from "../../utilis/colors";
import SvgUri from 'react-native-svg-uri-updated';
import ChildTaskScreen from "../../screens/childScreens/ChildTaskScreen";
import { Modal } from "react-native";
import ChildProfileScreenModal from "../../modal/childModal/ChildProfileScreenModal";
import { useState } from "react";

const Tab = createBottomTabNavigator();
const uriForImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const ChildView = ({navigation})=>{
  const [showModal, setShowModal] = useState(false)

  const options = {
    headerStyle : {
        height : 130,
        backgroundColor : colors.secondary,
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
          <SvgUri source={require("../../../../assets/tabBarIcons/ActivityIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
        )
      }
      else if (name === "Rewards") {
        return <SvgUri source={require("../../../../assets/tabBarIcons/RewardIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
      }
     else if (name === "Tasks"){
       return <SvgUri source={require("../../../../assets/tabBarIcons/TaskIcon.svg")} fill={focused ? colors.secondary : colors.primary.blue}/>
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
            <Tab.Navigator screenOptions={optionsForNav} sceneContainerStyle={{backgroundColor : colors.childBackGround}}>
                <Tab.Screen name="Tasks" component={ChildTaskScreen} options={options} />
                <Tab.Screen name="Rewards" component={RewardScreen} options={options}/>
            </Tab.Navigator> 

            <Modal visible={showModal} presentationStyle="fullScreen" animationType="slide">
              <ChildProfileScreenModal setShowModal={setShowModal}/>
            </Modal>
        </>
    )
}

export default ChildView;