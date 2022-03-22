import { Box, Center, HStack, Text} from "native-base";
import { useState } from "react";
import { colors } from "../utilis/colors";


export default function AllOrSuggested (){

    const [allTasks, setAllTasks] = useState(true)
    return (
        <Center mt='9' > 
        <HStack space="1" borderWidth="2" borderColor="primary.blue" borderRadius="50" p="3"> 
                <Text py="3" textAlign="center" w="40"  borderRightWidth="0">All Tasks</Text>
                <Text py="3" textAlign="center" w="40" >Suggested Tasks</Text>

        </HStack>
        </Center> 
    )
}
