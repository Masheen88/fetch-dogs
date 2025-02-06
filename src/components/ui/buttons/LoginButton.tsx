export default function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      Login
    </button>
  );
}
