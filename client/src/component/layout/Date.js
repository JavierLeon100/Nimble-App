import { Center, Text } from "native-base";
import  dayjs from 'dayjs'
import { useState } from "react";

export default function Date(){
    return (
        <Center my="9">
            <Text>{dayjs().format("MMM D - ddd")}</Text>
        </Center>
    )
}