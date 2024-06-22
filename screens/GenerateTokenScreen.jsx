import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState } from "react";

const GenerateTokenScreen = () => {
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://10.5.221.220:5000/api/generate",
        {
          meter_number: meterNumber,
          amount: parseInt(amount),
        }
      );
      Alert.alert("Success", response.data.message);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Generate Token </Text>
      <View>
        <TextInput
          placeholder="Enter Meter Number"
          value={meterNumber}
          onChangeText={(text) => setMeterNumber(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Generate Token" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default GenerateTokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  text: {
    marginBottom: 20,
  },
});
