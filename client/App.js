import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import Index from "./index";
import ChildsView from "./ChildsView";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});
const Stack = createNativeStackNavigator();

export default function App() {
    const [isParent, setIsParent] = useState(true);
    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider>
                <NavigationContainer>
                    {/* <Stack.Navigator> */}
                    {/* <Stack.Screen name="ParentsView" component={Index} /> */}
                    {isParent ? <Index /> : <ChildsView />}
                    {/* <Stack.Screen  name ="ChildsView" 
              component={ChildsView} /> */}
                    {/* </Stack.Navigator>  */}
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    );
}
