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
import { useSelector } from "react-redux";
import { getClientProps } from "../../store/clients";
import dayjs from "dayjs";

export default function ClientSTModal(props) {
  const { isOpen, onOpenChange } = props;
  const prop = useSelector(getClientProps);

  // SERVICE PROP
  const [name, setName] = useState("");
  const [serviceIdSt1, setServiceIdSt1] = useState("");
  // const [services, setServices] = useState({});
  // const [transactions, setTransactions] = useState({});
  const [_id, _setId] = useState("");
  const [typeSt, setTypeSt] = useState("");
  const [amountSt, setAmountSt] = useState(0);
  const [startDateSt, setStartDateSt] = useState("");
  const [nextRenewDateSt, setNextRenewDateSt] = useState("");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              {prop?.type === "service" ? (
                <ModalBody>
                  <Input
                    label={"Enter Name"}
                    placeholder={"Enter the name of Client"}
                    value={name}
                    onValueChange={(text) => setName(text)}
                    variant="bordered"
                  />
                  <Input
                    label={"Enter Name"}
                    placeholder={"Enter the name of Client"}
                    value={serviceIdSt1}
                    onValueChange={(text) => setServiceIdSt1(text)}
                    variant="bordered"
                  />
                  <Input
                    label={"Enter Name"}
                    placeholder={"Enter the name of Client"}
                    value={name}
                    onValueChange={(text) => setName(text)}
                    variant="bordered"
                  />
                  <Input
                    label={"Enter Name"}
                    placeholder={"Enter the name of Client"}
                    value={name}
                    onValueChange={(text) => setName(text)}
                    variant="bordered"
                  />
                  <Input
                    label={"Enter Name"}
                    placeholder={"Enter the name of Client"}
                    value={name}
                    onValueChange={(text) => setName(text)}
                    variant="bordered"
                  />
                </ModalBody>
              ) : (
                <ModalBody></ModalBody>
              )}
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
