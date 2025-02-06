interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center  py-4 shadow-md border-t border-gray-300 backdrop-brightness-20 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        className="p-2 border rounded"
        disabled={page === 0}
      >
        Previous
      </button>
      <span className="text-lg font-medium">
        Page {page + 1} of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => setPage(page + 1)}
        className="p-2 border rounded"
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}
