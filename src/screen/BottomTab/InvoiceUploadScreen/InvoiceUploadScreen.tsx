import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { pick } from 'react-native-file-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InvoiceUploadScreen = () => {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* =====================
     PERMISSIONS
  ====================== */
  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const res = await requestMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        ]);
        return Object.values(res).some(v => v === RESULTS.GRANTED);
      } else {
        const res = await request(PERMISSIONS.IOS.CAMERA);
        return res === RESULTS.GRANTED;
      }
    } catch {
      return false;
    }
  };

  /* =====================
     CAMERA
  ====================== */
  const openCamera = async () => {
    if (!(await requestPermission())) return;

    try {
      const img = await ImagePicker.openCamera({
        cropping: false,
        compressImageQuality: 0.8,
      });

      setFile({
        uri: img.path,
        name: `camera_${Date.now()}.jpg`,
        type: img.mime,
        size: img.size,
      });

      setVisible(false);
    } catch {}
  };

  /* =====================
     GALLERY
  ====================== */
  const openGallery = async () => {
    if (!(await requestPermission())) return;

    try {
      const img = await ImagePicker.openPicker({
        mediaType: 'photo',
      });

      setFile({
        uri: img.path,
        name: `gallery_${Date.now()}.jpg`,
        type: img.mime,
        size: img.size,
      });

      setVisible(false);
    } catch {}
  };

  /* =====================
     PDF PICK
  ====================== */
  const pickPDF = async () => {
    try {
      const doc = await pick({
        type: ['application/pdf'],
      });

      setFile({
        uri: doc.uri,
        name: doc.name,
        type: doc.mimeType,
        size: doc.size,
      });

      setVisible(false);
    } catch {}
  };

  /* =====================
     UPLOAD
  ====================== */
  const uploadFile = async () => {
    if (!file) {
      Alert.alert('Select a file first');
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);

      await fetch('YOUR_API_URL', {
        method: 'POST',
        body: form,
      });

      Alert.alert('Success', 'File uploaded successfully');
      setFile(null);
    } catch {
      Alert.alert('Upload Failed');
    } finally {
      setLoading(false);
    }
  };

  const sizeMB = file?.size
    ? (file.size / 1024 / 1024).toFixed(2) + ' MB'
    : '';

  /* =====================
     UI
  ====================== */
  return (
    <SafeAreaView style={styles.container}>
    <StatusBarComponent />
      <CustomHeader label={"Click & Upload"} />
      <View style={{
        padding: 15, 
        paddingTop:45
      }}>
      <TouchableOpacity style={styles.uploadBox} onPress={() => setVisible(true)}>
         <Icon name="description" size={30} color="#3c31d2ff" />

        <Text style={styles.uploadText}>Click to Upload</Text>
        <Text style={styles.sub}>Camera / Gallery / PDF</Text>
      </TouchableOpacity>

      {/* {file && (
        <View style={styles.fileCard}>
          <Text numberOfLines={1}>{file.name}</Text>
          <Text>{sizeMB}</Text>

          <TouchableOpacity onPress={() => setFile(null)}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      )} */}
  <View style={{ marginTop: 40 }}>
            <CustomButton
              title="Upload"
              onPress={uploadFile}
             />
          </View>
      {/* <TouchableOpacity
        style={[styles.submit, (!file || loading) && { backgroundColor: '#ccc' }]}
        disabled={!file || loading}
        onPress={uploadFile}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Upload</Text>}
      </TouchableOpacity> */}

      {/* ===== MODAL ===== */}
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.sheet}>
            <Option label="Camera" onPress={openCamera} />
            <Option label="Gallery" onPress={openGallery} />
            <Option label="PDF" onPress={pickPDF} />
            <Option label="Cancel" onPress={() => setVisible(false)} danger />
          </View>
        </TouchableOpacity>
      </Modal>
      </View>
    </SafeAreaView>
  );
};

const Option = ({ label, onPress, danger = false }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.option}>
    <Text style={[styles.optionText, danger && { color: 'red' }]}>{label}</Text>
  </TouchableOpacity>
);

export default InvoiceUploadScreen;

/* =====================
   STYLES
====================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 30 },

  uploadBox: {
    height: 180,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4038FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: { fontSize: 42, color: '#4A90E2' },
  uploadText: { fontSize: 18, fontWeight: '600', marginTop: 8 },
  sub: { color: '#777', marginTop: 4 },

  fileCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  remove: { color: 'red', marginTop: 6 },

  submit: {
    marginTop: 30,
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  option: { padding: 18, borderBottomWidth: 1, borderColor: '#eee' },
  optionText: { textAlign: 'center', fontSize: 16, fontWeight: '600' },
});
