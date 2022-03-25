import SvgUri from 'react-native-svg-uri-updated';
import { FlatGrid } from "react-native-super-grid";
import { Text, HStack, Heading, Center, Button, Box, VStack} from 'native-base';

export default function({setShowModal}){

    const EggIocn = <SvgUri source={require("../../../../assets/rewardIcons/Egg.svg")} height={40} width={40} alignSelf="flex-start"/>

    const exampleArray = [
        {
            icon : EggIocn,
            desc : "All weekly tasks"
        },
        {
            icon : EggIocn,
            desc : "Redeemed 10 gifts"
        },
        {
            icon : EggIocn,
            desc : "Reached level 10"
        },
        {
            icon : EggIocn,
            desc : "Redeemed 30 gifts"
        }
    ]

    const footer = ()=>(
        <>
        <Text fontSize={19} pl={5} mt={6}>Locked Eggs</Text>
        <FlatGrid data={exampleArray} renderItem={
            ({item})=>(
                <Center mt={2} alignItems="center" >
                    
                        <HStack alignItems="center" w="100%">
                            {item.icon}
                            <Text ml="2">{item.desc}</Text>
                        </HStack>
                </Center>
            ) 
        }
        itemDimension={180}
        />

        <Text fontSize={19} pl={5} mt={6}>Status</Text>    
        <>
        <Center mb="20" >
            <VStack w="90%" space={6}>
                <VStack bg="white" p="2" borderRadius="10">
                    <Text fontSize="16" opacity="0.7" textAlign="center" py={3}>Current Week</Text>
                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Tasks Completed:</Text>
                        <Text fontSize="13" ml="2" >10/25</Text>
                    </HStack>

                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Rewards Redeemed: :</Text>
                        <Text fontSize="13" ml="2" mb={2}>5/8</Text>
                    </HStack>
                    
                </VStack>

                <VStack bg="white" p="2" borderRadius="10">
                    <Text fontSize="16" opacity="0.7" textAlign="center" py={3}>Current Week</Text>
                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Tasks Completed:</Text>
                        <Text fontSize="13" ml="2" >10/25</Text>
                    </HStack>

                    <HStack justifyContent="space-around" mt="2" >
                        <Text fontSize="13">Rewards Redeemed: :</Text>
                        <Text fontSize="13" ml="2" mb={2}>5/8</Text>
                    </HStack>
                    
                </VStack>   
            </VStack>
        
        </Center>
    </>
        </>
    )


    return(
        <Box bg="childBackGround" h={900}>
        <HStack alignItems="center" justifyContent="space-around" mb="30" bg="secondary" h={150} pt={50}>
            <Text color="white" onPress={()=>setShowModal(false)}>Cancel</Text>
            <Heading size="lg" color="white">Profile</Heading>
            <Text color="white">Save</Text>
        </HStack>

        <Text fontSize={19} pl={5} mt={4}>My Eggs</Text>
        <FlatGrid data={exampleArray} renderItem={
            ({item})=>(
                <Center mt={2} alignItems="center" >
                    
                        <HStack alignItems="center" w="100%">
                            {item.icon}
                            <Text ml="2">{item.desc}</Text>
                        </HStack>
                </Center>
            )
        }
        // ListHeaderComponent={header}
        ListFooterComponent={footer}
        itemDimension={180}
        />
        <Text>asdfg</Text>
        </Box>
    )
}