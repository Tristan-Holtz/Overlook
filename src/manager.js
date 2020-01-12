import Customer from './customer.js';

class Manager extends Customer {
  constructor(customerDetails) {
    super()
    this.customerDetails = customerDetails;
    this.name = 'manager';
  }

  deleteBooking() {

  }

  searchUsers() {
    this.customerDetails.find(customer => {

    })
  }

}

export default Manager;
