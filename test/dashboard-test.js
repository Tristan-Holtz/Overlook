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
    manager = new Manager([1, 2, 3, 4, 5]);
  });

  it('should be a function', () => {
    let dashboard = new Dashboard(cutomer);

    expect(Dashboard).to.be.a('function');
  });

  it('should be an instance of Dashboard', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard).to.be.an.instanceof(Dashboard);
  })

  it('should store the user', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.user).to.deep.equal(customer);
  })

  it('should keep track of the date', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.date).to.equal(JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/'));
  })

});
