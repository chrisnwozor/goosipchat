import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, TextInput } from "react-native-paper";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";

const Chatscreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    Keyboard.dismiss();
    const messageRef = collection(db, "Chats", route.params.id, "message");
    const docData = {
      timeStamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    };
    addDoc(messageRef, docData);
    setInput("");
  };
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: "Chat",
      headerRight: () => (
        <TouchableOpacity>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={{ uri: auth?.currentUser?.photoURL }}
          />
        </TouchableOpacity>
      )
    })
  },[navigation,messages])

  useLayoutEffect(() => {
    const colRef = collection(db, "Chats", route.params.id, "message");
    const q = query(colRef, orderBy("timeStamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light"/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
          <View style={{marginTop:20}} />
            <ScrollView>
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Image style={{position:"absolute", width:30,height:30,borderRadius:15,bottom:-15,right:-15}} source={{uri: data.photoURL}}  />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Image style={{position:"absolute", width:30,height:30,borderRadius:15,bottom:-15,left:-15}} source={{uri: data.photoURL}}  />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                )
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                onChangeText={(text) => setInput(text)}
                placeholder="Gossip message"
                value={input}
                style={styles.textInput}
                mode="outlined"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Avatar.Icon icon="send" size={50} style={{backgroundColor:"white"}} color="#2C68ED" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chatscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    buttom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    left: 10,
    paddingRight: 10,
    fontSize: 20,
    color:"black"
  },
  senderText: {
    left: 10,
    paddingRight: 10,
    fontSize: 20,
    color:"white"
  },
});
