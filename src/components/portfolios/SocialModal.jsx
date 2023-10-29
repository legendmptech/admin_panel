import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { createId } from "../../functions/utility";
const SocialModal = (props) => {
  const { isSocialOpen, onSocialOpenChange, state, setState } = props;
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const handleSavePress = () => {
    let newState = state;
    let id = createId();
    newState.push({ label: label, url: url, id });
    setState(newState);
    setLabel("");
    setUrl("");
  };
  return (
    <Modal
      isOpen={isSocialOpen}
      onOpenChange={onSocialOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new Social Link
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                label={"Label of the Link"}
                placeholder={`Enter the label name`}
                variant="flat"
                value={label}
                onValueChange={(value) => setLabel(value)}
              />
              <Input
                isRequired
                label={"URL"}
                placeholder={`Place URL`}
                variant="flat"
                value={url}
                onValueChange={(value) => setUrl(value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  handleSavePress();
                  onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SocialModal;
