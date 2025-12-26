// style.ts
import { Dimensions, Platform, StyleSheet } from 'react-native';
import font from '../../../theme/font';
import { color } from '../../../constant';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
container: {
    flex: 1,
  },

  bg: {
    flex: 1,
  },

  topBar: {
    padding: 16,
    alignItems: "flex-start",
  },

  language: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  languageText: {
    color: "#fff",
    fontSize: 13,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
  },

  bottomCard: {
     padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 14, 
    height:55
  },

  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 14, 
    height:60
  },

  googleBtnText: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
});
