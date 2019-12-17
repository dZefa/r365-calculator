export default class Calculator {
  constructor() { }

  _calculatorException(name, message) {
    this.message = message;
    this.name = name;
  }

  calculate(input) {
    const inputs = input.split(',');
    let total = 0;

    // if (inputs.length > 2) {
    //   throw new this._calculatorException('Limit Exception', 'Please enter two or fewer numbers to calculate');
    // }

    for (let i = 0; i < inputs.length; i++) {
      if (Number(inputs[i])) {
        total += Math.round(Number(inputs[i]));
      }
    }

    return total.toString();
  }
}