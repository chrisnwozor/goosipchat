import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Registerscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => updateProfile(auth.currentUser,{
        displayName: name,
        photoURL: imageUrl
      }))
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text variant="displaySmall">Register</Text>
      <TextInput
        label="Full Name"
        mode="outlined"
        placeholder="Enter your Full Name"
        activeOutlineColor="#2C68ED"
        style={styles.textName}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Email"
        mode="outlined"
        placeholder="Enter your Email"
        activeOutlineColor="#2C68ED"
        style={styles.textName}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        placeholder="Enter your password"
        activeOutlineColor="#2C68ED"
        style={styles.textPassword}
        secureTextEntry
        value={password}
        onChangeText={(text) => setpassword(text)}
      />
      <TextInput
        label="ImageUrl"
        mode="outlined"
        placeholder="Enter your ImageUrl"
        activeOutlineColor="#2C68ED"
        style={styles.textImageUrl}
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        onSubmitEditing={register}
      />
      <View style={{padding:10}} />
      <Button
        onPress={register}
        textColor="#2C68ED"
        labelStyle={{ fontSize: 20, padding: 7 }}
        mode="outlined"
        style={styles.btn2}
      >
        Register
      </Button>
    </KeyboardAvoidingView>
  );
};

export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "Red",
    paddingHorizontal: "15%",
  },
  btn2: {
    width: "100%",
    marginTop: "5%",
    borderRadius: 0,
    borderColor: "#2C68ED",
  },
  textName: {
    width: "100%",
    marginTop: "5%",
    fontSize: 20,
  },
  textEmail: {
    width: "100%",
    marginTop: "5%",
    fontSize: 20,
  },
  textPassword: {
    width: "100%",
    marginTop: "5%",
    fontSize: 20,
  },
  textImageUrl: {
    width: "100%",
    marginTop: "5%",
    fontSize: 20,
  },
});
