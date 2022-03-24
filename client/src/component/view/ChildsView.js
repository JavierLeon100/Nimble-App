import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChildsProfileScreen from "../screens/ChildsProfileScreeen";
import ChildsThingsToDoScreen from "../screens/ChildsThingsToDoScreen"; 
import RewardScreen from "../screens/RewardScreen";
import {Avatar, Pressable, Stack} from "native-base";


const Tab = createBottomTabNavigator();
const uriForImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

const ChildsView = ({navigation})=>{

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
                <Tab.Screen name="Profile" component={ChildsProfileScreen} />
                <Tab.Screen name="Things To Do" component={ChildsThingsToDoScreen} options={options} />
                <Tab.Screen name="Rewards" component={RewardScreen} />
            </Tab.Navigator> 
        </>
    )
}

export default ChildsView;