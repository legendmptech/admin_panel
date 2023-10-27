import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { fstore } from "../../configs/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

function AuthPortfolio(props) {
  const { setAvailable, setUserData } = props;
  const [selected, setSelected] = useState("create");

  const [loginUserId, setLoginUserId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [isValidLoginId, setIsValidLoginId] = useState(false);
  const [isSearchIdUsed, setIsSearchIdUsed] = useState(true);
  const handleLoginId = async () => {
    const docRef = doc(fstore, "portfolios", loginUserId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsValidLoginId(false);
        console.log(docSnap.data());
      } else setIsValidLoginId(!isValidLoginId);
    } catch (e) {
      console.log(e.message);
    }
  };
  const isIdExist = async (id) => {
    const docRef = doc(fstore, "portfolios", id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return true;
      } else return false;
    } catch (e) {
      console.log(e.message);
    }
    return false;
  };
  const handleSearchId = async () => {
    if (await isIdExist(searchUserId)) {
      setIsSearchIdUsed(true);
    } else {
      setIsSearchIdUsed(false);
    }
  };
  const handleCreateUser = () => {
    const data = {
      personalDetails: {
        name: "mohan",
        email: "mohan@gmail.com",
        userId: "s_mohan_prasat",
        about: "This is mohan Prasath da kanna",
      },
      education: {
        list: [],
        data: {},
      },
      projects: {
        list: [],
        data: {},
      },
      experiences: {
        list: [],
        data: {},
      },
      achievements: {
        list: [],
        data: {},
      },
      skills: {
        list: [1, 2, 3],
        data: {},
      },
      sections: {
        list: [],
        data: {},
      },
      socialLinks: {
        list: [],
        data: {},
      },
    };
    // const docRef = doc(fstore, "portfolios", searchUserId);
    // await setDoc(docRef, data)
    //   .then(() => {
    //     setAvailable(true);
    //   })
    //   .catch((err) => console.log(err.message));
    //TODO:ADD THE BELOW LINE INSIDE THE THEN FUNCTION ABOVE
    setUserData(data);
    setAvailable(true);
  };
  useEffect(() => {
    setIsSearchIdUsed(isSearchIdUsed);
  }, [setIsSearchIdUsed]);
  return (
    <Card className="">
      <CardBody className="overflow-hidden">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="create" title="Create">
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="User id"
                placeholder="Enter User ID"
                value={searchUserId}
                onValueChange={(value) => setSearchUserId(value)}
                description={
                  isSearchIdUsed == false
                    ? "you can use the User ID"
                    : "User ID already exist"
                }
              />
              <div className="flex flex-row gap-2 justify-center">
                <Button onClick={handleSearchId} fullWidth color="primary">
                  Search
                </Button>
                {isSearchIdUsed == true && (
                  <Button
                    onClick={handleCreateUser}
                    fullWidth
                    color="secondary"
                  >
                    Create User
                  </Button>
                )}
              </div>
            </form>
          </Tab>
          <Tab key="login" title="Login">
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="User id"
                placeholder="Enter User ID"
                isInvalid={isValidLoginId}
                errorMessage={isValidLoginId ? "User does not exist" : ""}
                value={loginUserId}
                onValueChange={(value) => setLoginUserId(value)}
              />
              <div className="flex gap-2 justify-end">
                <Button onClick={handleLoginId} fullWidth color="primary">
                  Login
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default AuthPortfolio;
