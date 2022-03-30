import { HStack, Text, Center, Button, VStack, Pressable } from "native-base";
import { Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function EachTask({
    data,
    handleShowModal,
    i,
    row,
    noDate,
    setIdToEdit,
}) {
    // console.log(data)
    const { child } = data;
    const renderChild = child?.map(() => (
        <AntDesign name="user" size={24} color="black" />
    ));
    // console.log(row)

    const mainTaskView = (
        <HStack
            bg="white"
            w="350"
            py="5"
            borderRadius="15"
            justifyContent="space-around"
        >
            <VStack>
                <Text fontSize="19">{data.title}</Text>
                <Text fontSize="11" mt="2">
                    {noDate ? "" : `Due:${data.date}`}
                </Text>
            </VStack>
            <HStack>{renderChild}</HStack>
        </HStack>
    );

    // setIdToEdit(data.);

    return (
        <Center mb={3} key={i} position="relative">
            {mainTaskView}
        </Center>
    );
}
