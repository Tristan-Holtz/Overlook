const chai = require('chai');
const expect = chai.expect;

const Manager = require('../src/manager');


describe('Manager', () => {

  it('should be a function', () => {
    let manager = new Manager([1, 2, 3, 4, 5]);

    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    let manager = new Manager([1, 2, 3, 4, 5]);

    expect(manager).to.be.an.instanceof(Manager);
  });

  it('should be store customer info', () => {
    let manager = new Manager([1, 2, 3, 4, 5]);

    expect(manager.customerDetails).to.deep.equal([1, 2, 3, 4, 5]);
  })

  it('should be have a name', () => {
    let manager = new Manager([1, 2, 3, 4, 5]);

    expect(manager.name).to.equal('manager');
  })

})
