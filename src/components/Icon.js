import React from "react";
import { commonColors, semanticColors } from "@nextui-org/react";
import { IconContext } from "react-icons";
import { SETTINGS } from "../configs";

function Icon(props) {
  const { Icon } = props;
  const clrs = {
    blue: commonColors.blue[500],
    red: commonColors.red[500],
    black: commonColors.black,
    white: commonColors.white,
  };
  const sizes = {
    small: SETTINGS.ICON_SMALL,
    medium: SETTINGS.ICON_MEDIUM,
  };
  return (
    <IconContext.Provider
      value={{ size: sizes[props.size], color: clrs[props.color] }}
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
