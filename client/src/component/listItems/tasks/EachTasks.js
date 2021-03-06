import {
    HStack,
    Text,
    Center,
    Button,
    VStack,
    Pressable,
    Image,
} from "native-base";
import { Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SvgUri from "react-native-svg-uri-updated";
import { FlatGrid } from "react-native-super-grid";
import { color } from "react-native-reanimated";

export default function EachTask({ data, handleShowModal, i, row, noDate }) {
    // console.log(data)
    const { child } = data;

    const status = data.status;
    const urgent = data.urgent;
    //conditional rendering of data.status

    // if urgent !!! red before
    // if (urgent) {

    // data.title = "!!!" + data.title;
    // data.title.style={color: 'red'}

    // } else if (status == "completed") {
    //     data.title.style={textDecorationLine: 'line-through',textDecorationStyle: 'solid'}
    // }

    // if completed text strike trough

    const renderChild = child?.map(() => (
        <SvgUri
            source={require("../../../../assets/slothFacesSvg/sloth1.svg")}
        />
    ));
    // console.log(row)

    const mainTaskView = (
        <HStack
            bg="white"
            w="350"
            py="3"
            borderRadius="15"
            // justifyContent="space-between"
            px={9}
            space={10}
            alignItems="center"
        >
            <VStack>
                <Text
                    fontSize="19"
                    style={
                        status === "completed"
                            ? { textDecorationLine: "line-through" }
                            : null
                    }
                    {...(urgent ? { color: "red" } : { color: "black" })}
                >
                    {urgent ? `! ! ! ${data.title}` : data.title}
                </Text>

                <Text
                    fontSize="11"
                    mt="2"
                    style={
                        status === "completed"
                            ? { textDecorationLine: "line-through" }
                            : null
                    }
                >
                    {noDate
                        ? "Due: Fri 08 2022 | 12:00 PM"
                        : status === "completed"
                        ? `Completed at:${data.date}`
                        : `Due:${data.date}`}
                </Text>
            </VStack>
            {/* <HStack space={2}>{renderChild}</HStack> */}
            <FlatGrid
                mt="9"
                data={child}
                renderItem={({ item }) => (
                    <SvgUri
                        source={require("../../../../assets/slothFacesSvg/sloth1.svg")}
                    />
                )}
                itemDimension={130}
                spacing={10}
                horizontal={true}
                style={{
                    height: 70,
                }}
            />
        </HStack>
    );

    return (
        <Center mb={3} key={i} position="relative">
            {mainTaskView}
        </Center>
    );
}
