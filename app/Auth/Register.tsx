import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { registerSchema, renderError, validateData } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import { toast } from 'sonner';
import OtpInputModal from '@components/Modals/OtpInputModal';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  emailVerificationCode: '',
};

type FormState = typeof initialState & { identifire?: string };

interface RegisterError {
  email?: string;
  emailVerificationCode?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: any;
}

interface OtpTimerData {
  sentAt?: string | number | Date;
  timeout?: number;
  email?: string;
  [key: string]: any;
}

const Register: React.FC = () => {
  const [isPasswordVisible, setPasswordVisiblity] = useState<boolean>(false);
  const [isPasswordVisible1, setPasswordVisiblity1] = useState<boolean>(false);
  const [error, setError] = useState<RegisterError>({});
  const [form, setFormData] = useState<FormState>({ ...initialState, identifire: '' });
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [otpTimerData, setOtpTimerData] = useState<OtpTimerData>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const { register, authOtp } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openOtpVerification, setOpenOtpVerification] = useState<boolean>(false);
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleRequestforOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [valid, error] = await validateData(registerSchema, form);
      if (error) {
        setError(error);
        return;
      }
      if (valid) {
        const payload = {
          email: form.email,
          type: 'register',
        };
        const response = await authOtp(payload);
        if (response) {
          let timerData = response;
          if (response.email && typeof response.email === 'object') {
            timerData = {
              ...response.email,
              email: form.email
            };
          } else if (response.email) {
            timerData = { email: response.email, ...response };
          }
          setOtpTimerData(timerData);
          setOpenOtpVerification(true);
        }
      }
    } catch (error) {
      console.log(error, 'error in send otp');
    }
  };

  const handleSubmitRegister = async () => {
    try {
      setIsLoading(true);
      setError({});
      const payload = {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        emailVerificationCode: otp.join(''),
      };
      const [response, error] = await register(payload, '/login/home');
      console.log(error, 'error');
      if (error) {
        setError(error);
        toast.error(error);
        return;
      }
      if (response) {
        toast.success('Register Successfully');
        setTimeout(() => {
          navigate('/login/home');
        }, 500);
      }
    } catch (error) {
      console.log(error, 'error in register');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otpTimerData && Object.keys(otpTimerData).length > 0) {
      const timerInterval = setInterval(() => {
        calculateRemainingTime();
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [otpTimerData]);

  const calculateRemainingTime = () => {
    if (otpTimerData && otpTimerData.sentAt && otpTimerData.timeout) {
      const currentTime = new Date().getTime();
      const sentTime = new Date(otpTimerData.sentAt).getTime();
      const elapsedTime = currentTime - sentTime;
      const remainingTime = otpTimerData.timeout - elapsedTime;

      if (remainingTime <= 0) {
        setCanResend(true);
        setTimeLeft(0);
      } else {
        setCanResend(false);
        setTimeLeft(remainingTime);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen relative bg-black text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 block md:hidden"
        >
          <source src="/images/bg-video.mp4" type="video/mp4" />
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

        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center px-4 min-h-screen py-20">
          <div className="w-full mb-6 flex text-white items-start">
            <div className="flex-1">
              <img
                className=" h-[55px] md:h-[70px] rounded-md justify-self-center"
                src="/images/logo.png"
                alt="Payment"
              />
            </div>
          </div>

          <div className="w-full max-w-xl bg-[#141414]/70 rounded-lg border border-[#333] p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
            <form className="space-y-4" onSubmit={handleRequestforOtp}>
              <div className="relative">
                <InputField
                  type="email"
                  label="E-mail"
                  onChange={handleChange}
                  placeholder="Enter your email"
                  name="email"
                  value={form.email || form.identifire}
                  errMsg={renderError(
                    error.email
                      ? error.email
                      : error.emailVerificationCode
                        ? error.emailVerificationCode
                        : '',
                  )}
                />
              </div>

              <div>
                <div className="relative">
                  <InputField
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    name="password"
                    value={form.password}
                    errMsg={renderError(error.password)}
                  />

                  <button
                    type="button"
                    onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                    className="absolute right-3 top-8 text-gray-400 cursor-pointer bg-transparent border-none"
                  >
                    {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}
                  </button>
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  Minimum 8 characters: A-Z, a-z, 0-9, symbols
                </p>
              </div>

              <div>
                <div className="relative">
                  <InputField
                    type={isPasswordVisible1 ? 'text' : 'password'}
                    label="Confirm Password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    errMsg={renderError(error.confirmPassword)}
                  />

                  <button
                    type="button"
                    onClick={() => setPasswordVisiblity1(!isPasswordVisible1)}
                    className="absolute right-3 top-8 text-gray-400 cursor-pointer bg-transparent border-none"
                  >
                    {isPasswordVisible1 ? reactIcons.eyes : reactIcons.eyeslash}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-primary-100 rounded text-white font-semibold mt-4 cursor-pointer"
              >
                {isLoading ? (
                  <span className="animate-spin w-[20px] h-[20px] inline-block border-[3px] border-secondary rounded-full border-l-white mx-2" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-xs text-center mt-4 text-gray-400">
              By creating an account, you agree to our{' '}
              <span className="underline cursor-pointer">
                Terms and Conditions
              </span>{' '}
              and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>

            <Link to="/login">
              <button className="w-full py-2 mt-4 bg-[#1E1E1E] border border-[#333] rounded text-white font-medium hover:bg-[#2a2a2a] cursor-pointer">
                Return To Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      {openOtpVerification && (
        <OtpInputModal
          setOpenOtpVerification={setOpenOtpVerification}
          otp={otp}
          setOtp={setOtp}
          email={form?.email}
          timeLeft={timeLeft}
          canResend={canResend}
          handleRequestforOtp={handleRequestforOtp}
          formSubmit={handleSubmitRegister}
          setTimeLeft={setTimeLeft}
        />
      )}
    </>
  );
};

export default Register;
