import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginApi } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../utils/customToast';

interface Credentials {
  country_code: string;
  mobile_number: string;
}

const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    country_code: '62',
    mobile_number: '',
  });

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateFields = () => {
    const validationErrors: any = {};
    if (!credentials.mobile_number) {
      validationErrors.mobile_number = 'Mobile number is required';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
     navigation.navigate(ScreenNameEnum.DrawerNavgation, 
      // {
      //     phone: credentials.mobile_number,

      //     // response: response

      //   }
      );
    // if (!validateFields()) return;

    // try {
    //   const body = {
    //     country_code: credentials.country_code,
    //     mobile_number: credentials.mobile_number,
    //   };

    //   const response = await loginApi(
    //     { url: 'auth/login', body },
    //     setIsLoading
    //   );

    //   if (response?.success) {
    //     successToast(response?.message)
    //     // Navigate to OTP screen
    //     navigation.navigate(ScreenNameEnum.OtpScreen, {
    //       phone: credentials.mobile_number,

    //       response: response

    //     });
    //   } else {
    //     errorToast(response?.message)

    //     alert(response?.message || 'Login failed');
    //   }
    // } catch (error) {
    //   errorToast(error?.message || "Login Error")

    // }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    navigation,
  };
};

export default useLogin;
