export default class Calculator {
  constructor() { }

  // I - name: string
  // I - message: string
  _calculatorException(name, message) {
    this.message = message;
    this.name = name;
  }

  // I - delimiterStr: string
  // O - string
  _escapeDelimiterChars(delimiterStr) {
    const specialChars = {
      '*': true,
      '^': true,
      '$': true,
      '.': true,
      '|': true,
      '?': true,
      '\\': true,
      '+': true,
      '(': true,
      ')': true,
      '[': true,
      '{': true,
    };

    let escapedStr = '';

    for (let i = 0; i < delimiterStr.length; i++) {
      if (specialChars[delimiterStr[i]]) {
        escapedStr += '\\';
      }

      escapedStr += delimiterStr[i];
    }

    return escapedStr;
  }

  // I - string: string
  // O - inputs: input[]
  _getInputs(string) {
    const inputs = [];
    const { delimiters, translatedStr } = this._translateString(string);
    let inputString = '';

    if (delimiters.length > 0) {
      inputString = this._replaceDelimiters(delimiters, translatedStr);
    } else {
      inputString = translatedStr;
    }

    let numStart = 0;
    let curr = 0;
    
    while (curr < inputString.length) {
      if ((inputString[curr] === ',') || (inputString[curr] === '\\' && inputString[curr + 1] === 'n')) {
        if (!(numStart === 0 && curr === 0)) {
          inputs.push(inputString.slice(numStart, curr));
        }

        if (inputString[curr] === ',') {
          curr += 1;
        } else {
          curr += 2;
        }

        numStart = curr;
      } else {
        curr += 1;
      }
    }

    inputs.push(inputString.slice(numStart));

    return inputs;
  }

  // I - delimiters: string[]
  // I - string: string
  // O - string
  _replaceDelimiters(delimiters, string) {
    let delimiterStr = '';

    for (let i = 0; i < delimiters.length; i++) {
      if (delimiterStr === '') {
        delimiterStr += this._escapeDelimiterChars(delimiters[i]);
      } else {
        delimiterStr += '|' + this._escapeDelimiterChars(delimiters[i]);
      }
    }

    const regExp = new RegExp(`${delimiterStr}`, 'gi');

    return string.replace(regExp, ',');
  }

  // I - string: string
  // O - { delimiters: string[], translatedStr: string }
  _translateString(string) {
    let delimiters = [];
    let translatedStr = '';

    if (string.slice(0,2) === '//' && string.slice(3,5) === '\\n') {
      delimiters.push(string[2]);
      translatedStr = string.slice(5);
    } else if (string.slice(0,3) === '//[') {
      const end = string.indexOf(']\\n');
      delimiters.push(string.slice(3,end));
      translatedStr = string.slice(end+3);
    } else {
      translatedStr = string;
    }

    return { delimiters, translatedStr };
  }

  // I - input: string
  // O - total: string
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

        if (currNum <= 1000) {
          total += Math.round(currNum);
        }
      }
    }

    if (negativeInputs.length > 0) {
      throw new this._calculatorException('Negative Input Exception', 'Please only enter positive numbers. Affected numbers: ' + negativeInputs.join(','));
    }

    return total.toString();
  }
}