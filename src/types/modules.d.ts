declare module 'react-router-dom' {
  export function useNavigate(): (path: string) => void;
  export const Link: React.ComponentType<any>;
}

declare module 'react-redux' {
  export function useDispatch(): any;
}

declare module '@actions' {
  export function init(): any;
}

declare module 'react-pin-input' {
  const PinInput: React.ComponentType<any>;
  export default PinInput;
}

declare module 'moment' {
  const moment: any;
  export default moment;
}

declare module 'react-otp-input' {
  const OTPInput: React.ComponentType<any>;
  export default OTPInput;
}

declare module 'react-icons/fa' {
  export const FaCopy: any;
}
