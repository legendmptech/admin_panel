import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/Home.layout";
import { Button, useDisclosure } from "@nextui-org/react";
import Icon from "../../components/Icon";
import { BsPlus } from "react-icons/bs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ClientInfoModal from "./../../components/clients/ClientInfo.modal";
import ClientCard from "../../components/clients/Client.Card";

function ClientTab(props) {
  const {
    isOpen: isClientInfoOpen,
    onOpen: onClientInfoOpen,
    onOpenChange: onClientInfoOpenChange,
  } = useDisclosure();
  // const [data, setData] = useState({});
  // const [clients, setClients] = useState({
  //   list: [],
  //   data: {},
  // });
  // useEffect(() => {}, []);
  return (
    <div className="flex flex-col">
      <Dropdown>
        <DropdownTrigger>
          <Button
            startContent={<Icon Icon={BsPlus} size="lg" color="white" />}
            color="secondary"
            className="w-fit"
          >
            ADD
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Client Page Actions"
          onAction={(key) => {
            if (key === "client") {
              onClientInfoOpen();
            }
          }}
        >
          <DropdownItem key="client">Client</DropdownItem>
          <DropdownItem key="transaction">Transaction</DropdownItem>
          <DropdownItem key="service">Service</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ClientInfoModal
        isClientInfoOpen={isClientInfoOpen}
        onClientInfoOpen={onClientInfoOpen}
        onClientInfoOpenChange={onClientInfoOpenChange}
      />
      <div>
        <h2>Clients</h2>
        {/* {clients?.list?.map((id) => (
          <ClientCard id={"248325934895"} {...clients?.data[id]} />
        ))} */}
      </div>
    </div>
  );
}
export default HomeLayout(ClientTab);
