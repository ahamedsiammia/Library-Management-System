
import ReturnBooks from "../../(components)/ReturnBooks";
import { getMyBookings } from "../../_actions/fetch-api";

const Page = async () => {
  const result = await getMyBookings();

  const bookings = (result?.data ?? []).filter(
    (booking: any) =>
      booking.status === "ISSUED" ||
      booking.status === "RETURNED"
  );

  return <ReturnBooks bookings={bookings} />;
};

export default Page;
