import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLogin: boolean;
  userData: any;
  token: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLogin: false,
  userData: null,
  token: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ userData: any; token: string }>
    ) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;

      AsyncStorage.setItem(
        'authData',
        JSON.stringify(action.payload)
      );
    },

    restoreLogin(
      state,
      action: PayloadAction<{ userData: any; token: string }>
    ) {
      state.isLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },

    logout() {
      AsyncStorage.removeItem('authData');
      return initialState; // 🔥 RESET FULL STATE
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const {
  loginSuccess,
  restoreLogin,
  logout,
  setLoading,
  setError,
} = AuthSlice.actions;

export default AuthSlice.reducer;
