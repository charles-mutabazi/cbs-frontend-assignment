export interface Vehicle {
  id: number
  name: string,
  licensePlate: string
  driverId: number
  capacity: number
  bookings: number[] // booking ids
}