import { Text, VStack, Image, HStack, Center } from "native-base";
import { colors } from "../../utilis/colors";
import { AntDesign } from '@expo/vector-icons';

export default function({reward}){

    return (
         <VStack bg={colors.gray} borderRadius="10" py="5">
             <Center>
                <Text textAlign="left" w="80%">{reward}</Text>
                <Image source={{uri : "https://wallpaperaccess.com/full/317501.jpg"}} alt="alt" size={100} resizeMode={"contain"} borderRadius={100} mt="2"/>
                <HStack justifyContent="center" space="1" mt="4">
                    <Text>2000pts</Text>
                    <AntDesign name="staro" size={24} color="black" />
                </HStack>
             </Center>
         </VStack>
    ) 
}