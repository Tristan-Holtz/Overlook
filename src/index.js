import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import Manager from './manager.js';
import Customer from './customer.js';
import Dashboard from './dashboard.js';

let dashboard;

const generateUser = (info) => {
  if($('.login-username').val() === 'manager') {
    const manager = new Manager(info);
    dashboard = new Dashboard(manager);
    $('.error-message').hide();
    $('.login-section').hide();
    dashboard.getRooms();
    dashboard.getBookings();
    console.log(manager);
  } else {
    const loginInput = parseInt($('.login-username').val().split('customer')[1]);
    const customerInfo = info.users.find(user => user.id === loginInput)
    const customer = new Customer(customerInfo.id, customerInfo.name);
    dashboard = new Dashboard(customer);
    $('.error-message').hide();
    $('.login-section').hide();
    dashboard.getRooms();
    dashboard.getBookings();
    console.log(customer);
  }
}

const loginUser = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(response => response.json())
    .then(data => generateUser(data))
    .catch(error => console.log(error))
}

const displayError = () => {
  $(".password-div").append(`
      <p class="error-message">Incorrect username or password.</p>
    `)
}

const checkPassword = () => {
  if($(".login-username").val() &&
  $(".login-password").val() === 'overlook2019') {
    loginUser();
  } else {
    displayError();
  }
}


$('.login-button').click(checkPassword);
$('.input_date-button').click(dashboard.filterByDate())
