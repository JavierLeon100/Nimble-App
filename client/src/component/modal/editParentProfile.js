import { Center, FormControl,  Heading,  HStack,  ScrollView, StatusBar, Text, VStack, Input, Stack, Button, Box, Flex, FlatList} from "native-base"
import {Link, Pressable} from "react-native"
import { colors } from "../utilis/colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatGrid } from "react-native-super-grid";
import { useForm, Controller } from "react-hook-form";
import SvgUri from 'react-native-svg-uri-updated';




export default function editParentProfile({showModal, changeMode}){

    const userIocn = <SvgUri source={require("../../../assets/profileIcons/ProfileIcon.svg")} height={40} width={40} alignSelf="flex-start"/>


    const { handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues : {
            title : ""
        }
    });

    const exampleArray = [
        {
            icon : userIocn,
            childName : "Joe"
        },
        {
            icon : userIocn,
            childName : "Angelina"
        },
        {
            icon : userIocn,
            childName : "Stephen"
        },
        {
            icon : userIocn,
            childName : "Harry"
        }
    ]

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

                        <Text fontSize="16" opacity="0.7" mb={2} mt={2}>Email</Text>
                        <Controller 
                            control={control}
                            render={({ field: { onChange, onBlur, value } })=>(
                                <Input p={4} placeholder="email" borderRadius="10" 
                                onChangeText={onChange} value={value} bg="white"/>
                            )}
                            name = "email"
                            />

                        <Text fontSize="16" opacity="0.7" mb={2} mt={2}>Password</Text>
                        <Controller 
                            control={control}
                            render={({ field: { onChange, onBlur, value } })=>(
                                <Input p={4} placeholder="password" borderRadius="10" 
                                onChangeText={onChange} value={value} bg="white" type="password"/>
                            )}
                            name = "password"
                            />
                        
                        <Text alignSelf="flex-end" mt={3} color="gradientBlue" underline>Change Password</Text>


                    <Text alignSelf="flex-start" fontSize="16" opacity="0.7">Kids</Text>
                    </VStack>
                    </Center>
        </>
    )

    const footer = ()=>(
        <Center mt="3">
            <VStack w="80%" justifyContent="center" alignItems="center" space="10">
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
    )

    return (    
        <Box bg="backGroundModal" h={900}> 
            <HStack alignItems="center" justifyContent="space-around" mb="30" bg="primary.blue" h={150} pt={50}>
                        <Text color="white" onPress={()=>showModal(false)}>Cancel</Text>
                        <Heading size="lg" color="white">Profile</Heading>
                        <Text color="white">Save</Text>
            </HStack>
                    <FlatGrid data={exampleArray} renderItem={
                        ({item})=>(
                            <Center mt={2} alignItems="center" >
                                <Button bg="backGroundModal" onPress={changeMode} colorScheme="indigo">
                                    <HStack w="40" alignItems="center">
                                        {item.icon}
                                        <Text ml="7">{item.childName}</Text>
                                    </HStack>
                                </Button>
                            </Center>
                        )
                    }
                    ListHeaderComponent={header}
                    ListFooterComponent={footer}
                    itemDimension={180}
                    />
          
    </Box> 
    )
}