import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginSuccess } from '../../../redux/feature/authSlice';
import { ENDPOINT } from '../../../api/endpoints';
import { GET_API } from '../../../api/APIRequest';

const useDashboard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state: any) => state.auth);

  useEffect(() => {
    getProfileApi();
  }, []);

  const getProfileApi = async () => {
     try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('❌ Token not found');
        return;
      }

      const response = await GET_API(
        ENDPOINT.GET_PROFILE,   // endpoint
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
      setLoading(false)

      console.log('❌ Profile API error:', error);
    }
  };

  return {
    userData,
    loading,
  };
};

export default useDashboard;
