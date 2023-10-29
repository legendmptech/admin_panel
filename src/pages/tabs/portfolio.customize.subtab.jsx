import { useEffect, useState } from "react";
// NEXTUI COMPONENTS
import {
  Tabs,
  Tab,
  Input,
  Button,
  Card,
  CardBody,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { Textarea, Accordion, AccordionItem } from "@nextui-org/react";
// FIREBASE
import { doc, setDoc } from "firebase/firestore";
import { fstore } from "../../configs/firebase-config";
// COMPONENTS
import AuthPortfolio from "../../components/portfolios/AuthPortfolio";
import EducationModal from "../../components/portfolios/EducationModal";
import AEPModal from "../../components/portfolios/AEPModal";
import SkillModal from "../../components/portfolios/SkillModal";
import EducationCard from "../../components/portfolios/EducationCard";
import AEPCard from "../../components/portfolios/AEPCard";
import SkillChip from "../../components/portfolios/SkillChip";
import SocialModal from "../../components/portfolios/SocialModal";
import SocialChip from "../../components/portfolios/SocialChip";

function PortfolioCustomizeSubTab(props) {
  const [selectedSkillTab, setSelectedSkillTab] = useState("soft skills");
  const [selectedSections, setSelectedSections] = useState([]);

  const [available, setAvailable] = useState(false);
  const [userData, setUserData] = useState({});
  // MENU STATES
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
  const {
    isOpen: isSocialOpen,
    onOpen: onSocialOpen,
    onOpenChange: onSocialOpenChange,
  } = useDisclosure();

  const [currentModalProps, setCurrentModalProps] = useState({});

  //   details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEduation] = useState({
    list: [],
    data: {},
  });
  let [skills, setSkills] = useState({
    "soft skills": [],
    "computer skills": [],
    "software skills": [],
  });
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
  const [socialLinks, setSocialLinks] = useState([]);
  // HELPER STATES
  let sections_ = {
    data: {
      Education: "Education",
      Skills: "Skills",
      Projects: "Projects",
      Experience: "Experience",
      Achievements: "Achievements",
      "Social Links": "Social Links",
    },
    list: [
      "Education",
      "Skills",
      "Projects",
      "Experience",
      "Achievements",
      "Social Links",
    ],
  };
  const handleGenerateWebsite = async () => {
    const data = {
      ...userData,
      personalDetails: {
        name: name,
        email: email,
        about: about,
        oneLiner,
      },
      education,
      projects,
      sections: selectedSections,
      experiences,
      achievements,
      socialLinks,
      skills,
      userId: "s_mohan_prasath",
    };
    console.log(data);
    const docRef = doc(fstore, "portfolios", "s_mohan_prasath");
    await setDoc(docRef, data)
      .then(() => {
        console.log("success");
        console.log(data);
        setAvailable(false);
      })
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    if (available == true) {
      let pdetails = userData?.personalDetails;
      setName(pdetails.name);
      setEmail(pdetails.email);
      setAbout(pdetails.about);
      setOneLiner(pdetails.oneLiner);
      setEduation(userData.education);
      setProjects(userData.projects);
      setExperiences(userData.experiences);
      setSkills(userData.skills);
      setAchievements(userData.achievements);
      setSocialLinks(userData.socialLinks);
      setSelectedSections(userData.sections);
      console.log(name);
    }
  }, [available]);
  return (
    <>
      <div className="flex flex-row justify-center">
        {available == false ? (
          <div className="flex flex-col auth-card">
            <AuthPortfolio
              setAvailable={setAvailable}
              setUserData={setUserData}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-11/12 md:w-10/12 lg:w-9/12">
            <div className="flex flex-col w-full gap-4 content-center">
              {/* PERSONAL DETAILS */}
              <h1>Personal Details</h1>
              <div className="flex flex-col gap-4 md:flex-row">
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
              <Input
                type="text"
                label="One Liner"
                placeholder="Tell about your in one Line"
                value={oneLiner}
                onValueChange={(value) => setOneLiner(value)}
                description={
                  "A sentence which describes your passion/profession with catchy words"
                }
              />
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
                  aria-label="Education"
                  title="Education"
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
                  aria-label="Skills"
                  title="Skills"
                  subtitle={"show your talents"}
                >
                  <div className="flex flex-col h-full content-center">
                    <Tabs
                      aria-label="options"
                      selectedKey={selectedSkillTab}
                      onSelectionChange={setSelectedSkillTab}
                    >
                      <Tab key="soft skills" title="Soft skills">
                        <Card>
                          <CardBody>
                            {skills?.["soft skills"]?.map((s, k) => (
                              <SkillChip
                                id={k}
                                label={s}
                                category={"soft skills"}
                                state={skills}
                                setState={setSkills}
                                skill={s}
                              />
                            ))}
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="computer skills" title="Computer skills">
                        <Card>
                          <CardBody>
                            {skills?.["computer skills"]?.map((s, k) => (
                              <SkillChip
                                id={k}
                                label={s}
                                category={"computer skills"}
                                state={skills}
                                setState={setSkills}
                                skill={s}
                              />
                            ))}
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="software skills" title="Software skills">
                        <Card>
                          <CardBody>
                            {skills?.["software skills"]?.map((s, k) => (
                              <SkillChip
                                id={k}
                                label={s}
                                category={"software skills"}
                                state={skills}
                                setState={setSkills}
                                skill={s}
                              />
                            ))}
                          </CardBody>
                        </Card>
                      </Tab>
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
                <AccordionItem
                  key="6"
                  aria-label="Social Links"
                  title="Social Links"
                  subtitle="your social proofs"
                >
                  <div className="w-full flex flex-col content-start gap-3">
                    <div className="px-4 flex flex-col gap-3">
                      {socialLinks?.map((props) => (
                        <SocialChip
                          url={props.url}
                          label={props.label}
                          id={props.id}
                          state={socialLinks}
                          setState={setSocialLinks}
                        />
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-end gap-4">
                      <Button
                        onPress={() => {
                          onSocialOpen();
                        }}
                        color="primary"
                        variant="shadow"
                      >
                        Add Social Link
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
                value={selectedSections}
                onValueChange={setSelectedSections}
              >
                {sections_["list"]?.map((id) => (
                  <Checkbox value={id}>{sections_["data"][id]}</Checkbox>
                ))}
              </CheckboxGroup>
            </div>
            <div className="flex flex-row justify-center gap-4">
              <Button
                color="danger"
                variant="ghost"
                onClick={() => {
                  setAvailable(false);
                  setUserData({});
                }}
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
        category={selectedSkillTab}
      />
      <SocialModal
        isSocialOpen={isSocialOpen}
        onSocialOpenChange={onSocialOpenChange}
        onSocialOpen={onSocialOpen}
        state={socialLinks}
        setState={setSocialLinks}
      />
    </>
  );
}

export default PortfolioCustomizeSubTab;
