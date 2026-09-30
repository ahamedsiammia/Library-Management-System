import React from 'react';
import { getMyBookings } from '../../_actions/fetch-api';
import MyBookings, { Booking } from '../../(components)/MyBookings';

const page = async() => {
   const result = await getMyBookings();
   const bookings = result.data
    return (
        <div>
            <MyBookings bookings={bookings as Booking[]}></MyBookings>
        </div>
    );
};

export default page;