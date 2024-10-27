import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/actions/currencyActions";
import { multilanguage } from "redux-multilanguage";
import Logo from "../../components/header/Logo";
import IconGroup from "../../components/header/IconGroup";
import SecNavMenu from "../../components/header/SecNavMenu";
import NavMenu from "../../components/header/NavMenu";
import MobileMenu from "../../components/header/MobileMenu";
import LanguageCurrencyChanger from "../../components/header/sub-components/LanguageCurrencyChanger";
import HeaderTop from "../../components/header/HeaderTop";

const HeaderTwo = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header className="header-area clearfix header-hm9 transparent-bar">
      {/* Header Top Area */}
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ""} ${
          top === "visible" ? "" : "d-none"
        } header-top-area .header-top-border17 ${
          borderStyle === "border-none" 
        }`}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* Render HeaderTop */}
          <HeaderTop  />
        </div>
      </div>
      
      {/* Main Header Area */}
        {/* Sticky Header Bottom */}
        <div
        className={`header-bottom sticky-bar header-res-padding header-padding-2 ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
      <div className="container">
        <div className="header-top-area d-none d-lg-block">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* Header Logo */}
              <Logo imageUrl="/assets/img/logo/logo-2.png" logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav Menu */}
              <NavMenu />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon Group */}
              <IconGroup />
            </div>
          </div>
        </div>
      </div>

    
        <div className="container">
          <div className="row">
            
           
            <div className="col-xl-12 col-lg-12 d-none d-lg-block" style={{marginTop:"-8px"}}>
              {/* Nav Menu for Desktop */}
              <SecNavMenu />
            </div>
          </div>
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

HeaderTwo.propTypes = {
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrency: currencyName => {
      dispatch(changeCurrency(currencyName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTwo));
