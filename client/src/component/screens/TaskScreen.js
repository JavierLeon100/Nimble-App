import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import Date from "../layout/Date";
import EachTask from "../listItems/tasks/EachTasks";
import {Modal, Platform, Pressable} from "react-native"
import ModalDetailForActivity from "../modal/modalDetailForActivity";
import { useState } from "react";
import { Button, FlatList } from "native-base";
import ChildsProfileScreen from "./ChildsProfileScreeen";



const exampleArray = [
    {
        id : 1, 
        task  : "Weeping"
    }, 
    {
        id : 2,
        task : "Washing Dishes",
    },
    {
        id : 3,
        task : "Preparing Meals"
    },
    {
        id : 4,
        task : "Studying"
    }
    ]

export default function Index({navigation}){
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }

    const [childsView, setChildsView] = useState(false);


    return(
        <>
        <AllOrSuggested />
        <Date />

        <FlatList data={exampleArray} renderItem={({item})=><EachTask task={item.task} i={item.id} handleShowModal={handleShowModal} />}>

        </FlatList>
        <PlusButton handleShowModal={handleShowModal}/>

        <Modal visible={showModal} presentationStyle="formSheet" animationType="slide">
            <ModalDetailForActivity handleShowModal={handleShowModal}/>
        </Modal>

        {/* <Button 
        title="Go to Child's View"
        onPress={()=>{
            // alert("Show Child's View!!");
            navigation.navigate('ChildsView');
        }}
        >Child's View</Button> */}


        {Platform.OS === "android" ? 
        <Button onPress={()=>{setShowModal(true);}}>test modal view</Button> :
        null}
       
        </>
    )
}