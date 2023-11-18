import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
export default function ClientInfoModal(props) {
  const { isClientInfoOpen, onClientInfoOpenChange } = props;
  const [name, setName] = useState("");
  const [emailSt, setEmailSt] = useState("");
  const [clientId, setClientId] = useState("");
  return (
    <>
      <Modal
        isOpen={isClientInfoOpen}
        onOpenChange={onClientInfoOpenChange}
        placement="top-center"
        isDismissable={false}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  //   startContent={
                  //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  //   }
                  label="Email"
                  placeholder="Enter your email"
                  value={emailSt}
                  onValueChange={setEmailSt}
                  variant="bordered"
                />
                {/* <Button variant="shadow" color="primary">
                  check
                </Button> */}
                <Input
                  label={"Enter Name"}
                  placeholder={"Enter the name of Client"}
                  value={name}
                  onValueChange={(text) => setName(text)}
                  variant="bordered"
                />
                <Input
                  label={"ClientId"}
                  placeholder={"Create Client ID"}
                  value={clientId}
                  onValueChange={(text) => setClientId(text)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
