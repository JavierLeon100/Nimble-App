import { Button, Pressable, Text } from "native-base";
import PlusButton from "../buttons/PlusButton";
import AllOrSuggested from "../layout/AllOrSuggested";
import EachReward from "../listItems/rewards/EachReward";
import { FlatGrid } from "react-native-super-grid";
import { Modal } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import ModalForAddRewards from "../modal/modalForAddRewards";
import { CreateParentContext } from "../view/MainScreen";
import ChildRewardModal from "../modal/childModal/ChildRewardModal";
import { useQuery } from "@apollo/client";
import { GET_REWARDS } from "../../GraphQL/Queries";

export const childRewardContext = createContext();

export default function () {
    const [rewards, setRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState();
    const [editReward, setEditReward] = useState(false);
    const [childRewards, setChildRewards] = useState([]);
    const [showSuggested, setShowSuggested] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = (boo) => {
        boo ? setShowModal(true) : setShowModal(false);
    };

    const handleSelectedReward = (key) => {
        const reward = rewards.find((r) => r._id === key);

        setSelectedReward(reward);

        console.log(selectedReward);
    };

    const isParentScreen = useContext(CreateParentContext);
    const contextValue = {
        setShowModal,
        selectedReward,
        editReward,
    };

    //Get Tasks from DB
    const { error, loading, data } = useQuery(GET_REWARDS, {
        variables: {
            //replace with homeIdVariable from auth
            homeId: "622ab00bfe4e52d96b61a960",
        },
    });

    useEffect(() => {
        data ? setRewards(data.getAllRewards) : null;
    }, [data]);

    return (
        <childRewardContext.Provider value={contextValue}>
            <FlatGrid
                mt="4"
                data={rewards}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            handleSelectedReward(item._id);
                            setShowModal(true);
                        }}
                    >
                        <EachReward reward={item} />
                    </Pressable>
                )}
                itemDimension={130}
                spacing={19}
            />

            {isParentScreen ? (
                <PlusButton handleShowModal={handleShowModal} />
            ) : null}

            <Modal
                visible={showModal}
                presentationStyle="formSheet"
                animationType="slide"
            >
                {isParentScreen ? (
                    <ModalForAddRewards
                        handleShowModal={handleShowModal}
                        setRewards={setRewards}
                    />
                ) : (
                    <ChildRewardModal />
                )}
            </Modal>
        </childRewardContext.Provider>
    );
}
