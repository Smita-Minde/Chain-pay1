import React, { useState, useEffect } from 'react';
import { OTPInput } from 'input-otp';
import moment from 'moment';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
};

type FormState = typeof initialState;

interface FormError {
  email?: string;
  code?: string;
  newPassword?: string;
  confirmPassword?: string;
  [key: string]: any;
}

interface VerificationResponse {
  sentAt: string | number | Date;
  timeout: number;
  attempt: number;
  maxAttempt: number;
}

interface ForgotPasswordProps {
  closeForgotPasswordScreen?: () => void;
}

let resendCodeInterval: ReturnType<typeof setInterval> | undefined;

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [isResetPasswordScreen, setResetPasswordScreen] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisiblity] =
    useState<boolean>(false);
  const [error, setError] = useState<FormError>({});
  const [form, setFormData] = useState<FormState>(initialState);
  const [resendTimer, setResendTimer] = useState<string | null>(null);
  const [verificationResponse, setVerificationResponse] = useState<VerificationResponse | null>(null);
  const { resetPassword, sendForgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    const [res, sendError] = await sendForgotPassword(form);
    console.log(res, sendError);

    if (sendError) {
      setError(sendError);
    } else if (res) {
      setResetPasswordScreen(true);
      setVerificationResponse(res);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    const [response, error] = await resetPassword(form);
    if (error) {
      setError(error);
    } else if (response) {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (isResetPasswordScreen && verificationResponse) {
      resendCodeInterval = setInterval(() => {
        // Generate timestamps
        const timestamp = moment(verificationResponse.sentAt).add(
          verificationResponse.timeout,
          'milliseconds',
        );

        // Get remaining time string
        const currentTime = moment();
        let totalSeconds = parseInt(timestamp.diff(currentTime, 'seconds'));
        if (totalSeconds >= 0) {
          totalSeconds %= 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          setResendTimer(
            `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
            }`,
          );
        } else {
          setResendTimer(null);
        }
      }, 1000);
    }

    if (!isResetPasswordScreen && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [isResetPasswordScreen, verificationResponse]);

  return (
    <>
      {!isResetPasswordScreen && (
        <div className="min-h-screen grid place-content-center bg-primary-100">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 block md:hidden"
          >
            <source src="/images/bg-video-mob.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          >
            <source src="/images/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="w-[90vw] z-20 min-h-[50vh] flex flex-col justify-center max-w-[600px] mx-auto my-10 shadow-md backdrop-blur-sm bg-black/70 rounded-[20px] border border-primary-100 p-8">
            <h3 className="text-20 sm:text-24 font-bold text-white mb-3 sm:mb-6 text-center">
              Forget Password
            </h3>
            <form onSubmit={handleSendVerificationCode}>
              <div className="form-group">
                <InputField
                  type="email"
                  placeholder="Your email"
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  value={form.email}
                  errMsg={renderError(error.email)}
                />
              </div>
              <div className="flex flex-col items-center gap-5 mt-5">
                <button
                  type="submit"
                  className="w-full py-2 bg-primary-100 hover:bg-primary-100 rounded text-white font-semibold"
                >
                  Send Verification Code
                </button>
                <p className="text-sm text-center">
                  <Link
                    className="text-primary-100-yellow ml-1 hover:underline font-bold text-primary-100"
                    to="/login"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {isResetPasswordScreen && (
        <div className="min-h-screen grid place-content-center bg-primary-100">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 block md:hidden"
          >
            <source src="/images/bg-video-mob.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 hidden md:block"
          >
            <source src="/images/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="w-[90vw] z-20 min-h-[50vh] flex flex-col justify-center max-w-[600px] mx-auto my-10 shadow-md backdrop-blur-sm bg-black/70 rounded-[20px] border border-primary-100 p-8">
            <h3 className="capitalize text-20 sm:text-24 font-bold text-white mb-3 sm:mb-6 text-center">
              Set your new password
            </h3>
            <p className="text-primary-100 font-bold text-sm text-center mb-5">
              We have sent you a 6 digit code, please enter new password and
              verification code
            </p>
            <form
              onSubmit={handleResetPassword}
              className="grid grid-cols-2 gap-x-4"
            >
              <div className="form-group relative col-span-2">
                <InputField
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="New Password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  label="New Password"
                  errMsg={renderError(error.newPassword)}
                  className="pr-7"
                />
                <span
                  className="cursor-pointer right-3 top-[34px] absolute z-10 text-gray-500"
                  onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                >
                  {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}
                </span>
              </div>

              <div className="form-group relative col-span-2">
                <InputField
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  errMsg={renderError(error.confirmPassword)}
                  className="pr-7"
                />
                <span
                  className="cursor-pointer right-3 top-[34px] absolute z-10 text-gray-500"
                  onClick={() =>
                    setConfirmPasswordVisiblity(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible
                    ? reactIcons.eyes
                    : reactIcons.eyeslash}
                </span>
              </div>

              {/* <div className="flex justify-center gap-2  col-span-2 py-4">
                <PinInput
                  length={6}
                  initialValue=""
                  type="numeric"
                  inputMode="number"
                  onComplete={(value: string) => {
                    handleChange({
                      target: { name: 'code', value },
                    });
                  }}
                  autoSelect={true}
                  regexCriteria={/^[0-9]*$/}
                  inputStyle={{
                    border: '1px solid white',
                    color: 'white',
                  }}
                />
                {renderError(error.code)}
              </div> */}

              <div className="flex flex-col items-center col-span-2 py-4">
                <OTPInput
                  maxLength={6}
                  value={form.code}
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "code",
                        value,
                      },
                    });
                  }}
                  onComplete={(value) => {
                    handleChange({
                      target: {
                        name: "code",
                        value,
                      },
                    });
                  }}
                  containerClassName="flex gap-2 justify-center"
                  render={({ slots }) => (
                    <>
                      {slots.map((slot, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 rounded-md border flex items-center justify-center text-white text-lg font-medium ${slot.isActive ? "border-white ring-2 ring-white" : "border-white"
                            }`}
                        >
                          {slot.char ?? ""}
                        </div>
                      ))}
                    </>
                  )}
                />

                {renderError(error.code)}
              </div>
              <div className="col-span-2">
                <p className="text-sm mb-2 text-white text-center">
                  Not recieved a code?
                  <button
                    disabled={resendTimer ? true : false}
                    className="text-primary-100-yellow ml-1 hover:underline font-bold text-primary-100"
                    onClick={handleSendVerificationCode}
                    type="button"
                  >
                    {resendTimer ? resendTimer : 'Resend Code'}
                  </button>
                </p>
                {verificationResponse && verificationResponse.attempt > 1 && (
                  <p className="text-sm mb-2 text-center">
                    Remaining retries
                    <span className="text-primary-100-yellow ml-1 duration-200">
                      {verificationResponse.maxAttempt -
                        verificationResponse.attempt}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-3 mt-3 col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-primary-100 hover:bg-primary-100 rounded text-white font-semibold"
                >
                  Reset Password
                </button>
                <button
                  type="button"
                  className="text-primary-100 font-bold hover:underline bg-transparent border-none cursor-pointer"
                  onClick={() => setResetPasswordScreen(false)}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
