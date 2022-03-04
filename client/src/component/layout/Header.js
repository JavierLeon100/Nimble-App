import { Avatar, Box, Heading, HStack,Text } from 'native-base'
import { StatusBar } from 'native-base'
import { colors } from '../../utilis/colors'


export default function Header(){

    const uriForImg = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

    return (
        <>
        <StatusBar barStyle={colors.black}/>
        <Box safeAreaTop w="100%" >
        <HStack  py={10} alignItems='center' space="4"  justifyContent="space-around">
          <Heading color={colors.black} >
            Tasks
          </Heading>
          <Avatar source={
              {
                  uri : uriForImg
              }
          } />
        </HStack>
      </Box>
        </>
    )
}