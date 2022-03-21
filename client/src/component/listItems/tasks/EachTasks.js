import { HStack, Text, Center, Button, VStack, Pressable} from "native-base"
import { Animated } from "react-native";
import { AntDesign } from '@expo/vector-icons';
export default function EachTask ({data, handleShowModal, i,row}) {
    // console.log(data)
    const {child} = data
    const renderChild = child?.map(()=><AntDesign name="user" size={14} color="black" />)
    // console.log(row)

   

    const mainTaskView = 
                        
                        <HStack bg="white" px="75" py="5" borderRadius="15">   
                            <VStack>           
                                <Text fontSize="19">{data.title}</Text> 
                                <Text fontSize="11" mt="2">Due: {data.date}</Text>
                            </VStack> 
                            <HStack space="3" maxW="2">
                            {renderChild}
                            </HStack>                
                        </HStack>
                        

    return (     
        <Center mb={3} key={i} position="relative">
            {mainTaskView}
        </Center>
    )
}

