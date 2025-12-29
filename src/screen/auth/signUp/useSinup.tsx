// useSignup.ts
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signupApi } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';

interface Credentials {
  email: string;
  password: string;
  cpassword?: string;
  fullName: string;
  mobile: string;
  driverLicenseNumber: string;
  issuedState: string;
  issuedDate: string;
  language: string;
  dotNumber: string;
  mcNumber: string;
  companyName: string;
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
    driverLicenseNumber: '',
    issuedState: '',
    issuedDate: '',
    language: '',
    dotNumber: '',
    mcNumber: '',
    companyName: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // US States list
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Languages list
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Hindi',
    'Arabic',
    'Russian',
    'Portuguese',
    'Japanese'
  ];

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

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateFields = (): boolean => {
    const validationErrors: ValidationErrors = {};
    const { 
      email, 
      password, 
      cpassword, 
      mobile, 
      fullName, 
      driverLicenseNumber, 
      issuedState, 
      issuedDate, 
      language, 
      dotNumber,
      mcNumber,
      companyName
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
     
    if (!driverLicenseNumber.trim()) validationErrors.driverLicenseNumber = 'Driver License Number is required';
    if (!issuedState.trim()) validationErrors.issuedState = 'Issued State is required';
     if (!language.trim()) validationErrors.language = 'Language is required';
    if (!dotNumber.trim()) validationErrors.dotNumber = 'DOT Number is required';
    if (!mcNumber.trim()) validationErrors.mcNumber = 'MC Number is required';
    if (!companyName.trim()) validationErrors.companyName = 'Company Name is required';
    
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
    setErrors({});

    try {
      const signupData = {
        email: credentials.email.trim(),
        password: credentials.password,
        user_name: credentials.fullName.trim(),
        mobile_number: credentials.mobile.trim(),
        driver_license_number: credentials.driverLicenseNumber.trim(),
        issued_date: credentials.issuedState,
        language: credentials.language.trim(),
        dot_number: credentials.dotNumber.trim(),
        mc_number: credentials.mcNumber.trim(),
        company_name: credentials.companyName.trim(),
        company_authorised: 'yes',
      };
      
      const response = await signupApi(signupData, setIsLoading);
      
      if (response.success) {
        navigation.navigate(ScreenNameEnum.Login as never);
      }  
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    termsAccepted,
    showDatePicker,
    showStateModal,
    showLanguageModal,
    usStates,
    languages,
    setTermsAccepted,
    setShowDatePicker,
    setShowStateModal,
    setShowLanguageModal,
    handleChange,
    handleSignup,
  };
};

export default useSignup;