import { Button, Link, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import ClientSTModal from "./ClientST.modal";
import { useDispatch } from "react-redux";
import { clientPropsUpdated } from "../../store/clients";

function ClientCard(props) {
  const { name, id, services, transations } = props;
  const [isVisible, setIsVisible] = useState(false);
  const {
    isOpen: isClientSTOpen,
    onOpen: onClientSTOpen,
    onOpenChange: onClientSTOpenChange,
  } = useDisclosure();
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div
          className="w-full max-w-4xl flex flex-row flex-wrap items-center justify-between p-3 px-10 border-1 rounded-lg cursor-pointer transition-all"
          onClick={() => setIsVisible(!isVisible)}
        >
          <p className="font-bold">Senthil Poly Sacks</p>
          <p className="font-light">snps20231114</p>
          <p>website</p>
        </div>
        <div
          className={`${
            isVisible ? "flex flex-col max-w-4xl" : "hidden"
          } p-5 bg-gray-100 transition-all`}
        >
          <div className="flex flex-row flex-wrap gap-5">
            <Button
              color="primary"
              onClick={() => {
                dispatch(
                  clientPropsUpdated({
                    type: "service",
                    id,
                    name,
                    services,
                    transations,
                  })
                );
                onClientSTOpen();
              }}
            >
              Add Service
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="mt-3">services</h2>
            <div className="flex flex-row gap-5 w-full justify-evenly border-1 bg-gray-50 cursor-pointer">
              <p>Business Website</p>
              <p className="font-light">48247257242080</p>
              <Link color="primary" href="#" size="sm">
                view transaction
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ClientSTModal
        isOpen={isClientSTOpen}
        onOpen={onClientSTOpen}
        onOpenChange={onClientSTOpenChange}
      />
    </>
  );
}

export default ClientCard;
