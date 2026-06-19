import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'sonner';

interface ApiKeyModalProps {
  handleClose: () => void;
  apiKey?: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ handleClose, apiKey }) => {
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Copied!!');
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg p-6 w-[75%] max-w-[30rem] text-white">
        <h2 className="text-lg font-semibold mb-3">Your New API Key</h2>

        <p className="text-sm font-semibold">Keep your API Key safe:</p>
        <p className="text-sm text-gray-400 mb-4">
          It is imperative to securely store your API Key in a safe location.
        </p>

        <div className="flex items-center bg-black text-red-600 border border-[#444] rounded-md overflow-auto">
          <span className="px-3 py-2 text-14 break-all flex-1">{apiKey}</span>
          <button
            className="px-3 text-green-600 h-full cursor-pointer bg-transparent border-none"
            onClick={() => handleCopy(apiKey || '')}
            title="Copy API Key"
          >
            <FaCopy size={14} />
          </button>
        </div>

        <button
          onClick={() => handleClose()}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded cursor-pointer"
        >
          I Confirm I Copied The API Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeyModal;
