import { Box, Center, HStack, Text } from "native-base";
import { colors } from "../utilis/colors";


export default function AllOrSuggested (){
    return (
        <Center mt='9'>
        <HStack space="1">
            <Text bg={colors.gray}  py="3" textAlign="center" w="40">All Tasks</Text>
            <Text bg={colors.gray}  py="3" textAlign="center" w="40">Suggested Tasks</Text>
        </HStack>
        </Center> 
    )
}