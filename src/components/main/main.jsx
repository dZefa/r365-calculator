import React, { Component } from 'react';

import CalculatorView from '../calculator/calculator';

import Calculator from '../../utils/calculator';

class MainView extends Component {
  constructor() {
    super();

    this.state = {
      answer: '',
      calc_input: '',
      calculator: new Calculator()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();

    const { calc_input, calculator } = this.state;

    let answer = '';

    try {
      answer = calculator.calculate(calc_input).answer;
    }
    catch (e) {
      answer = e.message;
    }
    
    this.setState({
      answer
    });
  }

  render() {
    const { answer, calc_input } = this.state;

    return (
      <div className="row mt-5">
        <div className="col-md-4 offset-md-1">
          <p>Answer: {answer}</p>
          <CalculatorView
            value={calc_input}
            changeHandler={this.handleChange}
            clickHandler={this.handleClick}
          />
        </div>
      </div>
    )
  }
}

export default MainView;
