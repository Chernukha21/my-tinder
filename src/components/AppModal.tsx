import {ReactNode} from "react";
import {ButtonProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button} from "@heroui/react";

type Props = {
    isModalOpen: boolean,
    onClose: () => void,
    body: ReactNode,
    header?: string,
    footerButtons?: ButtonProps[],
    imageModal?: boolean
}

const AppModal = ({isModalOpen, footerButtons, header, onClose, body, imageModal}: Props) => {

    const handleClose = () => {
        setTimeout(() => onClose(), 300);
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
            placement="top-center"
            classNames={{
                base: `${imageModal ? 'border-2 border-white' : ''}`,
                body: `${imageModal ? 'p-0' : ''}`
            }}
            motionProps={{
                variants: {
                    enter: {opacity: 1, y: 0, transition: {duration: 0.3}},
                    exit: {opacity: 0, y: 100, transition: {duration: 0.2}}
                }
            }}
        >
            <ModalContent>
                {!imageModal &&
                    <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>}
                <ModalBody>{body}</ModalBody>
                {!imageModal && <ModalFooter>
                    {footerButtons && footerButtons.map((props: ButtonProps, index) => (
                        <Button {...props} key={index}>
                            {props.children}
                        </Button>
                    ))}
                </ModalFooter>}
            </ModalContent>
        </Modal>
    );
};

export default AppModal;