import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginSuccess } from '../../../redux/feature/authSlice';
import { getApi } from '../../../api/authApi/AuthApi';

const useDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state: any) => state.auth);

  useEffect(() => {
    getProfileApi();
  }, []);

  const getProfileApi = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('❌ Token not found');
        return;
      }

      const response = await getApi(
        'get-profile',   // endpoint
     // loader
        token,           // token
        'POST'           // method
      );

 
      if (response?.success) {
            setLoading(false)

        dispatch(
          loginSuccess({
            userData: response.data,
            token: token,
          })
        );
      }
    } catch (error) {
          setLoading(true)

      console.log('❌ Profile API error:', error);
    }
  };

  return {
    userData,
    loading,
  };
};

export default useDashboard;
