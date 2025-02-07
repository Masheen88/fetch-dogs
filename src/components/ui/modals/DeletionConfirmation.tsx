import React from "react";

interface DeletionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dogName: string;
}

//Modal for confirmation of deleeting a dog from favorites
const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  dogName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-semibold">Remove Favorite</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to remove <strong>{dogName}</strong> from
          favorites?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
