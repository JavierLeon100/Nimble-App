import {React, useState} from "react";
import {
    HStack,
    Text,
    Center,
    Button,
    VStack,
    Pressable,
    Image,
} from "native-base";
import SvgUri from "react-native-svg-uri-updated";
import { FlatGrid } from "react-native-super-grid";


const ActivityTaskCard = () => {
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
                <Text fontSize="19">{data.title}</Text>
                <Text fontSize="11" mt="2">
                    {noDate
                        ? "Due: Fri 08 2022 | 12:00 PM"
                        : `Due:${data.date}`}
                </Text>
            </VStack>
            <HStack space={2}>{renderChild}</HStack>
            {/* <FlatGrid
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
            /> */}
        </HStack>

}

export default ActivityTaskCard;