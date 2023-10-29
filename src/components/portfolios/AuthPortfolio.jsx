import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { fstore } from "../../configs/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import userData from "../../data/userData.json";
function AuthPortfolio(props) {
  const { setAvailable, setUserData } = props;
  const [selected, setSelected] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [searchUserId, setSearchUserId] = useState("");
  const [isValidLoginId, setIsValidLoginId] = useState(false);
  const [isSearchIdUsed, setIsSearchIdUsed] = useState(true);
  const handleLoginId = async () => {
    if (loginUserId != "") {
      setIsLoading(true);
      const docRef = doc(fstore, "portfolios", loginUserId);
      const docSnap = await getDoc(docRef).catch((err) =>
        console.log(err.message)
      );
      if (docSnap.exists()) {
        setIsValidLoginId(true);
        setUserData(docSnap.data());
        setAvailable(true);
        console.log(docSnap.data());
      } else {
        setIsValidLoginId(false);
      }

      setIsLoading(false);
    } else {
      alert("Enter a valid User ID");
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
    if (searchUserId === "") {
      alert("Please enter the search user ID");
    } else {
      setIsLoading(true);
      if (await isIdExist(searchUserId).catch((e) => setIsLoading(false))) {
        setIsSearchIdUsed(true);
      } else {
        setIsSearchIdUsed(false);
      }
      setIsLoading(false);
    }
  };
  const handleCreateUser = async () => {
    const data = { ...userData.userCreationTemplate, userId: searchUserId };
    const docRef = doc(fstore, "portfolios", searchUserId);
    setIsLoading(true);
    await setDoc(docRef, data)
      .then(() => {
        setUserData(data);
        setAvailable(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
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
                isClearable={true}
                onClear={() => setIsSearchIdUsed(true)}
                description={
                  isSearchIdUsed == false
                    ? "you can use the User ID"
                    : "User ID already exist"
                }
              />
              <div className="flex flex-row gap-2 justify-center">
                <Button
                  onClick={handleSearchId}
                  fullWidth
                  color="primary"
                  isLoading={isLoading}
                  isDisabled={!isSearchIdUsed}
                >
                  Search
                </Button>
                <Button
                  onClick={handleCreateUser}
                  fullWidth
                  color="secondary"
                  isLoading={isLoading}
                  isDisabled={isSearchIdUsed}
                >
                  Create User
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="login" title="Login">
            <form className="flex flex-col gap-4">
              <Input
                isRequired
                label="User id"
                placeholder="Enter User ID"
                isInvalid={!isValidLoginId}
                errorMessage={
                  isValidLoginId == false ? "User does not exist" : ""
                }
                value={loginUserId}
                onValueChange={(value) => setLoginUserId(value)}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={handleLoginId}
                  fullWidth
                  color="primary"
                  isLoading={isLoading}
                >
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
