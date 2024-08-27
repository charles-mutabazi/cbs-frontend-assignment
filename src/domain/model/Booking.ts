export interface NewBooking {
  id: number
  userId: number
  vehicleId: number
  driverId: number
  slotDateTime: String
  destination: string
  status: BookingStatus
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
  OVERRIDDEN = 'OVERRIDDEN'
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
