import $ from 'jquery';

class Dashboard {
  constructor(user) {
    this.user = user;
    this.date = Date.now();
  }

  filterRoom() {

  }

  generateHTML(user) {
    if(user === 'manager') {
      $('.main_dashboard').append(`
        <header class="main_header">
        </header>
        <section class="manager_dashboard">
          <aside class="manager_dashboard-options">
            <form class="form_manager-options">
              <label class="input_label">Customer ID:</label>
              <input class="input_customer-id"></input>
              <label class="input_label">Room Type:</label>
              <input class="input_room-type"></input>
              <label class="input_label">Date:</label>
              <input class="input_date"></input>
            </form>
          </aside>
          <section class="rooms_section">
          </section>
        </section>
        `)
    } else {

    }
  }
}

export default Dashboard;
