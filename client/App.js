import { NativeBaseProvider, extendTheme, Image } from "native-base";
import {
    useFonts,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";
import OnBoardingScreen from "./OnBoardingScreen";
import { createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./src/component/screens/TaskScreen";
// import { createStackNavigator } from '@react-navigation/stack'
import GoogleLoginScreen from "./src/component/screens/GoogleLoginScreen";
import { ImageBackground } from "react-native";
import { IP_ADDRESS } from "@env";

// Initialize Apollo Client
const client = new ApolloClient({
    uri: "http://34.229.169.165:4000/graphql",

    cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export const fontsContext = createContext();

export default function App() {
    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_600SemiBold,
        Quicksand_500Medium,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const theme = extendTheme({
        colors: {
            primary: { blue: "#6A6CFF" },
            gradientBlue: "#5547F2",
            shades: {
                darkBlueS: "##353680",
                lightBlueS: "#B5B6FF",
                blueS: "#5556CC",
            },
            secondary: "#FF6C58",
            accent: "#FBD300",
            white: "#FEFEFE",
            black: "#0B0B19",
            darkBlueGray: "#F0F0FF",
            blueGray: "#F5F5FC",
            mainGray: "#E9E9E9",
            backGroundLightBlue: "#F7F7FF",
            backGroundModal: "#F5F5FC",
            cancelBtnGray: "#858585",
            eggYellow: "#FBD300",
            red: "#FF0000",
            schemaForBtn: {
                400: "#6A6CFF",
            },
            loginFormBlue: "#4E53FB40",
            childBackGround: "#FFFAF9",
        },
        fontConfig: {
            Quicksand: {
                300: {
                    normal: "Quicksand_300Light",
                },
                400: {
                    normal: "Quicksand_400Regular",
                    italic: "",
                },
                500: {
                    normal: "Quicksand_500Medium",
                    italic: "",
                },
                600: {
                    normal: "Quicksand_600SemiBold",
                    italic: "",
                },
            },
        },
        fonts: {
            body: "Quicksand_500Medium",
            head: "Quicksand_600SemiBold",
        },
    });

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <NativeBaseProvider theme={theme}>
                    <fontsContext.Provider value={fontsContext}>
                        <OnBoardingScreen fontsLoaded={fontsLoaded} />
                    </fontsContext.Provider>
                </NativeBaseProvider>
            </NavigationContainer>
        </ApolloProvider>
        // <GoogleLoginScreen />
    );
}
