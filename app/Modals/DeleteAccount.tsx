import React from 'react';

interface DeleteAccountProps {
  setAccountShow: (show: boolean) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ setAccountShow }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-xl shadow-xl p-8 w-[90%] max-w-md text-white">
        {/* Close Button */}
        <button
          onClick={() => setAccountShow(false)}
          className="absolute top-[-12px] right-[-12px] h-7 w-7 flex items-center justify-center text-lg border border-[#EE0000] rounded-full bg-primary-100 font-bold hover:bg-red-700 transition cursor-pointer"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-3">Confirm Account Deletion</h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setAccountShow(false)}
            className="flex-1 px-4 py-2 bg-white text-black border border-white rounded hover:bg-gray-100 font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 bg-[#ee0000] text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
