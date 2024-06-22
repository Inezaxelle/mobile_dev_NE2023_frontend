import { Text, SafeAreaView, StyleSheet, View, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import React from "react";
import axios from "axios";

const ValidateTokenScreen = () => {
  const [token, setToken] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [tokenValueDays, setTokenValueDays] = useState(null);

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert("Error", "Please enter a token");
      return;
    }

    try {
      const response = await axios.post("http://10.5.221.220:5000/api/validate", {
        token: token, 
      });

      setResultMessage(response.data.message);
      setTokenValueDays(response.data.token_value_days);
      Alert.alert("Success", "Token validated successfully");
    } catch (error) {
      console.error("Error validating token:", error);
      Alert.alert("Error", "Failed to validate token");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Validate Token</Text>
      <View>
        <TextInput
          placeholder="Enter Token"
          value={token}
          onChangeText={(text) => setToken(text)}
          style={styles.input}
        />
        <Button title="Validate Token" onPress={handleSubmit} />
      </View>
      {resultMessage ? (
        <View style={styles.result}>
          <Text>{resultMessage}</Text>
          {tokenValueDays !== null && (
            <Text>Token Value Days: {tokenValueDays}</Text>
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default ValidateTokenScreen;

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
  result: {
    marginTop: 20,
    alignItems: "center",
  },
});
