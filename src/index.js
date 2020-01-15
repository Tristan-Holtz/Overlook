import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import Manager from './manager.js';
import Customer from './customer.js';
import Dashboard from './dashboard.js';

let dashboard;

const generateUser = (info) => {
  if($('.login-username').val() === 'manager') {
    const manager = new Manager(info.users);
    dashboard = new Dashboard(manager);
    $('.error-message').hide();
    $('.login-section').hide();
    $('main').addClass('width');
    dashboard.getRooms();
    dashboard.getBookings();
  } else {
    const loginInput = parseInt($('.login-username').val().split('customer')[1]);
    const customerInfo = info.users.find(user => user.id === loginInput)
    const customer = new Customer(customerInfo.id, customerInfo.name);
    dashboard = new Dashboard(customer);
    $('.error-message').hide();
    $('.login-section').hide();
    $('main').addClass('width');
    dashboard.getRooms();
    dashboard.getBookings();
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

const filterDate = () => {
  dashboard.filterByDate($('.input_date').val());
}

const filterRoom = () => {
  dashboard.filterByRoom($('.input_room-type').val());
}

const filterUser = () => {
  dashboard.filterByUser($('.input_customer-name').val().split(' ').join(' '));
}

const makeBooking = (event) => {
  dashboard.user.bookRoom(event.target.value, dashboard.selectedDate, JSON.stringify(dashboard.userID));
}

const deleteBooking = (event) => {
  dashboard.user.deleteBooking(event.target.value);
  console.log(event.target.parentNode);
  event.target.parentNode.classList.add('hidden');
}

$('.login-button').click(checkPassword);
$(document).on("click", '.input_date-button', filterDate);
$(document).on("click", '.input_room-button', filterRoom);
$(document).on("click", '.input_customer-button', filterUser);
$(document).on("click", '.book-button', makeBooking);
$(document).on("click", '.delete-button', deleteBooking);
