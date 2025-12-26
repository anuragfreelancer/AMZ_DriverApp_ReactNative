import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import imageIndex from "../../../assets/imageIndex";
import { styles } from "./style";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
       <ImageBackground
        source={imageIndex.bag1} // 🔁 background image
        style={styles.bg}
      >
     <StatusBarComponent/>
       

        {/* Center Logo */}
        <View style={styles.center}>
          {/* <Text style={styles.logo}>LOGO</Text> */}
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          {/* Continue with Number */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate(ScreenNameEnum.Login)}
          >
            <Icon name="call-outline" size={20} color="#fff" />
            <Text style={styles.primaryBtnText}>
              Continue with Number
            </Text>
          </TouchableOpacity>

           <TouchableOpacity style={styles.googleBtn}>
            <FontAwesome name="google" size={18} />
            <Text style={styles.googleBtnText}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <Text style={[styles.googleBtnText, {color:'#fff', textAlign:'center', marginBottom:10}]}>
              Don't have an account? Sign Up
            </Text>
        </View>
      </ImageBackground>
 
  );
}
