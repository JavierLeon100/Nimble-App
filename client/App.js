import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import Index from "./index";
import ChildsView from "./ChildsView";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="ParentsView" component={Index} />

                    {/* <Index /> */}

                    <Stack.Screen name="ChildsView" component={ChildsView} />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
