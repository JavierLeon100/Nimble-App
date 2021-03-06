import {IconButton, AddIcon, Box} from "native-base"
import { colors } from "../utilis/colors"
import { AntDesign } from '@expo/vector-icons';



export default function PlusButton(props){

    const {handleShowModal ,setEditTask} = props || ""

    const taskOrReward = ()=>{
        if (!setEditTask){
        } else {
            setEditTask(false)
        }
        handleShowModal(true)
    }

    return(
        <IconButton bg={colors.secondary} 
        icon={<AntDesign name="plus" size={47} color={colors.white} />}
        position="absolute"
        borderRadius="full"
        bottom="9"
        right="6"
        onPress={()=>taskOrReward()}    
        />
    )
}