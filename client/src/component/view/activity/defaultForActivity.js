import { Button, Center, Image, Text } from "native-base";


export default function DefaultForActivity(){

    return (
        <Center>
        <Image 
        source={{
            uri : "https://wallpaperaccess.com/full/317501.jpg"
        }} resizeMode={"contain"} borderRadius={100} alt="Alternate Text" size={350}
        />
        <Text w="80%" fontSize="15" mt="7" lineHeight="25" textAlign="center">Assign a task, make your kids responsible Help them to be punctual, neat and commited</Text>
        <Button w="80%" mt="9" p="7" borderRadius="10">Check Suggested Tasks</Button>
        </Center>
    ) 
}