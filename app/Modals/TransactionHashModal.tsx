import React from 'react';
import { reactIcons } from '@utils/icons';
import { toast } from 'sonner';

interface TransactionHashModalProps {
  setOpen: (open: boolean) => void;
  txHashes: string[];
}

const TransactionHashModal: React.FC<TransactionHashModalProps> = ({ setOpen, txHashes }) => {
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success(`${key.slice(0, 15) + '...'} Copied!!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg p-6 w-[95%] max-w-2xl text-white">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-[-12px] right-[-12px] h-7 w-7 flex items-center justify-center text-lg border border-[#EE0000] rounded-full bg-primary-100 font-bold hover:bg-red-700 transition cursor-pointer"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Transaction Hash</h2>

        <div className="max-h-[250px] overflow-x-auto mb-4">
          <div className="mt-2">
            {txHashes?.length > 0 ? (
              <>
                {txHashes.map((hash, index) => {
                  return (
                    <div key={index} className="flex mb-3 items-center gap-2">
                      {hash && index + 1}
                      {hash && '.'}{' '}
                      {hash && (
                        <div className="flex-1">
                          <input
                            type="text"
                            readOnly
                            value={hash.slice(0, 50) + '.....'}
                            className="w-full bg-black text-white p-2 rounded border border-gray-600"
                          />
                        </div>
                      )}
                      {hash && (
                        <button
                          onClick={() => handleCopy(hash)}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 p-2 rounded cursor-pointer border-none text-white"
                          title="Copy hash"
                        >
                          {reactIcons?.copy || 'Copy'}
                        </button>
                      )}
                      {!hash && index === 0 && (
                        <p className="self-center w-fit mx-auto py-6 px-2 font-semibold">
                          No Content
                        </p>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <p className="self-center w-fit mx-auto py-6 px-2 font-semibold">
                No Content
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHashModal;
