import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { removeFromCart } from "../../redux/actions/cartActions";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  compareData,
  removeFromCart,
  iconWhiteClass
}) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
      style={{marginTop:"20px"}}
    > 
      <div className=" header-search d-none d-lg-block">
        {/* <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button> */}
   <div className="search-content" style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    border: '1px solid #ccc', 
    borderRadius: '4px', 
    minWidth: window.innerWidth > 1200 ? '160px' : '80px', // Min width for search content
    maxWidth: '100%', 
    padding: '0px', 
    boxSizing: 'border-box',
    marginTop: '-12px'
}}>
  <form action="#" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      width: '100%'
  }}>
    <input 
      type="text" 
      placeholder="Search" 
      style={{ 
          border: 'none', 
          outline: 'none', 
          flex: '1', // Allows the input to take available space
          padding: '10px',
          minWidth: window.innerWidth > 1200 ? '80px' : '40px', // Min width for input field
          width: '100%', // Ensures the input is responsive
          boxSizing: 'border-box', // Ensures padding is included in width
          background: "none"
      }} 
    />
    <button 
      className="button-search" 
      style={{ 
          backgroundColor: 'transparent', 
          border: 'none', 
          cursor: 'pointer', 
          padding: '10px' // Ensures the button has space around it
      }}
    >
      <i className="pe-7s-search" />
    </button>
  </form>
</div>

      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareData && compareData.length ? compareData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistData && wishlistData.length ? wishlistData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartData={cartData}
          currency={currency}
          removeFromCart={removeFromCart}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
