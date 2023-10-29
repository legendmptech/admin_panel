import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import Icon from "../Icon";
import { GrEdit } from "react-icons/gr";

/**
 *
 * @param type : experience, project , Achievement
 * @param title : title of the job, project or Achievement
 * @param description : description of the job, project or Achievement
 * @param url : url of the project or Achievement
 * @param company : name of the company if [type === 'experience']
 * @param start : start date of the experience or project
 * @param end : start date of the experience or project
 * @returns
 */
function AEPCard(props) {
  const {
    id,
    type,
    title,
    desc,
    url,
    company,
    start,
    end,
    onAEPModalOpen,
    setCurrentModalProps,
  } = props;
  const handleOpenModal = () => {
    onAEPModalOpen();
    setCurrentModalProps({
      ...props,
    });
  };
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-row justify-between content-center">
          <div
            className={`${
              type === "project"
                ? "flex flex-row gap-2 justify-center content-center"
                : ""
            }`}
          >
            <p className="head2">{title}</p>
            <div className="flex flex-row gap-2">
              {type === "experience" && <p className="subtitle">{company}</p>}
              {type !== "achievement" && (
                <p className="subtitle">
                  [{start} - {end}]
                </p>
              )}
            </div>
          </div>
          <Icon
            Icon={GrEdit}
            size="md"
            color="blue"
            onclick={handleOpenModal}
          />
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="para">{desc}</p>
      </CardBody>
      {url && (
        <>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href={url} className="url">
              Visit project
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
export default AEPCard;
