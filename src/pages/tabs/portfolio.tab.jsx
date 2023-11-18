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
          <PortfolioCustomizeSubTab />
        </Tab>
        <Tab key={"settings"} title={"Settings"}>
          <PortfolioSettingsSubTab />
        </Tab>
        <Tab key={"user"} title={"Users"}>
          <h1>User</h1>
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeLayout(PortfolioTab);
