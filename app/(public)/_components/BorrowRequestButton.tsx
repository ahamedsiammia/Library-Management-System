"use client"
import { HiOutlineBookOpen } from 'react-icons/hi2';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { BorrowRequest } from '@/app/(dashboard)/_actions/fetch-api';
import { useRouter } from 'next/navigation';

const BorrowRequestButton = ({book}:any) => {
      const [requesting, setRequesting] = useState(false);
      const router = useRouter();
      const handleBorrowRequest = () => {
    setRequesting(true);
    setTimeout(async() => {
      setRequesting(false);
      const result = await BorrowRequest(book.id as string)

      if(result.success === true){

          toast.success("বইটির জন্য অনুরোধ সফলভাবে পাঠানো হয়েছে!");
          router.push("/dashboard/borrowed")
      }
    }, 1000);
  };
    return (
        <div>
              <button
                onClick={handleBorrowRequest}
                disabled={requesting || book.copiesAvailable === 0}
                              className="py-2.5 px-3 bg-[#00BBA6] hover:bg-teal-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <HiOutlineBookOpen className="w-5 h-5" />
                )}
                <span>
                  {book.copiesAvailable > 0 ? "অনুরোধ " : "স্টকে কপি নেই"}
                </span>
              </button>

        </div>
    );
};

export default BorrowRequestButton;