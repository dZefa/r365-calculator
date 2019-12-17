import { expect } from 'chai';

import calculator from '../src/utils/calculator';

describe('Calculator Unit Tests', () => {
  let Calculator;

  before(() => {
    Calculator = new calculator();
  });

  it('should initiate calculator', () => {
    expect(Calculator).to.exist;
  });

  // it('should limit to 2 inputs only', () => {
  //   let errorMessage = '';

  //   try {
  //     Calculator.calculate('3,4,5');
  //   }
  //   catch (e) {
  //     errorMessage += e.message;
  //   }

  //   expect(errorMessage).to.equal('Please enter two or fewer numbers to calculate');
  // });

  it('should calculate the addition of two inputs, including negatives', () => {
    expect(Calculator.calculate('1,5000')).to.equal('1');
    // expect(Calculator.calculate('4,-3')).to.equal('1');
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

  it('should calculate any number of inputs', () => {
    expect(Calculator.calculate('1,2,3,4,5,6,7,8,9,10,11,12')).to.equal('78');
    expect(Calculator.calculate('2,e,4,e,6,e,8,e,10')).to.equal('30');
    // expect(Calculator.calculate('1,3,5,10,-5,-3,-1')).to.equal('10');
    // expect(Calculator.calculate('-1,-3,-5,-10')).to.equal('-19');
  });

  it('should calculate any number of inputs with new delimiter "\\n"', () => {
    expect(Calculator.calculate('1\\n2,3')).to.equal('6');
    expect(Calculator.calculate('\\n2\\n3\\n5,6')).to.equal('16');
  });

  it('should deny negative numbers', () => {
    let errorMessage = '';

    try {
      Calculator.calculate(',0,,,-1, -2\\n1,-3');
    }
    catch (e) {
      errorMessage += e.message;
    }

    expect(errorMessage).to.equal('Please only enter positive numbers. Affected numbers: -1,-2,-3')
  });

  it('should invalidate numbers greater than 1000', () => {
    expect(Calculator.calculate('2,1001,6')).to.equal('8');
    expect(Calculator.calculate(' \\n5000,2000,1000\\n')).to.equal('1000');
  });

  it('should accept a new format with a single character custom delimiter', () => {
    expect(Calculator.calculate('//,\\n2,ff,100')).to.equal('102');
    expect(Calculator.calculate('//#\\n2#5')).to.equal('7');
    expect(Calculator.calculate('//*\\n10,100***1')).to.equal('111');
  });
});
