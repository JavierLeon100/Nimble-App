import Date from "../../layout/Date"
import { SwipeListView } from 'react-native-swipe-list-view';
import EachTask from "../../listItems/tasks/EachTasks";
import { Center, Pressable, HStack, Text } from "native-base";
import ModalDetailForActivity from "../../modal/modalDetailForActivity";
import { useState, createContext } from "react";
import ChildDetailedTaskModal from "../../modal/childModal/ChildDetailedTaskModal";
import { Modal, Dimensions } from "react-native";

export const ChildTaskToEditContext = createContext()

export default function() {
    const [showModal, setShowModal] = useState(false)
    const [childTasks, setChildTasks] = useState(tasks)
    const [editTask, setEditTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState([])
    const contextValue = {
        selectedTask,
        setSelectedTask,
        setShowModal
      }

    //   const onSwipeValueChange =(swipeData=>{
    //     // console.log(swipeData)
    //     // setSelectedTaskID(swipeData.key)
    //     const {key} = swipeData
    //     if(swipeData.direction = "left"){
    //       const taskToEdit =tasks.filter(task=> task.key == key)[0]
    //       setSelectedTask(taskToEdit)
    //     } 
    //     // console.log(taskToEdit)
    //   })

    const updateTask = (id, taskToUpdate)=>{
        const index = tasks.findIndex(task=>task.key == id)
        const newTasks = [...tasks]
        newTasks[index] = taskToUpdate
        console.log("new task", newTasks)
          setChildTasks(newTasks)
      }


    const handleShowModal = (boo)=>{
        boo ? setShowModal(true) : setShowModal(false)
    }


    const tasks = [
        {title : "a task", date : "2020-12-12", key : 1},
        {title : "a task", date : "2020-12-12", key : 2},
        {title : "a task", date : "2020-12-12", key : 3},
        {title : "a task", date : "2020-12-12", key : 4},
        {title : "a task", date : "2020-12-12", key : 6},
        {title : "a task", date : "2020-12-12", key : 7},
        {title : "a task", date : "2020-12-12", key : 8},
        {title : "a task", date : "2020-12-12", key : 9},
        {title : "a task", date : "2020-12-12", key : 10},
    ]

    const openButton = 
                        <Pressable onPress={()=>setShowDeleteModal(true)}>
                            <HStack
                            bg="secondary" py="9" px="4" borderRadius="16" justifyContent="flex-end">
                            {/* <Text color="white">Delete</Text> */}
                            <Text color="white">Open</Text>
                            </HStack>
                        </Pressable>

    return (
        <ChildTaskToEditContext.Provider value={contextValue}>
        <Date />
        <Center>
        <SwipeListView 
            data={tasks} 
            renderItem={(data, rowMap)=>
                <EachTask data={data.item} row={rowMap}/>
            }
            renderHiddenItem ={(data, rowMap)=>
                openButton
                }
            rightOpenValue={-Dimensions.get('window').width}
            leftOpenValue={75}
            rightActivationValue={100}
            leftActionValue={100}
            onRightAction={()=>setShowModal(true)}
            onLeftAction={()=>setShowModal(true)}
            // onSwipeValueChange={onSwipeValueChange}
            style={{ marginBottom : 370, height : 800}}
        />
        </Center>

        <Modal visible={showModal} presentationStyle="pageSheet" animationType="slide">
            {/* <ModalDetailForActivity handleShowModal={handleShowModal} setTasks={setChildTasks} editTask={editTask} updateTask={updateTask}/> */}
            <ChildDetailedTaskModal />
        </Modal>
    </ChildTaskToEditContext.Provider>
    )
}