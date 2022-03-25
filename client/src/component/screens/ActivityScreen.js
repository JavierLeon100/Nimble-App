import { Box, Button, HStack, ScrollView, Text } from "native-base";
import { useState } from "react";
import Date from "../layout/Date";
import SvgUri from "react-native-svg-uri-updated";

export default function ActivityScreen() {
    const [defaultScreen, setDefaultScreen] = useState(true);

    return (
        <ScrollView>
            <Date />
            <HStack bg="white" p={3}>
                <Box p={3} />
                <Text w={250} fontSize="md">
                    Task ‘Sweeping and Cleaning Kit’ is Overdue at 12:00 PM
                </Text>

                <HStack
                    w={110}
                    flexDirection="row-reverse"
                    flexWrap="wrap"
                    space="2"
                >
                    <SvgUri
                        source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                        height={30}
                        width={30}
                    />
                    <SvgUri
                        source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                        height={30}
                        width={30}
                    />
                    <SvgUri
                        source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                        height={30}
                        width={30}
                    />
                    <SvgUri
                        source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                        height={30}
                        width={30}
                    />
                </HStack>
            </HStack>
        </ScrollView>
    );
}
