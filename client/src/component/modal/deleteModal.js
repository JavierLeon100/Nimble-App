import { Button, Center, HStack, Modal, Text } from "native-base";



export default function DeleteModal({setShowDeleteModal, deleteTask}){

    return (
        <Modal.Content bg="backGroundModal">
                <Center>
                <Modal.Header>Are You sure to delete?</Modal.Header>
                </Center>
            <Modal.Body >
                <Center>
                    <HStack space="5">
                        <Button onPress={deleteTask} bg="primary.blue" _text={
                        {
                            color : "white",
                        }
                    }>Delete</Button>
                        <Button onPress={()=>setShowDeleteModal(false)} bg="primary.blue" _text={
                        {
                            color : "white",
                        }
                    }>Cancel</Button>
                    </HStack>
                </Center>
            </Modal.Body>
        </Modal.Content>
    )
}