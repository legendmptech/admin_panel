import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import HomeLayout from "../../layouts/Home.layout";
import PortfolioCustomizeSubTab from "../subtabs/customize.portfolio.subtab";
import PortfolioSettingsSubTab from "../subtabs/settings.portfolio.subtab";

function PortfolioTab(props) {
  return (
    <div className="flex flex-col h-full content-center">
      <Tabs aria-label="Dynamic tabs">
        <Tab key={"customize"} title={"Customize"}>
          <Card>
            <CardBody><PortfolioCustomizeSubTab /></CardBody>
          </Card>
        </Tab>
        <Tab key={"settings"} title={"Settings"}>
          <Card>
            <CardBody><PortfolioSettingsSubTab /></CardBody>
          </Card>
        </Tab>
        <Tab key={"user"} title={"Users"}>
          <Card>
            <CardBody><h1>User</h1></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeLayout(PortfolioTab);
