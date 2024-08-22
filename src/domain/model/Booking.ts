interface Booking {
  id: number
  userId: number
  vehicleId: number
  driverId: number
  startTime: Date
  endTime: Date
  status: BookingStatus
}

enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED'
}
