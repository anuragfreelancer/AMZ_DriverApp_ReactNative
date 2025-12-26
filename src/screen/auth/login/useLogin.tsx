import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginApi, BaseUrl } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../utils/customToast';

interface Credentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Credentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateFields = () => {
    const validationErrors: Partial<Credentials> = {};
    if (!credentials.email) validationErrors.email = 'Email is required';
    if (!credentials.password) validationErrors.password = 'Password is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const response = await loginApi(
        {
          url: 'login', // endpoint relative to BaseUrl
          body: credentials,
        },
        setIsLoading
      );
       if (response?.success) {
         successToast(response?.message || 'Login successful');
        navigation.navigate(ScreenNameEnum.DrawerNavgation);
      } else {
        errorToast(response?.message || 'Login failed');
      }
    } catch (error: any) {
      errorToast(error?.message || 'Login Error');
    }
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
