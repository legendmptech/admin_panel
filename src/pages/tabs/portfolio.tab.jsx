import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import HomeLayout from "../../layouts/Home.layout";
import PortfolioCustomizeSubTab from "./portfolio.customize.subtab";

function PortfolioTab(props) {
  let tabs = [
    {
      id: "customize",
      label: "Customize",
      content: <PortfolioCustomizeSubTab />,
    },
    {
      id: "users",
      label: "Users",
      content: <h1>Hello</h1>,
    },
  ];
  return (
    <div className="flex flex-col h-full content-center">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardHeader>Hello</CardHeader>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default HomeLayout(PortfolioTab);
