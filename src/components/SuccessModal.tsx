import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Button
} from '@chakra-ui/react'

import Picture from '@/assets/QmYWh1YF9xQZAMx5AQH9W1Hd7G2QneZsZ5ufCE1LvEJwBM.jpg'
export const SuccessModal = ({isOpen, onOpen, onClose}:
     {isOpen: boolean,onOpen: () => void, onClose: () => void}) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Success</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={Picture} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}