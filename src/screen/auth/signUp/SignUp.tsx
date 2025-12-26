// SignUpUI.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
 import LoadingModal from '../../../utils/Loader';
import { color } from '../../../constant';
import useSignup from './useSinup';

export default function SignUpUI() {
  const navigation = useNavigation();
  const {
    credentials,
    errors,
    isLoading,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleSignup,
  } = useSignup();

  const renderError = (field: keyof typeof errors) => {
    if (errors[field]) {
      return <Text style={styles.errorText}>{errors[field]}</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      
      <CustomHeader 
        menuIcon={imageIndex.back} 
        leftPress={() => navigation.goBack()}  
        showRight={false}
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
              


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
              <LoadingModal visible={isLoading} />
          <View style={styles.formWrapper}>
            <Image
              source={imageIndex.appLogo}
              resizeMode='contain'
              style={styles.logo}
            />

            <Text style={styles.title}>
              Create Account
            </Text>

            <Text style={styles.subtitle}>
              Sign up and take the first step towards your goals.
            </Text>

            {/* General Error Message */}
            {errors.general && (
              <View style={styles.generalError}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <View style={styles.formContainer}>
              {/* Personal Information Section */}
              <Text style={styles.sectionTitle}>Personal Information</Text>

              <TextInputField
                placeholder="Full Name"
                value={credentials.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                firstLogo
                img={imageIndex.Textprofile}
                error={!!errors.fullName}
              />
              {renderError('fullName')}

              <TextInputField
                placeholder="Driver License Number"
                value={credentials.institutionName}
                onChangeText={(text) => handleChange('institutionName', text)}
                firstLogo
                img={imageIndex.driver}
                error={!!errors.institutionName}
              />
              {renderError('institutionName')}

              <TextInputField
                placeholder="Issued State"
                value={credentials.unitName}
                onChangeText={(text) => handleChange('unitName', text)}
                firstLogo
                img={imageIndex.global}
                error={!!errors.unitName}
              />
              {renderError('unitName')}

              <TextInputField
                placeholder="Language"
                value={credentials.unitManagerName}
                onChangeText={(text) => handleChange('unitManagerName', text)}
                firstLogo
                img={imageIndex.language}
                error={!!errors.unitManagerName}
              />
              {renderError('unitManagerName')}

              {/* Contact Details Section */}
              <Text style={styles.sectionTitle}>Contact Details</Text>

              <TextInputField
                placeholder="Email Address"
                value={credentials.email}
                onChangeText={(text) => handleChange('email', text)}
                firstLogo
                img={imageIndex.mess}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={!!errors.email}
              />
              {renderError('email')}

              <TextInputField
                placeholder="Phone Number"
                value={credentials.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
                error={!!errors.mobile}
                maxLength={15}
              />
              {renderError('mobile')}

              {/* FMCSA Verification Section */}
              <Text style={styles.sectionTitle}>FMCSA Verification</Text>
              
              <TextInputField
                placeholder="DOT Number"
                value={credentials.address}
                onChangeText={(text) => handleChange('address', text)}
                firstLogo={false}
                 error={!!errors.address}
              />
              {renderError('address')}

              <TextInputField
                placeholder="MC Number"
                value={credentials.degree}
                onChangeText={(text) => handleChange('degree', text)}
                                firstLogo={false}

                 error={!!errors.degree}
              />
              {renderError('degree')}

              {/* Company Details Section */}
              <Text style={styles.sectionTitle}>Company Details</Text>
              
              <TextInputField
                placeholder="Company Name"
                                firstLogo={false}

                value={credentials.schoolName}
                onChangeText={(text) => handleChange('schoolName', text)}
    
                 error={!!errors.schoolName}
              />
              {renderError('schoolName')}

              {/* Password Section */}
              <Text style={styles.sectionTitle}>Security</Text>
              
              <TextInputField
                placeholder="Password"
                value={credentials.password}
                onChangeText={(text) => handleChange('password', text)}
                firstLogo
                img={imageIndex.lock} // Add appropriate icon
                secureTextEntry
                error={!!errors.password}
              />
              {renderError('password')}

              <TextInputField
                placeholder="Confirm Password"
                value={credentials.cpassword}
                onChangeText={(text) => handleChange('cpassword', text)}
                firstLogo
                img={imageIndex.lock} // Add appropriate icon
                secureTextEntry
                error={!!errors.cpassword}
              />
              {renderError('cpassword')}

              {/* Terms & Conditions Checkbox */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkboxOuter,
                  errors.general && styles.checkboxError
                ]}>
                  {termsAccepted && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree to the Terms & Conditions
                </Text>
              </TouchableOpacity>
              {renderError('general')}
            </View>

            {/* Submit Button */}
            <CustomButton
              title="Create Account"
              onPress={handleSignup}
             />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate(ScreenNameEnum.Login as never)}
             >
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginTop: hp(2),
    marginBottom: 20,
  },
  logo: {
    height: 44,
    width: 120,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 18,
    color: "black"
  },
  subtitle: {
    fontSize: 16,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: color.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#909090',
    fontWeight: '500'
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '700',
    color: color.primary
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 10,
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  generalError: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  generalErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
  },
});