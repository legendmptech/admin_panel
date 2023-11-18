import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { createId } from "../../functions/utility";

function AEPModal(props) {
  const {
    id,
    type,
    title,
    desc,
    start,
    end,
    company,
    url,
    isAEPModalOpen,
    onAEPModalOpenChange,
    projects,
    experiences,
    achievements,
    setProjects,
    setExperiences,
    setAchievements,
  } = props;
  const [titleSt, setTitleSt] = useState("");
  const [descSt, setDescSt] = useState("");
  const [companySt, setCompanySt] = useState("");
  const [urlSt, setUrlSt] = useState("");
  const [startSt, setStartSt] = useState(dayjs());
  const [endSt, setEndSt] = useState(dayjs());

  const handleSavePress = () => {
    let projData = {
      type,
      title: titleSt,
      desc: descSt,
      ...(urlSt && { url: urlSt }),
      start: startSt.format("YYYY"),
      end: endSt.format("YYYY"),
    };
    let expData = {
      type,
      title: titleSt,
      desc: descSt,
      company: companySt,
      start: startSt.format("YYYY"),
      end: endSt.format("YYYY"),
    };
    let achieveData = {
      type,
      title: titleSt,
      url: urlSt ? urlSt : "",
      ...(urlSt && { url: urlSt }),
      desc: descSt,
    };
    if (!id) {
      const newId = createId();
      if (type === "project") {
        let projList = projects["list"];
        let projDic = projects["data"];
        projDic[newId] = projData;
        projList.push(newId);
        setProjects({ list: projList, data: projDic });
      } else if (type === "experience") {
        let expList = experiences["list"];
        let expDic = experiences["data"];
        expDic[newId] = expData;
        expList.push(newId);
        setExperiences({ list: expList, data: expDic });
      } else if (type === "achievement") {
        if (urlSt !== undefined) {
          achieveData["url"] = urlSt;
        }
        let achieveList = achievements["list"];
        let achieveDic = achievements["data"];
        achieveDic[newId] = achieveData;
        achieveList.push(newId);
        setAchievements({ list: achieveList, data: achieveDic });
      }
    } else {
      let ProState = projects["data"];
      let ExpState = experiences["data"];
      let AchieveState = achievements["data"];

      if (type === "project") {
        ProState[id] = projData;
        setProjects({ ...projects, data: ProState });
      } else if (type === "experience") {
        ExpState[id] = expData;
        setExperiences({ ...experiences, data: ExpState });
      } else if (type === "achievement") {
        AchieveState[id] = achieveData;
        console.log(achieveData);
        setAchievements({ ...experiences, data: AchieveState });
      }
    }
  };
  useEffect(() => {
    if (isAEPModalOpen === true && id !== undefined) {
      setTitleSt(title);
      setDescSt(desc);
      setCompanySt(company);
      setUrlSt(url);
      setStartSt(dayjs(start));
      setEndSt(dayjs(end));
    } else if (isAEPModalOpen === false) {
      setTitleSt("");
      setCompanySt("");
      setDescSt("");
      setUrlSt("");
      setStartSt(dayjs());
      setEndSt(dayjs());
    }
    console.log("Hello");
  }, [isAEPModalOpen, id, title, desc, company, url, start, end]);
  return (
    <>
      <Modal
        isOpen={isAEPModalOpen}
        onOpenChange={onAEPModalOpenChange}
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{type}</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  isRequired
                  label={"Title"}
                  placeholder={`Enter ${
                    type === "experience" ? "job/internship" : type
                  } title`}
                  variant="flat"
                  value={titleSt}
                  onValueChange={(value) => setTitleSt(value)}
                />
                {type === "experience" ? (
                  <Input
                    label={"Company Name"}
                    placeholder={`Enter Company Title`}
                    variant="flat"
                    value={companySt}
                    onValueChange={(value) => setCompanySt(value)}
                    isRequired
                  />
                ) : (
                  <Input
                    label={"URL"}
                    placeholder={`Place URL`}
                    variant="flat"
                    value={urlSt}
                    onValueChange={(value) => setUrlSt(value)}
                    type={"url"}
                  />
                )}
                <Textarea
                  label="Description"
                  placeholder=""
                  className="max-w-xs"
                  value={descSt}
                  onValueChange={setDescSt}
                />
                {type !== "achievement" && (
                  <div className="flex flex-row gap-2 border-r-1 border-dotted">
                    <DatePicker
                      label={"Start year"}
                      views={["month", "year"]}
                      value={startSt}
                      onChange={setStartSt}
                    />
                    <DatePicker
                      label="End year"
                      views={["month", "year"]}
                      value={endSt}
                      onChange={setEndSt}
                    />
                  </div>
                )}
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

export default AEPModal;
