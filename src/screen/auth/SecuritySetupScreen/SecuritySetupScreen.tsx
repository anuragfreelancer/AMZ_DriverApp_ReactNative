import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Storage } from '../../../storage';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SecurityStepApi, verifyOtp } from '../../../api/authApi/AuthApi';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { errorToast, successToast } from '../../../utils/customToast';
import LoadingModal from '../../../utils/Loader';
 
const SecuritySetupScreen = () => {
const navigation = useNavigation()

const route = useRoute()
  const [isLoading, setIsLoading] = useState(false);
const rnBiometrics = new ReactNativeBiometrics();

     const checkBiometricAvailability = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      if (available && biometryType) return true;
        Platform.OS === 'android'
                ? Linking.openSettings()
                : Linking.openURL('App-Prefs:FaceID');
       return false;
    } catch (error) {
      console.log('Biometric availability error:', error);
      Alert.alert('Error', 'Cannot check biometric availability');
      return false;
    }
  };
const dispatch = useDispatch()

  const handleFaceLock = async () => {
    const available = await checkBiometricAvailability();
    if (!available) return;

    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to enable Face Lock',
      });

      if (success) {
        await Storage.set('LOCK_TYPE', 'FACE'); 
        securityStep()
    navigation.navigate(ScreenNameEnum.FaceLockcomplete) 
    successToast("Face Lock enabled successfully!")
        } else {
          errorToast("Face Lock setup cancelled")
       }
    } catch (error) {
      console.log('Biometric auth error:', error);
      Alert.alert('Error', 'Failed to setup Face Lock');
    }
  };
const resp = route?.params ||""  
 const securityStep = async () => {
  try {
    const userId = routeResp?.user_data?.id;
    console.log("userId", userId);

    if (!userId) {
      errorToast("User ID is missing.");
      return;
    }

    const body = { user_id: userId };
    console.log("body", body);

    const apiResp = await SecurityStepApi({ url: 'auth/face_lock_status', body }, setIsLoading);
    console.log("apiResp", apiResp);

    if (apiResp?.success) {
      const { token, user_data } = apiResp?.data;
      dispatch(loginSuccess({ userData: user_data, token }));
      navigation.navigate(ScreenNameEnum.FaceLockcomplete);
    } else {
      errorToast("Verification failed");
    }
  } catch (error) {
    errorToast("Something went wrong. Please try again.");
  }
};
const unlockApp = async () => {
  try {
    const { available, biometryType } =
      await rnBiometrics.isSensorAvailable();

    // ❌ No biometric enrolled
    if (!available) {
      Alert.alert(
        'Biometric not set',
        'Please set up Face ID or Fingerprint in phone settings',
        [
          {
            text: 'Open Settings',
            onPress: () => {
              Platform.OS === 'android'
                ? Linking.openSettings()
                : Linking.openURL('App-Prefs:FaceID');
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ],
      );
      return;
    }

    // ✅ Biometric available → prompt
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Unlock App',
    });

    if (result.success) {
        await Storage.set('LOCK_TYPE', 'PIN'); 
        securityStep()
             navigation.navigate(ScreenNameEnum.FaceLockcomplete);
    }
  } catch (error) {
    console.log('Biometric Error:', error);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
            <LoadingModal visible={isLoading} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Security Setup</Text>
      </View>

      <View style={{  justifyContent: 'center', alignItems: 'center', paddingTop: 45 }}>
        <Ionicons name="shield" size={50} color="#4038FF" />
      </View>
      <Text style={[styles.headerTitle, { marginTop: 8, marginBottom: 8 }]}>Security Setup</Text>
      <Text style={styles.description}>Protect your account with additional security measures</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionCard} onPress={handleFaceLock}>
          <Text style={styles.optionTitle}>Face Lock</Text>
          <Text style={styles.optionSubtitle}>Use your face to unlock the app quickly and securely</Text>
          <View style={styles.arrowIcon}>
            <Ionicons name="chevron-forward" size={30} color="#4038FF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} 
        // onPress={unlockApp}
        onPress={()=>{
          navigation.navigate(ScreenNameEnum.PasscodeCodeOtp)
        }}
        >
          <Text style={styles.optionTitle}>Set App Passcode</Text>
          <Text style={styles.optionSubtitle}>Create a 4-digit PIN to secure your account</Text>
          <View style={styles.arrowIcon}>
            <Ionicons name="chevron-forward" size={30} color="#4038FF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, justifyContent: 'center' },
  headerTitle: { marginTop:15, fontSize: 20, fontWeight: '600', color: '#000', textAlign: 'center' },
  description: { textAlign: 'center', fontSize: 18, color: '#9DB2BF', marginBottom: 30 },
  optionsContainer: { flex: 1, marginTop: 8, marginBottom: 10 },
  optionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#038FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 10, position: 'relative' },
  optionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 5, color: '#000', textAlign: 'center' },
  optionSubtitle: { fontSize: 15, color: '#8E8E93', marginTop: 8, textAlign: 'center' },
  arrowIcon: { justifyContent: 'center', alignItems: 'center', marginTop: 5 },
});

export default SecuritySetupScreen;
