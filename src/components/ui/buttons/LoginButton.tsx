//LoginButton.tsx

export default function LoginButton({
  onClick,
}: {
  readonly onClick: () => void; //returns nothing when clicked
}) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      Login
    </button>
  );
}
