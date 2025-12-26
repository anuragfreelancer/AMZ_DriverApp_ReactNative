import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { SetPinApi, verifyOtp } from '../../../api/authApi/AuthApi';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { successToast } from '../../../utils/customToast';
import { useSelector } from 'react-redux';
import { STORAGE_KEYS, storeData } from '../../../storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from '../../../storage';

export const usePasscodeCodeOtp = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { phone, response, country_code } = route.params || {};
  const auth = useSelector((state: any) => state.auth);
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
  if (value.length !== cellCount) {
    setErrorMessage(`Please enter ${cellCount}-digit OTP`);
    return;
  }

  try {
    const body = {
      passcode: value,
    };

    const resp = await SetPinApi(
      {
        url: 'auth/setAppPasscode',
        body,
        token: auth?.token, // ✅ CORRECT
      },
      setIsLoading
    );
    if (resp?.success) {
      console.log("resp",resp?.data)
         if (resp.data) {
                  await Storage.set('LOCK_TYPE', 'PIN'); 
  await AsyncStorage.setItem("USER_DATA", JSON.stringify(resp.data));
  }
      successToast(resp?.message);
      navigation.navigate(ScreenNameEnum.FaceLockcomplete);
    } 
  } catch (error: any) {
    setErrorMessage('Something went wrong. Please try again.');
    // successToast(error?.message || '');
  }
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
