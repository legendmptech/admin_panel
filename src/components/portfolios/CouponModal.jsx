import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CouponModal = (props) => {
    const {
        isCouponModalOpen,
        onCouponModalOpenChange,
        referrerName,
        referrerEmail,
        referrerUpiNo,
        code,
        season,
        purchaseId,
        couponData,
        setCouponData,
        commisionPercent,
        setForcerender, forcerender } = props;
    const saveCoupon = () => {
        let allCoupons = couponData?.allCoupons
        let data = {
            referrerName: nameSt,
            referrerEmail: emailSt,
            referrerUpiNo: upiNoSt,
            purchaseId: purchaseId,
            commisionPercent: commisionSt
        }
        let seasonMap = couponData?.seasonMap
        let seasonMapCouponList = couponData["seasonMap"][season]?.couponList;
        let couponMap = couponData?.couponMap;
        if (code === undefined) {
            data.purchaseId = []
            allCoupons?.push(codeSt)
            seasonMapCouponList?.push(codeSt)
            couponMap[codeSt] = data
            setCouponData({
                ...couponData,
                seasonMap: { ...seasonMap, [season]: { ...seasonMap[season], couponList: seasonMapCouponList } },
                allCoupons: allCoupons,
                couponMap: couponMap
            })
        } else {
            couponMap[codeSt] = data
            setCouponData({ ...couponData, couponMap: couponMap })
        }
        setForcerender(!forcerender)
    }
    const [codeSt, setCodeSt] = useState("")
    const [nameSt, setNameSt] = useState("")
    const [emailSt, setEmailSt] = useState("")
    const [upiNoSt, setUpiNoSt] = useState("")
    const [commisionSt, setCommisionSt] = useState(10)

    useEffect(() => {
        if (isCouponModalOpen === true && code !== undefined) {
            setCodeSt(code)
            setNameSt(referrerName)
            setEmailSt(referrerEmail)
            setUpiNoSt(referrerUpiNo)
            setCommisionSt(commisionPercent)
        } else if (isCouponModalOpen === false) {
            setCodeSt("")
            setNameSt("")
            setEmailSt("")
            setUpiNoSt("")
            setCommisionSt(10)
        }
    }, [isCouponModalOpen, code, commisionPercent, referrerEmail, referrerName, referrerUpiNo])
    return (
        <Modal
            isOpen={isCouponModalOpen}
            onOpenChange={onCouponModalOpenChange}
            placement="top-center"
            isDismissable={false}
            backdrop="blur"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Coupon</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Coupon Code"
                                placeholder="Enter Coupon Code"
                                variant="bordered"
                                value={codeSt}
                                onValueChange={value => setCodeSt(value.toUpperCase())}
                                isDisabled={referrerName ? true : false}
                            />
                            <Input
                                label="Name"
                                placeholder="Enter Referrer Name"
                                variant="bordered"
                                value={nameSt}
                                onValueChange={value => setNameSt(value)}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter Referrer Email"
                                variant="bordered"
                                value={emailSt}
                                onValueChange={value => setEmailSt(value)}
                            />
                            <Input
                                label="UPI Phone Number"
                                startContent={"+91"}
                                placeholder="Enter Number"
                                type="text"
                                variant="bordered"
                                value={upiNoSt}
                                onValueChange={value => setUpiNoSt(value)}
                            />
                            <Input
                                label="Commision"
                                placeholder="Enter commision percent"
                                type="number"
                                className="max-w-[250px] self-end"
                                endContent={"%"}
                                variant="bordered"
                                value={commisionSt}
                                onValueChange={value => setCommisionSt(value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={() => {
                                onClose()
                            }}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => {
                                saveCoupon();
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
export default CouponModal