import { HStack, Text, Center, Button, VStack} from "native-base"
import {colors} from "../../utilis/colors"
import { AntDesign } from '@expo/vector-icons';


export default function EachTask ({data, handleShowModal, i}) {

    const mainTaskView = 
                        <HStack bg={colors.gray} px="10" py="5" borderRadius="15">   
                            <VStack>           
                                <Text fontSize="19">{data.item.task}</Text> 
                                <Text fontSize="11" mt="2">Due: Wed Jan 26 2022 | 12:00 PM  | 1 Hour</Text>
                            </VStack> 
                            <HStack space="3" maxW="2">
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />
                            <AntDesign name="user" size={14} color="black" />   
                            </HStack>                
                        </HStack>


    return (
        <>
        <Center mb={3} key={i} position="relative">
                {mainTaskView}
            </Center>
            </>
        
    )
}

