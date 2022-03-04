import { Center, FormControl,  Heading,  HStack,  ScrollView, StatusBar, Text, VStack, Input, Stack, Button, Box, Flex, FlatList} from "native-base"
import {Link} from "react-native"
import { colors } from "../utilis/colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatGrid } from "react-native-super-grid";




export default function editParentProfile({showModal, changeMode}){

    const userIocn = <AntDesign name="user" size={40} color="black" />
    const editButton = <Button w="90" ml="10" onPress={changeMode}>Edit</Button>

    const exampleArray = [
        {
            icon : userIocn,
            Button : editButton
        },
        {
            icon : userIocn,
            Button : editButton
        },
        {
            icon : userIocn,
            Button : editButton
        },
        {
            icon : userIocn,
            Button : editButton
        }
    ]

    const header = ()=>(
    <>
        <VStack safeArea mt="5">     
        <HStack w="100%" justifyContent="space-around" alignItems="center">
            <MaterialCommunityIcons name="less-than" size={24} color="white" style={{visibility : "hidden"}}/>
            <Heading>Profile</Heading>
            <FontAwesome5 name="edit" size={24} color="black"/>
        </HStack>  
        </VStack>

        <Center mt="5">
        <AntDesign name="user" size={50} color="black" />
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
                        <Text fontSize="18" mr="3">Email</Text>
                    </FormControl.Label>
                    <Input placeholder="Email" w="60%" p="6"/> 
                </HStack>
            </Center>
            </FormControl>

            <FormControl w="100%" mt="4">
            <Center>
                <HStack alignItems="center" justifyContent="space-around">
                    <FormControl.Label>
                        <Text fontSize="18"  ml="-19">Password</Text>
                    </FormControl.Label>
                    <Input placeholder="Password" w="60%" p="6"/> 
                </HStack>
            </Center>
            </FormControl>

            <Center mt="6">
                <Flex w="80%" alignItems="flex-end">
                <Text underline >Change Password</Text>
                </Flex>
            </Center>
            
            <Text fontWeight="bold" fontSize="lg" textAlign="center" my="3">Children</Text>
    </>)

    const footer = ()=>(
        <Center>
        <Button bg={colors.black} h="20" w="80" borderRadius="10" onPress={showModal}>Close</Button>
        </Center>
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