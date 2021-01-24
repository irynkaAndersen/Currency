import React, { FC } from "react";
import { styleNames } from "../../utils/styleNames";
import styles from "./Loader.scss";

const sn = styleNames(styles);

const Loader: FC = () => {
  return (
    <div className={sn("loader")}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
