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
    expect(Calculator.calculate('1,5000').total).to.equal('1');
    // expect(Calculator.calculate('4,-3').total).to.equal('1');
    expect(Calculator.calculate('20').total).to.equal('20');
  });

  it('should return 0 on empty or invalid input', () => {
    expect(Calculator.calculate('').total).to.equal('0');
    expect(Calculator.calculate('hello').total).to.equal('0');
  });

  it('should consider invalid inputs as 0', () => {
    expect(Calculator.calculate('5,tytyt').total).to.equal('5');
    expect(Calculator.calculate('natt,10').total).to.equal('10');
  });

  it('should calculate any number of inputs', () => {
    expect(Calculator.calculate('1,2,3,4,5,6,7,8,9,10,11,12').total).to.equal('78');
    expect(Calculator.calculate('2,e,4,e,6,e,8,e,10').total).to.equal('30');
    // expect(Calculator.calculate('1,3,5,10,-5,-3,-1').total).to.equal('10');
    // expect(Calculator.calculate('-1,-3,-5,-10').total).to.equal('-19');
  });

  it('should calculate any number of inputs with new delimiter "\\n"', () => {
    expect(Calculator.calculate('1\\n2,3').total).to.equal('6');
    expect(Calculator.calculate('\\n2\\n3\\n5,6').total).to.equal('16');
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
    expect(Calculator.calculate('2,1001,6').total).to.equal('8');
    expect(Calculator.calculate(' \\n5000,2000,1000\\n').total).to.equal('1000');
  });

  it('should accept a new format with a single character custom delimiter', () => {
    expect(Calculator.calculate('//,\\n2,ff,100').total).to.equal('102');
    expect(Calculator.calculate('//#\\n2#5').total).to.equal('7');
    expect(Calculator.calculate('//*\\n10,100***1').total).to.equal('111');
  });

  it('should accept a new format with a custom delimiter of any length', () => {
    expect(Calculator.calculate('//[***]\\n11***22***33').total).to.equal('66');
    expect(Calculator.calculate('//[rrrr]\\nrrrr5rrrr2rrrr1,2\\n10').total).to.equal('20');
  });

  it('should accept a new format with any number of custom delimiters of any length', () => {
    expect(Calculator.calculate('//[*][!!][r9r]\\n11r9r22*hh*33!!44').total).to.equal('110');
    expect(Calculator.calculate('//[*][!!][r9r][rrrr]\\n22r9r11*r9r*33!!4rrrr10,80\\n40').total).to.equal('200');
  });
});
