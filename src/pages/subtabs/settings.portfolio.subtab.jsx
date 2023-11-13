import { Button, Checkbox, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import CouponModal from "../../components/portfolios/CouponModal";
import { fstore } from "../../configs/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

function PortfolioSettingsSubTab() {
    //UI MODAL DISCLOSURES
    const { isOpen: isCouponModalOpen, onOpen: onCouponModalOpen, onOpenChange: onCouponModalOpenChange } = useDisclosure();
    const { isOpen: isSeasonOpen, onOpen: onSeasonOpen, onOpenChange: onSeasonOpenChange } = useDisclosure();
    const [stateOfData, setStateOfData] = useState("failed") // "failed", "success"
    const [data, setData] = useState({})
    const [status, setStatus] = useState("")
    const [couponData, setCouponData] = useState(data?.couponData)
    const [isSyncing, setIsSyncing] = useState(false)
    const [selectedSeason, setSelectedSeason] = useState(new Set([]))
    const [currentModalProps, setCurrentModalProps] = useState({})
    const [isSeasonAvailable, setIsSeasonAvailable] = useState(false)
    const [currentCoupons, setCurrentCoupons] = useState([])
    const [forcerender, setForcerender] = useState(false)
    const handleOpenCoupon = (item) => {
        let season = Array.from(selectedSeason)[0]
        setCurrentModalProps({ ...couponData?.couponMap[item], code: item, "season": season, couponData: couponData, setCouponData: setCouponData });
        onCouponModalOpen();
    }
    // GETTING DATA FROM THE SERVER
    useEffect(() => {
        const getDataFromStore = async () => {
            const docRef = doc(fstore, "general", "portfolios");
            getDoc(docRef)
                .then((snap) => {
                    let d = snap.data()
                    setStateOfData("success");
                    setData(d);
                    setCouponData(d.couponData)
                })
                .catch((e) => console.log(e.message));
        }
        if (stateOfData === "failed") {
            getDataFromStore()
        } else {
        }
    }, [stateOfData])
    useEffect(() => {
        const season = Array.from(selectedSeason)[0]
        const seasonMap = couponData?.seasonMap[season]
        setIsSeasonAvailable(seasonMap?.isAvailable)
        setCurrentCoupons(seasonMap?.couponList)
        console.log(couponData)
    }, [forcerender, selectedSeason, couponData, stateOfData])
    return (
        <div className="w-full flex flex-col gap-4 py-5 content-center justify-center">
            <Button color="primary" className="max-w-xs" isLoading={isSyncing}
                onClick={async () => {
                    setIsSyncing(true)
                    let d = { ...data, couponData: couponData }
                    const docRef = doc(fstore, "general", "portfolios");
                    await setDoc(docRef, d)
                        .then(() => {
                            setIsSyncing(false)
                            setStatus("Data Synced Successfully")
                            console.log("success");
                        })
                        .catch((e) => {
                            console.log(e.message)
                            setIsSyncing(false)
                            setStatus("Data sync failed")
                        });
                }}>SYNC</Button>
            <p><b>status :</b> {status}</p>
            <div className="max-w-md">
                <h1>COUPON CODE</h1>
                <div className="flex flex-row md:flex-row max-w-md content-center justify-between">
                    <Select label="Select Season" className="max-w-xs" onSelectionChange={value => {
                        setSelectedSeason(value);
                        const seasonName = Array.from(selectedSeason)[0]
                        setCurrentCoupons(couponData?.seasonMap[seasonName]?.couponList);
                        setIsSeasonAvailable(couponData?.seasonMap[selectedSeason]?.isAvailable)
                    }}>
                        {couponData?.season?.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                    </Select>
                    <Button color="primary" onClick={() => { setCurrentModalProps({}); onSeasonOpen(); }}>ADD Season</Button>
                </div>
                {
                    selectedSeason && <div className="w-full my-4">
                        <h2>Available Coupons</h2>
                        <div className="flex flex-row flex-wrap justify-between">
                            <div>
                                <h3> <b>Season : </b>{selectedSeason}</h3>
                                <p><b>Status : </b> {isSeasonAvailable ? "available" : "unavailable"}</p>
                            </div>
                            {Array.from(selectedSeason)[0] && <Button color="warning" onClick={() => { setCurrentModalProps({ season: Array.from(selectedSeason)[0] }); onCouponModalOpen() }}>ADD Coupon</Button>}
                            <Button color="secondary" onClick={() => {
                                let seasonName = Array.from(selectedSeason)[0]
                                setCurrentModalProps({ ...couponData?.seasonMap[seasonName], name: seasonName })
                                onSeasonOpen();
                            }}>Configure</Button>
                        </div>
                        <Divider />
                        <div className="flex flex-row p-4 gap-2">
                            {currentCoupons?.map((item, key) => {
                                return <Chip
                                    key={key}
                                    color="primary"
                                    className="cursor-pointer"
                                    onClick={() => handleOpenCoupon(item)}>{item}
                                </Chip>
                            }
                            )
                            }
                        </div>
                    </div>
                }
            </div>
            <CouponModal
                onCouponModalOpen={onCouponModalOpen}
                isCouponModalOpen={isCouponModalOpen}
                onCouponModalOpenChange={onCouponModalOpenChange}
                couponData={couponData}
                setCouponData={setCouponData}
                setForcerender={setForcerender}
                {...currentModalProps} currentModalProps={currentModalProps} />
            <SeasonModal onSeasonOpen={onSeasonOpen} isSeasonOpen={isSeasonOpen} onSeasonOpenChange={onSeasonOpenChange} {...currentModalProps} couponData={couponData} setCouponData={setCouponData} />
        </div>
    )
}
const SeasonModal = (props) => {
    const { name, couponList, priceAfterDic, isSeasonOpen, onSeasonOpenChange, couponData, setCouponData } = props
    const [nameSt, setNameSt] = useState("")
    const [isAvailableSt, setIsAvailableSt] = useState(true);
    const [priceSt, setPriceSt] = useState(0);
    useEffect(() => {
        if (isSeasonOpen === true && nameSt !== undefined) {
            setNameSt(name)
            setPriceSt(priceAfterDic)
        } else if (isSeasonOpen === false) {
            setNameSt(""); setPriceSt(0)
        }
    }, [isSeasonOpen])
    const handleSavaSeason = () => {
        let data = {
            isAvailable: isAvailableSt,
            priceAfterDic: priceSt
        }
        let seasonList = couponData?.season
        let seasonMap = couponData?.seasonMap
        if (name === undefined) {
            data["couponList"] = []
            seasonList.push(nameSt)
            seasonMap[nameSt] = data
        } else {
            data["couponList"] = couponList
        }
        setCouponData({ ...couponData, seasonMap: { ...seasonMap, [nameSt]: data } })
    }
    return (
        <Modal
            isOpen={isSeasonOpen}
            onOpenChange={onSeasonOpenChange}
            placement="top-center"
            isDismissable={false}
            backdrop="blur"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add New Season</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Name"
                                placeholder="Enter Season Name"
                                variant="bordered"
                                isDisabled={name ? true : false}
                                value={nameSt}
                                onValueChange={value => setNameSt(value.toUpperCase())}
                            />
                            <Input
                                label="Price After Discout"
                                placeholder="Enter the price"
                                type="number"
                                className="max-w-[250px] self-end"
                                startContent={"₹"}
                                variant="bordered"
                                value={priceSt}
                                onValueChange={value => setPriceSt(value)}
                            />
                            <Checkbox defaultSelected isSelected={isAvailableSt} onValueChange={setIsAvailableSt}>is this season available ? </Checkbox>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={() => {
                                onClose()
                            }}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => {
                                handleSavaSeason()
                                onClose();
                            }}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
export default PortfolioSettingsSubTab