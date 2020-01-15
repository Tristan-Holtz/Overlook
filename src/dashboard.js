import $ from 'jquery';
class Dashboard {
  constructor(user) {
    this.user = user;
    this.date = JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/');
    this.rooms = [];
    this.bookings = [];
    this.roomsBookedToday = [];
    this.roomNumbers = [];
    this.totalRevenueToday = 0;
    this.totalSpent = 0;
    this.roomsAvailableToday = [];
    this.customerBookings = [];
    this.selectedDate = JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/');
    this.userID = user.id || 0;
  }
  resetTotalSpent(name) {
    this.totalSpent = Math.floor(this.customerBookings.reduce((sum, booking) => {
      this.rooms.forEach(room => {
        if(room.number === booking.roomNumber) {
          sum += room.costPerNight;
        }
      })
      return sum;
    }, 0))
  }
  filterByUser(name) {
    let user = this.user.customerDetails.find(customer => customer.name === name)
    this.userID = user.id;
    this.customerBookings = this.bookings.filter(booking => {
      return booking.userID === user.id;
    })
    console.log(this.customerBookings)
    this.resetTotalSpent(name);
    $('.rooms_section').empty();
    $('.rooms_section').append(`<h2>${user.name}</h2>`);
    $('.rooms_section').append(`<h2>Has spent a total of: $${this.totalSpent}</h2>`);
    this.customerBookings.forEach(booking => {
      $('.rooms_section').append(`
          <section>
            <p>On ${booking.date} room number ${booking.roomNumber} was booked.</p>
            <button class="delete-button" value="${booking.id}">DELETE</button>
          </section>
        `);
    })
  }
  generateRoomHTML(room) {
    $('.rooms_section').append(`
        <article class='rooms_section-card'>
          <p>Room number ${room.number} is available</p>
          <p>Cost: $${room.costPerNight}</p>
          <p>Room-Type: ${room.roomType}</p>
          <p>Beds: ${room.numBeds}</p>
          <p>Bed-Size: ${room.bedSize}</p>
          <p>Bidet: ${room.bidet}</p>
          <button type="button" value="${room.number}" class="book-button">BOOK</button>
        </article>
      `)
  }
  filterByDate(date) {
    this.selectedDate = date;
    $('.rooms_section').empty();
    this.roomsAvailableToday = [];
    if(date !== this.date) {
      this.roomsBookedToday = this.bookings.filter(booking => booking.date === date);
      this.roomNumbers = this.roomsBookedToday.map(room => room.roomNumber);
    }
    this.rooms.forEach(room => {
      if(!this.roomNumbers.includes(room.number)) {
        this.roomsAvailableToday.push(room);
        this.generateRoomHTML(room);
      }
    })
  }
  filterByRoom(type) {
    $('.rooms_section').empty();
    let currentRooms = this.roomsAvailableToday.filter(room => {
      return room.roomType === type});
    this.roomsAvailableToday = currentRooms;
    currentRooms.forEach(room => {
      this.generateRoomHTML(room);
    })
  }
  generateRooms(roomData) {
    this.rooms = roomData.rooms;
  }
  getRooms() {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms")
      .then(response => response.json())
      .then(data => this.generateRooms(data))
      .catch(error => console.log(error))
  }
  generateHTML(user) {
    if(user.name === 'manager') {
      $('.main_dashboard').append(`
        <header class="main_header">
          <h1>Overlook</h1>
        </header>
        <section class="dashboard">
          <aside class="dashboard-options">
            <form class="form_options">
              <label for="customer input" class="input_label">Customer Name</label>
              <input name="customer input" class="input_customer-name search" placeholder="Enter customer name"></input>
              <button type="button" class="input_customer-button search-button">GO</button>
              <label for="room type" class="input_label">Room Type</label>
              <input name="room type" class="input_room-type search" placeholder="Enter room type"></input>
              <button type="button" class="input_room-button search-button">GO</button>
              <label for="date" class="input_label">Date</label>
              <input name="date" class="input_date search" placeholder="YYYY/MM/DD"></input>
              <button type="button" class="input_date-button search-button">GO</button>
            </form>
            <section class="dashboard_stats">
              <div class="dashboard_stats-container">
                <h3>Total Rooms Available Today:</h3>
                <p>${25 - this.roomsBookedToday.length}</p>
              </div>
              <div class="dashboard_stats-container">
                <h3>Percentage of Total Occupancy:</h3>
                <p>${(this.roomsBookedToday.length / 25) * 100}%</p>
              </div>
              <div class="dashboard_stats-container">
                <h3>Total Revenue for Today:</h3>
                <p>$${Math.floor(this.totalRevenueToday)}</p>
              </div>
            </section>
          </aside>
          <section class="rooms_section">
          </section>
        </section>
        `)
    } else {
      $('.main_dashboard').append(`
        <header class="main_header">
          <h1>Overlook</h1>
        </header>
        <h2 class="welcome-message">Welcome back ${user.name}!</h2>
        <section class="dashboard">
          <aside class="dashboard-options">
            <h2 class="booking-message">Book a new stay</h2>
            <form class="form_options">
              <label for="room type" class="input_label">Room Type</label>
              <input name="room type" class="input_room-type search" placeholder="Enter room type"></input>
              <button type="button" class="input_room-button search-button">GO</button>
              <label for="date" class="input_label">Date</label>
              <input name="date" class="input_date search" placeholder="YYYY/MM/DD"></input>
              <button type="button" class="input_date-button search-button">GO</button>
            </form>
            <section class="dashboard_stats">
              <div class="dashboard_stats-container">
                <h3>Total Spent:</h3>
                <p>$${Math.floor(this.totalSpent)}</p>
              </div>
              <div class="dashboard_stats-container">
                <h3>User Bookings</h3>
              </div>
            </section>
          </aside>
          <section class="rooms_section">
          </section>
        </section>
        `)
        this.customerBookings.forEach(booking => {
          $('.dashboard_stats-container').append(`
              <section class="bookings">
                <p>On ${booking.date} room number ${booking.roomNumber} was booked.</p>
              </section>
            `);
        })
    }
  }
  generateBookings(bookingData) {
    this.bookings = bookingData.bookings;
    this.roomsBookedToday = this.bookings.filter(booking =>
      booking.date === this.date);
    this.roomNumbers = this.roomsBookedToday.map(room => room.roomNumber);
    this.totalRevenueToday = this.roomsBookedToday.reduce((sum, bookedRoom) => {
      this.rooms.forEach(room => {
        if(room.number === bookedRoom.roomNumber) {
          sum += room.costPerNight;
        }
      })
      return sum;
    }, 0);
    this.totalSpent = this.bookings.reduce((sum, booking) => {
      this.rooms.forEach(room => {
        if(booking.userID === this.user.id && room.number === booking.roomNumber) {
          sum += room.costPerNight;
        }
      })
      return sum;
    }, 0)
    this.generateHTML(this.user);
    this.filterByDate(this.date);
  }
  getBookings() {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings")
      .then(response => response.json())
      .then(data => this.generateBookings(data))
      .catch(error => console.log(error))
  }
}
export default Dashboard;
