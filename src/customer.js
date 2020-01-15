class Customer {
  constructor(id, name) {
    this.name = name;
    this.id = id;
  }

  bookRoom(room, date, id) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
    method: "POST",
    headers: {"Content-Type": "Application/JSON"},
    body: JSON.stringify({
      userID: id,
      date: date,
      roomNumber: room
      })
    })
  }
}

export default Customer;
