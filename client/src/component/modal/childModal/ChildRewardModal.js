import { Button, Center, Heading, HStack, ScrollView, Text, VStack, Pressable } from "native-base"
import { useContext } from "react"
import { ImageBackground } from "react-native"
import SvgUri from "react-native-svg-uri-updated"
import { childRewardContext } from "../../screens/RewardScreen"
import { colors } from "../../utilis/colors"


export default function(){

    const {selectedReward} = useContext(childRewardContext)
    const {title, desc, cost, img} = selectedReward

    // const btnRightIcon = (textColor)=>(
    // <HStack alignItems="center" space={0.5} pl={textColor === "secondary" ? 30 : null}>
    //      <Text color={textColor}>+50</Text>
    //             <SvgUri source={require("../../../../assets/rewardIcons/Egg.svg")} fill={colors.eggYellow}/>
    // </HStack>
    // )
    
    const {setShowModal} = useContext(childRewardContext)

    return(
            <ScrollView>
            <ImageBackground resizeMode="cover" source={{uri : img}} style={{
                flex: 1,
                justifyContent: "center",
                height : 400,
                width : "100%",
            }}>
            </ImageBackground>

            <HStack justifyContent="space-between" alignItems="center" mt={2}>
                <HStack  alignItems="center" space={2} p={4}>
                    <Text fontSize="20">{title}</Text>
                </HStack>
                <HStack alignItems="center" space={1} pr={5}>
                    <Text color="black" fontSize="20">{cost}</Text>
                    <SvgUri source={require("../../../../assets/rewardIcons/Egg.svg")} fill={colors.eggYellow} height={25} width={25}/>
                </HStack>
            </HStack>

            <Text pl={5} space={1} lineHeight={25}>
            {desc}
            </Text>

                <Center h={160} justifyContent="space-around" mt={20}>
                        <Button _text={{color : "white", fontSize : 17}} bg="secondary" colorScheme="indigo" w="80%" borderRadius={40} h="16">
                        Redeem
                        </Button>
                    <Pressable >
                        <Text fontSize={17} color="secondary" onPress={()=>setShowModal(false)}>Cancel</Text>
                    </Pressable>
                </Center>
            </ScrollView>
    )
}