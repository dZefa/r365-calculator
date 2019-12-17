import React from 'react';
import PropTypes from 'prop-types';

const CalculatorView = ({ value, changeHandler, clickHandler }) => (
  <form id="calculator-form">
  <div className="form-group">
    <label htmlFor="calc_input">Enter string here</label>
    <input type="text" id="calc_input" className="form-control" value={value} onChange={changeHandler} />
  </div>
  <div className="form-grou">
    <button type="submit" id="calc_btn" className="form-control btn btn-primary" onClick={clickHandler} >Calculate</button>
  </div>
</form>
);

CalculatorView.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default CalculatorView;
