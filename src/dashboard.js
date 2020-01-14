import $ from 'jquery';

class Dashboard {
  constructor(user) {
    this.user = user;
    this.date = JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/');
    this.rooms = [];
    this.bookings = [];
    this.roomsBookedToday = [];
    this.roomNumbers = [];
  }

  filterByDate(date) {
    this.rooms.forEach(room => {
        if(!this.roomNumbers.includes(room.number)) {
          $('.rooms_section').append(`
              <article class='rooms_section-card'>
                <div>
                  ${room.number}
                </div>
              </article>
            `)
        }
    })
  }

  filterRoom() {

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
              <label class="input_label">Customer ID:</label>
              <input class="input_customer-id" placeholder="Enter customer ID"></input>
              <button class="input_customer-button">GO</button>
              <label class="input_label">Room Type:</label>
              <input class="input_room-type" placeholder="Enter room type"></input>
              <button class="input_room-button">GO</button>
              <label class="input_label">Date:</label>
              <input class="input_date"></input>
              <button class="input_date-button">GO</button>
            </form>
          </aside>
          <section class="rooms_section">
          </section>
        </section>
        `)
    } else {
      $('.main_dashboard').append(`
        <header class="main_header">
        </header>
        <h2>Welcome back ${user.name}!</h2>
        <section>
          <aside>
            <h2>Book a new stay!</h2>
            <form>
              <label class="input_label">Date:</label>
              <input class="input_date" placeholder="Enter date"></input>
              <label class="input_label">Room Type:</label>
              <input class="input_room-type" placeholder="Enter room type"></input>
            </form>
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
