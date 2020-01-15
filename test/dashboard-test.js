const chai = require('chai');
const expect = chai.expect;

const Customer = require('../src/customer');
const Manager = require('../src/manager');
const Dashboard = require('../src/dashboard');


describe('Dashboard', () => {
  let customer;
  let manager;

  beforeEach(() => {
    customer = new Customer(1, "Leatha Ullrich");
    manager = new Manager([
      {id: 1, name: "Leatha Ullrich"},
      {id: 2, name: "Rocio Schuster"}]);
  });

  it('should be a function', () => {
    let dashboard = new Dashboard(cutomer);

    expect(Dashboard).to.be.a('function');
  });

  it('should be an instance of Dashboard', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard).to.be.an.instanceof(Dashboard);
  })

  it('should store the user', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.user).to.deep.equal(customer);
  })

  it('should keep track of the date', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.date).to.equal(JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/'));
  })

  it('should have the id of the user', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.userID).to.equal(1);
  })

  it('should start rooms property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.rooms).to.deep.equal([]);
  })

  it('should start bookings property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.bookings).to.deep.equal([]);
  })

  it('should start roomsBookedToday property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.roomsBookedToday).to.deep.equal([]);
  })

  it('should start roomNumbers property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.roomNumbers).to.deep.equal([]);
  })

  it('should start roomsAvailableToday property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.roomsAvailableToday).to.deep.equal([]);
  })

  it('should start customerBookings property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.customerBookings).to.deep.equal([]);
  })

  it('should start totalRevenueToday property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.totalRevenueToday).to.equal(0);
  })

  it('should start totalSpent property as an empty array', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.totalSpent).to.equal(0);
  })

  it('should keep track of the date selected', () => {
    let dashboard = new Dashboard(cutomer);

    expect(dashboard.selectedDate).to.equal(JSON.stringify(new Date()).split('T')[0].split('"')[1].split('-').join('/'));
  })

  describe('generateHTML', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(cutomer);

      expect(dashboard.generateHTML()).to.be.a('function');
    })

  })

  describe('generateRoomHTML', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(cutomer);

      expect(dashboard.generateRoomHTML()).to.be.a('function');
    })
  })

  describe('filterByUser', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.filterByUser()).to.be.a('function');
    })
  })

  describe('displayApology', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.displayApology()).to.be.a('function');
    })
  })

  desrcibe('generateRooms', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.generateRooms()).to.be.a('function');
    })

    it('should reasign the rooms property', () => {
      let dashboard = new Dashboard(manager);

      dashboard.generateRooms({roomData: {rooms: []});
      expect(dashboard.rooms).to.deep.equal([]);
    })
  })

  describe('resetTotalSpent', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.resetTotalSpent()).to.be.a('function');
    })
  })

  describe('filterByDate', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.filterByDate()).to.be.a('function');
    })
  })

  describe('filterByRoom', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.filterByRoom()).to.be.a('function');
    })
  })

  describe('getRooms', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.getRooms()).to.be.a('function');
    })
  })

  describe('addCustomerBookings', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.addCustomerBookings()).to.be.a('function');
    })
  })

  describe('generateBookings', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.generateBookings()).to.be.a('function');
    })
  })

  describe('getBookings', () => {
    it('should be a function', () => {
      let dashboard = new Dashboard(manager);

      expect(dashboard.getBookings()).to.be.a('function');
    })
  })

});
