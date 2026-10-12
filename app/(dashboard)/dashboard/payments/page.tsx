import React from 'react';
import { getMyPayments } from '../../_actions/fetch-api';
import PaymentCards from '../../(components)/PaymentCards';

const PaymentPage = async() => {
    const result = await getMyPayments();
    const payments = result.data
    return (
        <div>
          <PaymentCards payments={payments} /> 
        </div>
    );
};

export default PaymentPage;