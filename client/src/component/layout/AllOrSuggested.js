import { Box, Button, Center, HStack, Text } from "native-base";
import { useState } from "react";
import { colors } from "../utilis/colors";

export default function AllOrSuggested(props) {
    const { showSuggested } = props;
    const { setShowSuggested } = props;

    return (
        <Center mt="9">
            <Button.Group isAttached colorScheme="indigo" borderRadius="35">
                <Button
                    w={40}
                    variant={showSuggested ? "outline" : null}
                    onPress={() => setShowSuggested(false)}
                    borderRightWidth={0}
                    p={6}
                >
                    All Tasks
                </Button>
                <Button
                    w={40}
                    variant={!showSuggested ? "outline" : null}
                    onPress={() => setShowSuggested(true)}
                    borderLeftWidth={0}
                >
                    Suggested Tasks
                </Button>
            </Button.Group>
        </Center>
    );
}
