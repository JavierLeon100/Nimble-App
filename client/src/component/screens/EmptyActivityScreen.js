import { View, Image, Text, Button} from "native-base";

const EmptyActivityScreen =({navigation}) =>{

    return (
        <View>
            <Image source />
            <Text>Assigning a task to your kid, help them learn responsibility, puntuality and become neat and committed. </Text>
            <Button onPress={()=>navigation.navigate("TaskScreen")}>Check Suggested Tasks</Button>
        </View>
    )

}
export default EmptyActivityScreen;