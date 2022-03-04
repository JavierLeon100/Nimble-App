
import { Center, FormControl,  Heading,  HStack,  ScrollView, StatusBar, Text, VStack, Input, Stack, Button, Box, Flex, FlatList, Pressable} from "native-base"
import {Link} from "react-native"
import { colors } from "../utilis/colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatGrid } from "react-native-super-grid";

export default function EditChildProfile({showModal, changeMode}){

    const badgeIocn = <AntDesign name="Trophy" size={40} color="black" />
    const badgeName = <Text w="90" ml="10">Badged name is here</Text>

    const exampleArray = [
        {
            icon : badgeIocn,
            Button : badgeName
        },
        {
            icon : badgeIocn,
            Button : badgeName
        },
        {
            icon : badgeIocn,
            Button : badgeName
        },
        {
            icon : badgeIocn,
            Button : badgeName
        }
    ]

    const header = ()=>(
        <>
        <VStack safeArea mt="5">     
        <HStack w="100%" justifyContent="space-around" alignItems="center">
            <Pressable onPress={changeMode}>
            <MaterialCommunityIcons name="less-than" size={24} color="black" />
            </Pressable>
            <Heading>Profile</Heading>
            <FontAwesome5 name="edit" size={24} color="black"/>
        </HStack>  
        </VStack>

        <Center mt="5">
                <AntDesign name="user" size={50} color="black" />
                <Text mt="3">Level 10</Text>
        </Center>

            <FormControl w="100%" mt="4">
            <Center>
                <HStack alignItems="center" justifyContent="space-around">
                    <FormControl.Label>
                        <Text fontSize="18" mr="3">Name</Text>
                    </FormControl.Label>
                    <Input placeholder="Name" w="60%" p="6"/> 
                </HStack>
            </Center>
            </FormControl>

            <FormControl w="100%" mt="4">
            <Center>
                <HStack alignItems="center" justifyContent="space-around">
                    <FormControl.Label>
                        <Text fontSize="18" mr="3">Birthday</Text>
                    </FormControl.Label>
                    <Input placeholder="Birthday" w="60%" p="6"/> 
                </HStack>
            </Center>
            </FormControl>
            <Text fontWeight="bold" fontSize="lg" textAlign="center" my="7">Badges unlocked</Text>
    </>)

    const footer =()=>(
        <>
        <Center mb="20">
            <Text fontWeight="bold" fontSize="lg" textAlign="center">Stats</Text>
            <HStack justifyContent="space-around" w="100%">
                <Text fontSize="16">Current Week</Text>
                <Text fontSize="16">Current Month</Text>
            </HStack>

            <HStack textAlign="center">
                <VStack p="5">
                    <Text p="2">Task completed:  10/25</Text>
                    <Text p="2">Rewards redeemed:  5/8</Text>
                </VStack>

                <VStack p="5">
                    <Text p="2">Task completed:  10/25</Text>
                    <Text p="2">Rewards redeemed:  5/8</Text>
                </VStack>
            </HStack>

        
            <Button bg={colors.black} h="20" w="80" borderRadius="10" onPress={showModal}>Close</Button>
        </Center>
    </>
    )

    return (
            

                
                    
                        <FlatGrid 
                        ListHeaderComponent={header}
                        ListFooterComponent={footer}
                        itemDimension={180}
                        spacing={18}
                        data={exampleArray}
                        renderItem={
                            ({item})=>(
                                <Center>
                                    <HStack justifyContent="space-around" p="3" w="150">
                                    {item.icon}
                                    {item.Button}
                                    </HStack>
                                </Center>
                            )
                        }
                        />

                    
                
    )
}