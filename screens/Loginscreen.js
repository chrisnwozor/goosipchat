import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Text, TextInput, Button } from 'react-native-paper';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Loginscreen = ({navigation}) => {
    
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        const unsubscribe= auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.navigate("Home");
            }
        })
        return unsubscribe;
    },[])

    const navigateToRegister = () => {
        navigation.navigate("Register");
    }
    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(()=> {
            navigation.replace("Home")
        }).catch((error) => alert(error.message))
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text variant="displaySmall">Gossip Chat</Text>
            <TextInput
                label="Email"
                mode="outlined"
                placeholder="Enter your email"
                activeOutlineColor='#2C68ED'
                style={styles.textEmail}
                value={email}
                onChangeText={(text)=>setEmail(text)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                placeholder="Enter your password"
                activeOutlineColor='#2C68ED'
                style={styles.textPassword}
                secureTextEntry
                value={password}
                onChangeText={(text)=>setpassword(text)}
                onSubmitEditing={login}
            />
            <View style={{padding:10}} />
            <Button onPress={login} labelStyle={{ fontSize: 20, padding: 7 }} mode='contained' buttonColor="#2C68ED" style={styles.btn1}>Login</Button>
            <Button onPress={navigateToRegister} textColor='#2C68ED' labelStyle={{ fontSize: 20, padding: 7 }} mode='outlined' style={styles.btn2}>Register</Button>
        </KeyboardAvoidingView>
    )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'Red',
        paddingHorizontal: "10%"
    },
    textEmail: {
        width: '100%',
        marginTop: "15%",
        fontSize: 20
    },
    textPassword: {
        width: '100%',
        marginTop: "5%",
        fontSize: 20
    },
    btn1: {
        width: '100%',
        marginTop: "5%",
        borderRadius: 0,
        paddingHorizontal: 13,
    },
    btn2: {
        width: '100%',
        marginTop: "5%",
        borderRadius: 0,
        borderColor: "#2C68ED"
    }
})