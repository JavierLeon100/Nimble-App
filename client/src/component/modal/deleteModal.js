import { Button, Center, HStack, Modal, Text } from "native-base";



export default function DeleteModal({setShowDeleteModal, deleteTask}){

    return (
        <Modal.Content>
                <Modal.Header>Are You sure to delete?</Modal.Header>
            <Modal.Body>
                <Center>
                    <HStack space="5">
                        <Button onPress={deleteTask}>Delete</Button>
                        <Button onPress={()=>setShowDeleteModal(false)}>Cancel</Button>
                    </HStack>
                </Center>
            </Modal.Body>
        </Modal.Content>
    )
}