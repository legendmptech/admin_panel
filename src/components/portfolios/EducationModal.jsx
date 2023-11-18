import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { DatePicker } from "@mui/x-date-pickers";
import { createId } from "../../functions/utility";

function EducationModal(props) {
  const {
    id,
    type,
    percent,
    place,
    std,
    degree,
    branch,
    start,
    end,
    isEducationOpen,
    onEducationOpenChange,
    educationList,
    setEducationList,
  } = props;
  const [placeSt, setPlaceSt] = useState("");
  const [percentSt, setPercentSt] = useState("");
  const [stdSt, setStdSt] = useState("");
  const [degreeSt, setDegreeSt] = useState("");
  const [branchSt, setBranchSt] = useState("");
  const [startSt, setStartSt] = useState(dayjs());
  const [endSt, setEndSt] = useState(dayjs());
  useEffect(() => {
    if (isEducationOpen && id !== undefined) {
      setPlaceSt(place);
      setPercentSt(percent);
      setStdSt(std);
      setDegreeSt(degree);
      setBranchSt(branch);
      setStartSt(dayjs(start));
      setEndSt(dayjs(end));
    } else if (isEducationOpen === false) {
      setPlaceSt("");
      setPercentSt("");
      setStdSt("");
      setDegreeSt("");
      setBranchSt("");
      setStartSt(dayjs(start));
      setEndSt(dayjs(end));
    }
  }, [isEducationOpen, id, place, percent, std, degree, branch, start, end]);
  // const standardList = type === "school" ? uiData.std : uiData.degree;
  const handleSavePress = () => {
    let data =
      type === "school"
        ? {
            type,
            place: placeSt,
            std: stdSt,
            percent: percentSt,
            start: startSt.format("YYYY"),
          }
        : {
            type,
            place: placeSt,
            degree: degreeSt,
            percent: percentSt,
            branch: branchSt,
            start: startSt.format("YYYY"),
            end: endSt.format("YYYY"),
          };
    if (!id) {
      const newId = createId();
      let eduList = educationList["list"];
      let eduDic = educationList["data"];
      eduDic[newId] = data;
      eduList.push(newId);
      setEducationList({ list: eduList, data: eduDic });
    } else {
      const eduState = educationList["data"];
      eduState[id] = data;
      setEducationList({ ...educationList, data: eduState });
    }
    setPlaceSt("");
    setDegreeSt("");
    setBranchSt("");
    setStdSt("");
    setStartSt(dayjs());
    setEndSt(dayjs());
    setPercentSt(0);
  };
  return (
    <>
      <Modal
        isOpen={isEducationOpen}
        onOpenChange={onEducationOpenChange}
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Education Qualification
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label={type === "school" ? "School" : "College"}
                  placeholder={
                    type === "school"
                      ? "Enter School Name"
                      : "Enter College Name"
                  }
                  value={placeSt}
                  onValueChange={(text) => setPlaceSt(text)}
                  variant="flat"
                />
                <div className="flex flex-row gap-1 flex-shrink">
                  {/* <Select
                    isRequired
                    label={type === "school" ? "Standard" : "Degree"}
                    placeholder={
                      type === "school"
                        ? "Select your Class"
                        : "Select your Degree"
                    }
                    className="max-w-xs"
                    selectedKeys={type === "school" ? stdSt : degreeSt}
                    onSelectionChange={
                      type === "school" ? setStdSt : setDegreeSt
                    }
                  >
                    {standardList?.map((data) => (
                      <SelectItem key={data.value} value={data.value}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </Select> */}
                  <Input
                    label={type === "school" ? "Standard" : "Degree"}
                    placeholder={
                      type === "school"
                        ? "Select your Class"
                        : "Select your Degree"
                    }
                    value={type === "school" ? stdSt : degreeSt}
                    onValueChange={type === "school" ? setStdSt : setDegreeSt}
                    variant="flat"
                  />
                  <Input
                    type="number"
                    isRequired
                    label="Enter percentage"
                    placeholder="100.00"
                    max={100}
                    min={0}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    value={percentSt}
                    onValueChange={setPercentSt}
                  />
                </div>
                {type !== "school" && (
                  <Input
                    isRequired
                    label="Branch"
                    placeholder="Example : Mathematics, Electical and Electronics"
                    value={branchSt}
                    onValueChange={setBranchSt}
                  />
                )}
                <div className="flex flex-row gap-2 border-r-1 border-dotted">
                  <DatePicker
                    label={"Start year"}
                    views={["year"]}
                    value={startSt}
                    onChange={(date) => setStartSt(date)}
                  />
                  {type !== "school" && (
                    <DatePicker
                      label="End year"
                      views={["year"]}
                      value={endSt}
                      onChange={(date) => setEndSt(date)}
                    />
                  )}
                </div>
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
    </>
  );
}

export default EducationModal;
