import { Button } from "native-base";
import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import EachReward from "../listItems/rewards/EachReward";
import { FlatGrid } from 'react-native-super-grid';
import { Modal } from "react-native";
import { useState } from "react";
import ModalForAddRewards from "../modal/modalForAddRewards";

const exampleArray = ["Xbox", "Playstation", "Pc", "Noooooooo", "Reward", "Naaaaaaa"]
export default function(){

    const [rewards, setRewards] = useState([])
    
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    return (
        <>
        <AllOrSuggested />

        <FlatGrid mt="4" data={rewards} renderItem={({item})=><EachReward reward={item}/>} itemDimension={130} spacing={19}/>
        <PlusButton handleShowModal={handleShowModal}/>

        <Modal visible={showModal} presentationStyle="formSheet" animationType="slide">
                    <ModalForAddRewards handleShowModal={handleShowModal} setRewards={setRewards}/>
        </Modal>
        </>
    )
}