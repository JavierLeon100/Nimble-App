import {
    Center,
    FormControl,
    Heading,
    HStack,
    ScrollView,
    StatusBar,
    Text,
    VStack,
    Input,
    Stack,
    Button,
    Box,
    Flex,
    FlatList,
} from "native-base";
import { Link, Pressable } from "react-native";
import { colors } from "../utilis/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FlatGrid } from "react-native-super-grid";
import { useForm, Controller } from "react-hook-form";
import SvgUri from "react-native-svg-uri-updated";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_CHILDREN } from "../../GraphQL/Queries";
import { useEffect, useState } from "react";

export default function editParentProfile({ user, showModal, changeMode }) {


    const [children, setChildren] = useState([]);
    console.log(children);
    console.log(childData);
    console.log(childError);
    const userIocn = (
        <SvgUri
            source={require("../../../assets/profileIcons/ProfileIcon.svg")}
            height={40}
            width={40}
            alignSelf="flex-start"
        />
    );

    const {
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            title: "",
        },
    });

    const {
        error: childError,
        loading: childLoading,
        data: childData,
    } = useQuery(GET_CHILDREN, {
        variables: {
            //replace with homeIdVariable from auth
            homeId: "622ab00bfe4e52d96b61a960",
        },
    });

    useEffect(() => {
        childData ? setChildren(childData.getChildren) : null;
    }, [childData]);

    const header = () => (
        <>
            <Center mb={2}>
                <VStack w="80%">
                    <HStack justifyContent="flex-end">
                        <Feather
                            name="edit"
                            size={24}
                            color={colors.primary.blue}
                            opacity="0.5"
                        />
                    </HStack>
                    <Text fontSize="16" opacity="0.7" mb={2}>
                        Name
                    </Text>
                    <Text>{user.name}</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, user, value } }) => (
                            <Input
                                p={4}
                                placeholder="Kaustubh Kashyup"
                                borderRadius="10"
                                onChangeText={onChange}
                                value={value}
                                bg="white"
                                type="name"
                            />
                        )}
                        name="name"
                    />
                    
                    <Text fontSize="16" opacity="0.7" mb={2} mt={2}>
                        Email
                    </Text>

                    <Text>{user.email}</Text>

                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, user, value } }) => (
                            <Input
                                p={4}
                                placeholder="kashyup.kaustubh@gmail.com"
                                borderRadius="10"
                                onChangeText={onChange}
                                value={value}
                                bg="white"
                                type="email"
                            />
                        )}
                        name="email"
                    />
                    

                    <Text fontSize="16" opacity="0.7" mb={2} mt={2}>
                        Password
                    </Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                p={4}
                                placeholder="***********"
                                borderRadius="10"
                                onChangeText={onChange}
                                value={value}
                                bg="white"
                                type="password"
                            />
                        )}
                        name="password"
                    />

                    <Text
                        alignSelf="flex-end"
                        mt={3}
                        color="gradientBlue"
                        underline
                    >
                        Change Password
                    </Text>

                    <Text alignSelf="flex-start" fontSize="16" opacity="0.7">
                        Kids
                    </Text>
                   
                </VStack>
            </Center>
        </>
    );

    const footer = () => (
        <Center mt="3">
            <VStack
                w="80%"
                justifyContent="center"
                alignItems="center"
                space="10"
            >
                <Text underline color="red" fontSize="md">
                    Delete Account
                </Text>
                <Button
                    size="lg"
                    colorScheme="indigo"
                    w="350"
                    borderRadius="90"
                    title="submit"
                    bg="secondary"
                    py="3"
                    _text={{
                        color: "white",
                    }}
                >
                    Save
                </Button>
            </VStack>
        </Center>
    );

    return (
        <Box bg="backGroundModal" h={900}>
            <HStack
                alignItems="center"
                justifyContent="space-around"
                mb="30"
                bg="primary.blue"
                h={150}
                pt={50}
            >
                <Pressable onPress={() => showModal(false)}>
                    <MaterialCommunityIcons
                        name="less-than"
                        size={30}
                        color="white"
                    />
                </Pressable>
                <Heading size="lg" color="white">
                    Profile
                </Heading>
                <SvgUri
                    source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                    height={40}
                    width={40}
                />
            </HStack>
            <FlatGrid
                data={children}
                renderItem={({ item }) => (
                    <Center mt={2} alignItems="center">
                        <Button
                            bg="backGroundModal"
                            onPress={changeMode}
                            colorScheme="indigo"
                        >
                            <HStack w="40" alignItems="center">
                                <SvgUri
                                    source={require("../../../assets/profileIcons/ProfileIcon.svg")}
                                    height={40}
                                    width={40}
                                    alignSelf="flex-start"
                                />
                                <Text ml="7">{item.name}</Text>
                            </HStack>
                        </Button>
                    </Center>
                )}
                ListHeaderComponent={header}
                keyExtractor={(item) => item._id}
                ListFooterComponent={footer}
                itemDimension={180}
            />
        </Box>
    );
}
