export interface Booking {
  id: number
  userId: number
  vehicleId: number
  driverId: number
  slotDateTime: Date
  destination: string
  status: BookingStatus
}

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}
export interface BookingListing {
  id: number,
  userName: string,
  vehicleName: string
  licensePlate: string
  vehicleCapacity: number
  driverName:  string
  slotDateTime: string
  destination: string
  status: BookingStatus
}
