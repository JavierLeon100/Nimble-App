import {IconButton, AddIcon, Box} from "native-base"
import { colors } from "../utilis/colors"



export default function PlusButton({handleShowModal, setEditTask}){

    return(
        <IconButton bg={colors.gray} 
        icon={<AddIcon size="lg"/>}
        position="absolute"
        borderRadius="full"
        bottom="9"
        right="6"
        onPress={()=>{setEditTask(false) ,handleShowModal(true)}}
        />
    )
}