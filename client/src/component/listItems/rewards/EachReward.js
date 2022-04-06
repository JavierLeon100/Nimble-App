import { Text, VStack, HStack, Center, Image, Pressable } from "native-base";
import { colors } from "../../utilis/colors";
import { AntDesign } from "@expo/vector-icons";
import SvgUri from "react-native-svg-uri-updated";

export default function ({ reward }) {
    return (
        <VStack
            bg="white"
            borderRadius="10"
            py="5"
            justifyContent="center"
            alignItems="center"
            space={2}
        >
            <Text textAlign="left" w="80%" fontSize={18}>
                {reward.title}
            </Text>
            <Center>
                <Image
                    source={{
                        uri: "https://www.toysrus.ca/dw/image/v2/BDFX_PRD/on/demandware.static/-/Sites-toys-master-catalog/default/dw0e25e897/images/4D800644_1.jpg?sw=767&sh=767&sm=fit",
                    }}
                    size="lg"
                    resizeMode="contain"
                    alt="reward icon"
                />
                <HStack
                    justifyContent="center"
                    space="1"
                    mt="4"
                    alignItems="center"
                >
                    <Text fontSize={19} color="primary.blue">
                        {reward.cost}
                    </Text>
                    <SvgUri
                        source={require("../../../../assets/rewardIcons/Egg.svg")}
                        width="20"
                        height="20"
                        fill={colors.eggYellow}
                    />
                </HStack>
            </Center>
        </VStack>
    );
}
