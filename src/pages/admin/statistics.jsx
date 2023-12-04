import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import BookingChart from '../../components/Charts/bookingChart';
import BookingComparisonChart from '../../components/Charts/LineChart';

const Statistics = () => {

  const [bookings, setBookings] = useState([])
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(import.meta.env.VITE_EXPRESS_API + '/bookings/get-all-parcels')
    .then(res => setBookings(res.data.bookings))
  },[axiosSecure])

  console.log(bookings)

  return (
    <div className='flex flex-col gap-5'>
      <h1>Bookings by Date</h1>
      {bookings?.length > 0 && <BookingChart bookingData={bookings} />}
      {bookings?.length > 0 && <BookingComparisonChart bookingData={bookings} />}
    </div>
  )
}

export default Statistics