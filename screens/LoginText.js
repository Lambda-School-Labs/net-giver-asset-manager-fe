import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import LoginForm from "../components/LoginForm";
import NavLink from "../navigation/NavLink";

const LoginText = () => {
  const { state, signin, clearErrorMessage } = useState("");

  return (
    <View>
      <View style={{display: "flex"}}>
        <Image 
          source={require("../assets/images/assetTracker.jpg")}
          style={styles.logo}
        />
      </View>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <LoginForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Log In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="AppStack"
        style={styles.toRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
    height: 109,
    width: 225
  },
  toRegister: {
    color: "red"
  },
});

export default LoginText;
