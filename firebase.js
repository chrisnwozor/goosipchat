import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"




const firebaseConfig = {
    apiKey: "AIzaSyAAUktfjGFLyppP9iLcDQ6yFF2LdnlIA1g",
    authDomain: "gossip-3e04c.firebaseapp.com",
    projectId: "gossip-3e04c",
    storageBucket: "gossip-3e04c.appspot.com",
    messagingSenderId: "57869515622",
    appId: "1:57869515622:web:ebb1e51034696a476ca6a7"
};


// let app;

// if (firebase.apps.length === 0) {
//     app = initializeApp(firebaseConfig);
// }else{
//     app = firebase.app();
// }
const app = initializeApp(firebaseConfig);



const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth};
