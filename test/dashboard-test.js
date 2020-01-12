const chai = require('chai');
const expect = chai.expect;

const Customer = require('../src/customer');
const Manager = require('../src/manager');
const Dashboard = require('../src/dashboard');


describe('Dashboard', () => {
  let customer;
  let manager;

  beforeEach(() => {
    customer = new Customer(1, "Leatha Ullrich");
    manager = new Manager();
  });

  it('should be a function', () => {
    let dashboard = new Dashboard(cutomer);

    expect(Dashboard).to.be.a('function');
  });

});
