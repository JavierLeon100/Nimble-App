import { Button, Pressable  } from "native-base";
import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import EachReward from "../listItems/rewards/EachReward";
import { FlatGrid } from 'react-native-super-grid';
import { Modal, } from "react-native";
import { createContext, useContext, useState } from "react";
import ModalForAddRewards from "../modal/modalForAddRewards";
import { CreateParentContext } from "../view/MainScreen";
import ChildRewardModal from "../modal/childModal/ChildRewardModal";

export const childRewardContext = createContext()

export default function(){
    
    const [rewards, setRewards] = useState([])
    const exampleArrayForChildView = [
    {
        title : "Xbox",
        cost : "10000"
    },
    {
        title : "Xbox",
        cost : "10000"
    },
    {
        title : "Xbox",
        cost : "10000"
    },
    {
        title : "Xbox",
        cost : "10000"
    },
    {
        title : "Xbox",
        cost : "10000"
    },
    {
        title : "Xbox",
        cost : "10000"
    },
    
]
    
    
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    const isParentScreen = useContext(CreateParentContext)
    const contextValue = {
        setShowModal,

    }

    return (
        <childRewardContext.Provider value={contextValue}>
        {isParentScreen ?   <AllOrSuggested /> : null}

        <FlatGrid mt="4" data={isParentScreen ? rewards : exampleArrayForChildView} renderItem={({item})=>
        <Pressable onPress={()=>setShowModal(true)}>
            <EachReward reward={item}/>
        </Pressable>
        } itemDimension={130} spacing={19} />

        {isParentScreen ?  <PlusButton handleShowModal={handleShowModal}/> : null}
       

        <Modal visible={showModal} presentationStyle="formSheet" animationType="slide">
                {isParentScreen ? <ModalForAddRewards handleShowModal={handleShowModal} setRewards={setRewards}/> :
                <ChildRewardModal />
                }
                    
        </Modal>
        </childRewardContext.Provider>
    )
}