
'use strict';

var axios = require('axios');

/**
 * Style Booking logic
 */
var logic = {

  url: 'NO-URL',

  token: 'NO-TOKEN',

  /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
  registerUser: function registerUser(name, surname, email, password) {
    var _this = this;

    return Promise.resolve().then(function () {
      if (typeof name !== 'string') throw Error('user name is not a string');

      if (!(name = name.trim()).length) throw Error('user name is empty or blank');

      if (typeof surname !== 'string') throw Error('user surname is not a string');

      if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

      if (typeof email !== 'string') throw Error('user email is not a string');

      if (!(email = email.trim()).length) throw Error('user email is empty or blank');

      if (typeof password !== 'string') throw Error('user password is not a string');

      if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

      return axios.post(_this.url + '/user', { name: name, surname: surname, email: email, password: password }).then(function (_ref) {
        var status = _ref.status,
            data = _ref.data;

        if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return true;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },

  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} newEmail
   * @param {string} newPassword
   *
   * @returns {Promise<boolean>}
   */
  updateUser: function updateUser(id, name, surname, email, password, newEmail, newPassword) {
    var _this2 = this;

    return Promise.resolve().then(function () {
      if (typeof id !== 'string') throw Error('userId is not a string');

      if (!(id = id.trim()).length) throw Error('userId is empty or blank');

      if (typeof name !== 'string') throw Error('user name is not a string');

      if (!(name = name.trim()).length) throw Error('user name is empty or blank');

      if (typeof surname !== 'string') throw Error('user surname is not a string');

      if ((surname = surname.trim()).length === 0) throw Error('user surname is empty or blank');

      if (typeof email !== 'string') throw Error('user email is not a string');

      if (!(email = email.trim()).length) throw Error('user email is empty or blank');

      if (typeof password !== 'string') throw Error('user password is not a string');

      if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

      return axios.patch(_this2.url + '/user', { id: id, name: name, surname: surname, email: email, password: password, newEmail: newEmail, newPassword: newPassword }, { headers: { authorization: 'Bearer ' + _this3.token } }).then(function (_ref2) {
        var status = _ref2.status,
            data = _ref2.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
   * @param {String} id
   * @param {String} email
   * @param {String} password
   *
   */
  unregisterUser: function unregisterUser(userId, email, password) {
    var _this4 = this;

    return Promise.resolve().then(function () {
      if (typeof userId !== 'string') throw Error('userId is not a string');

      if (!(userId = userId.trim()).length) throw Error('userId is empty or blank');

      if (typeof email !== 'string') throw Error('user email is not a string');

      if (!(email = email.trim()).length) throw Error('user email is empty or blank');

      if (typeof password !== 'string') throw Error('user password is not a string');

      if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

      return axios.delete(_this4.url + '/user', { headers: { authorization: 'Bearer ' + _this4.token }, data: { userId: userId, email: email, password: password } }).then(function (_ref3) {
        var status = _ref3.status,
            data = _ref3.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return true;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
     *
     * @param {string} email
     * @param {string} password
     *
     * @returns {Promise<string>}
     */
  authenticateUser: function authenticateUser(email, password) {
    var _this5 = this;

    return Promise.resolve().then(function () {
      if (typeof email !== 'string') throw Error('user email is not a string');

      if (!(email = email.trim()).length) throw Error('user email is empty or blank');

      if (typeof password !== 'string') throw Error('user password is not a string');

      if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

      return axios.post(_this5.url + '/auth', { email: email, password: password }).then(function (_ref4) {
        var status = _ref4.status,
            data = _ref4.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
        var _data$data = data.data,
            id = _data$data.id,
            token = _data$data.token;


        _this5.token = token;

        return { id: id, token: token };
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },

  /**
     * Returns the booking hours (on existing days) for a given year and month
     *
     * @example
     *  logic.getBookingHoursByYearMonth(2018, 6)
     *    .then(bookingHours => bookingHours.forEach(console.log))
     * // output
     * { day: 5, bookingHours: 6 }
     * { day: 11, bookingHours: 3 }
     * { day: 25, bookingHours: 7 }
     * { day: 30, bookingHours: 2.5 }
     *
     * @param {Number} year
     * @param {Number} month
     *
     * @returns {Promise<[{day<Number>, bookingHours<Number>}]>}
     */
  getBookingHoursForYearMonth: function getBookingHoursForYearMonth(year, month) {
    var _this6 = this;

    return Promise.resolve().then(function () {

      // if (typeof year !== 'number') throw Error('year is not a number')
      // if (typeof month !== 'number') throw Error('month is not a number')

      return axios.get(_this6.url + '/booking/hours/' + year + '/' + month, { headers: { authorization: 'Bearer ' + _this6.token } }).then(function (_ref5) {
        var status = _ref5.status,
            data = _ref5.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
   * Returns the booking hours for a given year, month, day
   *
   * @example
   *  logic.getBookingHoursForYearMonthDay(2018, 10, 1)
   *    .then(bookingHours => bookingHours.forEach(console.log))
   * // output
   * { start: 9, end: 10.5 }
   * { start: 12.5, end: 13.5 }
   * { start: 15.25, end: 16 }
   *
   * @param {Number} year
   * @param {Number} month
   * @param {Number} day
   */
  getBookingHoursForYearMonthDay: function getBookingHoursForYearMonthDay(year, month, day) {
    var _this7 = this;

    // yyyy-MM-dd
    return Promise.resolve().then(function () {

      // if (typeof year !== 'number') throw Error('year is not a number')
      // if (typeof month !== 'number') throw Error('month is not a number')
      // if (typeof day !== 'number') throw Error('day is not a number')


      console.log(_this7.url + '/booking/hours/' + year + '/' + month + '/' + day);
      return axios.get(_this7.url + '/booking/hours/' + year + '/' + month + '/' + day, { headers: { authorization: 'Bearer ' + _this7.token } }).then(function (_ref6) {
        var status = _ref6.status,
            data = _ref6.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
  * @param {object} userId
  * @param {Array} serviceIds
  * @param {Date} date
  *
  * @returns {Promise<Data>}
  */
  placeBooking: function placeBooking(userId, serviceIds, date) {
    var _this8 = this;

    return Promise.resolve().then(function () {
      //TODO VALIDATIONS
      // - Comprobar que la hora de inicio de la reserva no sea menor al inicio de jornada
      //   o mayor al fin de jornada (tirar un error en ese caso)
      return axios.post(_this8.url + '/booking', { userId: userId, serviceIds: serviceIds, date: date }, { headers: { authorization: 'Bearer ' + _this8.token } }).then(function (_ref7) {
        var status = _ref7.status,
            data = _ref7.data;

        if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
   * This function should list all bookings
   * 
   * @returns {Promise<Data>}
   */
  listBookings: function listBookings(ownerId) {
    var _this9 = this;

    return Promise.resolve().then(function () {
      return axios.get(_this9.url + '/user/' + ownerId + '/booking', { headers: { authorization: 'Bearer ' + _this9.token } }).then(function (_ref8) {
        var status = _ref8.status,
            data = _ref8.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
   * This function should list the bookings of user
   * @returns {Promise<Data>}
   */
  listBookingsUser: function listBookingsUser(userId) {
    var _this10 = this;

    return Promise.resolve().then(function () {
      console.log(_this10.token);
      return axios.get(_this10.url + '/booking/user/' + userId, { headers: { authorization: 'Bearer ' + _this10.token } }).then(function (_ref9) {
        var status = _ref9.status,
            data = _ref9.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },


  /**
   * @param {String} bookingId
   * @param {String} userId
   *
   * @returns {Promise<boolean>}
   */
  deleteBooking: function deleteBooking(bookingId, userId) {
    var _this11 = this;

    return Promise.resolve().then(function () {
      return axios.delete(_this11.url + '/booking/user/' + bookingId + '/' + userId, { headers: { authorization: 'Bearer ' + _this11.token } }).then(function (_ref10) {
        var status = _ref10.status,
            data = _ref10.data;

        if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return true;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  },
  listServices: function listServices() {
    var _this12 = this;

    return Promise.resolve().then(function () {
      return axios.get(_this12.url + '/services').then(function (_ref11) {
        var status = _ref11.status,
            data = _ref11.data;

        if (status !== 200 && data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

        return data.data;
      }).catch(function (err) {
        if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

        if (err.response) {
          var message = err.response.data.error;


          throw Error(message);
        } else throw err;
      });
    });
  }
};
module.exports = logic;
