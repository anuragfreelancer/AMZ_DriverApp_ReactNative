import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
 import ScreenNameEnum from '../../../routes/screenName.enum';
import { SetPinApi } from '../../../api/authApi/AuthApi';
 import { errorToast, successToast } from '../../../utils/customToast';
import { useSelector } from 'react-redux';
  
export const useloginPin = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { phone, response, country_code } = route.params || {};
  const auth = useSelector((state: any) => state.auth);

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);

  const ref = useBlurOnFulfill({ value });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const cellCount = 4;

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChangeText = (text: string) => {
    setValue(text);
    if (text.length < cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit PIN`);
    } else {
      setErrorMessage('');
    }
  };

  const handleVerifyOTP = async () => {
    if (value.length !== cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit PIN`);
      return;
    }

    try {
      setIsLoading(true);
      const body = { passcode: value };

      const resp = await SetPinApi(
        { url: 'auth/verifyAppPasscode', body, token: auth?.token },
        setIsLoading
      );

      if (resp?.success) {
        successToast(resp?.message);
        navigation.replace(ScreenNameEnum.TabNavigator);
      } else {
        errorToast(resp?.message)
        setErrorMessage('Invalid PIN');
      }
    } catch (error: any) {
      errorToast("Something went wrong. Please try again.")
     } finally {
      setIsLoading(false);
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
    response,
  };
};
