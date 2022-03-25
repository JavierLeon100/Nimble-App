import { Box, Button, Center, HStack, Text} from "native-base";
import { useState } from "react";
import { colors } from "../utilis/colors";


export default function AllOrSuggested (){

    const [allTasks, setAllTasks] = useState(false)
    const variantFor = allTasks ? "outline" : null
    return (
        <Center mt='9' > 
        {/* <HStack space="1" borderWidth="2" borderColor="primary.blue" borderRadius="50" p="3"> 
                <Text py="3" textAlign="center" w="40"  borderRightWidth="0">All Tasks</Text>
                <Text py="3" textAlign="center" w="40" >Suggested Tasks</Text>

        </HStack> */}
        <Button.Group isAttached colorScheme="indigo" borderRadius="35">
            <Button w={40} variant={allTasks ? "outline" : null} onPress={()=>setAllTasks(false)} borderRightWidth={0} p={6}>All Tasks</Button>
            <Button w={40} variant={!allTasks ? "outline" : null} onPress={()=>setAllTasks(true)}  borderLeftWidth={0}>Suggested Tasks</Button>
        </Button.Group>
        </Center> 
    )
}
