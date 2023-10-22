import React from 'react';
import PropTypes from 'prop-types';

const CheckboxComponent = ({ isChecked, handleCheckboxChange }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        style={{ width: '20px', height: '20px', marginRight: '10px' }}
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckboxChange()}
      />
      Possuí Endereço
    </label>
  );
};

CheckboxComponent.propTypes = {
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func
};

export default CheckboxComponent;
