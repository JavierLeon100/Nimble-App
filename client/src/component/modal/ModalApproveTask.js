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
import { TaskToEditContext } from "../screens/TaskScreen";
import { colors } from "../utilis/colors";

const ModalApproveTask = (props) => {
    const { selectedTask } = useContext(TaskToEditContext);
    const { handleShowModal } = props;
    const { refetch } = props;

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
                    style={{ flex: 1, backgroundColor: colors.shades.tintBlue }}
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

            <VStack pl={5} space={1}>
                <Text fontSize={15}>Img date: {selectedTask.date} </Text>
            </VStack>

            <Center h={160} justifyContent="space-around" mt={20}>
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
                    onPress={() => console.log("Approve pressed")}
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
