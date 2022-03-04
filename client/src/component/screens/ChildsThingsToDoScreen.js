import { Button, ScrollView, Text, VStack, Center, HStack,Heading} from "native-base";
import ThingsToDo from "../listItems/tasks/childs view/ThingsToDo"

const ChildsThingsToDoScreen = ({navigation}) => {

    return (
        <ScrollView>
            <Center>

                <VStack w="90%">
                    <ThingsToDo/>
                    <ThingsToDo />
                    <ThingsToDo />
                    <ThingsToDo />
                    
                </VStack>


            </Center>


       
        </ScrollView>
        
    )
}

export default ChildsThingsToDoScreen; 
