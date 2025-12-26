import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { verifyOtp } from '../../../api/authApi/AuthApi';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { successToast } from '../../../utils/customToast';

export const useOtpVerification = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { phone, response, country_code, from } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();

  const [value, setValue] = useState(''); // Initialize first

  const ref = useBlurOnFulfill({ value });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
const cellCount = 4;
  // Handle OTP input change
  const handleChangeText = (text: string) => {
    setValue(text);
    if (text.length < cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit OTP`);
    } else {
      setErrorMessage('');
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if(from == 'reset'){
navigation.navigate(ScreenNameEnum.CreateNewPassword)
    }else{
     navigation.navigate(ScreenNameEnum.Login)

    }
  //   if (value.length !== cellCount) {
  //     setErrorMessage(`Please enter ${cellCount}-digit OTP`);
  //     return;
  //   }
  //   try {
  //     const body = {
  //       country_code: country_code || '62',
  //       mobile_number: phone,
  //      otp: value, // Or use user input
  //     };
  //     const resp = await verifyOtp({ url: 'auth/verify-otp', body }, setIsLoading);
  //     if (resp?.success) {
  //               successToast(response?.message)
        
  //          const { token, user_data } = resp?.data;
  //  dispatch(loginSuccess({ userData: user_data, token }));
  //       navigation.navigate(ScreenNameEnum.SecuritySetupScreen ,{
  //         resp:resp?.data
  //       });
  //     } else {
  //                       successToast(response?.message)

  //       setErrorMessage(response?.message || 'OTP verification failed');
  //     }
  //   } catch (error) {
  //                             successToast(error?.message ||"")

  //      setErrorMessage('Something went wrong. Please try again.');
  //   }
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    timer,
    phone,
    country_code,
    response
  };
};
