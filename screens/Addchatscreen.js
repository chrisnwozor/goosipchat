import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { db } from "../firebase";
import {  addDoc, collection } from "firebase/firestore";

const Addchatscreen = ({ navigation }) => {
  const [chat, setChat] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Chat",
    });
  }, []);
  const createChat =  () => {
    const myDoc = collection(db,"Chats");

    const docData = {
      chatName: chat,
    };
     addDoc(myDoc, docData)
      .then(() => {
        alert("Chat Added Successfully!!!")
        navigation.navigate("Home");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Add Chat"
        mode="outlined"
        placeholder="Enter Chat Name"
        activeOutlineColor="#2C68ED"
        value={chat}
        onChangeText={(text) => setChat(text)}
        left={<TextInput.Icon icon="wechat" />}
        style={styles.textChat}
      />
      <Button
        buttonColor="#2C68ED"
        labelStyle={{ fontSize: 20, padding: 7 }}
        mode="contained"
        style={styles.btn1}
        onPress={createChat}
        disabled={!chat}
      >
        Add Chat
      </Button>
    </View>
  );
};

export default Addchatscreen;

const styles = StyleSheet.create({
  btn1: {
    width: "100%",
    marginTop: "5%",
    borderRadius: 0,
  },
  textChat: {
    width: "100%",
    fontSize: 20,
  },
});
