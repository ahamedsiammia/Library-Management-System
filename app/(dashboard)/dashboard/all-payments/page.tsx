import { getAllPayments, getMyPayments } from '../../_actions/fetch-api';
import PaymentCards from '../../(components)/PaymentCards';

const AllPayments = async() => {
    const result = await getAllPayments();
    const payments = result.data
    return (
        <div>
          <PaymentCards payments={payments} /> 
        </div>
    );
};
export default AllPayments;
