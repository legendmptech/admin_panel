import React from "react";
import { commonColors, semanticColors } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { SETTINGS } from "../configs";
/**
 *
 * @param size - size of the icon | small , medium
 * @param color - color of the icon |  blue, red,black,white
 * @param onClick - callback
 * @param Icon - Icon component to be rendered
 * @returns
 */
function Icon(props) {
  const { Icon } = props;
  const clrs = {
    blue: commonColors.blue[500],
    red: commonColors.red[500],
    black: commonColors.black,
    white: commonColors.white,
  };
  const sizes = {
    sm: SETTINGS.ic_sm,
    md: SETTINGS.ic_md,
    lg: SETTINGS.ic_lg,
    "2xlg": SETTINGS.ic_2xlg,
  };
  return (
    <IconContext.Provider
      value={{ size: sizes[props.size] || 36, color: clrs[props.color] }}
    >
      <span
        className={`cursor-pointer hover:outline-offset-1 outline-${props.color} p-1`}
        onClick={props.onclick}
      >
        <Icon style={{ transition: "color 0.3s ease-in-out" }} />
      </span>
    </IconContext.Provider>
  );
}

export default Icon;
