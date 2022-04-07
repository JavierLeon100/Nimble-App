import { useMutation } from "@apollo/client";
import {
    Button,
    Center,
    Heading,
    HStack,
    Pressable,
    ScrollView,
    Text,
    View,
    VStack,
} from "native-base";
import React, { useContext } from "react";
import { ImageBackground } from "react-native";
import SvgUri from "react-native-svg-uri-updated";
import { UPDATE_TASK } from "../../GraphQL/Mutations";
import { TaskToEditContext } from "../screens/TaskScreen";
import { colors } from "../utilis/colors";

const ModalApproveTask = (props) => {
    const { selectedTask } = useContext(TaskToEditContext);
    const { handleShowModal } = props;
    const { refetch } = props;

    //approved task status
    const [updateTask, { data }, error] = useMutation(UPDATE_TASK);
    const handleApprove = () => {
        updateTask({
            variables: {
                updateTaskId: selectedTask._id,
                task: {
                    status: "approved",
                },
            },
        });

        refetch();
        handleShowModal(false);
    };

    const buttonText = `Approve   +${selectedTask.rewardPoints}`;

    return (
        <ScrollView>
            <ImageBackground
                resizeMode="cover"
                source={{
                    uri: selectedTask.img,
                }}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    height: 400,
                    width: "100%",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.shades.tintBlue,
                        opacity: 0.7,
                    }}
                >
                    <VStack
                        margin={5}
                        style={{ flex: 1, justifyContent: "space-between" }}
                    >
                        <Pressable onPress={() => handleShowModal(false)}>
                            <SvgUri
                                source={require("../../../assets/icons/closeIcon.svg")}
                            />
                        </Pressable>
                        <Heading color="white">{selectedTask.title}</Heading>
                    </VStack>
                </View>
            </ImageBackground>

            <HStack justifyContent="space-between" alignItems="center" m={2}>
                <SvgUri
                // source={require("../../../assets/")}
                />
            </HStack>

            <VStack m={5} pl={6} space={1}>
                <Text fontSize={15} mb={2}>
                    Picture Taken at: {selectedTask.date}
                </Text>
                <Text fontSize={15}>Focus Mode: 15m</Text>
            </VStack>

            <Center h={160} justifyContent="space-around" mt={5}>
                <Button
                    _text={{
                        color: "white",
                        fontSize: 17,
                        flexDirection: "row",
                    }}
                    rightIcon={
                        <SvgUri
                            source={require("../../../assets/rewardIcons/Egg.svg")}
                            fill={colors.eggYellow}
                        />
                    }
                    bg="gradientBlue"
                    colorScheme="indigo"
                    w="80%"
                    borderRadius={40}
                    h="16"
                    p={0}
                    onPress={handleApprove}
                >
                    {buttonText}
                </Button>

                <Button
                    _text={{ color: "gradientBlue", fontSize: 17 }}
                    colorScheme="indigo"
                    w="80%"
                    borderRadius={40}
                    gradientBlue
                    h="16"
                    variant="outline"
                    borderColor="gradientBlue"
                    onPress={() => handleShowModal(false)}
                >
                    Try Again
                </Button>
            </Center>
        </ScrollView>
    );
};

export default ModalApproveTask;
