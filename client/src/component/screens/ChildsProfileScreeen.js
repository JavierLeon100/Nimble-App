import { Heading, Input, Text, View, Image, Center, VStack, ScrollView, FormControl, Stack, HStack, Button} from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

const ChildsProfileScreen = ({navigation}) => {
    return (

        <>

        <ScrollView >
            <Center>
            <VStack mt={5} w="90%" justifyContent="center">
                <FormControl>
                    <Stack mb="5">
                        <FormControl.Label>What is your name ?</FormControl.Label>
                        <Input p={2} placeholder="Edward Cullens" p="6" borderRadius="10"/>
                    </Stack>

                    <Stack mb="5">
                        <FormControl.Label>What is your birthday ?</FormControl.Label>
                        <Input p={2} placeholder="April 9, 2002" p="6" borderRadius="10"/>
                    </Stack>

                    <VStack mb="5">
                    <FormControl.Label>Pick an Avatar</FormControl.Label>
                        <HStack space="2">
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        <AntDesign name="user" size={24} color="black" />
                        </HStack>
                    </VStack>



                </FormControl>

                <Button>Next</Button>
                       
            </VStack>

        </Center>

      

            
        
        </ScrollView>

  
           
       

        </>
    );
};

export default ChildsProfileScreen; 

