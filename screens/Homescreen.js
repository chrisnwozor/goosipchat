import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import CustomListItems from "../components/CustomListItems";
import { Avatar } from "react-native-paper";
import { collection, onSnapshot } from "firebase/firestore";

const Homescreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Chats"), (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth).then(() => navigation.replace("Login"));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Gossip",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <TouchableOpacity onPress={logout}>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={{ uri: auth?.currentUser?.photoURL }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
           
           
          }}
        >
          <TouchableOpacity>
            <Avatar.Icon
              icon="camera-outline"
              size={45}
              color="black"
              style={{ backgroundColor: "white" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={chatScreen}>
            <Avatar.Icon
              icon="pencil-outline"
              size={45}
              color="black"
              style={{ backgroundColor: "white" }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const chatScreen = () => {
    navigation.navigate("Chat");
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Text", {
      id,
      chatName
    })
  }
  return (
    <SafeAreaView>
      <ScrollView style={{height:"100%"}}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
