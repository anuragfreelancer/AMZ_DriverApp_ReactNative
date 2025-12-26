import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { pickProfileImage } from './imagePicker';
import { getProfileApi, updateProfileApi } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';
import CustomHeader from '../../../compoent/CustomHeader';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { useSelector } from 'react-redux';

// Import vector icons
import Ionicons from 'react-native-vector-icons/Ionicons'; // For iOS-style icons
import { color } from '../../../constant';
import TextInputField from '../../../compoent/TextInputField';
 
const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);

  const [profile, setProfile] = useState({
    user_name: '',
    email: '',
    image: '',
  });

  // useEffect(() => {
  //   init();
  // }, []);

  //  const renderError = (field: keyof typeof errors) => {
  //     if (errors[field]) {
  //       return <Text style={styles.errorText}>{errors[field]}</Text>;
  //     }
  //     return null;
  //   };

  const init = async () => {
    fetchProfile(auth?.token);
  };

  const fetchProfile = async (token: string) => {
    const res = await getProfileApi(token, setLoading);
    if (res?.success) {
      setProfile(res?.data?.user_data);
    }
  };

  const onPickImage = async () => {
    const img = await pickProfileImage();
    if (img) setImage(img);
  };

  const onUpdate = async () => {
    const res = await updateProfileApi(
      auth?.token,
      {
        user_name: profile.user_name,
        email: profile.email,
        image,
      },
      setLoading
    );

    if (res?.success) {
      successToast(res.message);
      setImage(null);
      fetchProfile(auth?.token);
    } else {
      errorToast(res?.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader label={"Profile"} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        > 

           <View style={styles.formContainer}>
                      {/* Worker Fields */}
                       <Text style={styles.sectionTitle}>Personal Information</Text>
        
                       <TextInputField
                          placeholder="Name"
                          // value={credentials.fullName}
                          // onChangeText={(text) => handleChange('fullName', text)}
                          firstLogo
                          img={imageIndex.Textprofile}
                          // error={errors.fullName}
                        />
                     
                         <TextInputField
                            placeholder="Driver License Number"
                            // value={credentials.institutionName}
                            // onChangeText={(text) => handleChange('institutionName', text)}
                            firstLogo
                            img={imageIndex.driver}
                            // error={errors.institutionName}
                          />
                          {/* {renderError('institutionName')} */}
        
                          <TextInputField
                            placeholder="Issued State"
                            // value={credentials.unitName}
                            // onChangeText={(text) => handleChange('unitName', text)}
                            firstLogo
                            img={imageIndex.global}
                            // error={errors.unitName}
                          />
                          {/* {renderError('unitName')} */}
        
                          <TextInputField
                            placeholder="Languagee"
                            // value={credentials.unitManagerName}
                            // onChangeText={(text) => handleChange('unitManagerName', text)}
                            firstLogo
                            img={imageIndex.language}
                            // error={errors.unitManagerName}
                          />
                          {/* {renderError('unitManagerName')} */}
                       <Text style={styles.sectionTitle}>Contact Details</Text>
        
                      {/* Common Fields */}
                      <TextInputField
                        placeholder="Email"
                        // value={credentials.email}
                        // onChangeText={(text) => handleChange('email', text)}
                        firstLogo
                        img={imageIndex.mess}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        // error={errors.email}
                      />
                      {/* {renderError('email')} */}
        
                      <TextInputField
                        placeholder="Phone Number"
                        // value={credentials.mobile}
                        // onChangeText={(text) => handleChange('mobile', text)}
                        firstLogo
                        img={imageIndex.Textphone}
                        keyboardType="phone-pad"
                        // error={errors.mobile}
                        maxLength={15}
                      />
                      {/* {renderError('mobile')} */}
                       <Text style={styles.sectionTitle}>FMCSA Verification</Text>
        
        
                    
                    
                   
        
                      {/* Address Field */}
                      <TextInputField
                        placeholder="DOT Number"
                        // value={credentials.address}
                        // onChangeText={(text) => handleChange('address', text)}
                         
                        // error={errors.address} 
                      />
                      {/* {renderError('address')} */}
         <TextInputField
                        placeholder="MC Number"
                        // value={credentials.address}
                        // onChangeText={(text) => handleChange('address', text)}
                         
                        // error={errors.address} 
                      />
                      {/* Worker Education Section */}
                         <Text style={styles.sectionTitle}>Company Details</Text>
        
                          {/* Education Level Dropdown */}
                          {/* <TouchableOpacity
                            style={[styles.dropdown, errors.educationLevel && styles.errorBorder]}
                            onPress={() => setDropdownVisible(true)}
                          >
                            <View style={styles.dropdownContent}>
                              <Image
                                source={imageIndex.Level}
                                style={styles.dropdownIcon}
                                tintColor={color.primary}
                              />
                              <Text style={[
                                styles.dropdownText,
                                !credentials.educationLevel && styles.placeholderText
                              ]}>
                                {credentials.educationLevel || 'Level of Education'}
                              </Text>
                            </View>
                            <Image
                              source={imageIndex.arrowqdown}
                              style={styles.dropdownArrow}
                              tintColor={color.primary}
                            />
                          </TouchableOpacity>
                          {renderError('educationLevel')} */}
        
                          {/* Education Modal */}
                          {/* <Modal
                            visible={dropdownVisible}
                            transparent
                            animationType="fade"
                          >
                            <TouchableOpacity
                              style={styles.modalOverlay}
                              onPress={() => setDropdownVisible(false)}
                            >
                              <View style={styles.modalContent}>
                                <FlatList
                                  data={educationOptions}
                                  keyExtractor={(item) => item}
                                  renderItem={({ item }) => (
                                    <TouchableOpacity
                                      style={styles.modalItem}
                                      onPress={() => handleSelectEducation(item)}
                                    >
                                      <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                  )}
                                />
                              </View>
                            </TouchableOpacity>
                          </Modal> */}
        
                          <TextInputField
                            placeholder="Thompson Freight Logistics"
                            // value={credentials.degree}
                            // onChangeText={(text) => handleChange('degree', text)}
                           
                          />
        
                          <TextInputField
                            placeholder="Authorized for Hire"
                            // value={credentials.schoolName}
                            // onChangeText={(text) => handleChange('schoolName', text)}
                           
                          />
        
                        </View>
                      
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Edit"
                // onPress={onUpdate}
                style={styles.updateButton}
                textStyle={styles.buttonText}
              />
            </View> 

     
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#e9ecef',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#6200ee',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 8,
    fontFamily: 'System',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    fontFamily: 'System',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginVertical: 20,
    fontFamily: 'System',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
    fontFamily: 'System',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
    fontFamily: 'System',
  },
  buttonContainer: {
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#6200ee',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'System',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  infoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'System',
  },





    formContainer: {
      marginBottom: 20,
    },
    sectionTitle: {
      color: "black",
      fontSize: 18,
      fontWeight: "600",
      marginTop: 8,
      marginBottom: 10
    },
    dropdown: {
      borderWidth: 1,
      backgroundColor: '#F7F8F8',
      borderColor: '#F7F8F8',
      padding: 15,
      borderRadius: 12,
      marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dropdownContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    dropdownIcon: {
      height: 20,
      width: 20,
    },
    dropdownText: {
      marginLeft: 8,
      fontSize: 16,
    },
    placeholderText: {
      color: '#999',
    },
    dropdownArrow: {
      tintColor: "black",
      height: 20,
      width: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      width: '80%',
      borderRadius: 10,
      maxHeight: '50%',
    },
    modalItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    modalItemText: {
      fontSize: 16,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 15,
    },
    checkboxOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: color.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      marginTop: 2,
    },
    checkboxInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
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
    },
    signUpText: {
      fontSize: 17,
      color: '#909090',
      fontWeight: '500'
    },
    signUpLink: {
      fontSize: 17,
      fontWeight: '700',
      color: color.primary
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 14,
      marginTop: -8,
      marginBottom: 10,
      marginLeft: 5,
    },
    errorBorder: {
      borderColor: '#FF3B30',
      borderWidth: 1,
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