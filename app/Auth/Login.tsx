import React, { useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { loginSchema, renderError, validateData } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { Link } from 'react-router-dom';
import { InputField } from '@components';
import { toast } from 'sonner';
import OtpInputModal from '@components/Modals/OtpInputModal';
import { motion } from 'framer-motion';

const initialState = {
  email: '',
  password: '',
};

type FormState = typeof initialState;

interface LoginError {
  email?: string;
  password?: string;
  [key: string]: any;
}

interface OtpTimerData {
  sentAt?: string | number | Date;
  timeout?: number;
  email?: string;
  [key: string]: any;
}

const Login: React.FC = () => {
  const [error, setError] = useState<LoginError>(initialState);
  const [form, setFormData] = useState<FormState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState<boolean>(false);
  const [openOtpVerification, setOpenOtpVerification] = useState<boolean>(false);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [otpTimerData, setOtpTimerData] = useState<OtpTimerData>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const { login, authOtp } = useAuth();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError({});
      const payload = {
        ...form,
        verificationCode: otp.join(''),
      };
      const error = await login(payload, '/login/home');
      if (error) {
        toast.error(error);
        setError(error);
      }
    } catch (error) {
      console.log(error, 'error in login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: { target: { name: string; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleRequestforOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [valid, error] = await validateData(loginSchema, form);
      if (error) {
        setError(error);
        return;
      }
      if (valid) {
        const payload = {
          email: form.email,
          password: form.password,
          type: 'auth',
          onError: (errMsg: string) => {
            const lowMsg = errMsg.toLowerCase();
            if (lowMsg.includes('not exist') || lowMsg.includes('not found') || lowMsg.includes('no user')) {
              setError((prev) => ({ ...prev, email: 'Email not exists' }));
            } else if (lowMsg.includes('password') || lowMsg.includes('credentials') || lowMsg.includes('credential')) {
              setError((prev) => ({ ...prev, password: errMsg }));
            } else {
              setError((prev) => ({ ...prev, email: errMsg }));
            }
          }
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
      <div className="min-h-screen relative overflow-hidden bg-black">
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
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
          <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[85%] xl:w-[65%] 2xl:w-[75%] text-white font-sans border border-primary-100 rounded-20 flex flex-col md:flex-row backdrop-blur-sm bg-black/70 mx-auto min-h-[50vh] lg:min-h-[60vh] xl:min-h-[70vh]">
            {/* Left Info Panel (Hidden on small screens) */}
            <div className="w-1/2 hidden md:flex flex-col items-center justify-center py-10 px-14 bg-white rounded-tl-[0px] rounded-bl-[0px] md:rounded-tl-[20px] md:rounded-bl-[20px]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="flex flex-col w-full gap-6 p-6 rounded-xl text-white shadow-lg"
              >
                <motion.img
                  src="/images/logo-1.png"
                  alt="ChainPay Logo"
                  className="w-56 rounded-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />

                <motion.h2
                  className="text-3xl font-bold leading-snug tracking-tight text-black"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Redefining Payment Experience with{' '}
                  <span className="text-[#ee0000]">ChainPay</span>
                </motion.h2>

                <motion.p
                  className="text-16 leading-6 text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  ChainPay helps businesses accept crypto with ease—fast setup,
                  secure and borderless payments, and zero hassle. Start taking
                  global payments the smart way and grow your business without
                  limits.
                </motion.p>
              </motion.div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full p-6 sm:p-10 lg:py-10 md:w-1/2 bg-[#141414] bg-transparent flex flex-col gap-y-4 rounded-tr-[20px] rounded-br-[20px] justify-center relative">
              <div className="max-w-md w-full mx-auto">
                <div className="flex md:hidden text-white items-center justify-center gap-2 mb-4">
                  <img
                    className="h-[55px] md:h-[45px] rounded-md"
                    src="/images/logo.png"
                    alt="Payment"
                  />
                </div>

                <h2 className="text-2xl font-semibold mb-6">Login</h2>

                <form className="space-y-4" onSubmit={handleRequestforOtp}>
                  {/* Email */}
                  <div className="relative">
                    <InputField
                      type="email"
                      label="E-mail"
                      onChange={handleChange}
                      placeholder="Enter your email"
                      name="email"
                      value={form.email}
                      errMsg={renderError(error.email)}
                    />
                  </div>

                  {/* Password */}
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
                      {isPasswordVisible
                        ? reactIcons.eyes
                        : reactIcons.eyeslash}
                    </button>
                    <Link to="/forgot-password">
                      <div className="font-14 font-touche font-medium text-primary-100 mt-1 text-right cursor-pointer">
                        Forgot password?
                      </div>
                    </Link>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full py-2 bg-primary-100 hover:bg-primary-100 rounded text-white font-semibold cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin w-[20px] h-[20px] inline-block border-[3px] border-secondary rounded-full border-l-white mx-2" />
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Register Button */}
                  <Link to="/register">
                    <button
                      type="button"
                      className="w-full mt-4 py-2 bg-[#1E1E1E] border border-primary-100 text-white hover:bg-primary-100 hover:text-black rounded font-semibold cursor-pointer"
                    >
                      Create Account
                    </button>
                  </Link>
                </form>
              </div>
            </div>
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
          formSubmit={handleSubmit}
          setTimeLeft={setTimeLeft}
        />
      )}
    </>
  );
};

export default Login;
