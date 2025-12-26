 
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity, 
} from "react-native";
import RNBlobUtil from 'react-native-blob-util';
import { SafeAreaView } from "react-native-safe-area-context";
import Pdf from "react-native-pdf";
import { useNavigation, useRoute } from "@react-navigation/native";
import { wp } from "../../../utils/Constant"; 
import imageIndex from "../../../assets/imageIndex";
import { Image } from "react-native";

const InvoiceDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
 const [localPath, setLocalPath] = useState(null);
  // Accept PDF from navigation OR fallback URL
  // const res =  route?.params?.pdfUrl || "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf";
  const res =  route?.params?.pdfUrl || "https://www.orimi.com/pdf-test.pdf";
  useEffect(() => {
    const downloadAndSavePdf = async () => {
      try {
        const res1 = await RNBlobUtil.config({
          fileCache: true,
          appendExt: 'pdf',
        }).fetch('GET', res);
        const path = res1.path(); // Get the actual file path
        console.log('📥 Saved PDF to:', path);
        setLocalPath(path);
      } catch (error) {
        console.error('❌ PDF Download Error:', error);
      } finally {
        setLoading(false);
      }
    };
    downloadAndSavePdf();
  }, []);
  // const source = {
  //   uri: pdfUrl,
  //   cache: true,
  // };

  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={imageIndex.back} style={{height:35, width:35}}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Detail</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* PDF VIEW */}
      <View style={styles.container}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#4F46E5" />
          </View>
        )}

        {/* <Pdf
          source={source}
          trustAllCerts={true} // 🔥 Fix SSL issues on Android
          onLoadComplete={(numberOfPages) => {
            console.log("Total Pages:", numberOfPages);
            setLoading(false);
          }}
          onPageChanged={(page) => {
            console.log("Current Page:", page);
          }}
          onError={(error) => {
            console.log("PDF Error:", error);
            setLoading(false);
          }}
          renderActivityIndicator={() => (
            <ActivityIndicator size="large" />
          )}
          style={styles.pdf}
        /> */}
          <Pdf
       source={{ uri: `file://${localPath}` }}
       style={{ flex: 1, width: wp(100), 
        // backgroundColor:color.primary
       }}
       onError={(error) => {
         console.log('📄 PDF render error:', error);
       }}
     />
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  backText: {
    color: "#4F46E5",
    fontSize: 16,
    fontWeight: "600",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#FFF",
  },

  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
