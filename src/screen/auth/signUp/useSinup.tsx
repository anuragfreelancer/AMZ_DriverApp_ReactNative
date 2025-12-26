import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SinupCustomer } from '../../../api/apiRequest';
import ScreenNameEnum from '../../../routes/screenName.enum';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/;
const nameRegex = /^[a-zA-Z\s]{2,50}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const yearRegex = /^(19|20)\d{2}$/; // Valid years 1900-2099

interface Credentials {
  email: string;
  password: string;
  cpassword?: string; // Add this field
  mobile: string;
  fullName: string;
  city?: string;
  country?: string;
  address?: string;
  institutionName?: string;
  unitName?: string;
  unitManagerName?: string;
  yearOfBirth?: string;
  educationLevel?: string;
  degree?: string;
  schoolName?: string;
  yearOfGraduation?: string;
  criminalRecordExtract?: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  mobile?: string;
  fullName?: string;
  institutionName?: string;
  unitName?: string;
  unitManagerName?: string;
  address?: string;
  yearOfBirth?: string;
  educationLevel?: string;
  degree?: string;
  schoolName?: string;
  yearOfGraduation?: string;
  general?: string;
}

const useSignup = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [savedRole, setSavedRole] = useState<string | null>(null);

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    cpassword: '',
    mobile: '',
    fullName: '',
    address: '',
    institutionName: '',
    unitName: '',
    unitManagerName: '',
    yearOfBirth: '',
    educationLevel: '',
    degree: '',
    schoolName: '',
    yearOfGraduation: '',
    criminalRecordExtract: false,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    loadRole();
  }, []);

  // Load saved role from AsyncStorage
  const loadRole = async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      if (role) {
        setSavedRole(role);
      }
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  const handleChange = (field: keyof Credentials, value: string | boolean) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (field === 'password' || field === 'cpassword') {
      setErrors((prev) => ({ 
        ...prev, 
        [field]: '', 
        confirmPassword: field === 'cpassword' ? '' : prev.confirmPassword 
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '', general: '' }));
    }
  };

  const validateFields = (): boolean => {
    const { email, password, cpassword, mobile, fullName, yearOfBirth, yearOfGraduation } = credentials;
    const validationErrors: ValidationErrors = {};

    // Common validations for both roles
    if (!email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }

    if (!mobile.trim()) {
      validationErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(mobile)) {
      validationErrors.mobile = 'Enter a valid 10-15 digit mobile number.';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters.';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password = 'Password must contain uppercase, lowercase, number and special character.';
    }

    if (!cpassword?.trim()) {
      validationErrors.confirmPassword = 'Confirm password is required.';
    } else if (password !== cpassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    // Role-specific validations
    if (savedRole === 'Substitute') {
      // Worker validations
      if (!fullName?.trim()) {
        validationErrors.fullName = 'Full name is required.';
      } else if (!nameRegex.test(fullName)) {
        validationErrors.fullName = 'Name should contain only letters and spaces (2-50 characters).';
      }

      if (yearOfBirth) {
        if (!yearRegex.test(yearOfBirth)) {
          validationErrors.yearOfBirth = 'Enter a valid year (1900-2099).';
        } else {
          const birthYear = parseInt(yearOfBirth);
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          if (age < 18) {
            validationErrors.yearOfBirth = 'You must be at least 18 years old.';
          }
        }
      } else {
        validationErrors.yearOfBirth = 'Year of birth is required.';
      }

      // Education validations
      if (!credentials.educationLevel?.trim()) {
        validationErrors.educationLevel = 'Education level is required.';
      }

      if (credentials.yearOfGraduation && !yearRegex.test(credentials.yearOfGraduation)) {
        validationErrors.yearOfGraduation = 'Enter a valid graduation year.';
      }

    } else {
      // Institution validations
      if (!credentials.institutionName?.trim()) {
        validationErrors.institutionName = 'Institution name is required.';
      }

      if (!credentials.unitName?.trim()) {
        validationErrors.unitName = 'Unit name is required.';
      }

      if (!credentials.unitManagerName?.trim()) {
        validationErrors.unitManagerName = 'Unit manager name is required.';
      } else if (!nameRegex.test(credentials.unitManagerName)) {
        validationErrors.unitManagerName = 'Enter a valid name.';
      }
    }

    // Common address validation
    if (!credentials.address?.trim()) {
      validationErrors.address = 'Address is required.';
    } else if (credentials.address.length < 10) {
      validationErrors.address = 'Address must be at least 10 characters.';
    }

    // Terms and conditions validation
    if (!termsAccepted) {
      validationErrors.general = 'Please accept Terms & Conditions.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    navigation.navigate(ScreenNameEnum.Login)
    // if (!validateFields()) return;

    // setIsLoading(true);
    // setErrors({});

    // try {
    //   // Prepare data based on role
    //   let signupData: any = {
    //     email: credentials.email,
    //     password: credentials.password,
    //     mobile: credentials.mobile,
    //     // role: savedRole || 'Institution',
    //     address: credentials.address,
    //     terms_accepted: termsAccepted,
    //   };

    //   // Add role-specific fields
    //   if (savedRole === 'Substitute') {
    //     signupData = {
    //       ...signupData,
    //       full_name: credentials.fullName,
    //       year_of_birth: credentials.yearOfBirth,
    //       education_level: credentials.educationLevel,
    //       degree: credentials.degree,
    //       school_name: credentials.schoolName,
    //       year_of_graduation: credentials.yearOfGraduation,
    //       criminal_record_extract: credentials.criminalRecordExtract,
    //     };
    //   } else {
    //     signupData = {
    //       ...signupData,
    //       full_name: credentials.institutionName,
    //       unit_name: credentials.unitName,
    //       unit_manager_name: credentials.unitManagerName,
    //     };
    //   }

    //   const param = {
    //     ...signupData,
    //     navigation,
    //     roleType: savedRole === 'Substitute' ? 'User' : 'Institution',
    //   };

    //   console.log(param, 'the param')
    //   await SinupCustomer(param, setIsLoading);

    // } catch (error: any) {
    //   console.error("Signup Error:", error);
    //   setErrors({ 
    //     general: error.message || 'Registration failed. Please try again.' 
    //   });
    // }
  };

  return {
    credentials,
    errors,
    isLoading,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleSignup,
    savedRole,
  };
};

export default useSignup;