 
import React, { useEffect } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Storage } from '../../../storage';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { errorToast } from '../../../utils/customToast';
import imageIndex from '../../../assets/imageIndex';
 
const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const rnBiometrics = new ReactNativeBiometrics();
  const auth = useSelector((state: any) => state.auth);
   const handleFaceAuth = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) {
       Alert.alert('available');
        return;
      }

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to unlock the app',
      });
 
      if (success == true) {
   if(auth.isLogin){
    navigation.replace(ScreenNameEnum.TabNavigator);
             }    

             else{
    navigation.replace(ScreenNameEnum.Login);

             }
            
      } else {
        errorToast("Authentication cancelled")
       }
    } catch (error) {
      console.log('Biometric auth error:', error);
    }       
  };

  const checkAuthStatus = async () => {
    try {
       const lockType = await Storage.get('LOCK_TYPE');
      if (lockType === 'FACE') {
           handleFaceAuth();
      } else if (lockType === 'FACE') {
        handleFaceAuth();
      } else if (lockType === 'PIN') {
            navigation.replace(ScreenNameEnum.loginPin);
        } else {
        navigation.replace(ScreenNameEnum.OnboardingScreen);
      }
    } catch (error) {
      console.error(error);
      }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuthStatus();
     }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // <LinearGradient
    //   colors={['#4038FF', '#443ECD']}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    //   style={{ flex: 1 }}
    // >
      <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
        <StatusBarComponent backgroundColor="transparent" />
        <View style={styles.centerContent}>
        {/* //  <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>LOGO</Text> */}
        <Image source={imageIndex.appLogo } style={{height:150, width:'70%'}} resizeMode='contain'/>
        </View>
      </SafeAreaView>
    // </LinearGradient>
  );
};

export default SplashScreen;
