
import { Center, FormControl,  Heading,  HStack,  ScrollView, StatusBar, Text, VStack, Input, Stack, Button, Box, Flex, FlatList, Pressable} from "native-base"
import {Link} from "react-native"
import { colors } from "../utilis/colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatGrid } from "react-native-super-grid";
import { useForm, Controller } from "react-hook-form";
import SvgUri from 'react-native-svg-uri-updated';


export default function EditChildProfile({showModal, changeMode}){

    const { handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues : {
            title : ""
        }
    });

    const badgeIocn = <SvgUri source={require("../../../assets/profileIcons/badgeIcon.svg")} height={40} width={40}/>
    const badgeName = <Text w="90" ml="10">name is here</Text>

    const exampleArray = [
        {
            icon : badgeIocn,
            badgeName: "All weekly tasks"
        },
        {
            icon : badgeIocn,
            badgeName : "Redeemed 10 gifts"
        },
        {
            icon : badgeIocn,
            badgeName : "Reached level 10"
        },
        {
            icon : badgeIocn,
            badgeName : "Redeemed 30 gifts"
        }
    ]

    // const header = ()=>(
    //     <>
    //     <VStack safeArea mt="5">     
    //     <HStack w="100%" justifyContent="space-around" alignItems="center">
    //         <Pressable onPress={changeMode}>
    //         <MaterialCommunityIcons name="less-than" size={24} color="black" />
    //         </Pressable>
    //         <Heading>Profile</Heading>
    //         <FontAwesome5 name="edit" size={24} color="black"/>
    //     </HStack>  
    //     </VStack>

    //     <Center mt="5">
    //             <AntDesign name="user" size={50} color="black" />
    //             <Text mt="3">Level 10</Text>
    //     </Center>

    //         <FormControl w="100%" mt="4">
    //         <Center>
    //             <HStack alignItems="center" justifyContent="space-around">
    //                 <FormControl.Label>
    //                     <Text fontSize="18" mr="3">Name</Text>
    //                 </FormControl.Label>
    //                 <Input placeholder="Name" w="60%" p="6"/> 
    //             </HStack>
    //         </Center>
    //         </FormControl>

    //         <FormControl w="100%" mt="4">
    //         <Center>
    //             <HStack alignItems="center" justifyContent="space-around">
    //                 <FormControl.Label>
    //                     <Text fontSize="18" mr="3">Birthday</Text>
    //                 </FormControl.Label>
    //                 <Input placeholder="Birthday" w="60%" p="6"/> 
    //             </HStack>
    //         </Center>
    //         </FormControl>
    //         <Text fontWeight="bold" fontSize="lg" textAlign="center" my="7">Badges unlocked</Text>
    // </>)

    const header = ()=>(
        <>
                <Center mb={2}>
                    <VStack w="80%">
                        <Text fontSize="16" opacity="0.7" mb={2}>Name</Text>
                        <Controller 
                            control={control}
                            render={({ field: { onChange, onBlur, value } })=>(
                                <Input p={4} placeholder="Name" borderRadius="10" 
                                onChangeText={onChange} value={value} bg="white"/>
                            )}
                            name = "name"
                            />

                        <Text fontSize="16" opacity="0.7" mb={2} mt={2}>Birthday</Text>
                        <Controller 
                            control={control}
                            render={({ field: { onChange, onBlur, value } })=>(
                                <Input p={4} placeholder="email" borderRadius="10" 
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
                <Button size="lg"   w="350" borderRadius="90" title="submit" bg="secondary" py="3"  _text={
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