import { View, Text, Button, Center} from "native-base";
import SvgUri from "react-native-svg-uri-updated";


const EmptyActivityScreen =({navigation}) =>{

    const GoToSuggestedTasks = () =>{
        navigation.navigate("Tasks");
        // showSuggested(true)
    }

    return (  
        <View>
            <Center mt={100} m={50}>
            <SvgUri 
                source={require("../../../assets/slothFacesSvg/activityLogo.svg") } mt={10} width={300} height={200} 
            />
            <Text fontSize={20}>Assigning a task to your kid, help them learn responsibility, punctuality and become neat and committed. </Text>
            <Button  size="lg"
            fontSize={20}
                                    mt="4"
                                    mb="40"
                                    w="350"
                                    
                                    colorScheme="indigo"
                                    borderRadius="90"
                                    title="Add Your First Task"
                                    bg="gradientBlue"
                                    py="5"
                                    _text={{
                                        color: "white",
                                    }}
                                     onPress={()=>
                GoToSuggestedTasks()}>Check Suggested Task</Button>
            </Center>
        </View>
    )
}
export default EmptyActivityScreen;