import { expect } from 'chai';

import calculator from '../src/utils/calculator';

describe('', () => {
  let Calculator;

  before(() => {
    Calculator = new calculator();
  });

  it('should initiate calculator', () => {
    expect(Calculator).to.exist;
  });

  it('should limit to 2 inputs only', () => {
    let errorMessage = '';

    try {
      Calculator.calculate('3,4,5');
    }
    catch (e) {
      errorMessage += e.message;
    }

    expect(errorMessage).to.equal('Please enter two or fewer numbers to calculate');
  });

  it('should calculate the addition of two inputs, including negatives', () => {
    expect(Calculator.calculate('1,5000')).to.equal('5001');
    expect(Calculator.calculate('4,-3')).to.equal('1');
    expect(Calculator.calculate('20')).to.equal('20');
  });

  it('should return 0 on empty or invalid input', () => {
    expect(Calculator.calculate('')).to.equal('0');
    expect(Calculator.calculate('hello')).to.equal('0');
  });

  it('should consider invalid inputs as 0', () => {
    expect(Calculator.calculate('5,tytyt')).to.equal('5');
    expect(Calculator.calculate('natt,10')).to.equal('10');
  });
});
