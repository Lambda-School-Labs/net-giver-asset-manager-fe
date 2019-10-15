import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [fname, setFname] = useState();
  const [lme, setLname] = useState();

  return (
    <View>
      <Text>Simple Asset Tracker</Text>
      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default LoginScreen;
