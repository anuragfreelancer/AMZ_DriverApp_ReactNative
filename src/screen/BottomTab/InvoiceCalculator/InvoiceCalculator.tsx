import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import CustomButton from "../../../compoent/CustomButton";
import TextInputField from "../../../compoent/TextInputField";
import LoadingModal from "../../../utils/Loader";

const GST_PERCENT = 18;

const InvoiceCalculator = () => {
  const [basePrice, setBasePrice] = useState("");
  const [addons, setAddons] = useState("");
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState(0);

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  /** ================= VALIDATION ================= */
  const validateField = (field: string, value: string) => {
    let error = "";

    const numValue = Number(value || 0);
    const base = Number(basePrice || 0);
    const add = Number(addons || 0);

    if (field === "basePrice" && (!value || numValue <= 0)) {
      error = "Base price is required";
    }

    if (field === "discount" && numValue > base + add) {
      error = "Discount cannot be greater than total amount";
    }

    setErrors((prev: any) => ({
      ...prev,
      [field]: error,
    }));
  };

  /** ================= GST CALC ================= */
  useEffect(() => {
    const base = Number(basePrice || 0);
    const add = Number(addons || 0);
    const dis = Number(discount || 0);

    const total = base + add - dis;
    const gstAmount = total > 0 ? (total * GST_PERCENT) / 100 : 0;

    setGst(gstAmount);
  }, [basePrice, addons, discount]);

  /** ================= API CALL ================= */
  const handleGenerateInvoice = async () => {
    let valid = true;

    if (!basePrice || Number(basePrice) <= 0) {
      setErrors((p: any) => ({ ...p, basePrice: "Base price is required" }));
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);

      const payload = {
        base_price: Number(basePrice),
        addons: Number(addons || 0),
        discount: Number(discount || 0),
        gst: gst,
        total:
          Number(basePrice) +
          Number(addons || 0) -
          Number(discount || 0) +
          gst,
      };

      // 🔗 Replace with your API
      const res = await axios.post(
        "https://example.com/api/generate-invoice",
        payload
      );

      Alert.alert("Success", "Invoice PDF generated successfully");
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /** ================= UI ================= */
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal/>}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Calculator</Text>

        {/* Base Price */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Base Price</Text>
          <TextInputField
            placeholder="₹ 8,50,000"
            keyboardType="numeric"
            value={basePrice}
            onChangeText={(text) => {
              setBasePrice(text);
              validateField("basePrice", text);
            }}
            style={styles.input}
          />
          {!!errors.basePrice && (
            <Text style={styles.errorText}>{errors.basePrice}</Text>
          )}
        </View>

        {/* Add-ons */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Add-ons</Text>
          <TextInputField
            placeholder="₹ 25,000"
            keyboardType="numeric"
            value={addons}
            onChangeText={(text) => {
              setAddons(text);
              validateField("addons", text);
            }}
            style={styles.input}
          />
        </View>

        {/* Discount */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Discount</Text>
          <TextInputField
            placeholder="₹ 20,000"
            keyboardType="numeric"
            value={discount}
            onChangeText={(text) => {
              setDiscount(text);
              validateField("discount", text);
            }}
            style={styles.input}
          />
          {!!errors.discount && (
            <Text style={styles.errorText}>{errors.discount}</Text>
          )}
        </View>

        {/* GST */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>GST (18%)</Text>
          {/* <View style={styles.disabledBox}> */}
             <TextInputField
            placeholder="₹ 20,000"
            keyboardType="numeric"
            value={discount}
            onChangeText={(text) => {
              setDiscount(text);
              validateField("discount", text);
            }}
            style={styles.input}
          />
            {/* <Text style={styles.gstText}>₹ {gst.toFixed(2)}</Text> */}
          {/* </View> */}
        </View>

        {/* Button */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={handleGenerateInvoice}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Generate Final Invoice PDF"}
          </Text>
        </TouchableOpacity> */}
        <View style={{marginTop:40}}> 
 <CustomButton title="Generate Final Invoice PDF"  onPress={handleGenerateInvoice} /> 
        </View>
       
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InvoiceCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },

  inputBox: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
    marginLeft:5
  },

  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    borderColor:'transparent'
  },

  disabledBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 14,
  },

  gstText: {
    fontSize: 16,
    color: "#666",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

