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
    const [childTasks, setChildTasks] = useState([
        {title : "a task", date : "Wednesday Jan 26", key : 1, point : 600, focus : true},
        {title : "b task", date : "Wednesday Jan 27", key : 2, point : 700, focus : true},
        {title : "c task", date : "Wednesday Jan 28", key : 3, point : 800,focus : true},
        {title : "d task", date : "Wednesday Jan 29", key : 4, point : 800, focus : true},
        {title : "e task", date : "Wednesday Jan 30", key : 6, point : 900, focus : true},
        {title : "f task", date : "2020-12-12", key : 7, point : 1000, focus : false},
        {title : "g task", date : "2020-12-12", key : 8, point : 11000, focus : false},
        {title : "h task", date : "2020-12-12", key : 9, point : 600, focus : false},
        {title : "k task", date : "2020-12-12", key : 10,point : 600, focus : false},
    ])
    const [editTask, setEditTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState([])
    const contextValue = {
        selectedTask,
        setSelectedTask,
        setShowModal,
        setChildTasks
      }

      const onSwipeValueChange =(swipeData=>{
        // console.log(swipeData)
        // setSelectedTaskID(swipeData.key)
        const {key} = swipeData
        if(swipeData.direction = "left"){
          const taskToEdit =childTasks.filter(task=> task.key == key)[0]
          setSelectedTask(taskToEdit)
        } 
        // console.log(taskToEdit)
      })

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
            data={childTasks} 
            renderItem={(data, rowMap)=>
                <EachTask data={data.item} row={rowMap}/>
            }
            renderHiddenItem ={(data, rowMap)=>
                openButton
                }
            rightOpenValue={-Dimensions.get('window').width}
            // leftOpenValue={75}
            rightActivationValue={100}
            // leftActionValue={100}
            onRightAction={()=>setShowModal(true)}
            // onLeftAction={()=>setShowModal(true)}
            onSwipeValueChange={onSwipeValueChange}
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