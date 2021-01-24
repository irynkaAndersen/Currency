import React, { FC } from "react";
import { Link } from "react-router-dom";
import { styleNames } from "../../utils/styleNames";
import styles from "./Header.scss";

const sn = styleNames(styles);

const Header: FC = () => {
  return (
    <header className={sn("header")}>
      <div className="wrap">
        <nav className={sn("menu")}>
          <Link to="/currencies" className={sn("link")}>
            Currencies
          </Link>
          <Link to="/analysis" className={sn("link")}>
            Analysis
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
