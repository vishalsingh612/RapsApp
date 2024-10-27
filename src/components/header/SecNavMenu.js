import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const SecNavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              Beauty
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
             Fashion
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
                 Service
                </Link>
          </li>
          
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              Service
            </Link>
            
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

SecNavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(SecNavMenu);
