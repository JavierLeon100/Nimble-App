import {HStack, VStack, Text} from 'native-base';
import {colors} from "../../../utilis/colors";
import { AntDesign } from '@expo/vector-icons';



const ThingsToDo =({task})=>{
    return(
        <HStack bg={colors.gray}  px="5" py="5" borderRadius="10" marginBottom={3}>
            <VStack>  
                <HStack w="100%">
                    <Text fontSize="19">Clean your room {task}</Text> 
                    <HStack marginLeft={7}>
                        <Text>2000</Text>
                        <AntDesign name="staro" size={24} color="black" />
                    </HStack>

                </HStack>         
               
                <Text fontSize="11" mt="2">Due: Wed Jan 26 2022 | 12:00 PM  | 1 Hour</Text>
            </VStack> 
        </HStack>
    )
}

export default ThingsToDo;