import React from 'react';
import { Copy, Lock, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyModalProps {
  handleClose: () => void;
  apiKey?: string;
  onRegenerate?: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ handleClose, apiKey, onRegenerate }) => {
  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Copied!!');
  };

  // Format creation date (using current time or formatted fallback)
  const formattedDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(' at', ',');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white/90 border border-white/40 rounded-[28px] p-6 md:p-8 shadow-2xl backdrop-blur-xl text-slate-800 animate-in zoom-in duration-200">
        
        {/* Back Button */}
        <button
          onClick={handleClose}
          className="absolute -top-16 left-2 flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white/80 text-slate-700 rounded-xl hover:bg-slate-50 transition cursor-pointer text-xs font-semibold shadow-sm"
          style={{ outline: 'none' }}
        >
          <ChevronLeft size={14} /> Back
        </button>

        <h1 className="text-2xl font-bold tracking-wide text-slate-900 mb-6 pl-1">API Key</h1>

        {/* Details Card */}
        <div className="w-full bg-white/60 border border-slate-100 rounded-2xl p-5 md:p-6 space-y-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center text-xs md:text-sm border-b border-slate-100 pb-4">
            <span className="font-semibold text-slate-500">Date Created</span>
            <span className="text-slate-800 font-medium font-sans">{formattedDate}</span>
          </div>
          
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="font-semibold text-slate-500">Fingerprint</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-800 font-semibold font-mono select-all break-all text-right">{apiKey || 'No Key Generated'}</span>
              {apiKey && (
                <button
                  onClick={() => handleCopy(apiKey)}
                  className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition duration-200 cursor-pointer bg-slate-100 rounded flex items-center justify-center border-none"
                  title="Copy API Key"
                >
                  <Copy size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        {onRegenerate && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to generate a new API Key? This will invalidate the existing key.")) {
                onRegenerate();
              }
            }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 cursor-pointer border-none shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
          >
            <Lock size={12} className="text-white" /> Generate New API Key
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyModal;
