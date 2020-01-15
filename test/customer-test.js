const chai = require('chai');
const expect = chai.expect;

const Customer = require('../src/customer');


describe('Customer', () => {

  it('should be a function', () => {
    let customer = new Customer(1, 'Bob');

    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    let customer = new Customer(1, 'Bob');

    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should be have an id', () => {
    let customer = new Customer(1, 'Bob');

    expect(customer.id).to.equal(1);
  })

  it('should be have an id', () => {
    let customer = new Customer(1, 'Bob');

    expect(customer.id).to.equal(1);
  })

  it('should be have an id', () => {
    let customer = new Customer(1, 'Bob');

    expect(customer.name).to.equal('Bob');
  })

})
