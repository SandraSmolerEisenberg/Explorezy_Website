export default class User {
  constructor(email, password, firstName, lastName, favouritePlaces, trips) {
    this.email = email
    this.password = password
    this.first_name = firstName
    this.last_name = lastName
    this.favourite_places = favouritePlaces
    this.trips = trips
  }
}
