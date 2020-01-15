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
  }

  resetTotalSent(name) {
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
    this.customerBookings = this.bookings.filter(booking => {
      return booking.userID === user.id;
    })
    this.resetTotalSent(name);
    $('.rooms_section').empty();
    $('.rooms_section').append(`<h2>${user.name}</h2>`);
    $('.rooms_section').append(`<h2>Has spent a total of: $${this.totalSpent}</h2>`);
    this.customerBookings.forEach(booking => {
      $('.rooms_section').append(`
          <section>
            <p>On ${booking.date} room number ${booking.roomNumber} was booked.</p>
          </section>
        `);
    })
  }

  generateRoomHTML(room) {
    $('.rooms_section').append(`
        <article class='rooms_section-card'>
          <div class='room-card'>
            <p>Room number ${room.number} is available</p>
            <p>Cost: $${room.costPerNight}</p>
            <p>Room-Type: ${room.roomType}</p>
            <p>Beds: ${room.numBeds}</p>
            <p>Bed-Size: ${room.bedSize}</p>
            <p>Bidet: ${room.bidet}</p>
          </div>
        </article>
      `)
  }

  filterByDate(date) {
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
        </header>
        <section class="manager_dashboard">
          <aside class="manager_dashboard-options">
            <form class="form_manager-options">
              <label class="input_label">Customer Name:</label>
              <input class="input_customer-name" placeholder="Enter customer name"></input>
              <button type="button" class="input_customer-button">GO</button>
              <label class="input_label">Room Type:</label>
              <input class="input_room-type" placeholder="Enter room type"></input>
              <button type="button" class="input_room-button">GO</button>
              <label class="input_label">Date:</label>
              <input class="input_date" placeholder="2020/01/16"></input>
              <button type="button" class="input_date-button">GO</button>
            </form>
            <section>
              <div>
                <h3>Total Rooms Available Today:</h3>
                <p>${25 - this.roomsBookedToday.length}</p>
              </div>
              <div>
                <h3>Percentage of Total Occupancy:</h3>
                <p>${(this.roomsBookedToday.length / 25) * 100}%</p>
              </div>
              <div>
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
        </header>
        <h2 class="welcome-message">Welcome back ${user.name}!</h2>
        <section class="customer_dashboard">
          <aside class="customer_dashboard-options">
            <h2>Book a new stay</h2>
            <form>
              <label class="input_label">Room Type:</label>
              <input class="input_room-type" placeholder="Enter room type"></input>
              <button type="button" class="input_date-button">GO</button>
              <label class="input_label">Date:</label>
              <input class="input_date" placeholder="Enter date"></input>
              <button type="button" class="input_room-button">GO</button>
            </form>
            <div>
              <h3>Total Spent:</h3>
              <p>$${Math.floor(this.totalSpent)}</p>
            </div>
            <div>
              <h3>User Bookings</h3>
              <p></p>
            </div>
          </aside>
          <section class="rooms_section">
          </section>
        </section>
        `)
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
