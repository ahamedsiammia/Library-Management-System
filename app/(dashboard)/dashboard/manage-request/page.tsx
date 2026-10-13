import ManageRequestCards from "../../(components)/ManageRequestCards";
import { getAllBookings } from "../../_actions/fetch-api";

type ManageRequestPageProps = {
  searchParams: Promise<{ page?: string }>;
};

const LIMIT = 8;

const ManageRequestPage = async ({ searchParams }: ManageRequestPageProps) => {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const result = await getAllBookings(currentPage, LIMIT);

  if (!result?.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm font-semibold text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
        {result?.message || "Booking request আনা যায়নি। আবার চেষ্টা করুন।"}
      </div>
    );
  }

  return <ManageRequestCards bookings={result.data} meta={result.meta} />;
};

export default ManageRequestPage;