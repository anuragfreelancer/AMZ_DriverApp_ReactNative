import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import LoadingModal from '../../../utils/Loader';
import useLogin from './useLogin';
import TextInputField from '../../../compoent/TextInputField';
import styles from './style';
import { Image } from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    navigation,
    handleChange,
    handleLogin,
  } = useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.card}>
          {/* Logo */}
          {/* <Text style={styles.logoText}>LOGO</Text> */}
<Image source={imageIndex.appLogo} style={{height:100, width:'90%'}} resizeMode={'contain'}/>
          {/* Title */}
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>
            Enter your Email and password
          </Text>

          {/* Phone Input */}
          {/* <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text style={styles.codeText}>+62</Text>
            </View>

            <View style={{ flex: 1 }}> */}
              <TextInputField
              type ="decimal-pad"
                placeholder="Phone number"
                keyboardType="number-pad"
                text={credentials.mobile_number}
                maxLength={10}
                onChangeText={(value: string) =>
                  handleChange('mobile_number', value)
                }
                firstLogo = {true}
                img ={imageIndex.Textphone}

                autoFocus={true}
              />


              <TextInputField
              // type ="decimal-pad"
                placeholder="Password"
                keyboardType="number-pad"
                text={credentials.mobile_number}
                maxLength={10}
                onChangeText={(value: string) =>
                  handleChange('mobile_number', value)
                }
                firstLogo = {true}
                img ={imageIndex.lock}
showEye={true}
                // autoFocus={true}
              />
            {/* </View>
          </View> */}

          {errors.mobile_number && (
            <Text style={styles.errorText}>{errors.mobile_number}</Text>
          )}


          <Text style={{color:'#000000', textAlign:'center', marginVertical:10}} onPress={()=>{navigation.navigate(ScreenNameEnum.PasswordReset)}}>Forgot your password?</Text>

          <View style={{ marginTop: 15 }}>
            <CustomButton
              title="Login"
              onPress={handleLogin}
              style={styles.loginBtn}
            />
          </View>
        </View>
      </ScrollView>
       <Text style={{color:'#909090', textAlign:'center', marginBottom:40}} 
       onPress={()=>{navigation.navigate(ScreenNameEnum.Sinup)}}>Don't have an account?
       <Text style={{color:color.primary}}> Sign Up</Text></Text>

    </SafeAreaView>
  );
}
