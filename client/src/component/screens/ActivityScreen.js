import { Box, Button, HStack, ScrollView, Text } from "native-base";
import { useState } from "react";
import Date from "../layout/Date";
import SvgUri from "react-native-svg-uri-updated";
import { FlatGrid } from "react-native-super-grid";
import MainScreen from "../view/MainScreen";

export default function ActivityScreen() {
    const [defaultScreen, setDefaultScreen] = useState(true);

    //define state for empty/not empty
    const [activityEmpty, setActivityEmpty] = useState(true);
    //create EachActivity component with the card
    
    //if state empty show screen / if not show list of activity



    const child = [1];

    return (
        // activityEmpty ?  < MainScreen /> :

        
        <ScrollView>
            <Date />
            <HStack bg="white" p={3} alignItems="center">
                <Box p={3} />
                <Text w={210} fontSize="md">
                    Task ‘Sweeping and Cleaning Kit’ is Overdue at 12:00 PM
                </Text>

                <FlatGrid
                    mt="4"
                    data={child}
                    renderItem={({ item }) => (
                        <SvgUri
                            source={require("../../../assets/slothFacesSvg/sloth1.svg")}
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
        </ScrollView>
    );
}
