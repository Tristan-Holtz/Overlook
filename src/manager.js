import Customer from './customer.js';

class Manager extends Customer {
  constructor(customerDetails) {
    super()
    this.customerDetails = customerDetails;
    this.name = 'manager';
  }

  deleteBooking(id) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
      method: "DELETE",
      headers: {"Content-Type": "Application/JSON"},
      body: JSON.stringify({
        id,
      })
    })
  }

}

export default Manager;
