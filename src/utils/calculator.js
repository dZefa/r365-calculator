export default class Calculator {
  constructor() { }

  // I: string - name
  // I: string - message
  _calculatorException(name, message) {
    this.message = message;
    this.name = name;
  }

  // I: string - input
  // O: input[]
  _getInputs(string) {
    const inputs = [];
    let numStart = 0;
    let curr = 0;
    
    while (curr < string.length) {
      if ((string[curr] === ',') || (string[curr] === '\\' && string[curr + 1] === 'n')) {
        if (!(numStart === 0 && curr === 0)) {
          inputs.push(string.slice(numStart, curr));
        }

        if (string[curr] === ',') {
          curr += 1;
        } else {
          curr += 2;
        }

        numStart = curr;
      } else {
        curr += 1;
      }
    }

    inputs.push(string.slice(numStart));

    return inputs;
  }

  // I: string - input
  // O: string - total
  calculate(input) {
    const inputs = this._getInputs(input);
    const negativeInputs = [];
    let total = 0;

    // if (inputs.length > 2) {
    //   throw new this._calculatorException('Limit Exception', 'Please enter two or fewer numbers to calculate');
    // }

    for (let i = 0; i < inputs.length; i++) {
      const currNum = Number(inputs[i]);

      if (currNum) {
        if (currNum < 0) {
          negativeInputs.push(currNum);
        }

        total += Math.round(currNum);
      }
    }

    if (negativeInputs.length > 0) {
      throw new this._calculatorException('Negative Input Exception', 'Please only enter positive numbers. Affected numbers: ' + negativeInputs.join(','));
    }

    return total.toString();
  }
}