import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { toast } from 'sonner';

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-[#1e1e1e] border border-[#333] rounded-lg shadow-lg p-8 w-[90%] max-w-xl text-white text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            setOpenOtpVerification(false);
            setOtp(new Array(6).fill(''));
          }}
          className="absolute grid place-content-center text-30 top-[-12px] right-[-12px] h-7 w-7  border rounded-full border-[#EE0000] bg-[#EE0000] font-bold cursor-pointer"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-2">Enter One Time Password</h2>
        <p className="text-sm mb-6">
          We have sent you a 6 digit OTP on your Email address.
          <br />
          <span className="font-semibold">Email {email}</span>
        </p>

        {/* OTP Input */}
        <div className="mb-5">
          <OTPInput
            value={otp.join('')}
            onChange={(val: string) => {
              setOtp(val.split('').slice(0, 6));
            }}
            containerStyle={{ width: '100%' }}
            inputStyle={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              color: 'white',
              width: '100%',
              height: '50px',
              borderRadius: '6px',
              outline: 'none',
              border: '1px solid #cdc8c8',
              background: 'transparent',
              boxShadow:
                '0px 2.73px 2.73px 0px #C31515, 8.88px 5.46px 21.17px 0px #C31515',
            }}
            numInputs={6}
            isInputNum={true}
            shouldAutoFocus
            renderSeparator={<span className="mr-3"> </span>}
            renderInput={(inputProps: any, index: number) => (
              <input
                {...inputProps}
                key={index}
                placeholder="-"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="text-white"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleOtpSubmit();
                  }
                }}
              />
            )}
          />
        </div>
        {otpError && <div className="text-14 text-red-600 "> {otpError}</div>}
        <div className="flex flex-col ">
          {/* Resend text */}
          {canResend ? (
            <button
              onClick={handleRequestforOtp}
              className="text-xs text-right text-red-500 mb-4 cursor-pointer bg-transparent border-none"
            >
              Resend code?
            </button>
          ) : (
            <p className="text-xs text-right text-gray-300 mb-4">
              Didn’t receive the code?{' '}
              <span className="text-red-500 cursor-pointer">
                {formatTime(timeLeft)}
              </span>
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={() => handleOtpSubmit()}
            className="mt-2 px-6 py-2 w-max self-center bg-white text-black border border-white rounded hover:bg-black hover:text-white transition font-semibold cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInputModal;
