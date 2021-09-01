import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  //Configurações do seu projeto
  let firebaseConfig = {
    apiKey: "AIzaSyAFbYoQjJojN_cddsqik9-tJUzucWOSBY0",
    authDomain: "sistema-ab291.firebaseapp.com",
    projectId: "sistema-ab291",
    storageBucket: "sistema-ab291.appspot.com",
    messagingSenderId: "856326652441",
    appId: "1:856326652441:web:f93b35e1609db8c57b2088",
    measurementId: "G-H2J0Y1K4QR"
  };
  

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
