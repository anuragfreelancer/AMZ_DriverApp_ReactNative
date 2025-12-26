// useSignup.ts
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { signupApi } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';

interface Credentials {
  email: string;
  password: string;
  cpassword?: string;
  fullName: string;
  mobile: string;
  institutionName: string; // Driver License Number
  unitName: string;        // Issued Date
  unitManagerName: string; // Language
  address: string;         // DOT Number
  degree: string;          // MC Number
  schoolName: string;      // Company Name
}

interface ValidationErrors {
  [key: string]: string;
}

const useSignup = () => {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    cpassword: '',
    fullName: '',
    mobile: '',
    institutionName: '',
    unitName: '',
    unitManagerName: '',
    address: '',
    degree: '',
    schoolName: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    // Clear specific field error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    // Clear general error when user interacts with any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: '' }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = (): boolean => {
    const validationErrors: ValidationErrors = {};
    const { 
      email, 
      password, 
      cpassword, 
      mobile, 
      fullName, 
      institutionName, 
      unitName, 
      unitManagerName, 
      address,
      degree,
      schoolName
    } = credentials;

    // Required field validations
    if (!fullName.trim()) validationErrors.fullName = 'Full name is required';
    if (!email.trim()) validationErrors.email = 'Email is required';
    else if (!validateEmail(email)) validationErrors.email = 'Please enter a valid email';
    
    if (!password.trim()) validationErrors.password = 'Password is required';
    else if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    
    if (!cpassword?.trim()) validationErrors.cpassword = 'Confirm Password is required';
    else if (password !== cpassword) validationErrors.cpassword = 'Passwords do not match';
    
    if (!mobile.trim()) validationErrors.mobile = 'Mobile number is required';
     
    if (!institutionName.trim()) validationErrors.institutionName = 'Driver License Number is required';
    if (!unitName.trim()) validationErrors.unitName = 'Issued State is required';
    if (!unitManagerName.trim()) validationErrors.unitManagerName = 'Language is required';
    if (!address.trim()) validationErrors.address = 'DOT Number is required';
    if (!degree.trim()) validationErrors.degree = 'MC Number is required';
    if (!schoolName.trim()) validationErrors.schoolName = 'Company Name is required';
    
    if (!termsAccepted) validationErrors.general = 'Please accept Terms & Conditions';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    setErrors({}); // Clear all errors before API call

    try {
      const signupData = {
        email: credentials.email.trim(),
        password: credentials.password,
        user_name: credentials.fullName.trim(),
        mobile_number: credentials.mobile.trim(),
        driver_license_number: credentials.institutionName.trim(),
        issued_date:"2025-12-20",
        // issued_date: credentials.unitName.trim(), // Changed from unitName to issued_date
        language: credentials.unitManagerName.trim(),
        dot_number: credentials.address.trim(), // Changed from bot_number to dot_number
        mc_number: credentials.degree.trim(),
        company_name: credentials.schoolName.trim(),
        company_authorised: 'yes',
      };
      const response = await signupApi(signupData, setIsLoading);
       if (response.success) {
       navigation.navigate(ScreenNameEnum.Login) 
      }  
    } catch (error: any) {
        setIsLoading(false);
      errorToast( error.message || 'Something went wrong. Please try again.')
      
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleSignup,
  };
};

export default useSignup;