import { Button, Pressable, Text  } from "native-base";
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
    const [selectedReward, setSelectedReward] = useState()
    const [editReward, setEditReward] = useState(false)
    const exampleArrayForChildView = [
    {
        title : "Xbox",
        cost : "10000",
        desc : "Xbox is a video gaming brand created and owned by Microsoft. The brand consists of five video game consoles, as well as applications (games), streaming services, an online service by the name of Xbox network, and the development arm by the name of Xbox Game Studios. The brand was first introduced in the United States in November 2001, with the launch of the original Xbox console.",
        key : 1
    },
    {
        title : "Ps5",
        cost : "20000",
        desc : "The PS5 console unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback.",
        key : 2
    },
    {
        title : "aa",
        cost : "30000",
        desc : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        key : 3
    },
    {
        title : "bbb",
        cost : "40000",
        desc : "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        key : 4
    },
    {
        title : "cccc",
        cost : "50000",
        desc : "cccccccccccccccccccccccccccccccccc",
        key : 5
    },
    {
        title : "ddddd",
        cost : "60000",
        desc : "ddddddddddddddddddddddddddddddddddddddd",
        key : 6
    },
    
]
    
    
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    const handleSelectedReward = (key)=>{
        const childFoundReward = exampleArrayForChildView.find(r=> r.key === key)
        const parentFoundReward = rewards.find(r=>r.kry === key) 
        setSelectedReward(isParentScreen ? parentFoundReward : childFoundReward)
    }

    const isParentScreen = useContext(CreateParentContext)
    const contextValue = {
        setShowModal,
        selectedReward,
        editReward
    }

    return (
        <childRewardContext.Provider value={contextValue}>
        {isParentScreen ?   <AllOrSuggested /> : null}

        <FlatGrid mt="4" data={isParentScreen ? rewards : exampleArrayForChildView} renderItem={({item})=>
        <Pressable onPress={()=>{
            handleSelectedReward(item.key)
            setShowModal(true)}
            }>
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