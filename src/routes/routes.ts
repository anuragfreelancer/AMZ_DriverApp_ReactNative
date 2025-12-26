import OnboardingScreen from "../screen/auth/Onboarding/Onboarding";
import ScreenNameEnum from "./screenName.enum";
import TabNavigator from "../navigators/TabNavigation";
import NotificationsScreen from "../screen/Notification/Notification";
import ChangePassword from "../screen/Profile/ChangePassword/ChangePassword";
import HelpScreen from "../screen/Profile/Help/Helps";
import Splash from "../screen/auth/Splash/Splash";
import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import ViewDetails from "../screen/BottomTab/Shifts/ViewDetails";
import LegalPoliciesScreen from "../screen/Profile/LegalPoliciesScreen";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import OrdersPrfile from "../screen/Profile/OrdersPrfile/OrdersPrfile";
import Login from "../screen/auth/login/Login";
import SecuritySetupScreen from "../screen/auth/SecuritySetupScreen/SecuritySetupScreen";
import FaceLockcomplete from "../screen/FaceLockEnabledScreen/FaceLockEnabledScreen";
import PasscodeCodeOtp from "../screen/auth/PasscodeCodeOtp/PasscodeCodeOtp";
import loginPin from "../screen/auth/loginPin/loginPin";
import CreateNewInvoice from "../screen/CreateNewInvoice/CreateNewInvoice";
import ProfileScreen from "../screen/Profile/ProfileScreen/ProfileScreen";
import InvoiceUploadScreen from "../screen/BottomTab/InvoiceUploadScreen/InvoiceUploadScreen";
import ClickUploadScreen from "../screen/BottomTab/CameraUpload/ClickUploadScreen";
import PdfViewerScreen from "../screen/BottomTab/Invoice/invoiceDetail";
import InvoiceDetail from "../screen/BottomTab/Invoice/invoiceDetail";
import SignUpUI from "../screen/auth/signUp/SignUp";
import PasswordReset from "../screen/auth/passwordReset/PasswordReset";
import CreateNewPassword from "../screen/auth/createNewPassword/CreateNewPassword";
import DrawerNavigation from "../navigators/DrawerNavigation";
const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.loginPin,
      Component: loginPin,
    },
    {
      name: ScreenNameEnum.CreateNewInvoice,
      Component: CreateNewInvoice,
    },



    {
      name: ScreenNameEnum.Login,
      Component: Login,
    },
    {
      name: ScreenNameEnum.Sinup,
      Component: SignUpUI,
    },
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreateNewPassword,
      Component: CreateNewPassword,
    },


    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },

    {
      name: ScreenNameEnum.FaceLockcomplete,
      Component: FaceLockcomplete,
    },
    {
      name: ScreenNameEnum.PasscodeCodeOtp,
      Component: PasscodeCodeOtp,
    },

    {
      name: ScreenNameEnum.SecuritySetupScreen,
      Component: SecuritySetupScreen,
    },


    {
      name: ScreenNameEnum.OrdersPrfile,
      Component: OrdersPrfile,
    },


    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },



    {
      name: ScreenNameEnum.changePassword,
      Component: ChangePassword,
    },

    {
      name: ScreenNameEnum.Help,
      Component: HelpScreen,
    },
    {
      name: ScreenNameEnum.EditProfile,
      Component: ProfileScreen,
    },
    {
      name: ScreenNameEnum.ClickUploadScreen,
      Component: ClickUploadScreen,
    },
    {
      name: ScreenNameEnum.InvoiceUploadScreen,
      Component: InvoiceUploadScreen,
    },
    {
      name: ScreenNameEnum.DrawerNavgation,
      Component: DrawerNavigation,
    },

    {
      name: ScreenNameEnum.PrivacyPolicy,
      Component: PrivacyPolicy,
    },
    {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component: LegalPoliciesScreen,
    },


    {
      name: ScreenNameEnum.InvoiceDetail,
      Component: InvoiceDetail,
    },


    {
      name: ScreenNameEnum.NotificationsScreen,
      Component: NotificationsScreen,
    },







  ],


};

export default _routes;
