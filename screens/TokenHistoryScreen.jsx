import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Alert,
  FlatList,
} from "react-native";
import React from "react";
import axios from "axios";

const TokenHistoryScreen = () => {
  const [meterNumber, setMeterNumber] = React.useState("");
  const [tokenHistory, setTokenHistory] = React.useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.5.221.220:5000/api/tokenHistory", {
        meter_number: meterNumber,
      });
      setTokenHistory(response.data.tokens);
    } catch (error) {
      Alert.alert(error, error.message);
    }
  };
  const handleSearch = () => {
    if (meterNumber.length === 6) {
      handleSubmit();
    } else {
      Alert.alert("Error", "Please enter a valid 6-digit meter number");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>View Token history </Text>
      <View>
        <TextInput
          placeholder="Enter Meter Number"
          value={meterNumber}
          onChangeText={(text) => setMeterNumber(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title="Search" onPress={handleSearch}/>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={tokenHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Meter Number: {item.meter_number}</Text>
            <Text>Token: {item.token}</Text>
            <Text>Status: {item.token_status}</Text>
            <Text>
              Purchased Date:{" "}
              {new Date(item.purchased_date).toLocaleDateString()}
            </Text>
            <Text>Amount: {item.amount}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TokenHistoryScreen;

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
    marginVertical: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
