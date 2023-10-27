import React, { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Chip,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { Textarea, Accordion, AccordionItem } from "@nextui-org/react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { createId } from "../../functions/utility";
import Icon from "../../components/Icon";
import AuthPortfolio from "../../components/portfolios/AuthPortfolio";
import { doc, setDoc } from "firebase/firestore";
import { fstore, portfoliosRef } from "../../configs/firebase-config";

function PortfolioCustomizeSubTab(props) {
  const [selectedSkillTab, setSelectedSkillTab] = useState(2);
  const [selectedSections, setSelectedSections] = useState([1, 2, 3, 4, 5]);

  const [available, setAvailable] = useState(false);
  const [userData, setUserData] = useState({});
  const {
    isOpen: isAEPModalOpen,
    onOpen: onAEPModalOpen,
    onOpenChange: onAEPModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEducationOpen,
    onOpen: onEducationOpen,
    onOpenChange: onEducationOpenChange,
  } = useDisclosure();
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onOpenChange: onSkillOpenChange,
  } = useDisclosure();

  const [currentModalProps, setCurrentModalProps] = useState({});

  //   details
  const [sections, setSections] = useState({
    data: {
      1: "Education details",
      2: "Skill sets",
      3: "Projects",
      4: "Experience",
      5: "Achievements",
    },
    list: [1, 2, 3, 4, 5],
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("8060Moh@");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEduation] = useState({
    list: [1, 2],
    data: {
      1: {
        type: "school",
        place: "Jai Saradha Matric Hr Sec School",
        std: "Class 12",
        percent: 100,
        start: "2021",
      },
      2: {
        type: "college",
        place: "PSG College of Arts & Science",
        degree: "BSC",
        percent: 100,
        start: "2021",
        end: "2024",
        branch: "Mathematics",
      },
    },
  });

  let [skills, setSkills] = useState({
    list: [1, 2, 3],
    data: {},
  });
  let [skillList, setSkillList] = useState([
    {
      id: 1,
      label: "Soft skills",
    },
    {
      id: 2,
      label: "Computer skills",
    },
    {
      id: 3,
      label: "Software skills",
    },
  ]);
  useEffect(() => {
    setSkillList(skillList);
    console.log(selectedSkillTab, skills);
  }, [skills, selectedSkillTab]);

  const [projects, setProjects] = useState({
    list: [],
    data: {},
  });
  const [experiences, setExperiences] = useState({
    list: [],
    data: {},
  });
  const [achievements, setAchievements] = useState({
    list: [],
    data: {},
  });
  const [socialLinks, setSocialLinks] = useState({
    Github: "https://github.com/s-mohan-prasath",
    Instagram: "https://instagram.com/s.mohanprasath",
  });
  useEffect(() => {
    if (available == true) {
      let personalDetails = userData.personalDetails;
      setName(personalDetails.name);
      setEmail(personalDetails.email);
      setAbout(personalDetails.about);
      setEduation(userData.education);
      setProjects(userData.projects);
      setExperiences(userData.experiences);
      setSkills(userData.skills);
      setAchievements(userData.achievements);
      setSocialLinks(userData.socialLinks);
      console.log(name);
    }
  }, [available]);
  const handleGenerateWebsite = async () => {
    const data = {
      personalDetails: {
        name,
        email,
        about,
      },
      projects,
      experiences,
      achievements,
      socialLinks,
      skills,
      sections,
    };
    const docRef = doc(fstore, "portfolios", "s_mohan_prasath");
    console.log(achievements);
    await setDoc(docRef, data)
      .then(() => {
        console.log("success");
        setAvailable(false);
      })
      .catch((e) => console.log(e.message));
  };
  const handleCancelGenerateWebsite = () => {};

  return (
    <>
      <div className="flex flex-row justify-center">
        {available == false ? (
          <div className="flex flex-col" style={{ width: "50%" }}>
            <AuthPortfolio
              setAvailable={setAvailable}
              setUserData={setUserData}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4" style={{ width: "75%" }}>
            <div className="flex flex-col w-full gap-4 content-center">
              <h1>Personal Details</h1>
              <div className="flex flex-row gap-4">
                <Input
                  type="text"
                  label="Name"
                  placeholder="Enter your Name"
                  value={name}
                  onValueChange={(value) => setName(value)}
                />
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your Email"
                  value={email}
                  onValueChange={(value) => setEmail(value)}
                />
              </div>
              <Textarea
                label="A Short Bio"
                placeholder="Enter your bio"
                lableplacement="outside"
                description="Enter a concise bio that attracts others"
                className="max-w-xs"
                value={about}
                onValueChange={(value) => setAbout(value)}
              />
            </div>
            <div className="flex flex-col pt-4 gap-4">
              <h1>Enter your details</h1>
              <Accordion
                variant="shadow"
                defaultExpandedKeys={["1", "2", "3", "4", "5"]}
                selectionMode="multiple"
              >
                <AccordionItem
                  key="1"
                  aria-label="Education details"
                  title="Education details"
                  subtitle={"an optional one for professionals"}
                >
                  <div className="w-full flex flex-col content-start gap-3">
                    {/* CARD CONTAINER */}
                    <div className="flex flex-row flex-wrap px-4 gap-4">
                      {education["list"]?.map((id) => (
                        <EducationCard
                          {...education["data"][id]}
                          id={id}
                          onEducationOpen={onEducationOpen}
                          setCurrentModalProps={setCurrentModalProps}
                        />
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-end gap-4">
                      <Button
                        onPress={() => {
                          setCurrentModalProps({
                            type: "college",
                          });
                          onEducationOpen();
                        }}
                        color="primary"
                        variant="flat"
                      >
                        College
                      </Button>
                      <Button
                        onPress={() => {
                          setCurrentModalProps({
                            type: "school",
                          });
                          onEducationOpen();
                        }}
                        color="primary"
                        variant="shadow"
                      >
                        School
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Skills sets"
                  title="Skill sets"
                  subtitle={"show your talents"}
                >
                  <div className="flex flex-col h-full content-center">
                    <Tabs
                      aria-label="Dynamic tabs"
                      items={skillList}
                      selectedKey={selectedSkillTab}
                      onSelectionChange={setSelectedSkillTab}
                    >
                      {(item) => {
                        return (
                          <Tab key={item.id} title={item.label}>
                            <Card>
                              <CardBody>
                                <div className="flex flex-col gap-3">
                                  {skills["data"][item.id]?.map((skill, i) => (
                                    <SkillChip
                                      key={i}
                                      label={skill}
                                      categoryId={item.id}
                                      state={skills}
                                      setState={setSkills}
                                    />
                                  ))}
                                </div>
                              </CardBody>
                            </Card>
                          </Tab>
                        );
                      }}
                    </Tabs>
                  </div>
                  <div className="w-full flex flex-row justify-end gap-4">
                    <Button
                      onPress={() => {
                        setCurrentModalProps({ type: "skill" });
                        onSkillOpen();
                      }}
                      color="primary"
                      variant="shadow"
                    >
                      Add Skills
                    </Button>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Projects"
                  title="Projects"
                  subtitle="show your projects"
                >
                  <div className="w-full flex flex-col content-start gap-3">
                    <div className="px-4 flex flex-col gap-3">
                      {projects["list"]?.map((id) => (
                        <AEPCard
                          {...projects["data"][id]}
                          id={id}
                          onAEPModalOpen={onAEPModalOpen}
                          setCurrentModalProps={setCurrentModalProps}
                        />
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-end gap-4">
                      <Button
                        onPress={() => {
                          setCurrentModalProps({ type: "project" });
                          onAEPModalOpen();
                        }}
                        color="primary"
                        variant="shadow"
                      >
                        Add projects
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Experience"
                  title="Experience"
                  subtitle="show your experience"
                >
                  <div className="w-full flex flex-col content-start gap-3">
                    <div className="px-4 flex flex-col gap-3">
                      {experiences["list"]?.map((id) => (
                        <AEPCard
                          {...experiences["data"][id]}
                          id={id}
                          onAEPModalOpen={onAEPModalOpen}
                          setCurrentModalProps={setCurrentModalProps}
                        />
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-end gap-4">
                      <Button
                        onPress={() => {
                          setCurrentModalProps({ type: "experience" });
                          onAEPModalOpen();
                        }}
                        color="primary"
                        variant="shadow"
                      >
                        Add Job
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="5"
                  aria-label="Achievements"
                  title="Achievements"
                  subtitle="Make your achivements big"
                >
                  <div className="w-full flex flex-col content-start gap-3">
                    <div className="px-4 flex flex-col gap-3">
                      {achievements["list"]?.map((id) => (
                        <AEPCard
                          {...achievements["data"][id]}
                          id={id}
                          onAEPModalOpen={onAEPModalOpen}
                          setCurrentModalProps={setCurrentModalProps}
                        />
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-end gap-4">
                      <Button
                        onPress={() => {
                          setCurrentModalProps({ type: "achievement" });
                          onAEPModalOpen();
                        }}
                        color="primary"
                        variant="shadow"
                      >
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="py-3">
              <h1>What do you want to be included in your portfolio ?</h1>
              <CheckboxGroup
                label="Select the Sections"
                defaultValue={[1, 2, 3, 4, 5, 6]}
                value={selectedSections}
                onValueChange={setSelectedSections}
              >
                {sections["list"]?.map((id) => (
                  <Checkbox value={id}>{sections["data"][id]}</Checkbox>
                ))}
              </CheckboxGroup>
            </div>
            <div className="flex flex-row justify-center gap-4">
              <Button
                color="danger"
                variant="ghost"
                onClick={handleCancelGenerateWebsite}
              >
                Cancel
              </Button>
              <Button color="secondary" onClick={handleGenerateWebsite}>
                Generate Website
              </Button>
            </div>
          </div>
        )}
      </div>
      <AEPModal
        isAEPModalOpen={isAEPModalOpen}
        onAEPModalOpenChange={onAEPModalOpenChange}
        {...currentModalProps}
        projects={projects}
        experiences={experiences}
        achievements={achievements}
        setProjects={setProjects}
        setAchievements={setAchievements}
        setExperiences={setExperiences}
      />
      <EducationModal
        isEducationOpen={isEducationOpen}
        onEducationOpenChange={onEducationOpenChange}
        onEducationOpen={onEducationOpen}
        setCurrentModalProps={setCurrentModalProps}
        educationList={education}
        setEducationList={setEduation}
        {...currentModalProps}
      />
      <SkillModal
        isSkillOpen={isSkillOpen}
        onSkillOpenChange={onSkillOpenChange}
        onSkillOpen={onSkillOpen}
        skills={skills}
        setSkills={setSkills}
        {...currentModalProps}
        categoryId={selectedSkillTab}
      />
    </>
  );
}

export default PortfolioCustomizeSubTab;

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
      console.log(std, degree);
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
  }, [isEducationOpen]);
  const standardList =
    type === "school"
      ? [
          { label: "Class 12", value: "Class 12" },
          { label: "Class 10", value: "Class 10" },
        ]
      : [
          { label: "BE", value: "BE" },
          { label: "ME", value: "ME" },
          { label: "Bsc", value: "Bsc" },
          { label: "Msc", value: "Msc" },
          { label: "Ba", value: "Ba" },
          { label: "Ma", value: "Ma" },
          { label: "Bcom", value: "Bcom" },
          { label: "Mcom", value: "Mcom" },
          { label: "BEd", value: "BEd" },
          { label: "MEd", value: "MEd" },
          { label: "Mphil", value: "Mphil" },
          { label: "PHD", value: "PHD" },
        ];
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
    setBranchSt();
    setStdSt();
    setStartSt(dayjs());
    setEndSt(dayjs());
    setPercentSt(0);
  };
  return (
    <>
      <Modal
        isOpen={isEducationOpen}
        onOpenChange={onEducationOpenChange}
        placement="bottom-center"
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
                  <Select
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
                  </Select>
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
      url: urlSt,
      start: startSt.format("YYYY"),
      end: endSt.format("YYYY"),
    };
    let expData = {
      type,
      title: titleSt,
      desc: descSt,
      company: companySt,
      url: urlSt,
      start: startSt.format("YYYY"),
      end: endSt.format("YYYY"),
    };
    let achieveData = {
      type,
      title: titleSt,
      url: urlSt,
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
        let achieveList = achievements["list"];
        let achieveDic = achievements["data"];
        achieveDic[newId] = achieveData;
        achieveList.push(newId);
        setAchievements({ list: achieveList, data: achieveDic });
      }
    } else {
      const ProState = projects["data"];
      const ExpState = experiences["data"];
      const AchieveState = achievements["data"];

      if (type === "project") {
        ProState[id] = projData;
        setProjects({ ...projects, data: ProState });
      } else if (type === "experience") {
        ExpState[id] = expData;
        setExperiences({ ...experiences, data: ExpState });
      } else if (type === "achievement") {
        AchieveState[id] = achieveData;
        setAchievements({ ...experiences, data: AchieveState });
      }
    }
  };
  useEffect(() => {
    console.log(id);
    if (isAEPModalOpen == true && id !== undefined) {
      setTitleSt(title);
      setDescSt(desc);
      setCompanySt(company);
      setUrlSt(url);
      setStartSt(dayjs(start));
      setEndSt(dayjs(end));
    } else if (isAEPModalOpen == false) {
      setTitleSt("");
      setCompanySt("");
      setDescSt();
      setUrlSt();
      setStartSt(dayjs());
      setEndSt(dayjs());
    }
    console.log("Hello");
  }, [isAEPModalOpen]);
  return (
    <>
      <Modal
        isOpen={isAEPModalOpen}
        onOpenChange={onAEPModalOpenChange}
        placement="bottom-center"
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
                      views={["year"]}
                      value={startSt}
                      onChange={setStartSt}
                    />
                    <DatePicker
                      label="End year"
                      views={["year"]}
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
const SkillModal = (props) => {
  const { isSkillOpen, onSkillOpenChange, skills, setSkills, categoryId } =
    props;
  const [title, setTitle] = useState();
  const handleSavePress = () => {
    let skillData = skills["data"];
    if (skillData[categoryId]) {
      skillData[categoryId].push(title);
    } else {
      skillData[categoryId] = [];
      skillData[categoryId].push(title);
    }
    setSkills({ ...skills, data: { ...skillData } });
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
/**
 *
 * @param type : school,college
 * @param place : name of the site
 * @param std : class 12 or class 10 [if type == school]
 * @param degree : BA,MA,...
 * @param branch : Mathematics, Computer Science
 * @param percent : 100%
 * @param start : commencement of the education
 * @param end : end of the education
 * @returns
 */
function EducationCard(props) {
  const {
    type,
    place,
    degree,
    branch,
    percent,
    start,
    end,
    std,
    onEducationOpen,
    setCurrentModalProps,
  } = props;
  const handleOpenModal = () => {
    setCurrentModalProps({
      ...props,
    });
    onEducationOpen();
  };
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row justify-between content-center">
          <p style={{ fontWeight: "bold" }}>
            {type === "school" ? Array.from(std) : Array.from(degree)}
            {type === "college" && " " + branch}
          </p>
          <Icon
            Icon={GrEdit}
            size="medium"
            color="blue"
            onclick={handleOpenModal}
          />
        </div>
        <Divider />
        <p style={{ fontStyle: "italic" }}>{place}</p>
        <p>
          {type === "school" ? start : start + " - " + end} | {percent}%
        </p>
      </CardBody>
    </Card>
  );
}
/**
 *
 * @param type : experience, project , Achievement
 * @param title : title of the job, project or Achievement
 * @param description : description of the job, project or Achievement
 * @param url : url of the project or Achievement
 * @param company : name of the company if [type === 'experience']
 * @param start : start date of the experience or project
 * @param end : start date of the experience or project
 * @returns
 */
function AEPCard(props) {
  const {
    id,
    type,
    title,
    desc,
    url,
    company,
    start,
    end,
    onAEPModalOpen,
    setCurrentModalProps,
  } = props;
  const handleOpenModal = () => {
    onAEPModalOpen();
    setCurrentModalProps({
      ...props,
    });
  };
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between content-center">
          <div
            className={`${
              type === "project"
                ? "flex flex-row gap-2 justify-center content-center"
                : ""
            }`}
          >
            <p className="head2">{title}</p>
            <div className="flex flex-row gap-2">
              {type === "experience" && <p className="subtitle">{company}</p>}
              {type !== "achievement" && (
                <p className="subtitle">
                  [{start} - {end}]
                </p>
              )}
            </div>
          </div>
          <Icon
            Icon={GrEdit}
            size="medium"
            color="blue"
            onclick={handleOpenModal}
          />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="para">{desc}</p>
      </CardBody>
      {url && (
        <>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href={url} className="url">
              Visit project
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
/**
 * @param label : name of the chip
 * @param id : id of the chip
 */

function SkillChip(props) {
  const { key, label, categoryId, state, setState } = props;
  const handleSkillDelete = () => {
    let skillData = state["data"];
    let a = skillData[categoryId].filter(checkTrue);
    skillData[categoryId] = a;
    function checkTrue(txt) {
      return txt !== label;
    }
    setState({ ...state, data: { ...skillData } });
  };
  return (
    <Chip key={key} onClose={handleSkillDelete} variant="flat" radius="sm">
      {label}
    </Chip>
  );
}
