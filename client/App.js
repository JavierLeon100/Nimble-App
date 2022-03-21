import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import Index from "./index";
import ChildsView from "./ChildsView";
import { createContext, useState } from "react";
import { useFonts, Quicksand_300Light, Quicksand_400Regular, Quicksand_600SemiBold, Quicksand_500Medium } from "@expo-google-fonts/quicksand";
import AppLoading from 'expo-app-loading'

const Stack = createNativeStackNavigator();

export default function App() {
    const [isParent, setIsParent] = useState(true)
    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_600SemiBold,
        Quicksand_500Medium
      });

      if (!fontsLoaded) {
        return <AppLoading />;
      }

    const theme = extendTheme({
        colors : {
            primary: {blue :"#6A6CFF"},
            gradientBlue : "#5547F2",
            shades : {
                darkBlueS : "##353680",
                lightBlueS : "#B5B6FF",
                blueS : "#5556CC"              
            },
            secondary : "#FF6C58",
            accent : "#FBD300",
            white : "#FEFEFE",
            black : "#0B0B19",
            darkBlueGray : "#F0F0FF",
            blueGray : "#F5F5FC"
        },
        fontConfig : {
            Quicksand : {
                300 : {
                    normal : "Quicksand_300Light",
                },
                400 : {
                    normal : "Quicksand_400Regular",
                    italic : ""
                },
                500 : {
                    normal : "Quicksand_500Medium",
                    italic : ""
                },
                600 : {
                    normal : "Quicksand_600SemiBold",
                    italic : ""
                },
            }
        },
        fonts : {
            body : "Quicksand_500Medium",
            head : "Quicksand_600SemiBold"
        },

    })
    return (
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
            {isParent ? <Index font={fontsLoaded}/> :  <ChildsView />}
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
