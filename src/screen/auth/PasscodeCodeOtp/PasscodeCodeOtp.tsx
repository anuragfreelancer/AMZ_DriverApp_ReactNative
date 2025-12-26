import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import LoadingModal from '../../../utils/Loader';
import { usePasscodeCodeOtp } from './usePasscodeCodeOtp';
import { styles } from './style';
import { hp } from '../../../utils/Constant';
import imageIndex from '../../../assets/imageIndex';

export default function PasscodeCodeOtp() {
  const {
    value,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    phone,
    country_code,
    response ,
  } = usePasscodeCodeOtp();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      <CustomHeader label="Back" />
      <LoadingModal visible={isLoading} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#FFF',
              marginTop: hp(4),
              borderRadius: 15,
              padding: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.22,
              shadowRadius: 3.7,
              elevation: 8,
            }}
          >
            <View style={styles.headerSection} 
            >
<View style={{
  alignItems:"center",
  justifyContent:"center"
}}>
              <Image source={imageIndex.Photoroom} 
              style={{
                height:80 ,
                width:55 ,
                resizeMode:"contain"
              }}
              />
              </View>
              <Text style={styles.txtHeading}>Set App Passcode</Text>
              <Text style={styles.txtDes}>
               Create a 4-digit PIN to secure your account
               </Text>
              
            </View>

            <View style={styles.otpFieldContainer}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={handleChangeText}
                cellCount={4}
                keyboardType="number-pad"
                        blurOnSubmit={true}  // Keyboard dismiss on done
  returnKeyType="done" 
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={styles.cellWrapper}>
                    <Text
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            </View>

            <View style={{ marginTop: 15 ,}}>
              <CustomButton title="Submit" onPress={handleVerifyOTP} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
