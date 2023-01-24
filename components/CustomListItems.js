import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { List, Avatar } from "react-native-paper";
import { collection, orderBy, query,onSnapshot } from "firebase/firestore";
import {db} from "../firebase"


const CustomListItems = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "Chats", id, "message");
    const q = query(colRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
    setChatMessages(
        snapshot.docs.map((doc) => doc.data())
      )
    );
    return unsubscribe;
  })
  return (
    <TouchableOpacity onPress={() => enterChat(id,chatName)} style={{ backgroundColor: "white" }}>
      <List.Item
        key={id}
        title={chatName}
        description={chatMessages?.[0]?.displayName && chatMessages?.[0]?.message }
        left={() => (
          <Avatar.Icon
            icon="wechat"
            color="black"
            style={{ backgroundColor: "white" }}
          />
         
        )}
        titleStyle={{ fontSize: 20, fontWeight: "bold", paddingVertical: 5 }}
        descriptionNumberOfLines={1}
        titleEllipsizeMode="tail"
        descriptionStyle={{ fontSize: 18 }}
      />
    </TouchableOpacity>
  );
};

export default CustomListItems;


