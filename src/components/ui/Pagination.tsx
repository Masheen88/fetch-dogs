interface PaginationProps {
  readonly page: number;
  readonly setPage: (page: number) => void;
  readonly totalPages: number;
}

//Allows pages to display previous, next, currenct/total pages.
export default function Pagination({
  page,
  setPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center py-4 shadow-md border-t border-amber-500 backdrop-brightness-20 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        className="p-2 border rounded mx-2 bg-indigo-950 hover:bg-amber-500"
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
        className="p-2 border rounded mx-2 bg-indigo-950 hover:bg-amber-500"
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}
