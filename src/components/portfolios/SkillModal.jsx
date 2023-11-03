import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
const SkillModal = (props) => {
  const { isSkillOpen, onSkillOpenChange, skills, setSkills, category } = props;
  const [title, setTitle] = useState("");
  const handleSavePress = () => {
    let lis = skills[category];
    lis.push(title);
    setSkills({ ...skills, category: lis });
    setTitle("");
  };
  return (
    <Modal
      isOpen={isSkillOpen}
      onOpenChange={onSkillOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new Skill
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                label={"Title"}
                placeholder={`Enter the skill`}
                variant="flat"
                value={title}
                onValueChange={(value) => setTitle(value)}
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

export default SkillModal;
