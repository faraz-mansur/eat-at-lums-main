import React, { useState } from 'react';
import './Dropdown.css';
import OrderDetails from '../OrderDetails/OrderDetails';

const Dropdown = (props) => {
  const [showPopup, setshowPopup] = useState(false);

  const handleShowDetails = () => {
    setshowPopup(true);
  };
  return (
    <div className="div4button">
      <button
        className="button"
        onClick={() => handleShowDetails()}
        style={{ margin: '5px' }}
      >
        Show Details
      </button>

      {showPopup && (
        <div
          className="popupbg"
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        >
          <OrderDetails
            order_id={props?.order_id}
            details={props?.items}
            setPopup={setshowPopup}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
