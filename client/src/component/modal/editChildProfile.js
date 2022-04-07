
import { Center, FormControl,  Heading,  HStack,  ScrollView, StatusBar, Text, VStack, Input, Stack, Button, Box, Flex, FlatList, Pressable} from "native-base"
import {Link} from "react-native"
import { colors } from "../utilis/colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatGrid } from "react-native-super-grid";
import { useForm, Controller } from "react-hook-form";
import SvgUri from 'react-native-svg-uri-updated';


export default function EditChildProfile({user, showModal, changeMode}){

    const { handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues : {
            title : ""
        }
    });

    const BadgeIcon = <SvgUri source={require("../../../assets/profileIcons/badgeIcon.svg")} height={40} width={40}/>

    const exampleArray = [
        {
            icon : BadgeIcon,
            badgeName: "All weekly tasks"
        },
        {
            icon : BadgeIcon,
            badgeName : "Redeemed 10 gifts"
        },
        {
            icon : BadgeIcon,
            badgeName : "Reached level 10"
        },
        {
            icon : BadgeIcon,
            badgeName : "Redeemed 30 gifts"
        }
    ]

    
    const header = ()=>(
        <>
                <Center mb={2}>
                    <VStack w="80%">
                        <Text fontSize="16" opacity="0.7" mb={2}>Name</Text>
                        <Text>{user}</Text>
                       
                        <Text fontSize="16" opacity="0.7" mb={2} mt={2}>Birthday</Text>
                        <Controller 
                            control={control}
                            render={({ field: { onChange, onBlur, value } })=>(
                                <Input p={4} placeholder="April 9, 2009" borderRadius="10" 
                                onChangeText={onChange} value={value} bg="white"/>
                            )}
                            name = "birthday"
                            />
                        <Text alignSelf="flex-start" fontSize="16" opacity="0.7" mt={8}>Unlocked Badges</Text>
                    </VStack>
                    </Center>
        </>
    )

    const footer =()=>(
        <>
        <Center mb="20" >
            <VStack w="90%">
            <Text  alignSelf="flex-start" fontSize="16" opacity="0.7" ml="3">Status</Text>
            <HStack justifyContent="space-around" w="100%" mt="2">
                <VStack bg="white" p="2" borderRadius="10">
                    <Text fontSize="16" opacity="0.7">Current Week</Text>
                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Tasks Completed:</Text>
                        <Text fontSize="13" ml="2">10/25</Text>
                    </HStack>

                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Rewards Redeemed: :</Text>
                        <Text fontSize="13" ml="2">5/8</Text>
                    </HStack>
                    
                </VStack>

                <VStack bg="white" p="2" borderRadius="10">
                    <Text fontSize="16" opacity="0.7">Current Week</Text>
                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Tasks Completed:</Text>
                        <Text fontSize="13" ml="2">10/25</Text>
                    </HStack>

                    <HStack justifyContent="space-around" mt="2">
                        <Text fontSize="13">Rewards Redeemed: :</Text>
                        <Text fontSize="13" ml="2">5/8</Text>
                    </HStack>
                    
                </VStack>
            </HStack>

            
            </VStack>
        
            <VStack w="80%" justifyContent="center" alignItems="center" space="5" mt="3">
                <Text underline color="red" fontSize="md">Delete Account</Text>
                <Button size="lg" colorScheme="indigo" w="350" borderRadius="90" title="submit" bg="secondary" py="3"  _text={
                        {
                            color : "white",
                        }
                    }>
                            Save
                        </Button>
            </VStack>
        </Center>
    </>
    )

    return (
        <Box bg="backGroundModal" h={900}> 
        <HStack alignItems="center" justifyContent="space-around" mb="30" bg="primary.blue" h={150} pt={50}>
                    <Pressable onPress={changeMode}>
                        <MaterialCommunityIcons name="less-than" size={30} color="white" />
                    </Pressable>
                    <Heading size="lg" color="white">Profile</Heading>
                    <Text color="white">Save</Text>
        </HStack>
                        <FlatGrid 
                        ListHeaderComponent={header} 
                        ListFooterComponent={footer}
                        itemDimension={180}
                        spacing={18}
                        data={exampleArray}
                        renderItem={
                            ({item})=>(
                                <Center>
                                    <HStack justifyContent="space-around" p="3" w="190" alignItems="center">
                                    {item.icon}
                                    <Text>{item.badgeName}</Text>
                                    </HStack>
                                </Center>
                            )
                        }
                        />
        </Box>
    )
}