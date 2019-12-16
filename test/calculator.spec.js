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
});
