import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle
}) => {
  const [city, setCurrentCity] = useState('');

  // Fetch city name based on the user's IP address
  const fetchCityName = async () => {
    try {
      const response = await fetch(`https://ipinfo.io/json?token=6804cf228e70dd`);
      const data = await response.json();
      if (data.city) {
        setCurrentCity(data.city);
      } else {
        setCurrentCity("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching city name:", error);
      setCurrentCity("Error fetching location");
    }
  };

  // Get user's current location using Geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Fetch the city name immediately when the component mounts
    fetchCityName();
  }, []);

  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`} 
    >
      <LanguageCurrencyChanger
        currency={currency}
        changeCurrency={changeCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span 
            onClick={getLocation} 
            style={{ cursor: 'pointer', marginRight: '10px', fontSize: '24px' }} // Increased size for the icon
          >
            <i className="pe-7s-map-marker" /> {/* Example location icon */}
          </span>
          <span style={{ fontSize: '18px' }}>{city || "Your location"}</span> {/* Increased font size for city name */}
        </div>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
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
)(multilanguage(HeaderTop));
