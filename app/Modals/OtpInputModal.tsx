import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface OtpInputModalProps {
  setOpenOtpVerification: (open: boolean) => void;
  otp: string[];
  setOtp: (otp: string[]) => void;
  email?: string;
  timeLeft: number;
  canResend: boolean;
  handleRequestforOtp: (e: React.FormEvent) => void;
  formSubmit: () => void;
  setTimeLeft: (time: number) => void;
}

const OtpInputModal: React.FC<OtpInputModalProps> = ({
  setOpenOtpVerification,
  otp,
  setOtp,
  email,
  timeLeft,
  canResend,
  handleRequestforOtp,
  formSubmit,
  setTimeLeft,
}) => {
  const [otpError, setOtpError] = useState<string>('');

  useEffect(() => {
    const firstInput = document.getElementById('otp-0');
    firstInput?.focus();
  }, []);
  
  const formatTime = (time: number) => {
    if (time) {
      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time % 60000) / 1000);
      return `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    } else {
      return '00:00';
    }
  };

  const handleOtpSubmit = () => {
    const enterOtp = otp.join('');
    if (Boolean(enterOtp) && enterOtp?.length === 6) {
      toast.dismiss();
      setTimeLeft(0);
      setOpenOtpVerification(false);
      setTimeout(() => {
        formSubmit();
      }, 1000);
    } else {
      setOtpError('Please enter otp');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white/90 border border-white/40 rounded-[32px] shadow-[0_20px_80px_rgba(59,130,246,0.15)] p-8 w-full max-w-md backdrop-blur-xl text-slate-800 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            setOpenOtpVerification(false);
            setOtp(new Array(6).fill(''));
          }}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition cursor-pointer bg-transparent border-none flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Enter OTP</h2>
        <p className="text-sm text-slate-500 mb-6">
          We have sent a 6-digit verification code to
          <br />
          <span className="font-semibold text-slate-700">{email}</span>
        </p>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 md:gap-3 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              placeholder="-"
              value={digit}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9]$/.test(val) || val === '') {
                  const newOtp = [...otp];
                  newOtp[idx] = val;
                  setOtp(newOtp);
                  // Focus next input if a number was typed
                  if (val !== '' && idx < 5) {
                    const nextInput = document.getElementById(`otp-${idx + 1}`);
                    nextInput?.focus();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && otp[idx] === '' && idx > 0) {
                  const prevInput = document.getElementById(`otp-${idx - 1}`);
                  prevInput?.focus();
                } else if (e.key === 'Enter') {
                  e.preventDefault();
                  handleOtpSubmit();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').slice(0, 6);
                if (/^[0-9]+$/.test(pastedData)) {
                  const newOtp = [...otp];
                  pastedData.split('').forEach((char, index) => {
                    newOtp[index] = char;
                  });
                  setOtp(newOtp);
                  const focusIdx = Math.min(pastedData.length, 5);
                  document.getElementById(`otp-${focusIdx}`)?.focus();
                }
              }}
              className="w-12 h-12 text-center text-xl font-bold text-slate-800 bg-white border border-slate-200 rounded-xl outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
            />
          ))}
        </div>
        {otpError && <div className="text-sm text-rose-500 font-medium mb-4">{otpError}</div>}
        <div className="flex flex-col items-center">
          {/* Resend text */}
          {canResend ? (
            <button
              onClick={handleRequestforOtp}
              className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer bg-transparent border-none mb-4"
            >
              Resend code?
            </button>
          ) : (
            <p className="text-sm text-slate-500 mb-4">
              Didn’t receive the code?{' '}
              <span className="font-semibold text-blue-600">
                {formatTime(timeLeft)}
              </span>
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={() => handleOtpSubmit()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/10"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInputModal;
