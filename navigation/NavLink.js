import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Spacer from "../components/Spacer";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#2F6FEC",
    alignItems: "center",
    textAlign: "center"
  }
});

export default withNavigation(NavLink);
