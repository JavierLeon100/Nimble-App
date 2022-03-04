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

    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    return (
        <>
        <AllOrSuggested />

        <FlatGrid mt="4" data={exampleArray} renderItem={({item})=><EachReward reward={item}/>} itemDimension={130} spacing={19}/>
        <PlusButton />
        <Button onPress={()=>setShowModal(true)}>Test modal</Button>

        <Modal visible={showModal} presentationStyle="formSheet" animationType="slide">
                    <ModalForAddRewards handleShowModal={handleShowModal}/>
        </Modal>
        </>
    )
}