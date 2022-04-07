import Date from "../../layout/Date";
import { SwipeListView } from "react-native-swipe-list-view";
import EachTask from "../../listItems/tasks/EachTasks";
import { Center, Pressable, HStack, Text } from "native-base";
import ModalDetailForActivity from "../../modal/modalDetailForActivity";
import { useState, createContext, useEffect, useCallback } from "react";
import ChildDetailedTaskModal from "../../modal/childModal/ChildDetailedTaskModal";
import { Modal, Dimensions, ActivityIndicator, RefreshControl} from "react-native";
import { GET_TASKS_BY_CHILD } from "../../../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { find } from "lodash";
import { colors } from "../../utilis/colors";

export const ChildTaskToEditContext = createContext();

export default function () {
    const [showModal, setShowModal] = useState(false);
    const [childTasks, setChildTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const contextValue = {
        selectedTask,
        setSelectedTask,
        setShowModal,
        setChildTasks,
    };
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const [showIndicator, setIndicator] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().then(() => setRefreshing(false));
      }, []);
    
    const onSwipeValueChange = (swipeData) => {
        // console.log(swipeData)
        // setSelectedTaskID(swipeData.key)
        const { key } = swipeData;
        if ((swipeData.direction = "left")) {
            setSelectedTask(find(childTasks, { _id: key }));
        }
    };

    const updateTask = (id, taskToUpdate) => {
        const index = tasks.findIndex((task) => task.key == id);
        const newTasks = [...tasks];
        newTasks[index] = taskToUpdate;
        console.log("new task", newTasks);
        setChildTasks(newTasks);
    };

    const handleShowModal = (boo) => {
        boo ? setShowModal(true) : setShowModal(false);
    };

    const openButton = (
        <Pressable onPress={() => setShowDeleteModal(true)}>
            <HStack
                bg="secondary"
                py="9"
                px="4"
                borderRadius="16"
                justifyContent="flex-end"
            >
                {/* <Text color="white">Delete</Text> */}
                <Text color="white">Open</Text>
            </HStack>
        </Pressable>
    );

    //Get Tasks from DB
    const { error, loading, data, refetch } = useQuery(GET_TASKS_BY_CHILD, {
        variables: {
            //replace with childId from auth
            childId: "623c90382c2210ad1e6a360f",
        },
        // pollInterval: 500,
    });

    useEffect(() => {
        const newData = data
            ? data.getTasksByChild.filter((task) => task.status === "new")
            : null;

        data ? setChildTasks(newData) : null;
    }, [data]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <ChildTaskToEditContext.Provider value={contextValue}>
            <Date />
            <Center>
                <SwipeListView
                    data={childTasks}
                    keyExtractor={(item) => item._id}
                    renderItem={(data, rowMap) => (
                        <EachTask data={data.item} row={rowMap} />
                    )}
                    renderHiddenItem={(data, rowMap) => openButton}
                    rightOpenValue={-Dimensions.get("window").width}
                    // leftOpenValue={75}
                    rightActivationValue={100}
                    // leftActionValue={100}
                    onRightAction={() => setShowModal(true)}
                    // onLeftAction={()=>setShowModal(true)}
                    onSwipeValueChange={onSwipeValueChange}
                    refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            color={colors.secondary}
                            tintColor ={colors.secondary}
                            />
                    }
                    style={{ marginBottom: 370, height: 800 }}
                />
            </Center>

            <Modal
                visible={showModal}
                presentationStyle="pageSheet"
                animationType="slide"
            >
                {/* <ModalDetailForActivity handleShowModal={handleShowModal} setTasks={setChildTasks} editTask={editTask} updateTask={updateTask}/> */}
                <ChildDetailedTaskModal
                    refetch={refetch}
                    selectedTask={selectedTask}
                />
            </Modal>
        </ChildTaskToEditContext.Provider>
    );
}
