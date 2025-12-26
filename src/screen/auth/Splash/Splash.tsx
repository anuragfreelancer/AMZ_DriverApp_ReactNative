 
import React, { useEffect } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
 import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { errorToast } from '../../../utils/customToast';
import imageIndex from '../../../assets/imageIndex';
 
const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
   const auth = useSelector((state: any) => state.auth);
 

  const checkAuthStatus = async () => {
   
                 navigation.replace(ScreenNameEnum.Login);

  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuthStatus();
     }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
      <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
        <StatusBarComponent backgroundColor="transparent" />
        <View style={styles.centerContent}>
        {/* //  <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>LOGO</Text> */}
        <Image source={imageIndex.appLogo } style={{height:150, width:'70%'}} resizeMode='contain'/>
        </View>
      </SafeAreaView>
 
  );
};

export default SplashScreen;
