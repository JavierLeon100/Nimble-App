import { Box, Button, HStack, ScrollView, Text } from "native-base";
import SvgUri from "react-native-svg-uri-updated";

const EachActivity = ({ activityObj }) => {
    return (
        <HStack
            bg="white"
            paddingY={5}
            paddingX={8}
            marginBottom={8}
            justifyContent="space-between"
            alignItems="center"
        >
            <SvgUri
                source={require("../../../assets/icons/activityIcon.svg")}
            />
            <Text w={210} fontSize="md">
                {activityObj.activity}
            </Text>

            <SvgUri
                source={require("../../../assets/slothFacesSvg/sloth2.svg")}
            />
        </HStack>
    );
};

export default EachActivity;
